<template>
	<div class="user-management-list">
		<div class="user-management-list-title">
			<h3>项目审核</h3>
			<div>
				<el-select v-model="state"  placeholder="全部" style="margin-right: 20px;float: left;">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<div style="width:217px;overflow: hidden;float: left;margin-right: 20px;">
					<el-input v-model="searchStr" placeholder="请输入搜索内容"></el-input>
				</div>
				<el-button @click="getDataInfo">搜索</el-button>
			</div>
		</div>
		<!--表格-->
		<el-table ref="multipleTable" :data="bulletinListData" tooltip-effect="dark" border stripe :header-cell-class-name="tableHeaderClassName" style="width: 100%;margin-top: 20px;">
			<el-table-column prop="id" label="UID" align="center">
			</el-table-column>
			<el-table-column prop="proName" label="项目名称" align="center">
			</el-table-column>
			<el-table-column prop="company" label="代币信息" align="center">
				<template slot-scope="scope">
					<div>{{scope.row.shotEnName}}/{{scope.row.shotCnName}}/{{scope.row.fullEnName}}</div>
				</template>
			</el-table-column>
			<el-table-column prop="teamName" label="团队名称" align="center">
			</el-table-column>
			<el-table-column prop="teamContact" label="联系方式" align="center">
			</el-table-column>
			<el-table-column prop="teamLocation" label="主要成员所在地" min-width="100" align="center">
			</el-table-column>
			<el-table-column prop="status" label="状态" align="center">
				<template slot-scope="scope">
					<div v-if="scope.row.isCheck == 0">待审核</div>
					<div v-if="scope.row.isCheck == 1">已上架</div>
					<div v-if="scope.row.isCheck == 2">修改中</div>
					<div v-if="scope.row.isCheck == 3">已下架</div>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center" min-width="100" show-overflow-tooltip>
				<template slot-scope="scope">
					<div>
						<el-button size="mini" v-if="scope.row.isCheck == 1" @click="openDetails(scope.row.id,1)">编辑</el-button>
						<el-button size="mini" v-if="scope.row.isCheck == 0" @click="openDetails(scope.row.id,2)">审核</el-button>
						<el-button size="mini" v-if="scope.row.isCheck == 2" disabled>审核</el-button>
					</div>


				</template>
			</el-table-column>
			<el-table-column prop="updateTime" label="时间" align="center">
			</el-table-column>
		</el-table>
		<!--分页器-->
		<el-pagination background layout="prev, pager, next" prev-text="上一页" next-text="下一页" :page-size="pageSize" @current-change="queryCurrentPageList" :total="pageTotal" style="text-align: center;">
		</el-pagination>
	</div>
</template>
<script>
import Config from '../../../utils/config';
import Request from '../../../utils/require';
export default {
    data() {
        return {
            pageTotal: 0,
            pageSize: Config.pageSize,
            bulletinListData: [],
            currPage: 1, // 现在页面
            options: [{
                value: '-1',
                label: '全部',
            }, {
                value: '0',
                label: '待审核',
            }, {
                value: '2',
                label: '修改中',
            }, {
                value: '1',
                label: '已上架',
            }, {
                value: '3',
                label: '已下架',
            }],
            state: '-1',
            searchStr: '',
        };
    },
    created() {
        this.getDataInfo();
    },
    watch: {
        state() {
            this.getDataInfo();
        },
    },
    methods: {
        openDetails(id, value) {
            // 传入数据id
            this.$router.push({
                path: 'advertDetails/' + id + '/' + value,
                params: {
                    id: id,
                    value: value,
                },
            });
        },
        // 请求data
        getDataInfo() {
            if (this.state == '') {this.state = -1;}
            let params = {
                url: 'QueryHome',
                data: {
                    page: this.currPage,
                    pageSize: Config.pageSize,
                    state: parseInt(this.state),
                    searchStr: this.searchStr,
                },
                type: 'get',
            };

            Request.requestHandle(params, res => {
                this.bulletinListData = res.data;
                this.pageTotal = res.total;
            });
        },
        // 分页器翻页
        queryCurrentPageList(page) {
            this.currPage = page;
            this.getDataInfo();
        },
        showPublicAccount(item) {
            this.$router.push({
                name: 'tikpublic',
                query: {
                    subusername: item.username,
                    id: item.id,
                },
            });
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
			&>h3 {
				color: $textColor;
				height: 23px;
				line-height: 23px;
				/*color: rgba(16, 16, 16, 1);*/
				font-size: 16px;
				text-align: left;
			}
		}
	}
</style>
