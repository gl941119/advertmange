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
			        prop="date"
			        label="日期"
			        >
			      </el-table-column>
			      <el-table-column
			        prop="name"
			        label="金额"
			        >
			      </el-table-column>
			    </el-table>
		  </el-col>
		</el-row>
		<el-row class='isPass'>
			<el-button class='pass'>通过</el-button>
			<el-button class='notPass'>拒绝</el-button>
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
				addMoney:0,
				allMoney:0,
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
			console.log(this.$route.params.id)
		},
		methods:{
			queryUserMoney(){
				let params={
					url:'QueryChargeAuditUserMoney',
					data:{
						accountId:this.$route.params.id
					},
					type:'get'
				}


			}
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