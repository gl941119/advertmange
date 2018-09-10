<template>
    <div class="user-management-list">
        <div class="user-management-list-title">
            <span>数据截至时间:{{titleData.abortDate}}</span>
            <span>员工:{{titleData.staffName}}</span>
            <span>注册总人数:{{titleData.allRegisterNumber}}</span>
            <span>总点击量:{{titleData.allClickNumber}}</span>
        </div>
        <div class="user-management-list-back">
            <el-button size="medium" @click="Back">返回</el-button>
        </div>
        <div class="user-management-list-table">
            <el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark" stripe
                      :header-cell-class-name="tableHeaderClassName">
                <el-table-column prop="createTime" label="日期" align="center"></el-table-column>
                <!--<el-table-column prop="" label="登录密码" align="center"></el-table-column>-->
                <el-table-column prop="inviteCount" label="当天注册量" align="center"></el-table-column>
                <el-table-column prop="clickCount" label="去交易点击总量" align="center"></el-table-column>
            </el-table>
        </div>
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
    import Request from '@/utils/require';
    // import Config from '../../../utils/config';

    export default {
        name: 'queryOperational',
        data() {
            return {
                page: 1,
                pageSize: 10,
                total: undefined,
                tableData: null,
                titleData: {
                    abortDate: undefined,// 数据截止日期 ,
                    allClickNumber: undefined,// 总点击量 ,
                    allRegisterNumber: undefined,// 注册总人数 ,
                    staffName: undefined,// 员工姓名
                },

            };
        },
        mounted() {
            this.getDetailsWithId();
            this.getDetailsTable();
        },
        methods: {
            ReuqestData() {
            },
            getDetailsWithId() {
                Request.requestHandle({
                    url: 'getDetailsWithId',
                    data: {
                        'accountId': this.$route.query.id,
                    },
                    type: 'get',
                }, res => {
                    if (res.success = 1) {
                        this.titleData = res.data;
                    }
                });

            },
            getDetailsTable() {
                Request.requestHandle({
                    url: 'getDetailsTable',
                    data: {
                        page: this.page,
                        pageSize: this.pageSize,
                        accountId: this.$route.query.id,
                    },
                    type: 'get',
                }, res => {
                    if (res.success = 1) {
                        this.tableData = res.data;
                        this.total = res.total;
                    }
                });

            },
            Back() {
                this.$router.back(-1);
            },
            //分页
            currentChange(val){
                this.page = val;
                this.getDetailsTable()
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
    @import '../../../../assets/css/variable.scss';

    .user-management-list {
        &-title {
            float: left;
            span {
                margin-left: 50px;
            }
        }
        &-back {
            float: right;
            margin-bottom: 20px;
        }
        &-table {
            width: 100%;

        }

    }
</style>
