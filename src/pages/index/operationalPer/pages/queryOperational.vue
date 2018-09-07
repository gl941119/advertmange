<template>
    <div class="user-management-list">
        <div class="user-management-list-title">
            <span>数据截至时间:</span>
            <span>员工:</span>
            <span>注册总人数:</span>
            <span>总点击量:</span>
        </div>
        <div class="user-management-list-back">
            <el-button size="medium" @click="Back">返回</el-button>
        </div>
        <div class="user-management-list-table">
        <el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark" stripe
                  :header-cell-class-name="tableHeaderClassName" >
            <el-table-column prop="" label="日期" align="center"></el-table-column>
            <!--<el-table-column prop="" label="登录密码" align="center"></el-table-column>-->
            <el-table-column prop="" label="当天注册量" align="center"></el-table-column>
            <el-table-column prop="" label="去交易点击总量" align="center"></el-table-column>
        </el-table>
        </div>
        <el-pagination background
                       layout="prev, pager, next"
                       prev-text="上一页"
                       next-text="下一页"
                       :page-size="pageSize"
                       @current-change="queryCurrentPageList"
                       :total="total"
                       style="text-align: center;">
        </el-pagination>
    </div>
</template>
<script>
    // import Request from '../../../utils/require';
    // import Config from '../../../utils/config';

    export default {
        name:'queryOperational',
        data() {
            return {
                page: 1,
                pageSize: 10,
                total: undefined,
                tableData: null,

            };
        },
        mounted(){
            console.log(this.$router)
        },
        methods: {
            Back(){
                this.$router.back(-1)
            },
            //分页
            queryCurrentPageList(val) {
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
            span{
                margin-left: 50px;
            }
        }
        &-back{
            float: right;
            margin-bottom: 20px;
        }
        &-table{
            width: 100%;

        }

    }
</style>
