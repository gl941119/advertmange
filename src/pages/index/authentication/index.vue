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
				<el-table-column prop="realName" label="姓名" align="center">
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
					console.log(res);
					this.authenticationData = res.data;
				});
			},
			isPass(id,value) {
				let params = {
					url: 'ChangeRefuseOrPass',
					data: {
						authStatus: value,
						id: id
					},
					flag:true,
				}
				Request.requestHandle(params, res => {
					if(res.data.success == 1){
						this.$message('修改成功');
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