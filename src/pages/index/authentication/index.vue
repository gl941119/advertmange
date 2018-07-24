<template>
	<div class="user-management-list">
		<div>
			<div class="user-management-list-title">
				<h3>KYC待审核</h3>
			</div>
			<el-table ref="multipleTable" :data="authenticationData" border tooltip-effect="dark" stripe :header-cell-class-name="tableHeaderClassName" style="width: 100%">
				<el-table-column prop="id" label="用户ID" width="100" align="center">
				</el-table-column>
				<el-table-column prop="country" label="国家和地区" align="center">
				</el-table-column>
				<el-table-column prop="idType" label="身份文件类型" align="center">
				</el-table-column>
				<el-table-column prop="realname" label="姓名" align="center">
				</el-table-column>
				<el-table-column prop="idNum" label="身份文件号码" align="center">
				</el-table-column>
				<el-table-column label="手持身份文件人像页" align="center">
					<template slot-scope="scope">
						<img style="width: 100px;height: 80px;" :src="scope.row.idImg" />
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" show-overflow-tooltip>
					<template slot-scope="scope">
						<el-button size="mini" @click="isPass(scope.row.id,1)">通过</el-button>
						<el-button size="mini" @click="isPass(scope.row.id,3)">拒绝</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination background layout="prev, pager, next" prev-text="上一页" next-text="下一页" :page-size="pageSize" @current-change="queryCurrentPageList" :total="pageTotal" style="text-align: center;">
			</el-pagination>
		</div>
	</div>
</template>
<script>
	import Request from '../../../utils/require';
	import Config from '../../../utils/config';
	export default {
		data() {
			return {
				authenticationData: [{
				}],
				pageTotal: 0,
				pageSize: Config.pageSize,
			}
		},
		created() {
			this.getDataInfo();
		},
		methods: {
			
			getDataInfo(page = Config.pageStart) {
				let params = {
					url: 'QueryAuthentication',
					data: {
						page,
						pagesize: this.pageSize,
					},
					type: 'get',
				}
				Request.requestHandle(params, res => {
				
					this.authenticationData = res.data;
					this.pageTotal = res.total;
				
				});
			},
			queryCurrentPageList(page) {
				this.currPage = page;
				this.getDataInfo(page);
			},
			isPass(id, type) {
				
				if(type==3){
					 this.$prompt('', '拒绝理由', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          inputPattern: /\S/,

			          inputErrorMessage: '请输入理由'
			        }).then(({ value }) => {
			          	this.isPassQuery(id,type,value)
			        })
		        }else{
		        	this.isPassQuery(id,type)
		        }

				
			},
			isPassQuery(id,type,value){
				let noPassReason = null
				if(type==3){
					noPassReason = value
				}
				let params = {
					url: 'ChangeRefuseOrPass',
					data: {
						authStatus: type,
						id: id,
						noPassReason
					},
					flag: true,
				}
				Request.requestHandle(params, res => {
					if(res.success == 1) {
						this.$message('提交成功');
						this.getDataInfo();
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
</style>