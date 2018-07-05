<template>
	<div class="user-management-list">
		<div class="user-management-list-title">
			<h3>项目审核</h3>
			<div>
				<el-select v-model="state" clearable placeholder="全部" style="margin-right: 20px;float: left;">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<div style="width: 217px;overflow: hidden;float: left;margin-right: 20px;">
					<el-input v-model="searchStr" placeholder="请输入搜索内容"></el-input>
				</div>
				<el-button @click="getDataInfo">搜索</el-button>
			</div>
		</div>
		<el-table ref="multipleTable" :data="projectData" @row-click="openDetails" tooltip-effect="dark" border stripe :header-cell-class-name="tableHeaderClassName" style="width: 100%;margin-top: 20px;">
			<el-table-column prop="accountId" label="UID" align="center">
			</el-table-column>
			<el-table-column label="代币信息" align="center">
				<template slot-scope="scope">
					<div>{{scope.row.shotEnName}}/{{scope.row.shotCnName}}/{{scope.row.fullEnName}}</div>
				</template>
			</el-table-column>
			<el-table-column prop="title" label="本轮众筹标题" align="center">
			</el-table-column>
			<el-table-column prop="teamName" label="团队名称" align="center">
			</el-table-column>
			<el-table-column prop="teamContact" label="联系方式" align="center">
			</el-table-column>
			<el-table-column prop="teamLocation" label="主要成员所在地" min-width="100" align="center">
			</el-table-column>
			<el-table-column prop="status" label="状态" align="center">
				<template slot-scope="scope">
					<div>
						<div v-if="scope.row.isCheck == 0">待审核</div>
						<div v-if="scope.row.isCheck == 1">已上架</div>
						<div v-if="scope.row.isCheck == 2">修改中</div>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center" min-width="100" show-overflow-tooltip>
				<template slot-scope="scope">
					<div>
						<el-button size="mini" v-if="scope.row.isModify == 1" @click="showDevice()">允许修改</el-button>
						<el-button size="mini" v-if="scope.row.isModify == 0" @click="editUserInfo()">不允许修改</el-button>
						<el-button size="mini" v-if="scope.row.isCheck == 1" @click="showDevice()">查看</el-button>
						<el-button size="mini" v-if="scope.row.isCheck == 0" @click="editUserInfo()">审核</el-button>
						<el-button size="mini" v-if="scope.row.isCheck == 2" disabled>审核</el-button>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="updateTime" label="时间" align="center">
			</el-table-column>
		</el-table>
	</div>
</template>
<script>
	import Config from '../../../utils/config';
	import Request from '../../../utils/require';
	import Cache from '../../../utils/cache';
	export default {
		data() {
			return {
				pageSize: Config.pageSize,
				projectData: [],
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
				}],
				state: '-1',
				searchStr: '',
			}
		},
		created() {
			this.getDataInfo();
		},
		methods: {
			openDetails(row) {
				console.log(row.id);
				this.$router.push({
					path: 'crowdfundingDetail/'+ row.id,
					params: {
						id: row.id,
					}
				});
			},
			getDataInfo(page = Config.pageStart) {
				let params = {
					url: 'QueryCrowdfunding',
					data: {
						page,
						pagesize: this.pageSize,
						state: this.state,
						searchStr: this.searchStr,
					},
					type: 'get',
				}
				Request.requestHandle(params, res => {
					console.log(res)
					this.projectData = res.data;
				});
			},
			showDevice(item) {

			},
			showPublicAccount(item) {
				this.$router.push({
					name: 'tikpublic',
					query: {
						subusername: item.username,
						id: item.id
					}
				});
			},
			editUserInfo(item) {

			},
			tableHeaderClassName({
				row,
				rowIndex
			}) {
				return 'custom-header';
			},
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