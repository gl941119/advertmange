<template>
    <div class="user-management-list material-content">
        <div class="user-management-list-title">
            <h3>反馈列表({{pageTotal}})</h3>
        </div>
        <el-row :gutter="20"
                class="material-content-top">
            <el-col :span="14"
                    :offset="4"
                    class="material-content-top-middle">
                <span class="material-content-top-middle-span">反馈类型:</span>
                <el-select v-model="feedbackType"
                           size="small"
                           class="material-content-top-middle-select"
                           @change="queryListByType"
                           placeholder="请选择">
                    <el-option v-for="item in typeOptions"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                </el-select>
                <span class="material-content-top-middle-span">反馈状态:</span>
                <el-select v-model="feedbackStatus"
                           size="small"
                           class="material-content-top-middle-select"
                           @change="queryListByStatus"
                           placeholder="请选择">
                    <el-option v-for="item in statusOptions"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-table ref="multipleTable"
                  :data="bulletinListData"
                  tooltip-effect="dark"
                  stripe
                  :header-cell-class-name="tableHeaderClassName"
                  style="width: 100%">
            <el-table-column prop="types"
                             label="反馈类型"
                             align="center">
            </el-table-column>
            <el-table-column prop="bodys"
                             label="反馈内容"
                             align="center">
            </el-table-column>
            <el-table-column prop="status"
                             label="状态"
                             :formatter="statusFormat"
                             align="center">
            </el-table-column>
            <el-table-column prop="replays"
                             label="回复内容"
                             align="center">
            </el-table-column>
            <el-table-column prop="uname"
                             label="回复人"
                             align="center">
            </el-table-column>
            <el-table-column prop="time"
                             label="创建时间"
                             align="center">
            </el-table-column>
            <el-table-column label="操作"
                             align="center"
                             show-overflow-tooltip>
                <template slot-scope="scope"
                          v-if="scope.row.status===0">
                    <el-button size="mini"
                               @click="showDevice(scope.row)">回复反馈</el-button>
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
        <el-dialog :title="feedbackFormInfo.title"
                   width='30%'
                   :visible.sync="feedbackFormInfo.visible">
            <el-form :model="feedbackFormInfo.form">
                <el-form-item label="回复内容"
                              :label-width="feedbackFormInfo.formLabelWidth">
                    <el-input placeholder="回复内容,必选"
                              type="textarea"
                              :autosize="{minRows: 4, maxRows: 8}"
                              v-model="feedbackFormInfo.form.replays"></el-input>
                </el-form-item>
                <el-form-item label="回复人"
                              :label-width="feedbackFormInfo.formLabelWidth">
                    <el-input placeholder="回复人,必选"
                              v-model="feedbackFormInfo.form.uname"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer"
                 class="dialog-footer">
                <el-button @click="feedbackFormInfo.visible = false">取 消</el-button>
                <el-button type="primary"
                           @click="feedbackFormInfoSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import Request from '../../../utils/require';
import Config from '../../../utils/config';
import Cache from '../../../utils/cache';
export default {
    data() {
        return {
            pageTotal: 0,
            pageSize: Config.pageSize,
            id: this.$store.state.id || Cache.getSession('bier_userid'),
            currPage: undefined,
            bulletinListData: [],
            feedbackType: '全部',
            typeOptions: [
                { value: '全部', label: '全部' },
                { value: '我的账号', label: '我的账号' },
                { value: '任务管理', label: '任务管理' },
                { value: '操作设置', label: '操作设置' },
                { value: '素材管理', label: '素材管理' },
                { value: '数据管理', label: '数据管理' },
                { value: '其他', label: '其他' }
            ],
            feedbackStatus: 2,
            statusOptions: [
                { value: 2, label: '全部' },
                { value: 0, label: '未处理' },
                { value: 1, label: '已处理' }
            ],
            feedbackFormInfo: {
                title: '回复反馈内容',
                visible: false,
                formLabelWidth: '100px',
                form: {}
            }
        };
    },
    created() {
        this.getDataInfo();
    },
    methods: {
        getDataInfo(status = null, types = null, page = Config.pageStart) {
            let params = {
                url: 'QueryFeedback',
                data: {
                    page,
                    pagesize: this.pageSize,
                    status,
                    types
                }
            };
            Request.requestHandle(params, res => {
                this.bulletinListData = res.data;
                this.pageTotal = res.total;
            });
        },
        queryListByType(v) {
            v === '全部' ? this.getDataInfo() : this.getDataInfo(null, v);
        },
        queryListByStatus(v) {
            v === 2 ? this.getDataInfo() : this.getDataInfo(v, null);
        },
        statusFormat(row) {
            let status = row.status;
            switch (status) {
                case 0:
                    return '未处理';
                    break;
                case 1:
                    return '已处理';
                    break;
            }
        },
        showDevice(item) {
            this.feedbackFormInfo.form.id = item.id;
            this.feedbackFormInfo.visible = true;
        },
        feedbackFormInfoSubmit() {
            let { id, replays, uname } = this.feedbackFormInfo.form;
            if (replays && uname) {
                let params = {
                    url: 'ReplyFeedback',
                    data: {id, replays, uname}
                };
                Request.requestHandle(params, res => {
                    this.getDataInfo(null, null, this.currPage);
                    this.feedbackFormInfo.visible = false;
                    this.$message({
                        message: res.message,
                        type: 'success'
                    });
                });
            } else {
                this.$message({
                    message: '信息尚未填完整',
                    type: 'warning'
                });
            }
        },
        queryCurrentPageList(page) {
            this.currPage = page;
            this.getDataInfo(page);
        },
        tableHeaderClassName({ row, rowIndex }) {
            return 'custom-header';
        }
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
