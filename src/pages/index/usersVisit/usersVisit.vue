<template>
	<div class="user-management-list">
		<div class="user-management-list-title">
			<h3>项目审核</h3>
			<div>
				<!--<el-select v-model="state"  placeholder="全部" style="margin-right: 20px;float: left;">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>-->
				<div style="width: 217px;overflow: hidden;float: left;margin-right: 20px;">
					<el-input v-model="searchStr" placeholder="请输入搜索内容"></el-input>
				</div>
				<el-button @click="queryData">搜索</el-button>
			</div>
		</div>
		<el-table :data="tableData" style="width: 100%;margin-top: 20px;" tooltip-effect="dark" border stripe :header-cell-class-name="tableHeaderClassName">
			<el-table-column label="访问者Id" prop='createId'></el-table-column>
			<el-table-column label="账号" prop='createName'></el-table-column>
			<el-table-column label="动作" prop='action'></el-table-column>
			<el-table-column label="访问网页" prop='pageName'></el-table-column>
			<el-table-column label="时间" prop='createDate'></el-table-column>
		</el-table>
		<el-pagination layout="prev, pager, next" prev-text='上一页' next-text="下一页" :total="totalPage" @current-change='currentChange' :page-size="pageSize" background style="text-align: center;">
		</el-pagination>
	</div>
</template>

<script>
	import Config from '../../../utils/config';
	import Request from '../../../utils/require';
	import Cache from '../../../utils/cache';
	export default {
		name: 'usersVisit',
		data() {
			return {
				searchStr: undefined,
				tableData: null,
				totalPage: undefined,
				page: 1, //当前页
				pageSize: Config.pageSize

			}
		},
		created() {
			this.queryData()
		},
		methods: {
			queryData() {
				Request.requestHandle({
					url: 'QueryUsersVisitData',
					data: {
						page: this.page,
						pageSize: this.pageSize,
						searchStr: this.searchStr
					},
					type: 'get'
				}, res => {
					this.tableData = res.data;
					this.totalPage = res.total
				})
			},
			currentChange(val) {
				this.page = val;
				this.queryData()

			},
			tableHeaderClassName({
				row,
				rowIndex
			}) {
				return 'custom-header';
			},
		}

	}
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
