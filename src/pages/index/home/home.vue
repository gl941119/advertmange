<template>
	<div class="user-management-list">
		<div class="user-management-list-title">
			<h3>项目审核</h3>
			<div>
			<el-select v-model="value4" clearable placeholder="全部" style="margin-right: 20px;">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-button>搜索</el-button>
			</div>
		</div>
		<el-table ref="multipleTable" :data="bulletinListData" tooltip-effect="dark" border stripe :header-cell-class-name="tableHeaderClassName" style="width: 100%;margin-top: 20px;">
			<el-table-column prop="username" label="项目名称" align="center">
			</el-table-column>
			<el-table-column prop="company" label="代币信息" align="center">
			</el-table-column>
			<el-table-column prop="status" label="团队名称" :formatter="statusFormat" align="center">
			</el-table-column>
			<el-table-column prop="status" label="联系方式" :formatter="statusFormat" align="center">
			</el-table-column>
			<el-table-column prop="status" label="主要成员所在地" :formatter="statusFormat" min-width="100" align="center">
			</el-table-column>
			<el-table-column prop="status" label="状态" :formatter="statusFormat" align="center">
			</el-table-column>
			<el-table-column label="操作" align="center" min-width="100" show-overflow-tooltip>
				<template slot-scope="scope">
					<el-button size="mini" @click="showDevice(scope.row)">修改</el-button>
					<el-button size="mini" @click="editUserInfo(scope.row)">查看</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="status" label="时间" :formatter="statusFormat" align="center">
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
				id: this.$store.state.id || Cache.getSession('bier_userid'),
				bulletinListData: [],
			}
		},
		created() {
			this.getDataInfo();
		},
		methods: {
			getDataInfo(page = Config.pageStart) {
				let params = {
					url: 'QueryAccountInfo',
					data: {
						page,
						pagesize: this.pageSize,
					}
				}
				Request.requestHandle(params, res => {
					res.data.forEach(item => {
						item.showInitial = false;
						item.showFrozen = false;
					})
					this.bulletinListData = res.data;
				});
			},
			statusFormat(row) {
				let status = row.status;
				switch(status) {
					case 0:
						return '冻结';
						break;
					case 1:
						return '正常';
						break;
					case 2:
						return '审核中';
						break;
				}
			},
			showDevice(item) {
				/*let type = Cache.getSession('platform_type') || this.$store.state.type;
				this.$router.push({
					name: type === 'amazon' ? 'userdetail' : 'tikuserdetail',
					query: {
						subusername: item.username,
						id: item.id
					}
				});*/
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
				/*let {
					id,
					username,
					realname,
					password,
					tel,
					company
				} = item;
				this.bulletinFormInfo.title = '修改用户信息';
				this.bulletinFormInfo.type = 'edit';
				this.bulletinFormInfo.form = {
					id,
					username,
					realname,
					password,
					tel,
					company
				};
				this.bulletinFormInfo.visible = true;*/
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