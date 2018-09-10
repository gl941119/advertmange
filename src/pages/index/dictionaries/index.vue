<template>
    <div class="user-management-list">
        <div class="user-management-list-title">
            <h3>数据字典</h3>
        </div>
        <div class="user-management-list-title">
            <el-input v-model="search" placeholder="请输入id" clearable style="width: 200px;"></el-input>
            <el-button size="medium" @click="queryData" style="margin-left: 10px">查询</el-button>
            <el-button size="medium" @click="addBtn">新增</el-button>
        </div>
        <el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark" stripe
                  :header-cell-class-name="tableHeaderClassName" style="width: 100%;margin-top: 20px;">
            <el-table-column prop="dictCode" label="Code" align="center"></el-table-column>
            <el-table-column prop="dictDesc" label="描述信息" align="center"></el-table-column>
            <el-table-column prop="dictGroup" label="分组" align="center"></el-table-column>
            <el-table-column prop="dictName" label="名称" align="center"></el-table-column>
            <el-table-column prop="dictOrder" label="排序位置" align="center"></el-table-column>
            <el-table-column prop="dictValue" label="值" align="center"></el-table-column>
            <el-table-column prop="parentId" label="父ID" align="center"></el-table-column>
            <el-table-column prop="id" label="ID" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="editBtn(scope.row)">编辑</el-button>
                    <el-button size="mini" @click="DeleteBtn(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--新增和修改弹窗-->
        <el-dialog title="新增" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="400px">
            <el-form :model="DialogForm">
                <el-form-item label="Code" :label-width="formLabelWidth">
                    <el-input v-model="DialogForm.dictCode" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述信息" :label-width="formLabelWidth">
                    <el-input v-model="DialogForm.dictDesc" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="分组" :label-width="formLabelWidth">
                    <el-input v-model="DialogForm.dictGroup" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="名称" :label-width="formLabelWidth">
                    <el-input v-model="DialogForm.dictName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="排序位置" :label-width="formLabelWidth">
                    <el-input v-model="DialogForm.dictOrder" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="值" :label-width="formLabelWidth">
                    <el-input v-model="DialogForm.dictValue" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="父ID" :label-width="formLabelWidth">
                    <el-input v-model="DialogForm.parentId" auto-complete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
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
                search: undefined,
                tableData: null,
                dialogFormVisible: false,
                formLabelWidth: '120px',
                DialogType:'add',
                DialogForm: {
                    'dictCode': undefined,
                    'dictDesc': undefined,
                    'dictGroup': undefined,
                    'dictName': undefined,
                    'dictOrder': undefined,
                    'dictValue': undefined,
                    'parentId': undefined,

                },
            };
        },
        mounted() {
            this.ReuqestData();
        },
        methods: {
            ReuqestData() {
                Request.requestHandle({
                    url: 'getDictionaries',
                    data: {
                        page: this.page,
                        pageSize: this.pageSize,
                    },
                    type: 'get',
                }, res => {
                    if (res.success = 1) {
                        this.tableData = res.data;
                        this.total = res.total;
                    }
                });
            },
            //查询
            queryData(){
                if(!this.search){
                    this.ReuqestData()
                    return;
                }
                Request.requestHandle({
                    url: 'queryDictionaties',
                    data: {
                        id:this.search
                    },
                    type: 'get',
                }, res => {
                    if (res.success = 1) {
                        if(!res.data){
                            this.tableData = [];
                            return
                        }
                        this.tableData = [res.data]
                    }
                });
            },
            addBtn(){
                this.DialogForm= {
                    'dictCode': undefined,
                        'dictDesc': undefined,
                        'dictGroup': undefined,
                        'dictName': undefined,
                        'dictOrder': undefined,
                        'dictValue': undefined,
                        'parentId': undefined,
                        'id':undefined,
                }
                this.DialogType = 'add';
                this.dialogFormVisible = true
            },
            editBtn(row) {
                this.DialogForm = row;
                this.DialogType = 'edit';
                this.dialogFormVisible = true;
            },
            //新增和修改通用事件
            addSubmit() {
                Request.requestHandle({
                    url: this.DialogType === 'edit' ?  'updataDictionaties':'addDictionaries',
                    data: this.DialogForm,
                    type: 'post',
                    flag: true,
                }, res => {
                    if (res.success = 1) {
                        this.$message({
                            type: 'success',
                            message: '成功',
                        });
                        this.dialogFormVisible = false;
                        this.ReuqestData();
                    }
                });
            },
            //删除
            DeleteBtn(id) {
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    this.Delete(id);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除',
                    });
                });
            },
            Delete(id) {
                Request.requestHandle({
                    url: 'deleteDictionaties',
                    data: {id},
                    type: 'post',

                }, res => {
                    if (res.success = 1) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!',
                        });
                        this.dialogFormVisible = false;
                        this.ReuqestData();
                    }
                });

            },
            //分页
            currentChange(val) {
                this.page = val;
                this.ReuqestData();
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
