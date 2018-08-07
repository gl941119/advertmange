<template>
	<div class="wrap">
		<el-row>
		  <el-col :span="4">
		  		<el-row>
		  			<div class="card">
			  			<dt>收入累加金额</dt>
			  			<dd>{{addMoney}}</dd>
		  			</div>
		  		</el-row>
		  		<el-row style='margin-top: 30px;'>
		  			<div class="card">
			  			<dt>收入总金额</dt>
			  			<dd>{{allMoney}}</dd>
		  			</div>
		  		</el-row>
		  </el-col>
		  <el-col :span="20">
		  		<el-table :data="tableData" style="width: 100%" max-height='450px'>

		  			<el-table-column
			        prop="accountNo"
			        label="账号"
			        >
			      </el-table-column>
			      <el-table-column
			        prop="createTime"
			        label="日期"
			        >
			      </el-table-column>
			      <el-table-column
			        prop="money"
			        label="金额"
			        >
			      </el-table-column>
			    </el-table>
			    <el-pagination background
		                       layout="prev, pager, next"
		                       prev-text="上一页"
		                       next-text="下一页"
		                       :page-size="pageSize"
		                       @current-change="chargeHandleCurrent"
		                       :total="pageTotal"
		                       style="text-align: center;">
		        </el-pagination>
		  </el-col>
		</el-row>
		<el-row class='isPass'>
			<el-button class='pass' @click='isPass(2)' :loading='isPassLoading'>通过</el-button>
			<el-button class='notPass' @click='notPass(4)' :loading='isPassLoading'>拒绝</el-button>
		</el-row>
	</div>
</template>
<script>
	import Config from '@/utils/config';
	import Cache from '@/utils/cache';
	import Request from '@/utils/require';
	export default{
		name:'chargeAuditDetail',
		data(){
			return{
				accountId:this.$route.params.accountId,
				id:Number(this.$route.params.id),
				addMoney:0,
				allMoney:0,
				page:1,
				pageSize:Config.pageSize,
				pageTotal:0,
				isPassLoading:false,
				formInline:{
					user:1,
					name:2
				},
				handleChange:["1"],
				tableData: [{
		            date: '2016-05-02',
		            name: '111'
		          }, {
		            date: '2016-05-04',
		            name: '222'

		          }, {
		            date: '2016-05-01',
		            name: '333'

		          }]

			}
		},
		created(){
			this.queryUserMoney();
			this.queryFlowMoney()
		},

		methods:{
			queryUserMoney(){//请求金额
				let params={
					url:'QueryChargeAuditUserMoney',
					data:{
						accountId:this.accountId
					},
					type:'get'
				};
				Request.requestHandle(params,res=>{
					this.addMoney = res.data.accountBalance;
					this.allMoney = res.data.totalMoney;
				})
			},
			notPass(status){
				 this.$prompt('', '拒绝理由', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          inputPattern: /\S/,
			          inputErrorMessage: '请输入理由'
			        }).then(({ value }) => {
			          this.isPass(status,value)
			        }).catch(() => {});
			},
			isPass(status,value=null){//是否通过
				this.isPassLoading = true;
				let params = {
					url:'amentChargeAuditIsPass',
					data:{
						id:this.id,
						status,
						reason:value
					},
					type:'put'

				};
				Request.requestHandle(params,res=>{
					this.isPassLoading = false;
					if(res.success==1){
						this.$message({
							type:'success',
							message:'成功'
						});
						this.$router.back(-1)
					}
				})
			},
			chargeHandleCurrent(val){//点击翻页
				this.page = val;
				this.queryFlowMoney()
			},
			queryFlowMoney(){//请求流水
				let params={
					url:'QueryChargeAuditUserFlowMoney',
					data:{
						page:this.page,
						pageSize:this.pageSize,
						accountId:this.accountId
					},
					type:'get'
				};
				Request.requestHandle(params,res=>{
					this.tableData=res.data;
					this.pageTotal = res.total
				})
			},

		}


	}
</script>
<style lang="scss" scoped>
	.card{
		width:150px;
		height:59px;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
		padding-left: 5px;
	}

		.isPass{
			position: absolute;
			bottom: 50px;
		}

	dd{
		margin-top:10px;
		font-size:24px;
	}
</style>
