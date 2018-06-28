<template>
    <div class="user-detail">
        <el-breadcrumb class="user-detail-nav"
                       separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{name: 'tikhome'}">用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{subUserName}} 的公有账号列表({{pageTotal}})</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="user-detail-add" style="text-align:right;margin-bottom:20px;">
            <el-button @click="addDeviceBind">分配公有账号</el-button>
        </div>
        <el-table :data="infoList"
                  style="width: 100%"
                  :header-cell-class-name="'custom-header'">
            <el-table-column prop="telephone"
                             label="手机号"
                             align="center">
            </el-table-column>
            <el-table-column prop="trillNumber"
                             label="抖音号"
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
                       :page-size="pageSize"
                       @current-change="queryCurrentPageList"
                       :total="pageTotal">
        </el-pagination>
        <!-- dialog -->
        <el-dialog title="分配公有账号"
                   width='30%'
                   :visible.sync="bindDevice.visible">
            <el-form :model="bindDevice.form">
                <el-form-item label="分配数量"
                              :label-width="bindDevice.formLabelWidth">
                    <el-input-number :min="0"
                                    size="mini"
                                     v-model="bindDevice.form.num"></el-input-number>
                </el-form-item>
                <el-form-item label="国家"
                              :label-width="bindDevice.formLabelWidth">
                    <el-select size="mini" v-model="bindDevice.form.county" style="width: 30%;">
                        <el-option
                            v-for="item in bindDevice.selectOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
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
    data(){
        return {
            id: this.$route.query.id,
            subUserName: this.$route.query.subusername,
            infoList: [],
            pageSize: Config.pageSize,
            pageTotal: 0,
            currPage: undefined,
            devInput: '',
            bindDevice: {
                visible: false,
                formLabelWidth: '100px',
                selectOption: [{label: 'ch', value: 'ch'}],
                form: {
                    county: 'ch',
                    num: 1
                },
            }
        }
    },
    created() {
        this.getDataInfo();
    },
    methods: {
        getDataInfo(page = Config.pageStart) {
            let params = {
                url: 'QueryPublicAccountById',
                data: {
                    userId: this.id,
                    page,
                    pageSize: this.pageSize
                }
            };
            Request.requestHandle(params, res => {
                this.pageTotal = res.total;
                this.infoList = res.data;
            });
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
        addDeviceBind(){
            this.bindDevice.visible = true;
            this.bindDevice.form.num = 1;
        },
        bindDeviceSubmit(){
            let {num, county} = this.bindDevice.form;
            let params = {
                url: 'AddPublicAccountById',
                data: {
                    userId: this.id,
                    num,
                    role: 'trill',
                    county,
                }
            }
            Request.requestHandle(params, res => {
                this.$message({message: res.message, type: 'success'})
                this.bindDevice.visible = false;
                this.getDataInfo(this.currPage)
            })
        },
        // page
        queryCurrentPageList(page) {
            this.currPage = page;
            this.getDataInfo(page);
        },
    }
}
</script>


<style lang="scss" scoped>
.user-detail {
    &-nav {
        margin-bottom: 25px;
        font-size: 18px;
    }

}
</style>
