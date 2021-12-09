<!--角色设置界面-->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body ">
        <div class="j-set-big">
          <div class="j-set-top">
            <div style="margin-bottom: 30px" v-show="menuShow">
              <div class="j-set-name">
                <label class="j-menu-name">菜单名称</label>
                <el-input v-model="menuName" placeholder="请输入菜单名称" clearable/>
              </div>
              <div class="j-set-date">
                <label class="j-menu-name">日期时间</label>
                <el-date-picker
                    v-model="date"
                    type="datetimerange"
                    :shortcuts="shortcuts"
                    range-separator="-"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                >
                </el-date-picker>
              </div>
              <div class="j-set-button">
                <el-button type="primary">
                  <svg t="1639013390453" class="icon" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" p-id="2683" width="17" height="17">
                    <path
                        d="M912.072815 946.738335c-4.78498 0-9.56996-1.824555-13.220093-5.475711L650.662083 693.076078c-0.285502-0.285502-0.561795-0.579191-0.827855-0.883113l-6.979972-7.948019c-6.671956-7.594979-6.096858-19.11843 1.297552-26.012444 32.130791-29.958312 57.424874-65.413825 75.181283-105.379049 18.374486-41.35692 27.691689-85.472674 27.691689-131.122363 0-86.355787-33.628912-167.542854-94.691639-228.604558-61.062727-61.062727-142.249795-94.691639-228.604558-94.691639s-167.541831 33.628912-228.604558 94.691639c-61.062727 61.062727-94.691639 142.249795-94.691639 228.604558s33.628912 167.542854 94.691639 228.604558c61.062727 61.062727 142.249795 94.691639 228.604558 94.691639 26.15059 0 52.16508-3.130294 77.326133-9.301853 5.090948-1.353834 73.4038-19.189038 120.842229-14.809287 10.282181 0.948605 17.847483 10.05296 16.899902 20.335141s-10.047844 17.853623-20.335141 16.899902c-41.659819-3.845585-107.272165 13.571087-107.930151 13.747095-0.125867 0.033769-0.251733 0.065492-0.3776 0.097214-28.132734 6.91755-57.20998 10.425444-86.425372 10.425444-48.684816 0-95.922676-9.538237-140.402727-28.352745-42.953278-18.166755-81.523735-44.172035-114.644063-77.290317-33.119305-33.119305-59.123562-71.691809-77.29134-114.644063-18.813484-44.479027-28.352745-91.716888-28.352745-140.401704s9.53926-95.922676 28.352745-140.402727c18.167778-42.953278 44.172035-81.524758 77.29134-114.644063 33.119305-33.119305 71.690786-59.123562 114.644063-77.29134 44.480051-18.813484 91.717911-28.352745 140.402727-28.352745s95.922676 9.53926 140.401704 28.352745c42.953278 18.167778 81.524758 44.173059 114.644063 77.29134 33.118282 33.119305 59.123562 71.690786 77.29134 114.644063 18.813484 44.480051 28.351722 91.717911 28.351722 140.402727 0 50.912553-10.399861 100.136651-30.91101 146.305157-17.285688 38.906102-40.96704 73.973782-70.526263 104.47547l242.313791 242.310721c7.302313 7.30129 7.302313 19.138896 0.001023 26.440186C921.642774 944.912757 916.857794 946.738335 912.072815 946.738335z"
                        p-id="2684" fill="#fafcff"></path>
                    <path
                        d="M165.576059 421.887656c-0.696872 0-1.400906-0.038886-2.110057-0.118704-10.260691-1.152243-17.645892-10.404977-16.493649-20.666692 4.838192-43.080168 17.974373-83.934644 39.046295-121.429607 5.058203-9.002025 16.457834-12.19781 25.458835-7.139607 9.002025 5.058203 12.19781 16.45681 7.139607 25.458835-18.605753 33.108049-30.207999 69.202105-34.484396 107.282399C183.060269 414.827867 174.967964 421.887656 165.576059 421.887656z"
                        p-id="2685" fill="#fafcff"></path>
                  </svg>
                  搜索
                </el-button>
                <el-button style="color: #606266" @click="menuName='',date=[]">
                  <svg t="1639014771399" class="icon" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" p-id="4267" width="17" height="17">
                    <path
                        d="M197.7088 478.72l39.68-39.168a19.2 19.2 0 1 1 26.9824 27.2896l-73.344 72.448a19.2 19.2 0 0 1-26.9824 0l-75.136-74.24A19.2 19.2 0 1 1 115.8912 437.76l43.0592 42.5472C175.616 300.6464 326.7328 160 510.72 160c195.1232 0 353.28 158.1568 353.28 353.28 0 195.1232-158.1568 353.28-353.28 353.28a352.0512 352.0512 0 0 1-242.0224-95.9232 19.2 19.2 0 1 1 26.2912-27.9808 313.6768 313.6768 0 0 0 215.7312 85.504c173.9008 0 314.88-140.9792 314.88-314.88 0-173.9008-140.9792-314.88-314.88-314.88-162.2272 0-295.808 122.6752-313.0112 280.32z"
                        fill="#606266" p-id="4268"></path>
                  </svg>
                  重置
                </el-button>
              </div>
            </div>
            <div class="j-set-top-bottom">
              <el-button type="primary" >
                <svg t="1639015562660" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="5342" width="17" height="17">
                  <path
                      d="M792.2 491.3H532.8V231.9c0-11.3-9.2-20.5-20.5-20.5s-20.5 9.2-20.5 20.5v259.4H232.4c-11.3 0-20.5 9.2-20.5 20.5s9.2 20.5 20.5 20.5h259.4v259.4c0 11.3 9.2 20.5 20.5 20.5s20.5-9.2 20.5-20.5V532.3h259.4c11.3 0 20.5-9.2 20.5-20.5-0.1-11.3-9.2-20.5-20.5-20.5z"
                      fill="#fdfdfd" p-id="5343"></path>
                </svg>
                新增
              </el-button>
              <el-button type="info">
                <svg t="1639016365538" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="17305" width="17" height="17">
                  <path
                      d="M618.666667 157.866667l179.2 179.2-29.866667 29.866666-149.333333-149.333333v669.866667h-42.666667V115.2l42.666667 42.666667z m-213.333334 682.666666l-179.2-179.2 29.866667-29.866666 149.333333 149.333333V115.2h42.666667v763.733333l-42.666667-38.4z"
                      fill="#fdfdfd" p-id="17306"></path>
                </svg>
                展开/折叠
              </el-button>
              <div class="top-search" @click="menuShow==true?menuShow=false:menuShow=true">
                <el-tooltip
                    class="item"
                    effect="dark"
                    :content="menuShow==true?'隐藏搜索':'显示搜索'"
                    placement="top"
                >
                  <el-button style="color: #606266">
                    <svg t="1639013390453" class="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="2683" width="17" height="17">
                      <path
                          d="M912.072815 946.738335c-4.78498 0-9.56996-1.824555-13.220093-5.475711L650.662083 693.076078c-0.285502-0.285502-0.561795-0.579191-0.827855-0.883113l-6.979972-7.948019c-6.671956-7.594979-6.096858-19.11843 1.297552-26.012444 32.130791-29.958312 57.424874-65.413825 75.181283-105.379049 18.374486-41.35692 27.691689-85.472674 27.691689-131.122363 0-86.355787-33.628912-167.542854-94.691639-228.604558-61.062727-61.062727-142.249795-94.691639-228.604558-94.691639s-167.541831 33.628912-228.604558 94.691639c-61.062727 61.062727-94.691639 142.249795-94.691639 228.604558s33.628912 167.542854 94.691639 228.604558c61.062727 61.062727 142.249795 94.691639 228.604558 94.691639 26.15059 0 52.16508-3.130294 77.326133-9.301853 5.090948-1.353834 73.4038-19.189038 120.842229-14.809287 10.282181 0.948605 17.847483 10.05296 16.899902 20.335141s-10.047844 17.853623-20.335141 16.899902c-41.659819-3.845585-107.272165 13.571087-107.930151 13.747095-0.125867 0.033769-0.251733 0.065492-0.3776 0.097214-28.132734 6.91755-57.20998 10.425444-86.425372 10.425444-48.684816 0-95.922676-9.538237-140.402727-28.352745-42.953278-18.166755-81.523735-44.172035-114.644063-77.290317-33.119305-33.119305-59.123562-71.691809-77.29134-114.644063-18.813484-44.479027-28.352745-91.716888-28.352745-140.401704s9.53926-95.922676 28.352745-140.402727c18.167778-42.953278 44.172035-81.524758 77.29134-114.644063 33.119305-33.119305 71.690786-59.123562 114.644063-77.29134 44.480051-18.813484 91.717911-28.352745 140.402727-28.352745s95.922676 9.53926 140.401704 28.352745c42.953278 18.167778 81.524758 44.173059 114.644063 77.29134 33.118282 33.119305 59.123562 71.690786 77.29134 114.644063 18.813484 44.480051 28.351722 91.717911 28.351722 140.402727 0 50.912553-10.399861 100.136651-30.91101 146.305157-17.285688 38.906102-40.96704 73.973782-70.526263 104.47547l242.313791 242.310721c7.302313 7.30129 7.302313 19.138896 0.001023 26.440186C921.642774 944.912757 916.857794 946.738335 912.072815 946.738335z"
                          p-id="2684" fill="#606266"></path>
                      <path
                          d="M165.576059 421.887656c-0.696872 0-1.400906-0.038886-2.110057-0.118704-10.260691-1.152243-17.645892-10.404977-16.493649-20.666692 4.838192-43.080168 17.974373-83.934644 39.046295-121.429607 5.058203-9.002025 16.457834-12.19781 25.458835-7.139607 9.002025 5.058203 12.19781 16.45681 7.139607 25.458835-18.605753 33.108049-30.207999 69.202105-34.484396 107.282399C183.060269 414.827867 174.967964 421.887656 165.576059 421.887656z"
                          p-id="2685" fill="#606266"></path>
                    </svg>
                  </el-button>
                </el-tooltip>
              </div>
              <div class="top-reset">
                <el-tooltip
                    class="item"
                    effect="dark"
                    content="刷新"
                    placement="top"
                >
                  <el-button style="color: #606266;">
                    <svg t="1639014771399" class="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="4267" width="17" height="17">
                      <path
                          d="M197.7088 478.72l39.68-39.168a19.2 19.2 0 1 1 26.9824 27.2896l-73.344 72.448a19.2 19.2 0 0 1-26.9824 0l-75.136-74.24A19.2 19.2 0 1 1 115.8912 437.76l43.0592 42.5472C175.616 300.6464 326.7328 160 510.72 160c195.1232 0 353.28 158.1568 353.28 353.28 0 195.1232-158.1568 353.28-353.28 353.28a352.0512 352.0512 0 0 1-242.0224-95.9232 19.2 19.2 0 1 1 26.2912-27.9808 313.6768 313.6768 0 0 0 215.7312 85.504c173.9008 0 314.88-140.9792 314.88-314.88 0-173.9008-140.9792-314.88-314.88-314.88-162.2272 0-295.808 122.6752-313.0112 280.32z"
                          fill="#606266" p-id="4268"></path>
                    </svg>
                  </el-button>
                </el-tooltip>
              </div>
            </div>
          </div>
          <div class="j-set-bottom">
            <el-table
                :data="tableData"
                style="width: 100%; margin-bottom: 20px"
                row-key="id"
                border
                default-expand-all
            >
              <el-table-column prop="date" label="date" sortable width="180" />
              <el-table-column prop="name" label="Name" sortable width="180" />
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //输入的菜单名称值
      menuName: '',
      shortcuts: [
        {
          text: '过去一周',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
          },
        },
        {
          text: '过去一个月',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
          },
        },
        {
          text: '过去三个月',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
          },
        },
      ],
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      //日期选择器值
      date: [],
      //显示隐藏菜单
      menuShow:true,
      tableData: [
        {
          id: 1,
          date: '2016-05-02',
          name: 'wangxiaohu',
        },
        {
          id: 2,
          date: '2016-05-04',
          name: 'wangxiaohu',
        },
        {
          id: 3,
          date: '2016-05-01',
          name: 'wangxiaohu',
          children: [
            {
              id: 31,
              date: '2016-05-01',
              name: 'wangxiaohu',
            },
            {
              id: 32,
              date: '2016-05-01',
              name: 'wangxiaohu',
            },
          ],
        },
        {
          id: 4,
          date: '2016-05-03',
          name: 'wangxiaohu',
        },
      ],
    }
  },
  methods: {
    load(row, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: '2016-05-01',
            name: 'wangxiaohu',
          },
          {
            id: 32,
            date: '2016-05-01',
            name: 'wangxiaohu',
          },
        ])
      }, 1000)
    },
  },

}

</script>

<style scoped>
@import url("../css/navigation.css");
.j-set-big {
  margin: 20px;
  border: 1px saddlebrown solid;
}

.j-set-top {
  margin: 10px;
  border: 1px #ff8257 solid;
}

.j-set-bottom {
  margin: 0px 10px 0px 10px;
  border: 1px #0c9c6e solid;
}

.j-menu-name {
  color: #606266;
  vertical-align: middle;
  text-align: right;
  padding: 0 12px 0 0;
  box-sizing: border-box;
  font-weight: 700;
}

.j-set-name {
  display: inline-block;
  min-width: 23%
}

.j-set-date {
  display: inline-block;
  min-width: 38%;
}

.j-set-name .el-input {
  display: inline-block;
  width: 70%;
}

/deep/ .j-set-name .el-input input {
  height: 32px;
}

/deep/ .el-range-editor.el-input__inner {
  display: inline-block;
}

/deep/ .el-icon {
  display: none;
}

/deep/ .el-range-editor.el-input__inner {
  position: relative;
  height: 32px;
  top: 7px;
}

/deep/ .el-range-editor.el-input__inner .el-range-input {
  position: relative;
  top: -7px;
}

/deep/ .j-set-top .el-button {
  min-height: 32px !important;
  height: 32px;
  padding: 1px 20px;
  position: relative;
  top: 2px;
}

/deep/ .el-range-editor.el-input__inner .el-range-separator {
  position: relative;
  top: -8px;
}

.el-button--primary .icon {
  position: relative;
  top: 3px;
}

.el-button--info .icon {
  position: relative;
  top: 3px;
}

.j-set-button {
  display: inline-block;
  min-width: 35%;
}

.j-set-button .el-button--primary {
  margin-right: 10px;
}

.j-set-button .el-button--default .icon {
  position: relative;
  top: 3px
}

.j-set-top-bottom .el-button--primary {
  margin-right: 10px;
}

.j-set-top-bottom .el-button--info {
  margin-right: 74.5%;
}

/deep/ .j-set-top-bottom .el-button--default {
  border-radius: 50%;
  width: 30px !important;
  height: 20px !important;
  padding: 0 !important;
}

.j-set-top-bottom {
  margin-bottom: 10px;
}
.top-search{
  display: inline-block;
  margin-right: 10px;
  text-align: center;
}
.top-reset{
  display: inline-block;
  text-align: center;
}
</style>