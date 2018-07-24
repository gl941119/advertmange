`<template>
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
			<el-table-column label="操作" align="center" >
				<template slot-scope="scope">
					<el-button size="mini" @click="pass">查看项目</el-button>
					<el-button size="mini" @click="refuse(scope.row.id)">编辑概念名</el-button>
					<!-- <el-button size="mini" @click="deleteConcept(scope.row.id)">删除</el-button> -->
				</template>
			</el-table-column>
		</el-table>
		<el-pagination background
                       layout="prev, pager, next"
                       prev-text="上一页"
                       next-text="下一页"
                       :page-size="pageSize"
                       @current-change="queryCurrentPageList"
                       :total="pageTotal"
                       style="text-align: center;">
        </el-pagination>
	</div>
</template>
<script>
	import Request from '../../../utils/require';
	import Config from '../../../utils/config';
	export default {
		data() {
			return {
				conceptListData: [],
				pageTotal: 0,
				pageSize: Config.pageSize,
				dialogFormVisible:false,
				labelPosition:'top',
				form:{
					conceptName:'',
					conceptTextarea:''
				}
			};
		},
		created() {
			this.getDataInfo();
		},
		methods: {
			addConceptLabel() {//点击新增
				this.$prompt('新增概念', '', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消'
//		          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
//		          inputErrorMessage: '邮箱格式不正确'
		        }).then(({
		        value
		        }) => {
		        	this.addConceptLink(value)
		        })
			},
			addConceptLink(name){//增加概念标签
			
				let params = {
					url:'addConceptLink',
					data: {
						name
					},
					type:'post',
					flag:true
				}
				Request.requestHandle(params, res => {
				
					if(res.success==1){
			        	this.$message({
				        	message:'新增成功',
				        	type:'success'
			        	})
		        	}
				})
			},
			deleteConcept(id){
				
				let params={
					url:'deleteConceptLink',
					data:{
						id
					},
					type:'post',
					flag:true
				}
			
				Request.requestHandle(params,res=>{
					if(res.success==1){
						
						this.$message('删除成功')
					}
				})
			},
			pass(){

			},
			getDataInfo(page = Config.pageStart) {
				let params = {
					url: 'QueryConcept',
					data: {
						page,
						pagesize: this.pageSize,
					},
					type: 'get'
				}
				Request.requestHandle(params, res => {
					this.conceptListData = res.data;
					this.pageTotal = res.total;
					
				});
			},
			queryCurrentPageList(page) {
				this.currPage = page;
				this.getDataInfo(page);
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
			confirm(value,id) {//修改概念名请求
				let params = {
					url: 'QueryChangeConceptName',
					data: {
						id: id,
						name: value,
					},
					type:'post',
					flag:true
				}
				Request.requestHandle(params, res => {
					if(res.success==1){
						this.getDataInfo();
			        	this.$message({
				        	message:'编辑成功',
				        	type:'success'
			        	})
		        	}
					
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