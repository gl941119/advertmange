<template>
    <div class="user-management-list">
        <div class="user-management-list-title">
            <h3>公告日志({{pageTotal}})</h3>
            <el-button @click="addBulletin">添加</el-button>
        </div>
        <el-table ref="multipleTable"
                  :data="bulletinListData"
                  tooltip-effect="dark"
                  stripe
                  :header-cell-class-name="tableHeaderClassName"
                  style="width: 100%">
            <el-table-column prop="type"
                             label="类型"
                             width="130"
                             align="center">
            </el-table-column>
            <el-table-column label="内容">
                <template slot-scope="scope">
                    <div>
                        {{scope.row.content}}
                        <a class="user-management-list-link"
                           v-if="scope.row.url"
                           :href="scope.row.url"
                           download>下载附件</a>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="createtime"
                             label="更新时间"
                             width="200"
                             align="center">
            </el-table-column>
            <el-table-column label="操作"
                             align="center"
                             width="220"
                             show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-button size="mini"
                               @click="editBulletin(scope.row)">修改</el-button>

                    <el-popover placement="top"
                                width="160"
                                trigger="click"
                                v-model="scope.row.showDelete">
                        <p>确定删除吗？</p>
                        <div style="text-align: right; margin-top: 5px;">
                            <el-button size="mini"
                                       type="text"
                                       @click="scope.row.showDelete = false">取消</el-button>
                            <el-button type="primary"
                                       size="mini"
                                       @click="deleteBulletin(scope.$index, scope.row)">确定</el-button>
                        </div>
                        <el-button size="mini"
                                   type="danger"
                                   slot="reference"
                                   @click="scope.row.showDelete = true">删除</el-button>
                    </el-popover>
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
        <el-dialog :title="bulletinFormInfo.title"
                   width='30%'
                   :visible.sync="bulletinFormInfo.visible">
            <el-form :model="bulletinFormInfo.form">
                <el-form-item label="类型"
                              :label-width="bulletinFormInfo.formLabelWidth">
                    <el-input placeholder="类型,必选"
                              v-model="bulletinFormInfo.form.type"></el-input>
                </el-form-item>
                <el-form-item label="内容"
                              :label-width="bulletinFormInfo.formLabelWidth">
                    <el-input type="textarea"
                              :autosize="{minRows: 4, maxRows: 8}"
                              placeholder="请输入内容,必选"
                              v-model="bulletinFormInfo.form.content"></el-input>
                </el-form-item>
                <el-form-item label="上传附件"
                              :label-width="bulletinFormInfo.formLabelWidth">
                    <el-upload class="upload-demo"
                               :action="bulletinFormInfo.commentUploadUrl"
                               :headers="bulletinFormInfo.header"
                               :on-error="handleError"
                               :on-success="handleSuccess"
                               :on-remove="handleRemove"
                               :file-list="bulletinFormInfo.form.fileList">
                        <el-button size="small"
                                   type="primary">点击上传附件</el-button>
                        <div slot="tip"
                             class="el-upload__tip">可选，只能上传一个附件</div>
                    </el-upload>
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
            bulletinFormInfo: {
                title: '添加公告',
                type: 'add',
                formLabelWidth: '100px',
                form: {},
                visible: false,
                fileList: [],
                commentUploadUrl: Config.UploadBulletinFileUrl,
                header: {
                    token:
                        this.$store.state.token ||
                        Cache.getSession('bier_token')
                }
            }
        };
    },
    created() {
        this.getDataInfo();
    },
    methods: {
        getDataInfo(page = Config.pageStart) {
            let params = {
                url: 'QueryBulletin',
                data: {
                    page,
                    pagesize: this.pageSize
                }
            };
            Request.requestHandle(params, res => {
                res.data.forEach(item => {
                    item.showDelete = false;
                });
                this.bulletinListData = res.data;
                this.pageTotal = res.total;
            });
        },
        addBulletin() {
            this.bulletinFormInfo.title = '添加公告';
            this.bulletinFormInfo.type = 'add';
            this.bulletinFormInfo.form = {
                fileList: []
            };
            this.bulletinFormInfo.visible = true;
        },
        editBulletin(item) {
            let { id, type, content, url } = item;
            this.bulletinFormInfo.title = '修改公告';
            this.bulletinFormInfo.type = 'edit';
            this.bulletinFormInfo.form = { id, type, content };
            url
                ? (this.bulletinFormInfo.form.fileList = [
                      { name: '已上传一个文件', url }
                  ])
                : (this.bulletinFormInfo.form.fileList = []);
            this.bulletinFormInfo.visible = true;
        },
        bulletinFormInfoSubmit() {
            let { id, type, content, fileList } = this.bulletinFormInfo.form;
            if (type && content) {
                let params,
                    url = null;
                if (fileList.length) {
                    url = fileList[0].url;
                }
                if (this.bulletinFormInfo.type === 'add') {
                    params = {
                        url: 'AddBulletin',
                        data: { type, content, url }
                    };
                } else if (this.bulletinFormInfo.type === 'edit') {
                    params = {
                        url: 'UpdateBulletin',
                        data: { id, type, content, url }
                    };
                } else {
                    console.error('type error!', this.bulletinFormInfo.type);
                    return;
                }
                params &&
                    Request.requestHandle(params, res => {
                        this.bulletinFormInfo.visible = false;
                        this.getDataInfo(this.currPage);
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
        deleteBulletin(i, item) {
            let params = {
                url: 'DeleteBulletin',
                data: {
                    id: item.id
                }
            };
            Request.requestHandle(params, res => {
                this.getDataInfo(this.currPage);
                this.$message({
                    message: res.message,
                    type: 'success'
                });
            });
        },
        queryCurrentPageList(page) {
            this.currPage = page;
            this.getDataInfo(page);
        },
        tableHeaderClassName({ row, rowIndex }) {
            return 'custom-header';
        },
        handleError(res) {
            console.error('upload error!', res);
            this.$message.error({
                message: res.message
            });
        },
        handleSuccess(res) {
            if (res.success !== 1) {
                this.$message.error({ message: res.message });
            } else {
                this.bulletinFormInfo.form.fileList[0].url = res.data;
            }
        },
        handleRemove(file, fileList) {
            this.bulletinFormInfo.form.fileList = [];
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
    &-link {
        font-size: 14px;
        color: $anchorColor;
        margin-left: 20px;
    }
}
</style>
