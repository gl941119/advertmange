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
				<el-table-column label="操作" align="center" show-overflow-tooltip>
					<template slot-scope="scope">
						<el-button size="mini" @click="auditBtn(scope.row)">审核</el-button>
					</template>
				</el-table-column>
			</el-table>

			<!--审核弹窗-->
			<el-dialog title="身份证审核" :visible.sync="dialogFormVisible" custom-class='auditDialog'>
				<p style="font-size: 20px;">姓名:<span>{{dialog.realname}}</span></p>
				<p style="font-size: 20px;margin-top: 10px;">身份证号: <span>{{dialog.idNum}}</span></p>
				<div style="overflow: hidden;margin-top: 30px;">
					<div class="idFrontAndSite">
						<img :src="dialog.idFront" alt="" />
						<img :src="dialog.idSite" style="margin-top: 9px;"/>
					</div>
					<img :src="dialog.idHeader" alt=""  style="float: left;margin-left: 5px;"/>
				</div>
				<div slot="footer" class="dialog-footer">
				    <el-button @click="isPass(3)">拒绝</el-button>
				    <el-button type="primary" @click="isPass(1)">通过</el-button>
				</div>
			</el-dialog>

			<!--分页器-->
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
				dialogFormVisible:false,
				dialog:{}
			}
		},
		created() {
			this.getDataInfo();

		},
		methods: {
			auditBtn(row){//dialog弹窗
				this.dialogFormVisible = true;
				this.dialog = row;

				let arr = this.dialog.idImg.split(',');
				this.dialog.idFront = arr[0];
				this.dialog.idSite = arr[1];
				this.dialog.idHeader = arr[2];
			},
			getDataInfo(page = Config.pageStart) {
				let params = {
					url: 'QueryAuthentication',
					data: {
						page,
						pagesize: this.pageSize,
					},
					type: 'get',
				};
				Request.requestHandle(params, res => {
					this.authenticationData = res.data;
					this.pageTotal = res.total;

				});
			},
			queryCurrentPageList(page) {
				this.currPage = page;
				this.getDataInfo(page);
			},
			isPass(type) {
				if(type==3){
					 this.$prompt('', '拒绝理由', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          inputPattern: /\S/,
			          inputErrorMessage: '请输入理由'
			        }).then(({ value }) => {
			          	this.isPassQuery(type,value)
			        })
		        }else{
		        	this.isPassQuery(type)
		        }
			},
			isPassQuery(type,value=null){
				let params = {
					url: 'ChangeRefuseOrPass',
					data: {
						authStatus: type,
						id: this.dialog.id,
						noPassReason:value
					},
					flag: true,
				};
				Request.requestHandle(params, res => {
					if(res.success == 1) {
						this.$message('提交成功');
						this.dialogFormVisible = false;
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

<style lang="scss" >
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
	.auditDialog{

	}
	.idFrontAndSite{
		width: 175px;
		float: left;

	}
</style>
