<template>
    <div class="user-management-list">
        <div class="user-management-list-title">
            <h3>运营绩效</h3>
        </div>
        <div class="user-management-list-title">
            <el-select v-model="workStatus" placeholder="请选择">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-button size="medium" @click="ReuqestData" style="margin-left: 10px">查询</el-button>
            <el-button size="medium" @click="addDialog = true">新增</el-button>
        </div>
        <el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark" stripe
                  :header-cell-class-name="tableHeaderClassName" style="width: 100%;margin-top: 20px;">
            <el-table-column prop="email" label="商务账号" align="center"></el-table-column>
            <!--<el-table-column prop="" label="登录密码" align="center"></el-table-column>-->
            <el-table-column prop="nickname" label="员工姓名" align="center"></el-table-column>
            <el-table-column prop="addRegisterNumber" label="新增注册量" align="center"></el-table-column>
            <el-table-column prop="allRegisterNumber" label="注册总人数" align="center"></el-table-column>
            <el-table-column prop="allClickNumber" label="【去交易】点击总量" align="center"></el-table-column>
            <!--<el-table-column prop="" label="【交易】人均点击量" align="center"></el-table-column>-->
            <el-table-column  label="工作状态" align="center">
                <template slot-scope="scope">
                   <p v-if="scope.row.workStatus==0">全部</p>
                   <p v-if="scope.row.workStatus==1">正常</p>
                   <p v-if="scope.row.workStatus==2">离职</p>
                </template>
            </el-table-column>
            <el-table-column label="数据报表" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="query(scope.row.id)">查看</el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="editBtn(scope.row)">编辑</el-button>
                    <el-button size="mini" @click="DeleteBtn(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--编辑弹窗-->
        <el-dialog title="编辑" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="400px">
            <el-form :model="DialogForm">
                <el-form-item label="商务账号" :label-width="formLabelWidth">
                    <span>{{DialogForm.email}}</span>
                </el-form-item>
                <el-form-item label="员工姓名" :label-width="formLabelWidth">
                    <el-input v-model="DialogForm.nickname" style="width: 217px"></el-input>
                </el-form-item>
                <el-form-item label="登录密码" :label-width="formLabelWidth">
                    <el-input v-model="DialogForm.password" style="width: 217px"></el-input>
                </el-form-item>
                <el-form-item label="工作状态" :label-width="formLabelWidth">
                    <el-select v-model="DialogForm.workStatus" placeholder="请选择活动区域">
                        <el-option label="全部" value="0"></el-option>
                        <el-option label="正常" value="1"></el-option>
                        <el-option label="离职" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editSubmit">确 定</el-button>
            </div>
        </el-dialog>
        <!--新增弹窗-->
        <el-dialog title="收货地址" :visible.sync="addDialog" v-if="addDialog" width="400px">
            <el-form :model="addForm">
                <el-form-item label="员工姓名" :label-width="formLabelWidth">
                    <el-input v-model="addForm.nickname" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="登录密码" :label-width="formLabelWidth">
                    <el-input v-model="addForm.password" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialog = false">取 消</el-button>
                <el-button type="primary" @click="addSubmit">确 定</el-button>
            </div>
        </el-dialog>

        <el-pagination
            layout="prev, pager, next"
            prev-text='上一页'
            next-text="下一页"
            :total="total"
            @current-change='currentChange'
            :page-size="pageSize"
            background
            style="text-align: center;">
        </el-pagination>
    </div>
</template>
<script>
    import Request from '../../../utils/require';
    import Config from '../../../utils/config';

    export default {
        data() {
            return {
                page: 1,
                pageSize: 10,
                total: undefined,
                tableData: null,
                options: [{
                    value: '0',
                    label: '全部',
                }, {
                    value: '1',
                    label: '正常',
                }, {
                    value: '2',
                    label: '离职',
                }],
                workStatus: undefined,
                dialogFormVisible: false,
                DialogForm: {},
                formLabelWidth: '100px',
                addDialog:false,
                addForm:{
                    nickname:undefined,
                    password:undefined,
                },
            };
        },
        mounted() {
            this.ReuqestData();
        },
        methods: {
            ReuqestData() {
                Request.requestHandle({
                    url: 'getAllOperater',
                    data: {
                        page: this.page,
                        pageSize: this.pageSize,
                        workStatus: this.workStatus,
                    },
                    type: 'get',
                }, res => {
                    if (res.success = 1) {
                        this.tableData = res.data;
                        this.total = res.total;
                    }
                });
            },
            editBtn(row) {
                this.dialogFormVisible = true;
                this.DialogForm = {
                    id: row.id,
                    email: row.email,
                    nickname: row.nickname,
                    password: undefined,
                    workStatus: row.workStatus.toString(),
                };
            },
            editSubmit() {
                Request.requestHandle({
                    url: 'updateAccountOperater',
                    data: this.DialogForm,
                    type: 'post',
                    flag:true
                }, res => {
                    if (res.success = 1) {
                        this.$message({
                            message:'修改成功',
                            type:"success"
                        });
                        this.dialogFormVisible = false;
                        this.ReuqestData()
                    }
                });
            },
            // 新增
            addSubmit(){
                // if(this.addForm.nickname&&this.addForm.password) return;
                Request.requestHandle({
                    url: 'addAccountOperater',
                    data: this.addForm,
                    type: 'post',
                    flag:true
                }, res => {
                    if (res.success = 1) {
                        this.addDialog = false;
                        this.ReuqestData()
                    }
                });

            },
            // 删除
            DeleteBtn(id) {
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                  this.Delete(id)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除',
                    });
                });

            },
            Delete(id){
                Request.requestHandle({
                    url: 'addAccountOperater',
                    data: {
                        "id": id
                    },
                    type: 'post',
                    flag:true
                }, res => {
                    if (res.success = 1) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!',
                        });
                        this.ReuqestData()
                    }
                });
            },
            query(id){
                console.log(id)
                this.$router.push({name:'queryOperational',query:{id}})
            },
            //分页
            currentChange(val){
                this.page = val;
                this.ReuqestData()
            },
            tableHeaderClassName({
                                     row,
                                     rowIndex,
                                 }) {
                return 'custom-header';
            },

        },
    };
</script>

<style lang="scss" scoped>
    @import '../../../assets/css/variable.scss';

    .user-management-list {
        &-title {
            display: flex;
            justify-content: left;
            align-items: center;
            padding-right: 15px;
            & > h3 {
                color: $textColor;
                font-size: 24px;
                margin: 20px 0;
            }
        }
        &-link {
            font-size: 14px;
            color: $anchorColor;
            margin-left: 20px;
        }
    }
</style>
