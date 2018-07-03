<template>
  <div id="my-upload">
      <el-form>
        <el-form-item label="附件类型：" class="form-item">
          <el-radio-group v-model="type">
            <el-radio :label="1">图片</el-radio>
            <el-radio :label="2">文档</el-radio>
            <el-radio :label="3">视频</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="附件标题：" class="form-item">
          <el-input v-model="title"></el-input>
        </el-form-item>
        <el-form-item label="描述：" class="form-item">
          <el-input type="textarea" v-model="description"></el-input>
        </el-form-item>
    </el-form>      
    <div :id="options.button.substring(1)" class="my-upload-btn">选择文件</div>
    <table class="my-table">
      <thead>
        <tr>
          <th>文件名</th>
          <th>文件大小</th>
          <th>类型</th>
          <th>检查文件属性</th>          
          <th>进度</th>
          <th>状态</th>
          <!-- <th>操作</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="file in fileList" :key="file.id">
          <td>{{file.name}}</td>
          <td>{{file.size | fileSize}}</td>
          <td>{{file.ext}}</td>
          <td :id="'md5'+file.id"></td>          
          <td>{{file.percentage}}</td>
          <!-- <td :id="file.id+'status'">{{file.statusText}}</td> -->
          <td :id="'status'+file.id">{{getStatus(file)}}</td>
          <!-- <td>
            <el-button  @click="upload(file)">上传</el-button>
            <el-button  @click="stop(file)">暂停</el-button>
            <el-button>{{file.getStatus()}}</el-button>
            <el-button  @click="remove(file)">移除</el-button>
          </td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<!--<script src="../assets/lib/jquery2.0.0/jquery-2.0.0.js"></script>-->
<!--<script src="../assets/lib/webUploader/webuploader.js"></script>-->

<script type="text/ecmascript-6">
// import WebUploader from "webuploader";

const request = {
  url_file_getUploadinfo: "/api/attachment/upload_check",
  url_file_judgeFileChunkExisted: "/api/attachment/chunk_check",
  url_file_uploadChunks2Server: "/api/attachment/chunk_upload",
  url_file_completeUpload2Server: "/api/attachment/upload_done",

  arg_file_getUploadinfo: {
    fileMd5: "",
    fileName: "",
    directoryId: "",
    fileSizeStr: "",
    projectId: "",
    title: ""
  },
  arg_file_judgeFileChunkExisted: {
    fileMd5: "",
    chunkMd5: "",
    chunkIndexStr: ""
  },
  arg_file_uploadChunks2Server: {
    objectId: "",
    file: "",
    fileMd5: "",
    chunkMd5: "",
    size: "",
    chunkIndexStr: "",
    fileName: ""
  },
  arg_file_completeUpload2Server: {
    objectId: "",
    fileName: "",
    fileSizeStr: "",
    fileMd5: "",
    directoryId: "",
    projectId: "",
    chunksCountStr: ""
  }
};

export default {
  name: "upload",
  data() {
    return {
      options: {
        auto: true,
        url: request.url_file_uploadChunks2Server,
        button: "#picker" + new Date().getTime(),
        multiple: true,
        accept: {
          title: "Images",
          extensions: "gif,jpg,jpeg,bmp,png",
          mimeTypes: "image/*"
        },
        threads: 1,
        fileNumLimit: 1,
        formData: request.arg_file_uploadChunks2Server,
        chunked: true,
        chunkSize: 100 * 1024,
        duplicate: true
      },
      file: {},
      fileList: [],
      uploader: null,
      //附件标题
      title: "",
      //附件描述
      description: "",
      //附件类型
      type: 1,
      //从服务器获取的类型列表
      typeList: {}
    };
  },
  watch: {
    // uploader: function() {
    //   setTimeout(function() {
    //     $(".upload-file").css("display", "none"); //初始化之前将父级元素.upload-file设为block，解决初始化后不可选择文件的bug
    //   }, 20);
    // },
    //监听上传附件类型，重新设置accept
    type: function(val) {
      switch (val) {
        case 1:
          this.options.accept = {
            extensions: this.typeList[1].ext,
            mimeTypes: this.typeList[1].mime
          };
          break;
        case 2:
          this.options.accept = {
            extensions: this.typeList[2].ext,
            mimeTypes: this.typeList[2].mime
          };
          break;
        case 3:
          this.options.accept = {
            extensions: this.typeList[3].ext,
            mimeTypes: this.typeList[3].mime
          };
          break;
      }
      this.initWebUpload();
    }
  },
  mounted() {
    this.registerWebUpload();
    this.getOption();
  },
  methods: {
    //从服务器获取webuploader配置并在获得响应后实例化webuploader
    getOption() {
      this.$http.get("/api/attachment/upload_init").then(res => {
        if (res.data.code == 200) {
          //保存接收的文件类型
          this.typeList = res.data.data.accept;
          //
          this.options = Object.assign(this.options, {
            chunkRetry: res.data.data.chunkRetry,
            chunkSize: res.data.data.chunkSize,
            chunked: res.data.data.chunked,
            fileSingleSizeLimit: res.data.data.fileSingleSizeLimit,
            fileSizeLimit: res.data.data.fileSizeLimit
          });
          this.initWebUpload();
        }
      });
    },
    //注册上传事件的钩子
    registerWebUpload() {
      const $this = this;
      WebUploader.Uploader.unRegister("custom"); //卸载之前注册的钩子
      WebUploader.Uploader.register(
        {
          "before-send-file": "beforeSendFile",
          "before-send": "beforeSend",
          "after-send-file": "afterSendFile",
          name: "custom"
        },
        {
          // 时间点1：所有分块进行上传之前调用此函数
          beforeSendFile: function(file) {
            if ($this.title == "") {//如果未填写附件标题，则填充为文件名
              $this.title = file.name;
            }
            const deferred = WebUploader.Deferred();
            const uploader = this;
            new WebUploader.Uploader()
              .md5File(file)
              .progress(percentage => {
                $("#md5" + file.id).text(
                  "正在读取文件" + Math.round(percentage * 100) + "%"
                );
              })
              .then(md5 => {
                $("#md5" + file.id).text("检查完毕");
                // 判断文件是否存在
                const getData = Object.assign(
                  {},
                  request.arg_file_getUploadinfo,
                  {
                    fileMd5: md5,
                    fileName: file.name,
                    size: file.size.toString(),
                    directoryId: 58,
                    projectId: 58,
                    title: $this.title,
                    description: $this.description,
                    type: $this.type
                  }
                );
                $this
                  .$post(request.url_file_getUploadinfo, getData)
                  .then(json => {
                    if (json.data.msg == "success" && json.data.code == 200) {
                      // 文件不存在
                      $this.file = {
                        file,
                        fileMd5: md5,
                        fileName: file.name,
                        fileSizeStr: file.size.toString(),
                        objectId: json.data.objectId,
                        directoryId: 58,
                        projectId: 58
                      };
                      deferred.resolve();
                    } else if (
                      json.data.msg == "SkipFile" &&
                      json.data.code == 200 &&
                      json.data.message == "文件已存在；"
                    ) {
                      // 文件已存在
                      file.setStatus("complete");
                      uploader.owner.skipFile(file);
                      $("#status" + file.id).text("文件秒传成功；");
                      // 上传成功，通知父组件
                      $this.fileList = []; //重置队列
                      $this.title = "";
                      $this.description = "";
                      $this.$emit("uploadSuccess", json.data.data);
                      // deferred.reject();
                      deferred.resolve();
                    } else if (
                      json.data.msg == "SkipFile" &&
                      json.data.code == 200 &&
                      json.data.message == "文件秒传成功；"
                    ) {
                      // 文件已存在
                      file.setStatus("complete");
                      uploader.owner.skipFile(file);
                      $("#status" + file.id).text("文件秒传成功；");
                      // 上传成功，通知父组件
                      $this.fileList = []; //重置队列
                      $this.title = "";
                      $this.description = "";
                      $this.$emit("uploadSuccess", json.data.data);
                      // deferred.reject();
                      deferred.resolve();
                    } else {
                      console.log(json.data.msg);
                      deferred.reject();
                    }
                  });
              });
            return deferred.promise();
          },
          // 时间点2：如果有分块上传，则每个分块上传之前调用此函数
          beforeSend: block => {
            // var $this = this;
            const deferred = WebUploader.Deferred();
            const file = block.file; // 获取分片所属的文件对象

            new WebUploader.Uploader()
              .md5File(file, block.start, block.end)
              .then(md5 => {
                // 判断分块是否存在
                const getData = Object.assign(
                  {},
                  request.arg_file_judgeFileChunkExisted,
                  {
                    fileMd5: this.file.fileMd5,
                    chunkMd5: md5,
                    objectId: this.file.objectId,
                    chunkIndexStr: block.chunk.toString()
                  }
                );
                this.uploader.options.formData = Object.assign(this.file, {
                  // file,
                  chunkMd5: md5,
                  chunkSizeStr: file.size.toString(),
                  chunkIndexStr: block.chunk.toString()
                });
                this.$post(
                  request.url_file_judgeFileChunkExisted,
                  getData
                ).then(json => {
                  // this.file = Object.assign(this.file, {
                  //   // file,
                  //   chunkMd5: md5,
                  //   chunkSizeStr: file.size.toString(),
                  //   chunkIndexStr: block.chunk.toString()
                  // });

                  if (json.data.code == 200) {
                    if (json.data.data.isExisted) {
                      // 块存在
                      deferred.reject();
                      this.file.file = "";
                    } else {
                      //块不存在
                      deferred.resolve();
                    }
                  } else {
                    console.log(json.data.msg);
                    // 上传失败
                    // deferred.resolve();
                  }
                });
              });
            return deferred.promise();
          },
          // 时间点3：上传完成
          afterSendFile: (file, ret) => {
            const deferred = WebUploader.Deferred();

            // 不是秒传，走完成接口
            if (this.file.fileMd5) {
              // 开始构造后台所需要的参数
              const getData = Object.assign(
                {},
                request.arg_file_completeUpload2Server,
                {
                  objectId: this.file.objectId,
                  fileName: this.file.fileName,
                  fileSizeStr: this.file.fileSizeStr,
                  fileMd5: this.file.fileMd5,
                  directoryId: this.file.directoryId,
                  projectId: this.file.projectId,
                  chunksCountStr: Math.ceil(file.size / this.options.chunkSize)
                }
              );
              this.$post(request.url_file_completeUpload2Server, getData)
                .then(json => {
                  if (json.data.code == 200) {
                    $("#status" + file.id).text("上传成功");
                    deferred.resolve();
                    // 上传成功，通知父组件
                    $this.fileList = []; //重置队列
                    $this.title = "";
                    $this.description = "";
                    $this.$emit("uploadSuccess", json.data.data);
                  } else {
                    $("#status" + file.id).text("上传失败");
                    console.log(json.data.msg);
                    deferred.reject();
                  }
                })
                .catch(err => {
                  $("#status" + file.id).text("文件合成失败");
                });
            } else {
              // 秒传
              deferred.resolve();
            }

            return deferred.promise();
          }
        }
      );
    },
    //实例化webuploader
    initWebUpload() {
      $(".upload-file").css("display", "block"); //初始化之前将父级元素.upload-file设为block，解决初始化后不可选择文件的bug
      const options = this.options;
      const $this = this;

      this.uploader = WebUploader.create({
        auto: options.auto,
        swf: "/static/upload/Uploader.swf",
        server: options.url,
        // pick: {
        //   id: options.button,
        //   multiple: options.multiple,
        //   label: '选择文件'
        // },
        pick: options.button,
        accept: options.accept,
        threads: options.threads,
        fileNumLimit: options.fileNumLimit,
        formData: options.formData,
        chunked: options.chunked,
        chunkSize: options.chunkSize,
        chunkRetry: 1,
        duplicate: options.duplicate,
        prepareNextFile: false,
        compress: false
      });

      // 当有文件被添加进队列的时候，添加到页面预览
      this.uploader.on("fileQueued", file => {
        // this.$emit('fileChange', file);

        $this.fileList.push(file);
      });

      this.uploader.on("uploadStart", file => {
        // 在这里可以准备好formData的数据
        // var accept = {};
        // switch(this.type){
        //   case 1:
        //   accept = {
        //     extensions:this.typeList[1].ext,
        //     // mimeTypes:this.typeList[1].mine
        //     mimeTypes:'image/*'
        //   }
        //   break;
        //   case 2:
        //   accept = {
        //     extensions:this.typeList[2].ext,
        //     mimeTypes:this.typeList[2].mine
        //   }
        //   break;
        //   case 3:
        //   accept = {
        //     extensions:this.typeList[3].ext,
        //     mimeTypes:this.typeList[3].mime
        //   }
        //   break;
        // }
        // console.log(accept);
        // this.uploader.options.formData.type  = this.type;
      });

      this.uploader.on("startUpload", file => {
        // 开始一次上传
        // this.fileList = [];
      });

      // 文件上传过程中创建进度条实时显示。
      this.uploader.on("uploadProgress", (file, percentage) => {
        $this.fileList.forEach((item, index) => {
          if (item.id === file.id) {
            item.percentage = Math.round(percentage * 100) + "%";
            $this.fileList.splice(index, 1, item);
            return;
          }
        });
      });

      this.uploader.on("uploadSuccess", (file, response) => {
        console.log(response);

        $this.fileList.forEach((item, index) => {
          if (item.id === file.id) {
            item.percentage = 100 + "%";
            $this.fileList.splice(index, 1, item);
            return;
          }
        });
      });

      this.uploader.on("uploadError", (file, reason) => {});

      this.uploader.on("error", type => {
        if (type === "Q_EXCEED_NUM_LIMIT") {
          this.$message.error("文件上传已达到最大上限数");
        } else if (type === "Q_EXCEED_SIZE_LIMIT") {
          this.$message.error(
            "文件总大小不能超过" + this.options.fileSizeLimit
          );
          return false;
        } else if (type === "F_EXCEED_SIZE") {
          this.$message.error(
            "单个文件大小不能超过" + this.options.fileSingleSizeLimit
          );
        }
      });

      this.uploader.on("uploadComplete", (file, response) => {
        // this.$emit('complete', file, response);
      });

      this.uploader.on("uploadFinished", () => {
        // 所有文件上传结束
        // 重置文件队列
        this.uploader.reset();
      });
      this.uploader.on("statuschange", () => {
        // console.log(arguments);
      });
      this.uploader.on("beforeFileQueued", file => {
        // if (this.title == "" || this.description == "") {
        //   this.$message.error("请先填写附件标题或描述！");
        //   return false;
        // }

        if (file.size > this.options.fileSingleSizeLimit) {
          this.$message.error(
            "单个文件大小不能超过" +
              this.options.fileSingleSizeLimit / 1024 / 1024 +
              "M"
          );
          return false;
        }
      });
    },
    upload(file) {
      this.uploader.upload(file);
    },
    stop(file) {
      this.uploader.stop(file);
      console.log(file);
    },
    retry(file) {
      this.uploader.retry(file);
    },
    remove(file) {
      // 取消并中断文件上传
      this.uploader.cancelFile(file);
      // 在队列中移除文件
      this.uploader.removeFile(file, true);
      // 在ui上移除
      let index = this.fileList.findIndex(ele => ele.id === file.id);
      this.fileList.splice(index, 1);
    },
    getAccept(accept) {
      switch (accept) {
        case "text":
          return {
            title: "Texts",
            exteensions: "doc,docx,xls,xlsx,ppt,pptx,pdf,txt",
            mimeTypes: ".doc,docx,.xls,.xlsx,.ppt,.pptx,.pdf,.txt"
          };
          break;
        case "video":
          return {
            title: "Videos",
            exteensions: "mp4",
            mimeTypes: ".mp4"
          };
          break;
        case "image":
          return {
            title: "Images",
            exteensions: "gif,jpg,jpeg,bmp,png",
            mimeTypes: ".gif,.jpg,.jpeg,.bmp,.png"
          };
          break;
        default:
          return accept;
      }
    },
    getStatus(file) {
      var txt = "";
      switch (file.getStatus()) {
        case "inited":
          txt = "初始状态";
          break;
        case "queued":
          txt = "等待上传";
          break;
        case "progress":
          txt = "上传中";
          break;
        case "complete":
          txt = "上传完成";
          break;
        case "error":
          txt = "上传出错";
          break;
        case "interrupt":
          txt = "暂停";
          break;
      }
      return txt;
    }
  },
  filters: {
    fileSize: function(value) {
      if (null == value || value == "") {
        return "0 Bytes";
      }
      var unitArr = new Array(
        "Bytes",
        "KB",
        "MB",
        "GB",
        "TB",
        "PB",
        "EB",
        "ZB",
        "YB"
      );
      var index = 0;
      var srcsize = parseFloat(value);
      index = Math.floor(Math.log(srcsize) / Math.log(1024));
      var size = srcsize / Math.pow(1024, index);
      size = size.toFixed(2); //保留的小数位数
      return size + unitArr[index];
    }
  },
  beforeDestroy() {
    this.uploader.destroy();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
#my-upload {
  .my-upload-btn {
    display: inline-block;
    padding: 2px 6px;
    cursor: pointer;
    text-align: center;
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
    border-radius: 3px;
    position: relative;
    input {
      display: none;
    }
  }
  .md5_notice {
    color: #888;
    font-size: 12px;
  }
  .my-table {
    border-collapse: collapse;
    width: 100%;
    margin: 6px;
    color: #888;
    th,
    td {
      padding: 5px;
      border: 1px solid #ddd;
      text-align: center;
      font-size: 14px;
    }
    thead {
      text-align: left;
    }
  }
}
</style>
