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
              <el-button type="primary"
                         @click="this.insertMenu=true,this.boxName='新增菜单',this.ruleForm.previousMenu='主类目'">
                <svg t="1639015562660" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="5342" width="17" height="17">
                  <path
                      d="M792.2 491.3H532.8V231.9c0-11.3-9.2-20.5-20.5-20.5s-20.5 9.2-20.5 20.5v259.4H232.4c-11.3 0-20.5 9.2-20.5 20.5s9.2 20.5 20.5 20.5h259.4v259.4c0 11.3 9.2 20.5 20.5 20.5s20.5-9.2 20.5-20.5V532.3h259.4c11.3 0 20.5-9.2 20.5-20.5-0.1-11.3-9.2-20.5-20.5-20.5z"
                      fill="#fdfdfd" p-id="5343"></path>
                </svg>
                新增
              </el-button>
              <el-button type="info" @click="handle">
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
                v-if="refreshTable"
                :data="tableData"
                style="width: 100%; margin-bottom: 20px;"
                :header-cell-style="{textAlign: 'center',background:'#F0F0F0',color:'#6C6C6C'}"
                row-key="MENU_ID"
                :default-expand-all="expands"
                @expand-change="expands=true"
            >
              <el-table-column prop="MENU_NAME" label="菜单名称" min-width="200"/>
              <el-table-column prop="MENU_MODULE" label="图标" min-width="130"/>
              <el-table-column prop="MENU_ORDER" label="排序" min-width="100"/>
              <el-table-column prop="MENU_ROUTE" label="组件路径" min-width="200"/>
              <el-table-column label="状态" min-width="150">
                <template #default="scope">
                  <span class="button-enable" v-if="scope.row.MENU_STATE==0">启用</span>
                  <span class="button-forbidden" v-if="scope.row.MENU_STATE==1">禁用</span>
                </template>
              </el-table-column>
              <el-table-column prop="CREATED_TIME" label="创建时间" min-width="220"/>
              <el-table-column label="操作" min-width="180">
                <template #default="scope">
                  <el-button type="text"
                             @click="this.insertMenu=true,this.boxName='修改菜单',this.ruleForm.previousMenu=scope.row.MENU_NAME">
                    <svg t="1639052797619" class="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="9054" width="12" height="12">
                      <path
                          d="M684.203 117.248c15.893-15.872 42.154-15.36 58.922 1.408l90.518 90.517c16.661 16.662 17.344 42.987 1.429 58.923L389.419 713.749c-7.936 7.915-23.104 16.747-34.219 19.776L211.499 772.78c-21.91 5.994-35.115-7.104-29.568-28.95l37.248-146.773c2.773-10.944 11.562-26.347 19.392-34.176l445.653-445.653zM268.736 593.067c-2.901 2.901-8.107 12.074-9.13 16.021l-29.12 114.773 111.957-30.57c4.437-1.216 13.632-6.55 16.81-9.728l445.654-445.654-90.518-90.496-445.653 445.654z m414.059-414.08l90.517 90.517-30.187 30.187-90.496-90.518 30.166-30.165zM320.768 541.035l90.496 90.517-30.165 30.165-90.518-90.496 30.166-30.186zM170.667 874.667c0-11.776 9.429-21.334 21.461-21.334h661.077a21.333 21.333 0 1 1 0 42.667H192.128a21.333 21.333 0 0 1-21.461-21.333z"
                          p-id="9055" fill="#409eff"></path>
                    </svg>
                    修改
                  </el-button>
                  <el-button type="text"
                             @click="this.insertMenu=true,this.boxName='新增菜单',this.ruleForm.previousMenu=scope.row.MENU_NAME">
                    <svg t="1639053259858" class="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="11914" width="12" height="12">
                      <path
                          d="M548 476h376c19.882 0 36 16.118 36 36s-16.118 36-36 36H548v376c0 19.882-16.118 36-36 36s-36-16.118-36-36V548H100c-19.882 0-36-16.118-36-36s16.118-36 36-36h376V100c0-19.882 16.118-36 36-36s36 16.118 36 36v376z"
                          p-id="11915" fill="#409eff"></path>
                    </svg>
                    新增
                  </el-button>
                  <el-button type="text" @click="deleteMenu(scope.row.MENU_NAME)">
                    <svg t="1639053106665" class="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="10997" width="12" height="12">
                      <path
                          d="M607.897867 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L575.903242 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 351.94087C639.892491 753.593818 625.61532 768.043004 607.897867 768.043004z"
                          p-id="10998" fill="#409eff"></path>
                      <path
                          d="M415.930119 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L383.935495 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625 17.717453 0 31.994625 14.277171 31.994625 31.994625l0 351.94087C447.924744 753.593818 433.647573 768.043004 415.930119 768.043004z"
                          p-id="10999" fill="#409eff"></path>
                      <path
                          d="M928.016126 223.962372l-159.973123 0L768.043004 159.973123c0-52.980346-42.659499-95.983874-95.295817-95.983874L351.94087 63.989249c-52.980346 0-95.983874 43.003528-95.983874 95.983874l0 63.989249-159.973123 0c-17.717453 0-31.994625 14.277171-31.994625 31.994625s14.277171 31.994625 31.994625 31.994625l832.032253 0c17.717453 0 31.994625-14.277171 31.994625-31.994625S945.73358 223.962372 928.016126 223.962372zM319.946246 159.973123c0-17.545439 14.449185-31.994625 31.994625-31.994625l320.806316 0c17.545439 0 31.306568 14.105157 31.306568 31.994625l0 63.989249L319.946246 223.962372 319.946246 159.973123 319.946246 159.973123z"
                          p-id="11000" fill="#409eff"></path>
                      <path
                          d="M736.048379 960.010751 288.123635 960.010751c-52.980346 0-95.983874-43.003528-95.983874-95.983874L192.139761 383.591466c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 480.435411c0 17.717453 14.449185 31.994625 31.994625 31.994625l448.096758 0c17.717453 0 31.994625-14.277171 31.994625-31.994625L768.215018 384.795565c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 479.231312C832.032253 916.835209 789.028725 960.010751 736.048379 960.010751z"
                          p-id="11001" fill="#409eff"></path>
                    </svg>
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--  新增菜单弹出框-->
  <el-dialog
      v-model="insertMenu"
      :title="this.boxName"
      width="50%"
      destroy-on-close
      left
  >
    <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        inline="true"
    >
      <el-form-item label="上级菜单" prop="previousMenu" style="margin-bottom: 25px">
        <el-input v-model="ruleForm.previousMenu" style="width: 203px" disabled></el-input>
      </el-form-item>
      <el-form-item label="菜单名称" prop="menuName" style="margin-bottom: 25px">
        <el-select v-model="ruleForm.menuName" slot="prepend" style="width: 203px"
                   filterable
                   allow-create
                   default-first-option>
          <el-option label="公交" value="2"></el-option>
          <el-option label="地铁" value="3"></el-option>
          <el-option label="高铁" value="4"></el-option>
          <el-option label="其他" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单类型" prop="menuType" class="insert_menuType" style="margin-bottom: 25px">
        <el-radio-group v-model="ruleForm.menuType">
          <el-radio label="目录" style="margin: 10px"></el-radio>
          <el-radio label="菜单" style="margin: 10px"></el-radio>
          <el-radio label="按钮" style="margin: 10px"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单状态" prop="menuState" class="insert_menuState" style="margin-bottom: 25px">
        <el-switch v-model="ruleForm.menuState" active-text="禁用" inactive-text="启用"/>
      </el-form-item>
      <el-form-item label="菜单图标" prop="menuImage" style="margin-bottom: 25px">
        <el-select v-model="ruleForm.menuImage" slot="prepend" style="width: 535px"
                   filterable
                   allow-create
                   default-first-option>
          <el-option label="公交" value="2"></el-option>
          <el-option label="地铁" value="3"></el-option>
          <el-option label="高铁" value="4"></el-option>
          <el-option label="其他" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="路由地址" prop="menuRouter" style="margin-bottom: 25px">
        <el-select v-model="ruleForm.menuRouter" slot="prepend" style="width: 535px"
                   filterable
                   allow-create
                   default-first-option
        >
          <el-option label="公交" value="2"></el-option>
          <el-option label="地铁" value="3"></el-option>
          <el-option label="高铁" value="4"></el-option>
          <el-option label="其他" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="组件地址" prop="menuModule" style="margin-bottom: 25px">
        <el-select v-model="ruleForm.menuModule" slot="prepend" style="width: 535px"
                   filterable
                   allow-create
                   default-first-option
                   max-height="100px"
        >
          <el-option label="公交" value="2"></el-option>
          <el-option label="地铁" value="3"></el-option>
          <el-option label="高铁" value="4"></el-option>
          <el-option label="其他" value="5"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {ElMessageBox, ElMessage} from 'element-plus'

export default {
  data() {
    return {
      //弹出框名称
      boxName: '',
      ruleForm: {
        //上级菜单名称
        previousMenu: '',
        //菜单名称
        menuName: '',
        //菜单类型
        menuType: '目录',
        //菜单状态
        menuState: false,
        //菜单图标
        menuImage: '',
        //菜单路由
        menuRouter: '',
        //菜单组件
        menuModule: ''
      },
      rules: {

        //菜单名称
        menuName: [
          {
            required: true,
            message: '菜单名称不能为空',
            trigger: 'change',
          }
        ],
        //菜单图标
        menuImage: [
          {
            required: true,
            message: '图标地址不能为空',
            trigger: 'change',
          }
        ],
        //菜单路由
        menuRouter: [
          {
            required: true,
            message: '路由地址不能为空',
            trigger: 'change',
          }
        ],
        //菜单组件
        menuModule: [
          {
            required: true,
            message: '组件地址不能为空',
            trigger: 'change',
          }
        ]
      },
      //新增菜单弹出框
      insertMenu: false,
      one: "",
      //一键展开收缩菜单
      expands: false,
      //渲染展开菜单
      refreshTable: true,
      //输入的菜单名称值
      menuName: '',
      //日期选择组件
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
      menuShow: true,
      //表格数据
      tableData: [
        {
          MENU_ID: 1,
          MENU_NAME: '工作台',
          MENU_MODULE: '',
          MENU_ORDER: 1,
          MENU_ROUTE: '',
          MENU_STATE: 0,
          CREATED_TIME: '2016-05-02'
        },
        {
          MENU_ID: 2,
          MENU_NAME: '组织管理',
          MENU_MODULE: '',
          MENU_ORDER: 2,
          MENU_ROUTE: '',
          MENU_STATE: 0,
          CREATED_TIME: '2016-05-04',
        },
        {
          MENU_ID: 3,
          MENU_NAME: '员工管理',
          MENU_MODULE: '',
          MENU_ORDER: 3,
          MENU_ROUTE: '',
          MENU_STATE: 0,
          CREATED_TIME: '2016-05-01',
          children: [
            {
              MENU_ID: 31,
              MENU_NAME: '员工信息',
              MENU_MODULE: '',
              MENU_ORDER: 1,
              MENU_ROUTE: '',
              MENU_STATE: 0,
              CREATED_TIME: '2016-05-01',
              children: [
                {
                  MENU_ID: 33,
                  MENU_NAME: '员工花名册',
                  MENU_MODULE: '',
                  MENU_ORDER: 1,
                  MENU_ROUTE: '',
                  MENU_STATE: 0,
                  CREATED_TIME: '2016-05-01'
                },
                {
                  MENU_ID: 34,
                  MENU_NAME: '人才展示',
                  MENU_MODULE: '',
                  MENU_ORDER: 2,
                  MENU_ROUTE: '',
                  MENU_STATE: 0,
                  CREATED_TIME: '2016-05-01'
                },
                {
                  MENU_ID: 35,
                  MENU_NAME: '人才统计',
                  MENU_MODULE: '',
                  MENU_ORDER: 3,
                  MENU_ROUTE: '',
                  MENU_STATE: 1,
                  CREATED_TIME: '2016-05-01'
                },
                {
                  MENU_ID: 36,
                  MENU_NAME: '员工审核',
                  MENU_MODULE: '',
                  MENU_ORDER: 4,
                  MENU_ROUTE: '',
                  MENU_STATE: 0,
                  CREATED_TIME: '2016-05-01'
                },
                {
                  MENU_ID: 37,
                  MENU_NAME: '历史花名册',
                  MENU_MODULE: '',
                  MENU_ORDER: 5,
                  MENU_ROUTE: '',
                  MENU_STATE: 0,
                  CREATED_TIME: '2016-05-01'
                }
              ]
            },
            {
              MENU_ID: 32,
              MENU_NAME: '兼职管理',
              MENU_MODULE: '',
              MENU_ORDER: 2,
              MENU_ROUTE: '',
              MENU_STATE: 0,
              CREATED_TIME: '2016-05-01',
            },
            {
              MENU_ID: 33,
              MENU_NAME: '档案管理',
              MENU_MODULE: '',
              MENU_ORDER: 3,
              MENU_ROUTE: '',
              MENU_STATE: 0,
              CREATED_TIME: '2016-05-01',
            },
          ],
        },
        {
          MENU_ID: 4,
          MENU_NAME: '时间管理',
          MENU_MODULE: '',
          MENU_ORDER: 4,
          MENU_ROUTE: '',
          MENU_STATE: 0,
          CREATED_TIME: '2016-05-03',
        },
        {
          MENU_ID: 5,
          MENU_NAME: '招聘管理',
          MENU_MODULE: '',
          MENU_ORDER: 5,
          MENU_ROUTE: '',
          MENU_STATE: 0,
          CREATED_TIME: '2016-05-03',
        }
      ],
    }
  }, methods: {
    deleteMenu(value) {
      ElMessageBox.confirm(
          '是否确认删除名称为“' + value + '"的数据项?',
          '系统提示',
          {
            cancelButtonText: '取消',
            confirmButtonText: '确认',
            type: 'warning',
          }
      ).then(() => {
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '取消成功',
        })
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.boxName === '新增菜单') {

          } else {

          }
          //清空表单
          this.$refs[formName].resetFields();
          //关闭弹出框
          this.insertMenu = false;
          ElMessage({
            type: 'success',
            message: this.boxName == '新增菜单' ? '新增成功' : '修改成功',
          })
        } else {
          return false
        }
      })
    },
    //清空表单数据
    resetForm(formName) {
      //清空表单数据
      this.$refs[formName].resetFields();
      //关闭弹出框
      this.insertMenu = false;
      ElMessage({
        type: 'info',
        message: '取消成功',
      })
    },
    //展开操作/收起操作
    handle() {
      this.refreshTable = false;
      if (this.expands == true) {
        this.expands = false;
      } else {
        this.expands = true;
      }
      this.$nextTick(() => {
        this.refreshTable = true;
      });
    }
  }
}
</script>
<style scoped>
@import url("../../css/navigation.css");

/deep/ .el-input__suffix .el-input__validateIcon {
  position: relative !important;
  top: 13px;
}

/deep/ .el-scrollbar__wrap {
  overflow-y: auto;
  opacity: 1;
}


/deep/ .insert_menuType .el-form-item__label {
  position: relative !important;
  top: 10px;
}

/deep/ .insert_menuState .el-form-item__label {
  position: relative;
  top: 2px;
  left: -13px
}

.cell span {
  min-height: 0px;
}

/deep/ .el-form-item.is-error .el-input__validateIcon {
  position: relative;
  top: 13px;
}

.el-scrollbar__view .el-select-dropdown__item {
  text-align: center;
}

/deep/ .el-input__suffix .el-input__suffix-inner .el-icon svg {
  position: relative;
  top: 10px;
}

.dialog-footer .el-button {
  width: 100px;
  min-height: 33px;
}

/deep/ .el-date-editor .el-range__close-icon svg {
  position: relative;
  top: -13px;
  left: 30px;
}

.button-enable {
  background: #ecf5ff;
  border: 1px #cfe6ff solid;
  color: #5aaaff;
  display: inline-block;
  line-height: 1;
  min-height: 40px;
  white-space: nowrap;
  text-align: center;
  margin: 0;
  padding: 12px 20px;
  border-radius: var(--el-border-radius-base);
}

.button-forbidden {
  background: #fef0f0;
  border: 1px #f2c5c5 solid;
  color: #f57a7a;
  display: inline-block;
  line-height: 1;
  min-height: 40px;
  white-space: nowrap;
  text-align: center;
  margin: 0;
  padding: 12px 20px;
  border-radius: var(--el-border-radius-base);
}

/deep/ td div button span svg {
  position: relative !important;
  top: 2px;
}

/deep/ .el-button {
  font-size: 12px !important;
}

/deep/ th {
  text-align: center !important;
}

/deep/ td {
  text-align: center !important;
}

.j-set-big {
  margin: 20px;
}

.j-set-top {
  margin: 10px;
}

.j-set-bottom {
  margin: 0px 10px 0px 10px;
}

/deep/ .j-set-top-bottom button span {
  position: relative !important;
  top: -2px !important;
}

.j-menu-name {
  position: relative;
  top: -2px;
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
  min-width: 39%;
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


/deep/ .el-range-editor.el-input__inner {
  position: relative;
  height: 32px;
  top: 8px;
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

/deep/ .j-set-button .el-button--primary {
  margin-right: 10px;
}

/deep/ .j-set-button .el-button--primary span {
  position: relative;
  top: -2px;
}

/deep/ .j-set-button .el-button--default span {
  position: relative;
  top: -2px;
}

.j-set-button .el-button--default .icon {
  position: relative;
  top: 3px
}

.j-set-top-bottom .el-button--primary {
  margin-right: 10px;
}

.j-set-top-bottom .el-button--info {
  margin-right: 75.5%;
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

.top-search {
  display: inline-block;
  margin-right: 10px;
  text-align: center;
}

/deep/ .top-search button span {
  top: 1px !important;
}

/deep/ .top-reset button span {
  top: 1px !important;
}

.top-reset {
  display: inline-block;
  text-align: center;
}

/deep/ .el-icon {
  display: inline-block;
}

/deep/ .j-set-date div i {
  top: 4px;
}
</style>