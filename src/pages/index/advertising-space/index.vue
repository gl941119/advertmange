<template>
    <div class="user-management-list">

        <div>
            <div class="user-management-list-title">
                <h3>首页钻展位</h3>
                <!--<el-button @click="saveAllChange">保存更改</el-button>-->
            </div>
            <el-menu :default-active="activeIndex" ref='qq' class="el-menu-demo" mode="horizontal"
                     @select="handleSelect" background-color="#555c67" text-color='white'
                     active-text-color='rgb(255, 208, 75)'>
                <el-submenu index="1">
                    <template slot="title">{{menuDefault}}</template>
                    <el-menu-item index="中国">中国</el-menu-item>
                    <el-menu-item index="英文">英文</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">{{pcOrMobile}}</template>
                    <el-menu-item index="PC">PC</el-menu-item>
                    <el-menu-item index="Wap">Wap</el-menu-item>
                </el-submenu>
            </el-menu>
            <el-table ref="multipleTable" :data="bannerListData" @cell-click="bannerCellClick" border
                      tooltip-effect="dark" stripe :header-cell-class-name="tableHeaderClassName" style="width: 100%">
                <el-table-column label="位次" align="center">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.advertSort" @change="change(scope.row,scope.$index)"
                                   placeholder="请选择">
                            <el-option v-for="item in options" :key="item.value" :label="item.label"
                                       :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="图片" align="center">
                    <template slot-scope="scope">
                        <el-upload class="avatar-uploader" :action="uploadImg" :headers="requestToken"
                                   :show-file-list="false" :on-success="getImg" :limit="1" accept='.jpg,jpeg,.png'>
                            <img v-if="scope.row.banner" :src="scope.row.banner" class="avatar">
                            <button v-else size="small" class="avatar-uploader-icon" type="primary">点击上传</button>
                        </el-upload>
                    </template>
                </el-table-column>
                <el-table-column label="链接" align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.advertUrl">{{scope.row.advertUrl}}</div>
                        <el-button size="mini" v-else @click="addBannerLink(scope.row,1)">添加</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button size="mini" @click="addBannerLink(scope.row,1)">修改链接</el-button>
                        <el-button size="mini" slot="reference" @click="deleted(scope.row.id,1)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--页面二级页-->
        <div>
            <div class="user-management-list-title">
                <h3>项目二级页</h3>
                <!--<el-button @click="saveAllChange">保存更改</el-button>-->
            </div>
            <el-table ref="multipleTable" :data="advertListData" border tooltip-effect="dark" stripe
                      :header-cell-class-name="tableHeaderClassName" style="width: 100%" @cell-click="advertCellClick">
                <el-table-column prop="type" label="位次" align="center">
                    <template slot-scope="scope">
                        <el-select v-model="advertOptions[0].value" placeholder="请选择">
                            <el-option v-for="item in advertOptions" :key="item.value" :label="item.label"
                                       :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="图片" align="center">
                    <template slot-scope="scope">
                        <el-upload class="avatar-uploader" :action="uploadImg" :show-file-list="false"
                                   :on-success="advertGetImg" :headers="requestToken" accept='.jpg,jpeg,.png'>
                            <img v-if="scope.row.banner" :src="scope.row.banner" class="avatar">
                            <button v-else size="small" class="avatar-uploader-icon" type="primary">点击上传</button>
                        </el-upload>
                    </template>
                </el-table-column>
                <el-table-column label="链接" align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.advertUrl">{{scope.row.advertUrl}}</div>
                        <el-button v-else size="mini" @click="addBannerLink(scope.row,3)">添加</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button size="mini" @click="addBannerLink(scope.row,3)">修改链接</el-button>
                        <el-button size="mini" slot="reference" @click="deleted(scope.row.id,3)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--众筹二级页-->
        <div>
            <div class="user-management-list-title">
                <h3>众筹二级页</h3>
                <!--<el-button @click="saveAllChange">保存更改</el-button>-->
            </div>
            <el-table ref="multipleTable" :data="crowdListData" border tooltip-effect="dark" stripe
                      :header-cell-class-name="tableHeaderClassName" style="width: 100%" @cell-click="crowdCellClick">
                <el-table-column prop="type" label="位次" align="center">
                    <template slot-scope="scope">
                        <el-select v-model="crowdOptions[0].value" placeholder="请选择">
                            <el-option v-for="item in crowdOptions" :key="item.value" :label="item.label"
                                       :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="图片" align="center">
                    <template slot-scope="scope">
                        <el-upload class="avatar-uploader" :action="uploadImg" :show-file-list="false"
                                   :on-success="crowdGetImg" :headers="requestToken" accept='.jpg,jpeg,.png'>
                            <img v-if="scope.row.banner" :src="scope.row.banner" class="avatar"/>
                            <button v-else size="small" class="avatar-uploader-icon" type="primary">点击上传</button>
                        </el-upload>
                    </template>
                </el-table-column>
                <el-table-column label="链接" align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.advertUrl">{{scope.row.advertUrl}}</div>
                        <el-button size="mini" v-else @click='addBannerLink(scope.row,2)'>添加</el-button>
                    </template>

                </el-table-column>
                <el-table-column label="操作" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button size="mini" @click='addBannerLink(scope.row,2)'>修改链接</el-button>
                        <el-button size="mini" slot="reference" @click="deleted(scope.row.id,2)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
    import Request from '../../../utils/require';
    import Config from '../../../utils/config';
    import Cache from '../../../utils/cache';
    import axios from 'axios';

    export default {
        data() {
            return {
                value: '',
                options: [{
                    value: '1',
                    label: '1',
                }, {
                    value: '2',
                    label: '2',
                }, {
                    value: '3',
                    label: '3',
                }, {
                    value: '4',
                    label: '4',
                }, {
                    value: '5',
                    label: '5',
                }],
                advertOptions: [{
                    value: '1',
                    label: '1',
                }],
                crowdOptions: [{
                    value: '1',
                    label: '1',
                }],
                homeListData: [{}],
                bannerListData: [], //banner列表数据
                crowdListData: [], //众筹列表
                advertListData: [], //广告列表
                banner: '',
                pageSize: 5,
                imageUrl: '',
                accountId: this.$store.state.userid || Cache.getSession('bier_userid'),
                id: '',
                advertProjId: '',
                advertSort: '',
                uploadImg: Config.UploadImg,
                requestToken: {
                    token: this.$store.state.token || Cache.getSession('bier_token'),
                },
                crowdImg: '',
                bannerCellClickData: '',
                advertCellClickData: '',
                crowdCellClickData: '',
                activeIndex: '1', //下拉菜单默认
                menuDefault: '中国',
                pcOrMobile: 'PC',
                lang: 'zh',
                advertType:'0',
            };
        },
        created() {
            this.getAdvertisingInfo();
        },
        mounted() {

        },
        methods: {
            handleSelect(key, keyPath) {
                if(keyPath[0] === '1'){
                    this.menuDefault = key;
                    if (key == '中国') {
                        this.lang = 'zh';
                    }
                    if (key == '英文') {
                        this.lang = 'EN';
                    }
                }else{
                    this.pcOrMobile = key;
                    if (key == 'PC') {
                        this.advertType = '0';
                    }
                    if (key == 'Wap') {
                        this.advertType = '1';
                    }
                }
                this.getAdvertisingInfo();
            },
            bannerCellClick(row) {
                this.bannerCellClickData = row;
            },
            crowdCellClick(row) {
                this.crowdCellClickData = row;
            },
            advertCellClick(row) {
                this.advertCellClickData = row;
            },
            saveAllChange() {
                this.getadvertising(1, 1); //banner
                this.$message('保存成功');
            },
            getAdvertisingInfo() { //请求
                this.getadvertising(1, 1); //banner
                this.getadvertising(1, 2); //众筹
                this.getadvertising(1, 3); //项目
            },
            getadvertising(page, advertPosition) {
                let params = {
                    url: 'QueryAdvertisingBanner',
                    data: {
                        page,
                        advertPosition,
                        pagesize: this.pageSize,
                        lang: this.lang,
                        advertType:this.advertType
                    },
                    type: 'get',
                };
                Request.requestHandle(params, res => {

                    if (advertPosition === 1) {
                        this.bannerListData = res.data;
                    }
                    if (advertPosition == 2) {
                        this.crowdListData = res.data;
                    }
                    if (advertPosition == 3) {
                        this.advertListData = res.data;

                    }
                });
            },
            deleted(id, type) { //banner删除
                let params = {
                    url: 'DeletedAdvertising',
                    data: {
                        id: id,
                        advertType:this.advertType
                    },
                    type: 'post',
                };
                Request.requestHandle(params, res => {
                    if (res.success == 1) {
                        this.$message('删除成功');
                        this.flush(type); //刷新
                    }
                });
            },
            addBannerLink(item, type) {
                // console.log(item);
                this.$prompt('请输入链接', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({
                             value,
                         }) => {

                    if (value == null) {
                        this.$message('输入不能为空');
                        return;
                    }
                    if (type == 1) {
                        this.bannerCellClickData.advertUrl = value;
                        this.saveChange(item);
                    }
                    if (type == 2) {

                        this.crowdCellClickData.advertUrl = value;
                        this.corwdSaveChange(item);
                    }
                    if (type == 3) {
                        this.advertCellClickData.advertUrl = value;
                        this.advertSaveChange(item);
                    }
                });
            },
            saveChange(item) { //修改增加接口
                let params = {
                    url: 'ChangeAdvertisingBanner',
                    data: {
                        advertisements: [{
                            advertSort: item.advertSort,
                            advertUrl: item.advertUrl,
                            advertType:this.advertType,
                            banner: item.banner,
                            id: item.id,
                        }],
                        lang: this.lang,
                    },
                    type: 'post',
                    flag: true,
                };
                Request.requestHandle(params, res => {
                    if (res.success == 1) {
                        this.$message('保存成功');
                        this.flush(1); //banner
                    }
                });
            },
            corwdSaveChange(item) { //修改增加接口众筹
                let params = {
                    url: 'ChangeAdvertisingBanner',
                    data: {
                        advertisements: [{
                            advertSort: item.advertSort,
                            advertUrl: item.advertUrl,
                            advertType:this.advertType,
                            banner: item.banner,
                            id: item.id,
                        }],
                        lang: this.lang,
                    },
                    type: 'post',
                    flag: true,
                };
                Request.requestHandle(params, res => {
                    if (res.success == 1) {
                        this.$message('保存成功');
                        this.flush(2); //众筹
                    }
                });
            },

            advertSaveChange(item) { //修改增加接口广告
                let params = {
                    url: 'ChangeAdvertisingBanner',
                    data: {
                        advertisements: [{
                            advertSort: item.advertSort,
                            advertUrl: item.advertUrl,
                            advertType:this.advertType,
                            banner: item.banner,
                            id: item.id,

                        }],
                        lang: this.lang,
                    },
                    type: 'post',
                    flag: true,
                };

                Request.requestHandle(params, res => {

                    if (res.success == 1) {
                        this.$message('保存成功');
                        this.flush(3); //广告
                    }
                });
            },
            change(row, index) { //点击位次改变

                let params = {
                    url: 'ChangeAdvertisingSort',
                    data: {
                        advertSort: parseInt(row.advertSort),
                        advertUrl: row.advertUrl,
                        advertType:this.advertType,
                        banner: row.banner,
                        id: row.id,
                    },
                    type: 'post',
                    flag: true,
                };
                Request.requestHandle(params, res => {
                    this.$message('修改成功');
                    this.flush(1); //banner
                });
            },
            getImg(res) {
                let len = this.bannerCellClickData.advertSort - 1;
                this.bannerListData[len].banner = res.data;
                let cen = this.bannerCellClickData;
                this.saveChange(cen);
            },
            advertGetImg(res) {
                this.advertListData[0].banner = res.data;
                let cen = this.advertCellClickData;
                this.advertSaveChange(cen);

            },
            crowdGetImg(res) {

                this.crowdListData[0].banner = res.data;
                let cen = this.crowdCellClickData;
                this.corwdSaveChange(cen);

            },
            flush(type) { //刷新
                if (type == 1) {
                    this.getadvertising(1, 1);
                } //banner
                if (type == 2) {
                    this.getadvertising(1, 2);
                } //众筹
                if (type == 3) {
                    this.getadvertising(1, 3);
                } //项目

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
        font-size: 14px;
        color: black;
        width: 85px;
        height: 40px;
        border-radius: 5px;
        background: #ffffff;
        border: 1px solid #eeeeee;
        text-align: center;
    }

    .avatar {
        width: 260px;
        height: 80px;
        display: block;
    }

    .el-submenu {
        border: 1px solid #a99898;
        border-radius: 30px;
    }


</style>
