<template>
    <div class="management">
        <el-button type="primary" @click="showTime()" class="management-button">新增</el-button>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            align="center"
            prop="name"
            label="广告主">
            </el-table-column>
            <el-table-column
            align="center"
            prop="email"
            label="邮箱">
            </el-table-column>
            <el-table-column
            align="center"
            label="logo">
            <template slot-scope="scope">
                <img class="management-image" :src="scope.row.logo" />
            </template>
</el-table-column>
<el-table-column align="center" prop="url" label="URL链接">
</el-table-column>
<el-table-column align="center" prop="balance" label="账户余额（）">
</el-table-column>
<el-table-column align="center" prop="yesterdayConsume" label="昨日消费（AFDT）">
</el-table-column>
<el-table-column align="center" prop="yeasterdayClick" label="昨日点击次数">
</el-table-column>
<el-table-column align="center" prop="avgDayConsume" label="平均每次消费（AFDT）">
</el-table-column>
<el-table-column align="center" label="操作">
    <template slot-scope="scope">
                <el-button type="text" @click="showTime(scope.row.id)">修改</el-button>
            </template>
</el-table-column>
</el-table>
<el-dialog title="广告主" width="600px" :visible.sync="dialogFormVisible">
    <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="form.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="logo" :label-width="formLabelWidth">
            <div class="langer">
                <el-upload class="avatar-uploader" :show-file-list="false" :action="uploadImg" :headers="requestToken" :on-error="imgError" accept=".jpg,.png,.jpeg,.jpe,.jfif,.jif" :on-success="getLogo">
                    <img v-if="logo" :src="logo" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="form.id" type="primary" @click="change(form.id)">修改</el-button>
        <el-button v-else type="primary" @click="add()">增加</el-button>
    </div>
</el-dialog>
</div>
</template>
<script>
    import Config from '../../../utils/config';
    import Request from '../../../utils/require';
    import Cache from '../../../utils/cache';
    export default {
        data() {
            return {
                tableData: [],
                userid: this.$store.state.userid || Cache.getSession('bier_userid'),
                dialogFormVisible: false,
                form: {
                    name: '',
                    email: '',
                    id:'',
                },
                logo: '',
                formLabelWidth: '50px',
                uploadImg: Config.UploadImg,
                requestToken: {
                    token: this.$store.state.token ||
                        Cache.getSession('bier_token')
                },
            }
        },
        mounted() {
            this.advertiser();
        },
        methods: {
            advertiser() {
                let params = {
                    url: 'QueryAdvertiserAll',
                    data: {
                        id: 900,
                        page: 1,
                        pageSize: 10,
                        searchStr: '',
                    },
                    type: 'get',
                };
                Request.requestHandle(params, res => {
                    this.tableData = res.data;
                });
            },
            showTime(value) {
                this.dialogFormVisible = true;
                if (value) {
                    this.queryOne(value);
                } else {
                    this.form.name = '';
                    this.form.email = '';
                    this.form.id = '';
                    this.logo = '';
                }
            },
            getLogo(res) {
                this.logo = res.data;
            },
            imgError() {
                this.$message({
                    message: '上传失败',
                    type: 'warning'
                });
            },
            add(){
                let params = {
                    url: 'AddAdvertiser',
                    data: {
                        email: this.form.email,
                        logo: this.logo,
                        name: this.form.name,
                    },
                    type: 'post',
                    flag: true,
                };
                Request.requestHandle(params, res => {
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    this.advertiser();
                    this.dialogFormVisible = false;
                });
            },
            queryOne(value) {
                let params = {
                    url: 'QueryAdvertiser',
                    data: {
                        id: value
                    },
                    type: 'get',
                };
                Request.requestHandle(params, res => {
                    this.form = res.data;
                    this.logo = res.data.logo;
                });
            },
            change(value) {
                let params = {
                    url: 'ChangeAdvertiser',
                    data: {
                        email: this.form.email,
                        logo: this.logo,
                        name: this.form.name,
                        id: value
                    },
                    type: 'put',
                    flag: true,
                };
                Request.requestHandle(params, res => {
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    this.advertiser();
                    this.dialogFormVisible = false;
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
    .management {
        &-button {
            margin-bottom: 15px;
        }
        &-image {
            height: 50px;
        }
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
        border: 1px solid #dcdfe6;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
