<template>
    <div class="user-management-list">
        <div class="user-management-list-title">
            <h3>用户列表({{pageTotal}})</h3>
            <el-button @click="addUserList">添加</el-button>
        </div>
        <el-table ref="multipleTable"
                  :data="bulletinListData"
                  tooltip-effect="dark"
                  stripe
                  :header-cell-class-name="tableHeaderClassName"
                  style="width: 100%">
            <el-table-column prop="username"
                             label="用户名"
                             align="center">
            </el-table-column>
            <el-table-column prop="company"
                             label="公司名"
                             align="center">
            </el-table-column>
            <el-table-column prop="status"
                             label="账户状态"
                             :formatter="statusFormat"
                             align="center">
            </el-table-column>
            <el-table-column label="操作"
                             align="center"
                             min-width="100"
                             show-overflow-tooltip>
                <template slot-scope="scope">
                        <el-button size="mini"
                        v-if="platformType==='tiktokv'"
                                   @click="showPublicAccount(scope.row)">查看共有账号</el-button>
                        <el-button size="mini"
                                   @click="showDevice(scope.row)">查看设备</el-button>
                        <el-button size="mini"
                                   @click="editUserInfo(scope.row)">修改信息</el-button>

                    <el-popover placement="top"
                                width="160"
                                trigger="click"
                                v-model="scope.row.showInitial">
                        <p>确定启用该用户吗？</p>
                        <div style="text-align: right; margin-top: 5px;">
                            <el-button size="mini"
                                       type="text"
                                       @click="scope.row.showInitial = false">取消</el-button>
                            <el-button type="primary"
                                       size="mini"
                                       @click="initialUser(scope.$index, scope.row)">确定</el-button>
                        </div>
                        <el-button size="mini"
                                   slot="reference"
                                   @click="scope.row.showInitial = true">启用</el-button>
                    </el-popover>
                    <el-popover placement="top"
                                width="160"
                                trigger="click"
                                v-model="scope.row.showFrozen">
                        <p>确定冻结该用户吗？</p>
                        <div style="text-align: right; margin-top: 5px;">
                            <el-button size="mini"
                                       type="text"
                                       @click="scope.row.showFrozen = false">取消</el-button>
                            <el-button type="primary"
                                       size="mini"
                                       @click="frozenUser(scope.$index, scope.row)">确定</el-button>
                        </div>
                        <el-button size="mini"
                                   type="danger"
                                   slot="reference"
                                   @click="scope.row.showFrozen = true">冻结</el-button>
                    </el-popover>
                </template>
            </el-table-column>
        </el-table>
        <!-- dialog -->
        <el-dialog :title="bulletinFormInfo.title"
                   width='30%'
                   :visible.sync="bulletinFormInfo.visible">
            <el-form :model="bulletinFormInfo.form">
                <el-form-item label="用户名"
                              :label-width="bulletinFormInfo.formLabelWidth">
                    <el-input placeholder="用户名,必选"
                              v-model="bulletinFormInfo.form.username"></el-input>
                </el-form-item>
                <el-form-item label="联系人"
                              :label-width="bulletinFormInfo.formLabelWidth">
                    <el-input placeholder="联系人,必选"
                              v-model="bulletinFormInfo.form.realname"></el-input>
                </el-form-item>
                <el-form-item label="密码"
                              v-if="bulletinFormInfo.type === 'add'"
                              :label-width="bulletinFormInfo.formLabelWidth">
                    <el-input placeholder="密码,必选"
                              v-model="bulletinFormInfo.form.password"></el-input>
                </el-form-item>
                <el-form-item label="电话"
                              :label-width="bulletinFormInfo.formLabelWidth">
                    <el-input placeholder="电话,必选"
                              v-model="bulletinFormInfo.form.tel"></el-input>
                </el-form-item>
                <el-form-item label="公司名"
                              :label-width="bulletinFormInfo.formLabelWidth">
                    <el-input placeholder="公司名,必选"
                              v-model="bulletinFormInfo.form.company"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer"
                 class="dialog-footer">
                <el-button @click="bulletinFormInfo.visible = false">取 消</el-button>
                <el-button type="primary"
                           @click="bulletinFormInfoSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import Config from '../../../utils/config';
import Request from '../../../utils/require';
import Cache from '../../../utils/cache';
export default {
    data(){
        return {
            pageTotal: 0,
            pageSize: Config.pageSize,
            id: this.$store.state.id || Cache.getSession('bier_userid'),
            platformType: Cache.getSession('platform_type')||this.$store.state.type,
            bulletinListData: [],
            bulletinFormInfo: {
                title: '添加用户',
                visible: false,
                formLabelWidth: '100px',
                type: 'add',
                form: {},
            }
        }
    },
    created(){
        this.getDataInfo();
    },
    methods:{
        getDataInfo(page = Config.pageStart){
            let params ={
                url: 'QueryAccountInfo',
                data: {
                    page,
                    pagesize: this.pageSize,
                }
            }
            Request.requestHandle(params, res => {
                res.data.forEach(item=>{
                    item.showInitial = false;
                    item.showFrozen = false;
                })
                this.bulletinListData = res.data;
                this.pageTotal = res.total;
            });
        },
        addUserList(){
            this.bulletinFormInfo.title = '添加用户';
            this.bulletinFormInfo.type = 'add';
            this.bulletinFormInfo.form = {};
            this.bulletinFormInfo.visible = true;
        },
        bulletinFormInfoSubmit(){
            let {
                id,
                username,
                realname,
                password,
                tel,
                company,
            } = this.bulletinFormInfo.form;
            if(username && realname && tel && company){
                let params;
                if(this.bulletinFormInfo.type === 'add'){
                    if(password){
                        params = {
                            url: 'AddAccountInfo',
                            data: {username, realname, password, tel, company},
                        }
                    }else{
                        this.$message({
                            message: '信息尚未填完整',
                            type: 'warning'
                        });
                        return;
                    }
                }else if(this.bulletinFormInfo.type === 'edit'){
                    params = {
                        url: 'UpdateAccountInfo',
                        data: {id, username, realname, tel, company},
                    }
                }else{
                    console.error('type error!', this.bulletinFormInfo.type);
                    return;
                }
                params &&
                    Request.requestHandle(params, res => {
                        this.bulletinFormInfo.visible = false;
                        this.getDataInfo();
                        this.$message({
                            message: res.message,
                            type: 'success'
                        });
                    });
            }else{
                this.$message({
                    message: '信息尚未填完整',
                    type: 'warning'
                });
            }
        },
        statusFormat(row){
            let status = row.status;
            switch (status) {
                case 0:
                    return '冻结';
                    break;
                case 1:
                    return '正常';
                    break;
                case 2:
                    return '审核中';
                    break;
            }
        },
        showDevice(item){
            let type = Cache.getSession('platform_type')||this.$store.state.type;
            this.$router.push({name: type ==='amazon'?'userdetail':'tikuserdetail', query: {subusername: item.username, id: item.id}});
        },
        showPublicAccount(item){
            this.$router.push({name: 'tikpublic', query: {subusername: item.username, id: item.id}});
        },
        editUserInfo(item){
            let {id, username, realname, password, tel, company} = item;
            this.bulletinFormInfo.title = '修改用户信息';
            this.bulletinFormInfo.type = 'edit';
            this.bulletinFormInfo.form = {id, username, realname, password, tel, company};
            this.bulletinFormInfo.visible = true;
        },
        frozenUser(i, item){
            item.showFrozen = false;
            this.hadleFrozenAndInitialUser(0, item);
        },
        initialUser(i, item){
            item.showInitial = false;
            this.hadleFrozenAndInitialUser(1, item);
        },
        hadleFrozenAndInitialUser(status, item){
            // status 0->frozen 1->initial
            let params ={
                url: 'FrozenAndInitialUser',
                data: {
                    id: item.id,
                    status,
                }
            };
            Request.requestHandle(params, res => {
                this.getDataInfo();
                this.$message({
                    message: res.message,
                    type: 'success'
                })
            });
        },
        tableHeaderClassName({ row, rowIndex }) {
            return 'custom-header';
        },
    }
};
</script>
<style lang="scss" scoped>
@import '../../../assets/css/variable.scss';
.user-management-list {
    &-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 15px;
        & > h3 {
            color: $textColor;
            font-size: 24px;
            margin: 20px 0;
        }
    }
}
</style>
