<template>
  <dd class="user_icon">
    <input type="text" placeholder="账号" class="login_txtbx" v-model="name"/>
  </dd>
  <dd class="pwd_icon">
    <input type="password" placeholder="密码" class="login_txtbx" v-model="pass" @keyup.enter="submit"/>
  </dd>
  <dd>
    <input type="button" value="点击登录" class="submit_btn" @click="submit"/>
  </dd>
  <dd>
    <p>© 版权所有</p>
  </dd>
</template>
<script>
import {ElNotification} from 'element-plus'
import {ElLoading} from 'element-plus';
/*import.meta.glob添加页面可以自动生成映射关系，而不用手动添加,生成类似如下对象
Object { "../components/HelloWorld.vue": vue(), "../components/LoginView.vue": vue())
这样作后，在动态生态菜单时可以直接component:modules[`${comp}`]，comp是从后台读取的组件路径，这里
则正好对应上modules中对象的键，如"../components/HelloWorld.vue"
*/
const modules = import.meta.glob('../../../components/**/*.vue');
export default {
  data() {
    return {
      //访问地址
      url: "http://localhost:80/",
      //手机号码
      name: "",
      //密码
      pass: "",
      //IP地址
      ip: "",
      //ip所在地
      ipName: "",
      //浏览器名称
      browserName: "",
      //设备类型
      deviceType: "",
      //菜单列表
      memuList1: [],
      memuList2: [],
      oo:[],
    }
  }, methods: {
    //点击登录操作
    submit() {
      //如果账号为空
      if (this.name == "" || this.name == null || this.name == undefined) {
        ElNotification.warning({
          title: '提示',
          message: "请输入账号",
          offset: 100,
        })
        //如果密码为空
      } else if (this.pass == "" || this.pass == null || this.pass == undefined) {
        ElNotification.warning({
          title: '提示',
          message: "请输入密码",
          offset: 100,
        })
        //如果账号格式有误
      } else if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.name))) {
        ElNotification.warning({
          title: '提示',
          message: "请输入正确的手机号码",
          offset: 100,
        })
        //如果密码格式有误
      } else if (!(/^(\w){6,20}$/.test(this.pass))) {
        ElNotification.warning({
          title: '提示',
          message: "密码由6-20个字母、数字、下划线组成",
          offset: 100,
        })
      } else {
        //访问后台
        this.axios({
          method: 'post',
          url: this.url + 'login',
          data: {
            "phone": this.name,
            "pass": this.pass,
            "ip": this.ip,
            "ipName": this.ipName,
            "browserName": this.browserName,
            "deviceType": this.deviceType
          },
          responseType: 'json',
          responseEncoding: 'utf-8',
        }).then((response) => {
          //如果服务关闭
          if (response.data.data.data) {
            ElNotification.warning({
              title: '提示',
              message: "服务发生关闭",
              offset: 100,
            })

            //如果服务没有关闭
          } else if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state == 200) {
              //如果有数据
              if (response.data.data.succeed) {
                //如果数据里面有员工信息
                if (response.data.data.succeed.staffName) {
                  //获取后台传过来的数据
                  let value = response.data.data.succeed;
                  //读取需要的数据形成对象
                  let obj = {
                    //员工编号
                    "staffId": value.staffId,
                    //员工名称
                    "staffName": value.staffName,
                    //员工手机号
                    "staffPhone": value.staffPhone,
                    //员工性别
                    "staffSex": value.staffSex,
                    //员工照片地址
                    "staffPicture": value.staffPicture,
                    //员工学历
                    "staffEducation": value.staffEducation,
                    //员工政治面貌
                    "staffOutlook": value.staffOutlook,
                    //部门职位编号
                    "deptPostId": value.deptPostId,
                    //部门编号
                    "deptId":value.deptId,
                  }
                  //将形成的对象存放起来
                  this.$store.commit("staffInfo", obj);
                  this.$store.commit("updateMenuList", response.data.data.menuList);
                  this.menu(this.$store.state.memuList);

                  let ou = {
                    path: "/home",
                    component: modules[`${'../../../components/navigation.vue'}`],
                    redirect: '',
                    children: []
                  }
                  this.memuList2.push(ou);
                  //循环菜单列表找出根节点
                  for (let i = 0; i < this.memuList1.length; i++) {
                    if (this.memuList1[i].menuPowerPid == 0 && this.memuList1[i].menuPowerType == 0) {
                      if (i==0){
                        this.memuList2[0].redirect=this.memuList1[i].menuPowerRoute;
                      }
                      let op ={
                        path:this.memuList1[i].menuPowerRoute,
                        id:this.memuList1[i].menuPowerId,
                        component:modules[`${'../components'+this.memuList1[i].menuPowerModule+'.vue'}`],
                        redirect:'',
                        children:[],
                      }
                      this.memuList2[0].children.push(op);
                    }
                  }
                  //为根菜单设置子菜单，getClild是递归调用的
                  for (let j = 0; j < this.memuList2[0].children.length; j++) {
                    /* 获取根节点下的所有子节点 使用getChild方法*/
                    this.getChild(this.memuList2[0].children[j].id, this.memuList1);
                    //给根节点设置子节点
                    if (this.oo != null) {
                      for (let i = 0; i < this.oo.length; i++) {
                        if (this.oo[i].menuPowerLeaf == 1) {
                          if (i==0){
                            this.memuList2[0].children[j].redirect=this.oo[i].menuPowerRoute;
                          }
                          let op ={
                            path:this.oo[i].menuPowerRoute,
                            component:modules[`${'../../../components'+this.oo[i].menuPowerModule+'.vue'}`],
                          }
                          this.memuList2[0].children[j].children.push(op);
                        }
                      }
                      this.oo=[];
                    }
                  }
                  console.log(this.memuList1);
                  console.log(this.memuList2);

                  // this.$router.addRoute(this.memuList2);
                  this.$store.commit("updateRouter", this.memuList2);
                  //跳转可以
                  // this.$router.push({path: '/home', replace: true})
                }
                //如果数据里面没有员工信息
                else {
                  ElNotification.warning({
                    title: '提示',
                    message: "请" + response.data.data.succeed + "分钟后再试",
                    offset: 100,
                  })
                }
              }
              //如果没有数据
              else {
                ElNotification.warning({
                  title: '提示',
                  message: "账号或密码错误",
                  offset: 100,
                })
              }
            }
            //如果服务是雪崩的
            else {
              ElNotification.warning({
                title: '提示',
                message: "服务发生雪崩",
                offset: 100,
              })
            }
          }
        })
      }
    },    //递归菜单
    menu(val) {
      for (let i = 0; i < val.length; i++) {
        if (val[i].menuPowerType == 0 && val[i].menuPowerLeaf == 1) {
          let op = {
            menuPowerId: val[i].menuPowerId,
            menuPowerLeaf: val[i].menuPowerLeaf,
            menuPowerModule: val[i].menuPowerModule,
            menuPowerName: val[i].menuPowerName,
            menuPowerOrder: val[i].menuPowerOrder,
            menuPowerPid: val[i].menuPowerPid,
            menuPowerRoute: val[i].menuPowerRoute,
            menuPowerState: val[i].menuPowerState,
            menuPowerType: val[i].menuPowerType,
            pictureAddress: val[i].pictureAddress,
            revision: val[i].revision,
            updatedTime: val[i].updatedTime,
            createdTime: val[i].createdTime,
            isDeleted: val[i].isDeleted,
            list: [],
          }
          this.memuList1.push(op)
        } else if (val[i].menuPowerType == 0 && val[i].menuPowerLeaf == 0) {
          let op = {
            menuPowerId: val[i].menuPowerId,
            menuPowerLeaf: val[i].menuPowerLeaf,
            menuPowerModule: val[i].menuPowerModule,
            menuPowerName: val[i].menuPowerName,
            menuPowerOrder: val[i].menuPowerOrder,
            menuPowerPid: val[i].menuPowerPid,
            menuPowerRoute: val[i].menuPowerRoute,
            menuPowerState: val[i].menuPowerState,
            menuPowerType: val[i].menuPowerType,
            pictureAddress: val[i].pictureAddress,
            revision: val[i].revision,
            updatedTime: val[i].updatedTime,
            createdTime: val[i].createdTime,
            isDeleted: val[i].isDeleted,
            list: [],
          }
          this.memuList1.push(op)
          this.menu(val[i].list);
        }
      }
    }, getChild(id, val) {
      let op=[];
      //子菜单
      for (let i = 0; i < val.length; i++) {
        // 遍历所有节点，将所有菜单的父id与传过来的根节点的id比较
        //相等说明：为该根节点的子节点。
        if (val[i].menuPowerPid == id && val[i].menuPowerType == 0) {
            op.push(val[i]);
        }
      }
      //递归
      for (let j = 0; j < op.length; j++) {
        this.oo.push(op[j]);
        op.list = this.getChild(op[j].menuPowerId, val);
      }
      //如果节点下没有子节点，返回一个空List（递归退出）
      if (op.length == 0) {
        return null;
      }
      return op;
    }

  }, mounted() {
    //ip地址
    this.ip = returnCitySN['cip'];
    //ip所在地
    this.ipName = returnCitySN['cname'];
    //浏览器名称
    let u = navigator.userAgent
    if (/sogousearch/i.test(u)) {
      this.browserName = "sogousearch";
    } else if (/MicroMessenger/i.test(u)) {
      this.browserName = "wechat";
    } else if (!!u.match(/Weibo/i)) {
      this.browserName = "Weibo";
    } else if (!!u.match(/UCBrowser/i) || u.indexOf(' UBrowser') > -1) {
      this.browserName = "UCBrowser";
    } else if (u.indexOf('MetaSr') > -1 || u.indexOf('Sogou') > -1) {
      this.browserName = "Sogou";
    } else if (u.indexOf('MiuiBrowser') > -1) {
      this.browserName = "MiuiBrowser";
    } else if (u.indexOf('Baidu') > -1 || u.indexOf('BIDUBrowser') > -1) {
      this.browserName = "Baidu";
    } else if (u.indexOf('360EE') > -1 || u.indexOf('360SE') > -1) {
      this.browserName = "360EE";
    } else if (u.indexOf('2345Explorer') > -1) {
      this.browserName = "2345Explorer";
    } else if (u.indexOf('Edge') > -1) {
      this.browserName = "Edge";
    } else if (u.indexOf('Trident') > -1 && u.indexOf('rv:11.0') > -1) {
      this.browserName = "ie11";
    } else if (u.indexOf('compatible') > -1 && u.indexOf('MSIE') > -1) {
      this.browserName = "ie";
    } else if (u.indexOf('Firefox') > -1) {
      this.browserName = "Firefox";
    } else if (u.indexOf('Safari') > -1 && u.indexOf('Chrome') === -1) {
      this.browserName = "Safari";
    } else if (u.indexOf('MQQBrowser') > -1 && u.indexOf(' QQ') === -1) {
      this.browserName = "MQQBrowser";
    } else if (u.indexOf('QQ') > -1) {
      this.browserName = "QQ";
    } else if (u.indexOf('Chrome') > -1 || u.indexOf('CriOS') > -1) {
      this.browserName = "Chrome";
    } else if (u.indexOf('Opera') > -1 || u.indexOf('OPR') > -1) {
      this.browserName = "Opera";
    }
    //设备类型
    if (!!u.match(/compatible/i) || u.match(/Windows/i)) {
      this.deviceType = 'windows';
    } else if (!!u.match(/Macintosh/i) || u.match(/MacIntel/i)) {
      this.deviceType = 'macOS';
    } else if (!!u.match(/iphone/i) || u.match(/Ipad/i)) {
      this.deviceType = 'ios';
    } else if (!!u.match(/android/i)) {
      this.deviceType = 'android';
    } else {
      this.deviceType = 'other';
    }
  }

}

</script>

<style scoped>
@import "../../../css/begin/rest/passLogin.css";
</style>