<template>
  <div id="login" class="public-wap">
    <div class="login-header" id="canvas-box">
      <!-- 可更换背景图 -->
      <img src="../../../static/img/logobg.jpg" alt="background" class="background-image">
      <canvas id="Mycanvas" width="1920" height="350"></canvas>
      <!-- 可更换logo -->
      <div class="logo-box">
        <img src="../../../static/img/logo.png" alt="logo">
      </div>
      <div class="logo-text">
        <span>站群管理系统V1.0</span>
      </div>
    </div>
    <div class="logo-index">
      <!-- 表单 -->
      <div class="form-container">
        <el-form ref="form" :model="login" :rules="rules" class="form-box">
          <el-form-item prop="username" class="item-box">
            <i class="iconfont icon-user"></i>
            <el-input v-model="login.username" @keyup.enter.native="submitForm('form')" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password" class="item-box r-psd">
            <i class="iconfont icon-password"></i>
            <el-input v-model="login.password" type="password" placeholder="密码" id="password"></el-input>
          </el-form-item>
          <!-- <el-form-item size="mini">
            <el-checkbox label="记住密码" name="type"></el-checkbox>
          </el-form-item> -->
          <!-- <el-form-item class="form-control-btn item-padding">
            <el-button type="primary" @click="submitForm('form')" size="large" :loading="subLoading">提交</el-button>
          </el-form-item> -->
          <el-form-item class="form-control-btn item-padding">
            <el-button type="primary" id="btn" size="large">登录</el-button>
          </el-form-item>
          <el-form-item class=" item-padding" label="登录说明：">   
            <br>            
            <p class="notice">1.浏览器建议使用Chrome、Firefox、360极速浏览器</p>
            <p class="notice">2.分辨率建议使用1366*768以上</p>   
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="login-footer">
      <p>
        <a href="javascript:void(0);" target="_blank">© 杭州启焕网络科技有限公司</a>
        <span>版权所有</span>
      </p>
    </div>
  </div>
</template>

<script>
/* 后台登录页 */
import { toLogin } from "@/api/login/login.js";
import gtInit from "@/utils/gt";
export default {
  name: "Login",
  data() {
    return {
      subLoading: false,
      login: {
        username: "",
        password: ""
      },
      //表单验证
      rules: {
        username: [
          {
            required: true,
            validator: function(rule, value, callback) {
              var reg = /^[0-9a-zA-Z_]{1,12}$/; //1-12位数字字母下划线
              if (!value) {
                callback(new Error("用户名不能为空"));
              } else if (reg.test(value) == false) {
                callback(
                  new Error("用户名必须为数字/字母/下划线,长度不超过12位")
                );
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            validator: function(rule, value, callback) {
              var reg = /^[0-9a-zA-Z_]{3,12}$/; //3-12位数字字母下划线
              if (!value) {
                callback(new Error("密码不能为空"));
              } else if (reg.test(value) == false) {
                callback(
                  new Error("密码必须为数字/字母/下划线,长度3-12位之间")
                );
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted: function() {
    // 判断是否已登录
    this.isLogin();
    //生成canvas
    this.canvas();
    // 初始化极验
    this.gee_init();
  },
  methods: {
    //判断是否已登录
    isLogin() {
      if (window.localStorage.getItem("userInfo")) {
        if (window.localStorage.getItem("group") == 0) {
          this.$router.push(
            "/pages/system_administrators/System_Administrators"
          );
        } else {
          this.$router.push("/pages/administrators/Administrators");
        }
      }
    },
    //表单提交
    submitForm(formName) {
      var that = this;
      let data = { account: that.login.username, passwd: that.login.password };
      that.$refs[formName].validate(function(valid) {
        if (valid) {
          that.subLoading = true;
          toLogin(data).then(res => {
            that.subLoading = false;
            if (res.data.code == 200) {
              //存储用户信息
              window.localStorage.setItem(
                "userInfo",
                JSON.stringify(res.data.data.user)
              );
              //存储角色组
              window.localStorage.setItem("group", res.data.data.group.level);
              //根据角色组进入不同工作台
              if (res.data.data.group.level == 0) {
                that.$router.push(
                  "/pages/system_administrators/System_Administrators"
                );
              } else {
                that.$router.push("/pages/administrators/Administrators");
              }
            } else {
              that.$message.error(res.data.message);
            }
          });
        } else {
          that.subLoading = false;
        }
      });
    },
    // 登录页canvas动画
    canvas() {
      //定义画布宽高和生成点的个数
      var WIDTH = window.innerWidth,
        HEIGHT = document.getElementById("canvas-box").offsetHeight,
        POINT = 35;

      var canvas = document.getElementById("Mycanvas");
      (canvas.width = WIDTH), (canvas.height = HEIGHT);
      var context = canvas.getContext("2d");
      (context.strokeStyle = "rgba(255,255,255,0.4)"),
        (context.strokeWidth = 1),
        (context.fillStyle = "rgba(255,255,255,0.3)");
      var circleArr = [];

      //线条：开始xy坐标，结束xy坐标，线条透明度
      function Line(x, y, _x, _y, o) {
        (this.beginX = x),
          (this.beginY = y),
          (this.closeX = _x),
          (this.closeY = _y),
          (this.o = o);
      }
      //点：圆心xy坐标，半径，每帧移动xy的距离
      function Circle(x, y, r, moveX, moveY) {
        (this.x = x),
          (this.y = y),
          (this.r = r),
          (this.moveX = moveX),
          (this.moveY = moveY);
      }
      //生成max和min之间的随机数
      function num(max, _min) {
        var min = arguments[1] || 0;
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
      // 绘制原点
      function drawCricle(cxt, x, y, r, moveX, moveY) {
        var circle = new Circle(x, y, r, moveX, moveY);
        cxt.beginPath();
        cxt.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
        cxt.closePath();
        cxt.fill();
        return circle;
      }
      //绘制线条
      function drawLine(cxt, x, y, _x, _y, o) {
        var line = new Line(x, y, _x, _y, o);
        cxt.beginPath();
        cxt.strokeStyle = "rgba(255,255,255," + o + ")";
        cxt.moveTo(line.beginX, line.beginY);
        cxt.lineTo(line.closeX, line.closeY);
        cxt.closePath();
        cxt.stroke();
      }
      //初始化生成原点
      function init() {
        circleArr = [];
        for (var i = 0; i < POINT; i++) {
          circleArr.push(
            drawCricle(
              context,
              num(WIDTH),
              num(HEIGHT),
              num(15, 2),
              num(10, -10) / 40,
              num(10, -10) / 40
            )
          );
        }
        draw();
      }

      //每帧绘制
      function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < POINT; i++) {
          drawCricle(context, circleArr[i].x, circleArr[i].y, circleArr[i].r);
        }
        for (var i = 0; i < POINT; i++) {
          for (var j = 0; j < POINT; j++) {
            if (i + j < POINT) {
              var A = Math.abs(circleArr[i + j].x - circleArr[i].x),
                B = Math.abs(circleArr[i + j].y - circleArr[i].y);
              var lineLength = Math.sqrt(A * A + B * B);
              var C = 1 / lineLength * 7 - 0.009;
              var lineOpacity = C > 0.03 ? 0.03 : C;
              if (lineOpacity > 0) {
                drawLine(
                  context,
                  circleArr[i].x,
                  circleArr[i].y,
                  circleArr[i + j].x,
                  circleArr[i + j].y,
                  lineOpacity
                );
              }
            }
          }
        }
      }

      //调用执行
      (function() {
        init();
        setInterval(function() {
          for (var i = 0; i < POINT; i++) {
            var cir = circleArr[i];
            cir.x += cir.moveX;
            cir.y += cir.moveY;
            if (cir.x > WIDTH) cir.x = 0;
            else if (cir.x < 0) cir.x = WIDTH;
            if (cir.y > HEIGHT) cir.y = 0;
            else if (cir.y < 0) cir.y = HEIGHT;
          }
          draw();
        }, 16);
      })();
    },
    // 极验初始化
    gee_init() {
      var that = this;
      this.$http({
        method: "get",
        url: "/api/login/gee_init?t=" + new Date().getTime()
      }).then(res => {
        window.initGeetest(
          {
            gt: res.data.data.gt,
            challenge: res.data.data.challenge,
            offline: !res.data.data.success, // 表示用户后台检测极验服务器是否宕机
            new_captcha: res.data.data.new_captcha, // 用于宕机时表示是新验证码的宕机
            timeout: "5000",
            product: "bind", // 产品形式，包括：float，popup
            width: "300px"
          },
          this.handler
        );
      });
    },
    //极验二次处理函数
    handler(captchaObj) {
      var that = this;
      captchaObj
        .onReady(function() {
          $("#wait").hide();
        })
        .validate(function() {
          let bool; //对表单进行验证
          that.$refs["form"].validate(function(valid) {
            if (!valid) {
              bool = false;
            } else {
              bool = true;
            }
          });
          return bool;
        })
        .onSuccess(function() {
          var result = captchaObj.getValidate();
          if (!result) {
            return alert("请完成验证");
          }
          let data = {
            account: that.login.username,
            passwd: that.login.password,
            challenge: result.geetest_challenge,
            validate: result.geetest_validate,
            seccode: result.geetest_seccode
          };
          toLogin(data).then(res => {
            if (res.data.code == 200) {
              //存储用户信息
              window.localStorage.setItem(
                "userInfo",
                JSON.stringify(res.data.data.user)
              );
              //存储角色组
              window.localStorage.setItem("group", res.data.data.group.level);
              //根据角色组进入不同工作台
              if (res.data.data.group.level == 0) {
                that.$router.push(
                  "/pages/system_administrators/System_Administrators"
                );
              } else {
                that.$router.push("/pages/administrators/Administrators");
              }
            } else {
              captchaObj.reset();
              that.$message.error(res.data.message);
            }
          });
        });
      $("#btn").click(function() {
        captchaObj.verify();
      });
      $("#password").keyup(function(e) {
        e.keyCode == 13 && captchaObj.verify();
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
#login {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #fff;
  .login-header {
    width: 100%;
    height: 36.4vh;
    position: relative;
    overflow: hidden;
    .logo-box {
      height: 8.1vh;
      position: absolute;
      top: 11.1vh;
      left: 50%;
      -webkit-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
      -o-transform: translateX(-50%);
      transform: translateX(-50%);
    }

    img {
      width: 100%;
      height: 100%;
    }

    .logo-text {
      position: absolute;
      bottom: 4.1vh;
      left: 50%;
      -webkit-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
      -o-transform: translateX(-50%);
      transform: translateX(-50%);
    }

    .logo-text span {
      font-size: 0.6rem;
      color: #fff;
    }
  }

  .login-footer {
    width: 100%;
    height: 2.9vh;
    position: absolute;
    bottom: 0;
    p {
      width: 100%;
      font-size: 0.4rem;
      text-align: center;
      position: absolute;
      top: 50%;
      -webkit-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      -o-transform: translateY(-50%);
      transform: translateY(-50%);
    }

    a {
      color: #888;
      vertical-align: middle;
    }

    p span {
      color: #888;
      vertical-align: middle;
    }

    a:hover {
      color: #1c2a55;
    }
  }

  .logo-index {
    width: 100%;
    height: 63.6vh;
    position: relative;
    .form-container {
      width: 10rem;
      position: absolute;
      left: 50%;
      top: 6.5vh;
      -webkit-transform: translateX(-50%) translateZ(0);
      -ms-transform: translateX(-50%) translateZ(0);
      -o-transform: translateX(-50%) translateZ(0);
      transform: translateX(-50%) translateZ(0);
    }

    .form-box {
      width: 100%;
      .item-box {
        position: relative;
      }
    }

    .iconfont {
      position: absolute;
      top: 0;
      right: 0.2rem;
      color: #888;
      z-index: 999;
      font-size: 0.6rem;
    }

    .el-input__inner {
      padding-right: 30px;
    }

    .el-checkbox {
      color: #888;
      font-weight: 300;
    }

    .r-psd {
      margin-bottom: 12px !important;
    }

    .form-control-btn .el-button {
      width: 100%;
      margin-top: 20px;
    }
  }

  #Mycanvas {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
