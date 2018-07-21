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
		<el-table ref="multipleTable" :data="projectData" tooltip-effect="dark" border stripe :header-cell-class-name="tableHeaderClassName" style="width: 100%;margin-top: 20px;">
			<el-table-column prop="id" label="UID" align="center">
			</el-table-column>
			<el-table-column label="代币信息" align="center">
				<template slot-scope="scope">
					<div>{{scope.row.shotEnName}}/{{scope.row.shotCnName}}/{{scope.row.fullEnName}}</div>
				</template>
			</el-table-column>
			<el-table-column prop="title" label="本轮众筹标题" align="center">
			</el-table-column>
			<el-table-column prop="contractId" label="合约地址" align="center">
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
						<div v-if="scope.row.isCheck == 3">已下架</div>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center" min-width="200" show-overflow-tooltip>
				<template slot-scope="scope">
					<div>
						<el-button size="mini" v-if="scope.row.isCheck == 1" @click="openDetails(scope.row.id,1)">编辑</el-button>
						<el-button size="mini" v-if="scope.row.isCheck == 0" @click="openDetails(scope.row.id,2)">审核</el-button>
						<el-button size="mini" v-if="scope.row.isCheck == 2" disabled>审核</el-button>
						<el-button size="mini" v-if="scope.row.isCheck == 1" @click='openDialog(scope.row.id)'>绑定合约地址</el-button>
						<el-dialog
						  title="绑定合约地址"
						  :visible.sync="dialogVisible"
						  width="30%"
						  :before-close="handleClose">
						  <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
							  <el-form-item label="输入合约地址">
							    <el-input v-model="formLabelAlign.address"></el-input>
							  </el-form-item>
							  <el-form-item label="输入abi">
							    <el-input v-model="formLabelAlign.abi" type="textarea"></el-input>
							  </el-form-item>
							 
							</el-form>
						  <span slot="footer" class="dialog-footer">
						    <el-button @click="dialogVisible = false">取 消</el-button>
						    <el-button type="primary" @click="submitAddress">确 定</el-button>
						  </span>
						</el-dialog>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="updateTime" label="时间" align="center">
			</el-table-column>
		</el-table>
		<el-pagination background layout="prev, pager, next" prev-text="上一页" next-text="下一页" :page-size="pageSize" @current-change="queryCurrentPageList" :total="pageTotal" style="text-align: center;">
		</el-pagination>
	</div>
</template>
<script>
	import Config from '../../../utils/config';
	import Request from '../../../utils/require';
	import Cache from '../../../utils/cache';
	export default {
		data() {
			return {
				formLabelAlign:{
					address:'',
					abi:''
				},
				name: '',
		        region: '',
		        type: '',
				pageTotal: 0,
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
				labelPosition:'top',
				dialogVisible: false,
				clickId:0
			}
		},
		created() {
			this.getDataInfo();
		},
		watch:{
			state(){
				this.getDataInfo()
			}
		},
		methods: {
			getDataInfo(page = Config.pageSize) {//请求
				let params = {
					url: 'QueryCrowdfunding',
					data: {
						page:this.currPage||1,
						pagesize: page,
						state: this.state,
						searchStr: this.searchStr,
					},
					type: 'get',
				}
				console.log("params",params)
				Request.requestHandle(params, res => {
					console.log(res)
					this.projectData = res.data;
					this.pageTotal = res.total;
				});
			},
			handleClose(done) {
		        this.$confirm('确认关闭？')
		          .then(_ => {
		            done();
		          })
		          .catch(_ => {});
		     },
			bindContractAddress(id,value){
				let params = {
					url: 'bindContractAddress',
					data: {
						id: id,
						address: value,
					},
					type: 'get',
				}
				Request.requestHandle(params, res => {
					console.log(res)
					this.projectData = res.data;
					this.pageTotal = res.total;
				});
			},
//			contractAddress(id) {
//				this.$prompt('请输入合約地址', '提示', {
//					confirmButtonText: '确定',
//					cancelButtonText: '取消',
//				}).then(({
//					value
//				}) => {
//					this.bindContractAddress(id,value);
//				}).catch(() => {
//					this.$message({
//						type: 'info',
//						message: '取消输入'
//					});
//				});
//			},
			openDetails(id, value) {
				this.$router.push({
					path: 'crowdfundingDetail/' + id + '/' + value,
					params: {
						id: id,
						value: value,
					}
				});
			},
			
			openDialog(id){
				this.dialogVisible = true;
				this.clickId = id ;
			},
			submitAddress(){//修改合约地址
				
				
				let params = {
					url: 'ChangeContract',
					data: {
					  abi: this.formLabelAlign.abi,
					  address: this.formLabelAlign.address,
					  id: this.clickId
					},
					type: 'post',
					flag:true
				}
				Request.requestHandle(params, res => {
				console.log(params)
					console.log(res)
					if(res.success==1){
						this.$message('绑定成功')
						this.dialogVisible = false
					}
				});
			},
			queryCurrentPageList(page) {
				this.currPage = page;
				this.getDataInfo(page);
			},
			showDevice() {

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
			selectChange(){
				console.log('123')
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