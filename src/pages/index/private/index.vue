<template>
    <div class="user-management-list">
        <div class="user-management-list-title">
            <h3>私募发行</h3>
        </div>
        <div class="user-management-list-Btn">
            <el-button size="medium" @click="addBtn">新增</el-button>
        </div>
        <el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark" stripe
                  :header-cell-class-name="tableHeaderClassName" style="width: 100%;margin-top: 20px;">
            <el-table-column prop="" label="金额(AFDT)" align="center"></el-table-column>
            <el-table-column prop="" label="发行价(ETH)" align="center"></el-table-column>
            <el-table-column prop="" label="状态" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="editBtn(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--通用弹窗-->
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="400px">
            <el-form :model="addForm">
                <el-form-item label="员工姓名" :label-width="formLabelWidth">
                    <el-input v-model="addForm.nickname" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="登录密码" :label-width="formLabelWidth">
                    <el-input v-model="addForm.password" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="Submit">确 定</el-button>
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
                dialogFormVisible:false,
            };
        },
        mounted() {
            this.ReuqestData();
        },
        methods: {
            ReuqestData() {
            },
            editBtn(row) {
            },
            addBtn() {
            },
            Submit() {
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
    h3 {
        color: $textColor;
        font-size: 24px;
        margin: 20px 0;
    }
    .user-management-list {
        &-Btn {
            text-align: right;

        }
        &-link {

        }
    }
</style>
