<template>
    <div class="user-detail">
        <el-breadcrumb class="user-detail-nav"
                       separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{name: type==='amazon'?'home':'tikhome'}">用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{subUserName}} 的设备({{pageTotal}})</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="user-detail-add">
            <el-button @click="addDeviceBind">添加设备</el-button>
        </div>
        <el-table :data="infoList"
                  style="width: 100%"
                  :header-cell-class-name="tableHeaderClassName">
            <el-table-column prop="userSid"
                             label="子账号ID"
                             align="center">
            </el-table-column>
            <el-table-column prop="sn"
                             label="设备号"
                             align="center">
            </el-table-column>
            <el-table-column prop="status"
                             label="状态"
                             :formatter="statusFormat"
                             align="center">
            </el-table-column>
            <el-table-column label="操作"
                             align="center"
                             show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-popover placement="top"
                                width="160"
                                trigger="click"
                                v-model="scope.row.showDelete">
                        <p>确定删除该设备吗？</p>
                        <div style="text-align: right; margin-top: 5px;">
                            <el-button size="mini"
                                       type="text"
                                       @click="scope.row.showDelete = false">取消</el-button>
                            <el-button type="primary"
                                       size="mini"
                                       @click="DeleteDevice(scope.$index, scope.row)">确定</el-button>
                        </div>
                        <el-button size="mini"
                                   type="danger"
                                   slot="reference"
                                   @click="scope.row.showDelete = true">删除</el-button>
                    </el-popover>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background
                       layout="prev, pager, next"
                       prev-text="上一页"
                       next-text="下一页"
                       :page-size="pageSize"
                       @current-change="queryCurrentPageList"
                       :total="pageTotal">
        </el-pagination>
        <!-- dialog -->
        <el-dialog title="分配设备"
                   width='30%'
                   :visible.sync="bindDevice.visible">
            <el-form :model="bindDevice.form">
                <el-form-item label="选择组"
                              :label-width="bindDevice.formLabelWidth">
                    <el-input-number :min="0"
                                    size="mini"
                                     class="custom-input-type"
                                     v-model="bindDevice.form.groupId"></el-input-number>
                </el-form-item>
                <el-input placeholder="请输入设备号，Enter键搜索"
                          suffix-icon="el-icon-search"
                          class="user-detail-input"
                          size="mini"
                          @keyup.enter.native="queryListByAId(devInput)"
                          v-model="devInput">
                </el-input>
                <el-table :data="bindDevice.unBindDevData"
                          style="width: 100%"
                          :header-cell-class-name="tableHeaderClassName"
                          @selection-change="handleSelectionChange">
                    <el-table-column align="center"
                                     type="selection"
                                     width="100">
                    </el-table-column>
                    <el-table-column prop="sn"
                                     label="设备号"
                                     align="center">
                    </el-table-column>
                    <el-table-column prop="status"
                                     label="状态"
                                     :formatter="statusFormat"
                                     align="center">
                    </el-table-column>
                </el-table>
                <el-pagination background
                       layout="prev, pager, next"
                       prev-text="上一页"
                       next-text="下一页"
                       :page-size="bindDevice.pageSize"
                       @current-change="subQueryCurrentPageList"
                       :total="bindDevice.pageTotal">
                </el-pagination>
            </el-form>
            <div slot="footer"
                 class="dialog-footer">
                <el-button @click="bindDevice.visible = false">取 消</el-button>
                <el-button type="primary"
                           @click="bindDeviceSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import Config from '../../utils/config';
import Request from '../../utils/require';
import Cache from '../../utils/cache';
export default {
    data() {
        return {
            id: this.$route.query.id,
            type: Cache.getSession('platform_type')||this.$store.state.type,
            subUserName: this.$route.query.subusername,
            infoList: [],
            pageSize: Config.pageSize,
            pageTotal: 0,
            devInput: '',
            bindDevice: {
                visible: false,
                formLabelWidth: '100px',
                form: {
                    groupId: 1,
                    selectItems: [],
                },
                unBindDevData: [],
                pageSize: Config.pageSize,
                pageTotal: 0,
            }
        };
    },
    created() {
        this.getDataInfo();
    },
    methods: {
        getDataInfo(page = Config.pageStart) {
            let params = {
                url: 'QueryBindDevice',
                data: {
                    userpid: this.id,
                    page,
                    pagesize: this.pageSize
                }
            };
            Request.requestHandle(params, res => {
                res.data.forEach(item => {
                    item.showDelete = false;
                });
                this.pageTotal = res.total;
                this.infoList = res.data;
            });
        },
        tableHeaderClassName({ row, rowIndex }) {
            return 'custom-header';
        },
        handleSelectionChange(val) {
            this.bindDevice.form.selectItems = val;
        },
        addDeviceBind() {
            this.getUnBindDevInfo(null, undefined, () => {
                this.bindDevice.visible = true;
            })
        },
        getUnBindDevInfo(sn = null, page = Config.pageStart, cb){
            let params = {
                url: 'QueryUnBindDevice',
                data: {
                    page,
                    pagesize: this.pageSize,
                    sn,
                }
            };
            Request.requestHandle(params, res => {
                this.bindDevice.pageTotal = res.total;
                this.bindDevice.unBindDevData = res.data;
                typeof cb === 'function' && cb();
            });
        },
        bindDeviceSubmit() {
            let {groupId, selectItems} = this.bindDevice.form;
            let ids = selectItems.map(item => item.id);
            let params = {
                url: 'BindDevice',
                data: {
                    userpid: this.id,
                    groupid: groupId,
                    ids,
                },
                flag: true,
            };
            Request.requestHandle(params, res => {
                this.getDataInfo();
                this.$message({
                    message: res.message,
                    type: 'success'
                });
                this.bindDevice.visible = false;
            })

        },
        statusFormat(row) {
            let status = row.status;
            switch (status) {
                case 0:
                    return '未分配';
                    break;
                case 1:
                    return '已分配';
                    break;
                case 2:
                    return '已绑定';
                    break;
            }
        },
        DeleteDevice(i, item) {
            let params = {
                url: 'DeleteBindDevice',
                data: {
                    userpid: this.id,
                    id: item.id,
                }
            };
            Request.requestHandle(params, res => {
                this.getDataInfo();
                this.$message({
                    message: res.message,
                    type: 'success'
                });
            })
        },
        queryListByAId(key){
            key ?
            this.getUnBindDevInfo(key) :
            this.getUnBindDevInfo();
        },
        // page
        queryCurrentPageList(page) {
            this.getDataInfo(page);
        },
        subQueryCurrentPageList(page){
            this.getUnBindDevInfo(undefined, page);
        }
    }
};
</script>
<style lang="scss" scoped>
.user-detail {
    &-nav {
        margin-bottom: 25px;
        font-size: 18px;
    }
    &-add {
        margin: 15px 0;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    &-input {
        width: 50%;
        margin: 0 auto 15px;
    }
}
.user-detail-footer {
    margin-top: 20px;
    text-align: center;
}
</style>
