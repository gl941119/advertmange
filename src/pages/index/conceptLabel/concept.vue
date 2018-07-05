<template>
	<div class="user-management-list">
		<div class="user-management-list-title">
			<h3>概念标签管理</h3>
			<el-button @click="addConceptLabel">新增</el-button>
		</div>
		<el-table ref="multipleTable" :data="conceptListData" border tooltip-effect="dark" stripe :header-cell-class-name="tableHeaderClassName" style="width: 100%">
			<el-table-column prop="name" label="概念" align="center">
			</el-table-column>
			<el-table-column prop="type" label="项目数" align="center">
			</el-table-column>
			<el-table-column prop="type" label="项目累计点击" align="center">
			</el-table-column>
			<el-table-column prop="type" label="标签创建时间" align="center">
			</el-table-column>
			<el-table-column label="操作" align="center" show-overflow-tooltip>
				<template slot-scope="scope">
					<el-button size="mini" @click="pass">查看项目</el-button>
					<el-button size="mini" @click="refuse(scope.row.id)">编辑概念名</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
<script>
	import Request from '../../../utils/require';
	import Config from '../../../utils/config';
	export default {
		data() {
			return {
				conceptListData: [],
				pageSize: Config.pageSize,
			};
		},
		created() {
			this.getDataInfo();
		},
		methods: {
			addConceptLabel() {

			},
			pass() {

			},
			getDataInfo(page = Config.pageStart) {
				let params = {
					url: 'QueryConcept',
					data: {
						page,
						pagesize: this.pageSize,
					},
					type: 'get',
				}
				Request.requestHandle(params, res => {
					this.conceptListData = res.data;
					console.log(res)
				});
			},
			confirm(value,id) {
				let params = {
					url: 'QueryConcept',
					data: {
						id: id,
						name: value,
					},
				}
				Request.requestHandle(params, res => {
					console.log(res);
//					this.getDataInfo();
				});
			},
			refuse(id) {
				this.$prompt('编辑概念名', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				}).then(({
					value
				}) => {
					this.confirm(value, id);
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消输入'
					});
				});
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