<template>
	<div class="user-management-list">
		<div class="user-management-list-title">
			<!-- <h3>提现审核</h3> -->
			<div style="margin-top: 20px;">
				<el-button type="info" class='chargeAuditBtn' plain @click='tabs=true'>提现审核</el-button>
				<el-button type="info" class='flowRecordBtn' plain @click='tabs=false'>流水记录</el-button>
			</div>
			<div>
				<!-- <el-select v-model="state"  placeholder="全部" style="margin-right: 20px;float: left;">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select> -->
				<div style="width:217px;overflow: hidden;float: left;margin-right: 20px;">
					<el-input v-model="searchStr" placeholder="请输入搜索内容"></el-input>
				</div>
				<el-button @click="searchBtn">搜索</el-button>
			</div>
		</div>
		<div>
			<el-table v-if='tabs' ref="multipleTable" :data="chargeAuditData" border tooltip-effect="dark" stripe :header-cell-class-name="tableHeaderClassName" style="width: 100%;margin-top: 10px;">
				<el-table-column prop="id" label="编号" align="center">
				</el-table-column>
				<el-table-column prop="name" label="姓名" align="center">
				</el-table-column>
				<el-table-column prop="users" label="账号" align="center">
				</el-table-column>
				<el-table-column prop="money" label="金额" align="center">
				</el-table-column>
				<el-table-column prop="status" label="身份证" align="center">
				</el-table-column>
				<el-table-column label="操作" align="center" >
					<template slot-scope="scope">
						<el-button size="mini" @click="upDetail">审核</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-table v-else ref="multipleTable" :data="flowRecordData" border tooltip-effect="dark" stripe :header-cell-class-name="tableHeaderClassName" style="width: 100%;margin-top: 10px;">
				<el-table-column prop="name" label="编号" align="center">
				</el-table-column>
				<el-table-column prop="type" label="1" align="center">
				</el-table-column>
				<el-table-column prop="type" label="账号" align="center">
				</el-table-column>
				<el-table-column prop="type" label="金额" align="center">
				</el-table-column>
				<el-table-column prop="type" label="身份证" align="center">
				</el-table-column>
				<el-table-column label="操作" align="center" >
					<template slot-scope="scope">
						<el-button size="mini" @click="upDetail">审核</el-button>
					
					</template>
				</el-table-column>
			</el-table>
		</div>
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
	export default{
		name:'chargeAudit',
		data(){
			return{
				tabs:true,
				searchStr:'',//搜索
				pageSize:1,//分页
				pageTotal:1,
				chargeAuditData:[{
					id:1,
					name:1,
					users:1,
					money:1,
					status:1
				}],
				flowRecordData:[{
					id:1,
					name:1,
					users:1,
					money:1,
					status:1
				}]
			}
		},

		methods:{
			upDetail(){
				this.$router.push({
					name:'chargeAuditDetail' ,
					params:{
						id:1
					}
				})
			},
			searchBtn(){//搜索点击

			},
			queryCurrentPageList(){//分页器翻页

			},
			tableHeaderClassName({
				row,
				rowIndex
			}) {
				return 'custom-header';
			}
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
			&>button {
				color: $textColor;
				font-size: 24px;
				
			}
		}
		&-link {
			font-size: 14px;
			color: $anchorColor;
			margin-left: 20px;
		}
	}
	
</style>