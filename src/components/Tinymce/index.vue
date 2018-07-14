<template>
  <div class="tinymce-container editor-container" :class="{fullscreen:fullscreen}">
    <textarea class="tinymce-textarea" :id="tinymceId"></textarea>
    <div class="editor-custom-btn-container">
      <el-button type="primary" size="mini" @click="dialogVisible=true">上传附件</el-button>
      <el-dialog
        title="附件上传"
        :visible.sync="dialogVisible"       
        >
        <upload @uploadSuccess="imageSuccessCBK"></upload>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import plugins from "./plugins";
import toolbar from "./toolbar";
import Upload from "@/components/Upload";

export default {
  name: "tinymce",
  components: { Upload },
  props: {
    id: {
      type: String
    },
    value: {
      type: String,
      default: ""
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return [];
      }
    },
    menubar: {
      default: "file edit insert view format table"
    },
    height: {
      type: Number,
      required: false,
      default: 360
    }
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id || "vue-tinymce-" + +new Date(),
      fullscreen: false,
      dialogVisible: false
    };
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || "")
        );
      }
    }
  },
  mounted() {
    this.initTinymce();
  },
  activated() {
    this.initTinymce();
  },
  deactivated() {
    this.destroyTinymce();
  },
  methods: {
    initTinymce() {
      const _this = this;
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        height: this.height,
        body_class: "panel-body ",
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        plugins: plugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: "clean",
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: "square",
        advlist_number_styles: "default",
        imagetools_cors_hosts: ["www.tinymce.com", "codepen.io"],
        default_link_target: "_blank",
        link_title: false,
        language: "zh_CN",
        relative_urls: false,
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value);
          }
          _this.hasInit = true;
          editor.on("NodeChange Change KeyUp SetContent", () => {
            this.hasChange = true;
            this.$emit("input", editor.getContent());
          });
        },
        video_template_callback: function(data) {
          return (
            '<video width="' +
            data.width +
            '" height="' +
            data.height +
            '"' +
            (data.poster ? ' poster="' + data.poster + '"' : "") +
            ' controls="controls">\n' +
            '<source src="' +
            data.source1 +
            '"' +
            (data.source1mime ? ' type="' + data.source1mime + '"' : "") +
            " />\n" +
            (data.source2
              ? '<source src="' +
                data.source2 +
                '"' +
                (data.source2mime ? ' type="' + data.source2mime + '"' : "") +
                " />\n"
              : "") +
            "</video>"
          );
        },
        setup(editor) {
          editor.on("FullscreenStateChanged", e => {
            _this.fullscreen = e.state;
          });
        }
      });
    },
    destroyTinymce() {
      if (window.tinymce.get(this.tinymceId)) {
        window.tinymce.get(this.tinymceId).destroy();
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value);
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent();
    },
    imageSuccessCBK(item) {
      let node = ``;
      switch (item.type) {
        case 1:
          node = `<img class="wscnph" src="${item.url}" >`;
          break;
        case 2:
          node = `<a href="${item.url}" target="_blank">${item.title}</a>`;
          break;
        case 3:
          node = `<video controls><source src="${item.url}"></source></video>`;
          break;
      }
      const _this = this;
      window.tinymce.get(_this.tinymceId).insertContent(node);

      _this.dialogVisible = false;
    }
  },
  destroyed() {
    this.destroyTinymce();
  }
};
</script>

<style scoped>
.tinymce-container {
  position: relative;
}
.tinymce-container >>> .mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
}
</style>
