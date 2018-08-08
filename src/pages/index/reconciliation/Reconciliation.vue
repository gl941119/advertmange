<template>
    <div class="user-management-list">
        <i></i>
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
            <el-tab-pane name="advert">
                <span slot="label"><i class="iconfont icon-guanggaozu"></i> 广告账户</span>
                <div class="sreach">
                    <div style="width:217px;overflow: hidden;float: left;margin-right: 20px;">
                        <el-input v-model="advertSearch" placeholder="请输入账号"></el-input>
                    </div>
                    <el-button @click="chargeSearchBtn">搜索</el-button>
                </div>
                <el-table ref="singleTable" :data="advertData" border tooltip-effect="dark" stripe
                          :header-cell-class-name="tableHeaderClassName" style="width: 100%;margin-top: 10px;"
                          :row-class-name="tableRowClassName">
                    <el-table-column prop="accountId" label=" 账号ID" align="center">
                    </el-table-column>
                    <el-table-column prop="accountNo" label="账号" align="center">
                    </el-table-column>
                    <el-table-column prop="rechargeTotal" label="充值总额" align="center">
                    </el-table-column>
                    <el-table-column prop="tradeRechargeTotal" label="充值记录总金额" align="center">
                    </el-table-column>
                    <el-table-column prop="withdrawalTotal" label="提现总额" align="center">
                    </el-table-column>
                    <el-table-column prop="tradeWithdrawalTotal" label="提现记录总金额" align="center">
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
            <el-tab-pane name="corwd">
                <span slot="label"><i class="iconfont icon-zhongchou"></i> 公司账号</span>
                <el-table ref="multipleTable" :data="corwdData" border tooltip-effect="dark" stripe
                          :header-cell-class-name="tableHeaderClassName" style="width: 100%;margin-top: 10px;"
                          :row-class-name="tableRowClassName">
                    <el-table-column prop="rechargeTotal" label="充值总额" align="center">
                    </el-table-column>

                    <el-table-column prop="tradeRechargeTotal" label="充值记录总金额" align="center">
                    </el-table-column>
                    <el-table-column prop="withdrawalTotal" label="提现总额" align="center">
                    </el-table-column>
                    <el-table-column prop="tradeWithdrawalTotal" label="提现记录总金额" align="center">
                    </el-table-column>
                </el-table>
                <!--<el-pagination background-->
                <!--layout="prev, pager, next"-->
                <!--prev-text="上一页"-->
                <!--next-text="下一页"-->
                <!--:page-size="pageSize"-->
                <!--@current-change="flowHandleCurrent"-->
                <!--:total="pageTotal"-->
                <!--style="text-align: center;">-->
                <!--</el-pagination>-->
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import Config from '@/utils/config';
    import Cache from '@/utils/cache';
    import Request from '@/utils/require';


    export default {
        name: 'chargeAudit',
        data() {
            return {
                activeName: 'advert',//选项卡
                tabName: 'advert',
                advertSearch: '',//提现搜索
                corwdSearch: '',//流水搜索
                pageSize: Config.pageSize,//分页
                pageTotal: 0,
                corwdData: [],
                advertData: [],
            };
        },
        created() {
            this.queryData();
        },
        methods: {
            queryData(page = 1, pageSize = Config.pageSize) {//通用请求页面data
                let url,
                    searchStr,
                    name = this.tabName;
                if (name == 'advert') {
                    url = 'QueryAdvertIdTeal';
                    searchStr = this.advertSearch;
                }
                if (name == 'corwd') {
                    url = 'QuerycowrdIdTeal';
                    searchStr = this.corwdSearch;
                }
                Request.requestHandle({
                    url,
                    data: {
                        page,
                        pageSize,
                        searchStr,
                    },
                    type: 'get',
                }, res => {
                    if (name == 'advert') {
                        this.advertData = res.data;
                    } else if (name == 'corwd') {
                        this.corwdData = res.data;
                    }
                    this.pageTotal = res.total;


                });
            },
            handleClick(tab, event) {
                this.tabName = tab.name;
                this.queryData();

            },
            tableRowClassName({row, rowIndex}) {
                if (row.status === 1) {
                    return 'warning-row';
                } else if (rowIndex === 3) {
                    return 'success-row';
                }
                return '';
            },
            chargeSearchBtn() {//提现搜索
                this.queryData();
            },
            flowSearchBtn() {//流水搜索
                this.queryData();
            },
            chargeHandleCurrent(val) {//广告翻页改变

                this.queryData(val);
            },
            flowHandleCurrent(val) {//众筹翻页改变

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
<style lang="scss">
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

    .warning-row {
        color: red;
    }

</style>
