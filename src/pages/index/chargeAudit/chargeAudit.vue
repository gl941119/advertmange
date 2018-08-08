<template>
    <div class="user-management-list">
        <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane name="first">
                <span slot="label"><i class="iconfont icon-money"></i> 提现审核</span>
                <div class="sreach">
                    <div style="width:217px;overflow: hidden;float: left;margin-right: 20px;">
                        <el-input v-model="chargeSearchStr" placeholder="请输入账号"></el-input>
                    </div>
                    <el-button @click="chargeSearchBtn">搜索</el-button>
                </div>
                <el-table ref="multipleTable" :data="chargeAuditData" border tooltip-effect="dark" stripe
                          :header-cell-class-name="tableHeaderClassName" style="width: 100%;margin-top: 10px;">
                    <el-table-column prop="accountNo" label="账号" align="center">
                    </el-table-column>
                    <el-table-column prop="accountName" label="姓名" align="center">
                    </el-table-column>
                    <el-table-column prop="accountIdCard" label="身份证" align="center">
                    </el-table-column>
                    <el-table-column prop="id" label="id" align="center">
                    </el-table-column>
                    <el-table-column prop="createTime" label="时间" align="center">
                    </el-table-column>
                    <el-table-column prop="money" label="金额" align="center">
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" v-if='scope.row.status==3' @click="upDetail(scope.row)">审核
                            </el-button>
                            <p v-if='scope.row.status==1'>成功</p>
                            <p v-if='scope.row.status==2'>待转账</p>
                            <p v-if='scope.row.status==4'>不通过</p>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination background
                               layout="prev, pager, next"
                               prev-text="上一页"
                               next-text="下一页"
                               :page-size="pageSize"
                               @current-change="chargeHandleCurrent"
                               :total="pageTotal"
                               style="text-align: center;">
                </el-pagination>
            </el-tab-pane>
            <el-tab-pane name="second">
                <span slot="label"><i class="iconfont icon-qianbao1"></i> 流水记录</span>
                <div class="sreach">
                    <div style="width:217px;overflow: hidden;float: left;margin-right: 20px;">
                        <el-input v-model="flowSearchStr" placeholder="请输入账号"></el-input>
                    </div>
                    <el-button @click="flowSearchBtn">搜索</el-button>
                </div>
                <el-table ref="multipleTable" :data="flowRecordData" border tooltip-effect="dark" stripe
                          :header-cell-class-name="tableHeaderClassName" style="width: 100%;margin-top: 10px;">
                    <el-table-column prop="accountNo" label="账号" align="center">
                    </el-table-column>
                    <el-table-column prop="accountName" label="姓名" align="center">
                    </el-table-column>
                    <el-table-column prop="accountIdCard" label="身份证" align="center">
                    </el-table-column>

                    <el-table-column prop="id" label="id" align="center">
                    </el-table-column>
                    <el-table-column prop="createTime" label="时间" align="center">
                    </el-table-column>

                    <el-table-column prop="money" label="金额" align="center">
                    </el-table-column>
                </el-table>
                <el-pagination background
                               layout="prev, pager, next"
                               prev-text="上一页"
                               next-text="下一页"
                               :page-size="pageSize"
                               @current-change="flowHandleCurrent"
                               :total="pageTotal"
                               style="text-align: center;">
                </el-pagination>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import Config from '@/utils/config';
    // import Cache from '@/utils/cache';
    import Request from '@/utils/require';


    // noinspection JSUnusedLocalSymbols
    export default {
        name: 'chargeAudit',
        data() {
            return {
                activeName: 'first',//选项卡
                chargeSearchStr: '',//提现搜索
                flowSearchStr: '',//流水搜索
                pageSize: Config.pageSize,//分页
                pageTotal: 0,
                chargeAuditData: [],
                flowRecordData: [],
            };
        },
        created() {
            this.queryData('charge');
            this.queryData('flowRecord');
        },
        methods: {
            queryData(name, page = 1, pageSize = Config.pageSize) {//通用请求页面data
                let type = 0;
                let searchStr = this.chargeSearchStr;
                if (name == 'flowRecord') {
                    type = 1;
                    searchStr = this.flowSearchStr;
                }
                let params = {
                    url: 'QueryChargeAuditData',
                    data: {
                        page,
                        pageSize,
                        type,
                        searchStr,
                    },
                    type: 'get',
                };
                Request.requestHandle(params, res => {
                    if (name == 'flowRecord') {
                        this.flowRecordData = res.data;
                        this.pageTotal = res.total;
                    }
                    else if (name == 'charge') {
                        this.chargeAuditData = res.data;
                        this.pageTotal = res.total;
                    }
                });
            },
            upDetail(row) {//审核跳转
                this.$router.push({
                    name: 'chargeAuditDetail',
                    params: {
                        accountId: row.accountId,
                        id: row.id,
                    },
                });
            },
            chargeSearchBtn() {//提现搜索
                this.queryData('charge');
            },
            flowSearchBtn() {//流水搜索
                this.queryData('flowRecord');
            },
            chargeHandleCurrent(val) {//提现翻页改变
                this.queryData('charge', val);
            },
            flowHandleCurrent(val) {//流水翻页改变
                this.queryData('flowRecord', val);
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

    .sreach {
        float: right;
        margin-right: 20px;
        margin-bottom: 20px;
    }

    .user-management-list {
        &-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-right: 15px;
            & > button {
                color: $textColor;
                font-size: 24px;

            }
        }
        &-link {
            font-size: 14px;
            color: $anchorColor;
            margin-left: 20px;
        }
    }

</style>
