<template>
	<div class="wrap">
		<el-row>
		  <el-col :span="4">
		  		<el-row>
		  			<dt>收入累加金额</dt>
		  			<dd>123</dd>
		  		</el-row>
		  		<el-row>
		  			<dt>收入总金额</dt>
		  			<dd>123</dd>
		  		</el-row>
		  </el-col>
		  <el-col :span="20">
		  		<el-table :data="tableData" style="width: 100%">
			      <el-table-column
			        prop="date"
			        label="日期"
			        width="180">
			      </el-table-column>
			      <el-table-column
			        prop="name"
			        label="姓名"
			        width="180">
			      </el-table-column>
			      <el-table-column
			        prop="address"
			        label="地址">
			      </el-table-column>
			    </el-table>
		  </el-col>
		</el-row>
	</div>
</template>
<script>
	export default{
		name:'chargeAuditDetail',
		data(){
			return{
				formInline:{
					user:1,
					name:2
				},
				handleChange:["1"],
				 tableData: [{
		            date: '2016-05-02',
		            name: '王小虎',
		            address: '上海市普陀区金沙江路 1518 弄'
		          }, {
		            date: '2016-05-04',
		            name: '王小虎',
		            address: '上海市普陀区金沙江路 1517 弄'
		          }, {
		            date: '2016-05-01',
		            name: '王小虎',
		            address: '上海市普陀区金沙江路 1519 弄'
		          }]

			}
		}

	}
</script>
<style lang="scss" scoped>
	
</style>