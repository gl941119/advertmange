<template>
	<div class="user-management-list">
		<el-row>
			<el-button type="info" plain @click="clickTab=1">日数据</el-button>
			<el-button type="info" plain @click="clickTab=2">周数据</el-button>
			<el-button type="info" plain @click="clickTab=3">月数据</el-button>
		</el-row>

		<div v-if="clickTab==1">
			<br>
			<div class="user-management-list-title">
				<h3>日数据</h3>
			</div>
			<el-table :data="tableData" style="width: 100%;margin-top: 20px;" tooltip-effect="dark" border stripe  :header-cell-class-name="tableHeaderClassName">
				<el-table-column label="时间" prop='createDate'></el-table-column>
				<el-table-column label="PV" prop='pv'></el-table-column>
				<el-table-column label="UV" prop='uv'></el-table-column>
				<el-table-column label="GMV" prop='gmv'></el-table-column>
				<el-table-column label="新增注册" prop='register'></el-table-column>
				<el-table-column label="日活" prop='daylive'></el-table-column>
			</el-table>
			<el-pagination
			layout="prev, pager, next"
			prev-text='上一页'
			next-text="下一页"
			:total="totalPage"
			@current-change='currentChange'
			:page-size="pageSize"
			background
			style="text-align: center;">
			</el-pagination>

			<div>
				
				<chart :options="pvdata" theme="ovilia-green" style="width 100%"></chart>
				<chart :options="uvdata" theme="ovilia-green" style="width 100%"></chart>
				<chart :options="gmvdata" theme="ovilia-green" style="width 100%"></chart>
				<chart :options="registerdata" theme="ovilia-green" style="width 100%"></chart>
				<chart :options="daylivedata" theme="ovilia-green" style="width 100%"></chart>
			</div>
		</div>

		<!-- 周 -->
		<div v-if="clickTab==2">
			<br>
			<div class="user-management-list-title">
				<h3>周数据</h3>
			</div>
			<el-table :data="tableData_week" style="width: 100%;margin-top: 20px;" tooltip-effect="dark" border stripe  :header-cell-class-name="tableHeaderClassName">
				<el-table-column label="周数" prop='week'></el-table-column>
				<el-table-column label="PV" prop='pv'></el-table-column>
				<el-table-column label="UV" prop='uv'></el-table-column>
				<el-table-column label="GMV" prop='gmv'></el-table-column>
				<el-table-column label="新增注册" prop='register'></el-table-column>
			</el-table>
			<el-pagination
			layout="prev, pager, next"
			prev-text='上一页'
			next-text="下一页"
			:total="totalPage"
			@current-change='currentChange'
			:page-size="pageSize"
			background
			style="text-align: center;">
			</el-pagination>

			<div>
				<div class="user-management-list-title">
					<h3>折线图</h3>
				</div>
				<chart :options="pvdata_week" theme="ovilia-green" style="width 100%"></chart>
				<chart :options="uvdata_week" theme="ovilia-green" style="width 100%"></chart>
				<chart :options="gmvdata_week" theme="ovilia-green" style="width 100%"></chart>
				<chart :options="registerdata_week" theme="ovilia-green" style="width 100%"></chart>
			</div>
		</div>

		<!-- 月 -->
		<div v-if="clickTab==3">
			<br>
			<div class="user-management-list-title">
				<h3>月数据</h3>
			</div>
			<el-table :data="tableData_month" style="width: 100%;margin-top: 20px;" tooltip-effect="dark" border stripe  :header-cell-class-name="tableHeaderClassName">
				<el-table-column label="月份" prop='month'></el-table-column>
				<el-table-column label="PV" prop='pv'></el-table-column>
				<el-table-column label="UV" prop='uv'></el-table-column>
				<el-table-column label="GMV" prop='gmv'></el-table-column>
				<el-table-column label="新增注册" prop='register'></el-table-column>
			</el-table>
			<el-pagination
			layout="prev, pager, next"
			prev-text='上一页'
			next-text="下一页"
			:total="totalPage"
			@current-change='currentChange'
			:page-size="pageSize"
			background
			style="text-align: center;">
			</el-pagination>

			<div>
				<div class="user-management-list-title">
					<h3>折线图</h3>
				</div>
				<chart :options="pvdata_month" theme="ovilia-green" style="width 100%"></chart>
				<chart :options="uvdata_month" theme="ovilia-green" style="width 100%"></chart>
				<chart :options="gmvdata_month" theme="ovilia-green" style="width 100%"></chart>
				<chart :options="registerdata_month" theme="ovilia-green" style="width 100%"></chart>
			</div>
		</div>
	</div>
</template>

<script>
	import Config from '../../../utils/config';
	import Request from '../../../utils/require';
	import Cache from '../../../utils/cache';
	import operDataDay from './operationalJson';
	import operDataDayWeek from './operationalJson_week';
	import operDataDayMonth from './operationalJson_month.js';

	export default{
		name:'Operational',
		computed:{
			 ying:function () {
				 return {
					title: {
						//text: 'echarts的基本使用',
						// subtext: '我是子标题'
					},
					tooltip: {
						// 控制鼠标滑过折线点出现的窗口内容哪个坐标值在上 默认series中标注的name值
						// 加了trigger: 'axis'之后就变成折线点对应的x轴坐标值在上方
						trigger: 'axis',
						// 去掉鼠标滑过折线点的时候默认出现的线条
						axisPointer: {
							type: 'none'
						}
					},
					xAxis: {
						type: 'category',
						data: ['2018-08-9', '2018-08-10', '2018-08-11', '2018-08-12', '2018-08-13', '2018-08-14', '2018-08-15']
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: [820, 932, 901, 934, 1290, 1330, 1320],
						type: 'line'
					}]
				 }
			 }
		},
		data(){
			return {
				searchStr:undefined,
				tableData: operDataDay.table_data ,
				tableData_week: operDataDayWeek.table_data ,
				tableData_month: operDataDayMonth.table_data ,
				totalPage:15,
				page:1,//当前页
				pageSize: 20
				
				,clickTab: 1,//选项卡
				operDataDay//日数据
				,operDataDayWeek//周数据
				,operDataDayMonth//月数据
				,pvdata:{
					title: {
						text: 'PV 折线图',
						// subtext: '我是子标题'
					},
					tooltip: {
						// 控制鼠标滑过折线点出现的窗口内容哪个坐标值在上 默认series中标注的name值
						// 加了trigger: 'axis'之后就变成折线点对应的x轴坐标值在上方
						trigger: 'axis',
						// 去掉鼠标滑过折线点的时候默认出现的线条
						axisPointer: {
							type: 'none'
						}
					},
					xAxis: {
						type: 'category',
						data: operDataDay.zx_createDate_data
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: operDataDay.zx_pv_data,
						type: 'line'
					}]
				 },
				 uvdata:{
					title: {
						text: 'UV 折线图',
						// subtext: '我是子标题'
					},
					tooltip: {
						// 控制鼠标滑过折线点出现的窗口内容哪个坐标值在上 默认series中标注的name值
						// 加了trigger: 'axis'之后就变成折线点对应的x轴坐标值在上方
						trigger: 'axis',
						// 去掉鼠标滑过折线点的时候默认出现的线条
						axisPointer: {
							type: 'none'
						}
					},
					xAxis: {
						type: 'category',
						data: operDataDay.zx_createDate_data
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: operDataDay.zx_uv_data,
						type: 'line'
					}]
				 },
				 gmvdata:{
					title: {
						text: 'GMV 折线图',
						// subtext: '我是子标题'
					},
					tooltip: {
						// 控制鼠标滑过折线点出现的窗口内容哪个坐标值在上 默认series中标注的name值
						// 加了trigger: 'axis'之后就变成折线点对应的x轴坐标值在上方
						trigger: 'axis',
						// 去掉鼠标滑过折线点的时候默认出现的线条
						axisPointer: {
							type: 'none'
						}
					},
					xAxis: {
						type: 'category',
						data: operDataDay.zx_createDate_data
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: operDataDay.zx_gmv_data,
						type: 'line'
					}]
				 },
				 registerdata:{
					title: {
						text: '新增注册 折线图',
						// subtext: '我是子标题'
					},
					tooltip: {
						// 控制鼠标滑过折线点出现的窗口内容哪个坐标值在上 默认series中标注的name值
						// 加了trigger: 'axis'之后就变成折线点对应的x轴坐标值在上方
						trigger: 'axis',
						// 去掉鼠标滑过折线点的时候默认出现的线条
						axisPointer: {
							type: 'none'
						}
					},
					xAxis: {
						type: 'category',
						data: operDataDay.zx_createDate_data
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: operDataDay.zx_register_data,
						type: 'line'
					}]
				 },
				 daylivedata:{
					title: {
						text: '日活 折线图',
						// subtext: '我是子标题'
					},
					tooltip: {
						// 控制鼠标滑过折线点出现的窗口内容哪个坐标值在上 默认series中标注的name值
						// 加了trigger: 'axis'之后就变成折线点对应的x轴坐标值在上方
						trigger: 'axis',
						// 去掉鼠标滑过折线点的时候默认出现的线条
						axisPointer: {
							type: 'none'
						}
					},
					xAxis: {
						type: 'category',
						data: operDataDay.zx_createDate_data
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: operDataDay.zx_daylive_data,
						type: 'line'
					}]
				 },

				 //周
				 pvdata_week:{
					title: {
						text: 'PV 折线图',
						// subtext: '我是子标题'
					},
					tooltip: {
						// 控制鼠标滑过折线点出现的窗口内容哪个坐标值在上 默认series中标注的name值
						// 加了trigger: 'axis'之后就变成折线点对应的x轴坐标值在上方
						trigger: 'axis',
						// 去掉鼠标滑过折线点的时候默认出现的线条
						axisPointer: {
							type: 'none'
						}
					},
					xAxis: {
						type: 'category',
						data: operDataDayWeek.zx_week_data
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: operDataDayWeek.zx_pv_data,
						type: 'line'
					}]
				 },
				 uvdata_week:{
					title: {
						text: 'UV 折线图',
						// subtext: '我是子标题'
					},
					tooltip: {
						// 控制鼠标滑过折线点出现的窗口内容哪个坐标值在上 默认series中标注的name值
						// 加了trigger: 'axis'之后就变成折线点对应的x轴坐标值在上方
						trigger: 'axis',
						// 去掉鼠标滑过折线点的时候默认出现的线条
						axisPointer: {
							type: 'none'
						}
					},
					xAxis: {
						type: 'category',
						data: operDataDayWeek.zx_week_data
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: operDataDayWeek.zx_uv_data,
						type: 'line'
					}]
				 },
				 gmvdata_week:{
					title: {
						text: 'GMV 折线图',
						// subtext: '我是子标题'
					},
					tooltip: {
						// 控制鼠标滑过折线点出现的窗口内容哪个坐标值在上 默认series中标注的name值
						// 加了trigger: 'axis'之后就变成折线点对应的x轴坐标值在上方
						trigger: 'axis',
						// 去掉鼠标滑过折线点的时候默认出现的线条
						axisPointer: {
							type: 'none'
						}
					},
					xAxis: {
						type: 'category',
						data: operDataDayWeek.zx_week_data
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: operDataDayWeek.zx_gmv_data,
						type: 'line'
					}]
				 },
				 registerdata_week:{
					title: {
						text: '新增注册 折线图',
						// subtext: '我是子标题'
					},
					tooltip: {
						// 控制鼠标滑过折线点出现的窗口内容哪个坐标值在上 默认series中标注的name值
						// 加了trigger: 'axis'之后就变成折线点对应的x轴坐标值在上方
						trigger: 'axis',
						// 去掉鼠标滑过折线点的时候默认出现的线条
						axisPointer: {
							type: 'none'
						}
					},
					xAxis: {
						type: 'category',
						data: operDataDayWeek.zx_week_data
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: operDataDayWeek.zx_register_data,
						type: 'line'
					}]
				 },
				 //月
				 pvdata_month:{
					title: {
						text: 'PV 折线图',
						// subtext: '我是子标题'
					},
					tooltip: {
						// 控制鼠标滑过折线点出现的窗口内容哪个坐标值在上 默认series中标注的name值
						// 加了trigger: 'axis'之后就变成折线点对应的x轴坐标值在上方
						trigger: 'axis',
						// 去掉鼠标滑过折线点的时候默认出现的线条
						axisPointer: {
							type: 'none'
						}
					},
					xAxis: {
						type: 'category',
						data: operDataDayMonth.zx_month_data
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: operDataDayMonth.zx_pv_data,
						type: 'line'
					}]
				 },
				 uvdata_month:{
					title: {
						text: 'UV 折线图',
						// subtext: '我是子标题'
					},
					tooltip: {
						// 控制鼠标滑过折线点出现的窗口内容哪个坐标值在上 默认series中标注的name值
						// 加了trigger: 'axis'之后就变成折线点对应的x轴坐标值在上方
						trigger: 'axis',
						// 去掉鼠标滑过折线点的时候默认出现的线条
						axisPointer: {
							type: 'none'
						}
					},
					xAxis: {
						type: 'category',
						data: operDataDayMonth.zx_month_data
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: operDataDayMonth.zx_uv_data,
						type: 'line'
					}]
				 },
				 gmvdata_month:{
					title: {
						text: 'GMV 折线图',
						// subtext: '我是子标题'
					},
					tooltip: {
						// 控制鼠标滑过折线点出现的窗口内容哪个坐标值在上 默认series中标注的name值
						// 加了trigger: 'axis'之后就变成折线点对应的x轴坐标值在上方
						trigger: 'axis',
						// 去掉鼠标滑过折线点的时候默认出现的线条
						axisPointer: {
							type: 'none'
						}
					},
					xAxis: {
						type: 'category',
						data: operDataDayMonth.zx_month_data
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: operDataDayMonth.zx_gmv_data,
						type: 'line'
					}]
				 },
				 registerdata_month:{
					title: {
						text: '新增注册 折线图',
						// subtext: '我是子标题'
					},
					tooltip: {
						// 控制鼠标滑过折线点出现的窗口内容哪个坐标值在上 默认series中标注的name值
						// 加了trigger: 'axis'之后就变成折线点对应的x轴坐标值在上方
						trigger: 'axis',
						// 去掉鼠标滑过折线点的时候默认出现的线条
						axisPointer: {
							type: 'none'
						}
					},
					xAxis: {
						type: 'category',
						data: operDataDayMonth.zx_month_data
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: operDataDayMonth.zx_register_data,
						type: 'line'
					}]
				 }
				 


			}
		},
		created(){
			this.queryData()
		},
		methods:{
			queryData(){
				// Request.requestHandle({
				// 	url:'QueryBackUsersVisitData',
				// 	data:{
				// 		page:this.page,
				// 		pageSize:this.pageSize,
				// 		searchStr:this.searchStr
				// 	},
				// 	type:'get'
				// },res=>{
				// 	this.tableData = res.data;
				// 	this.totalPage = res.total
				// })
			},
			currentChange(val){
				this.page = val;
				this.queryData()

			},
			tableHeaderClassName({
				row,
				rowIndex
			}) {
				return 'custom-header';
			},
			test_click(){
				debugger
				this.wwdata.series[0].data=[];
			},
			handleClick(tab, event) {
                this.tabName = tab.name;
                this.queryData();

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

	.echarts {
    width: 100%;
    height: 399px;
}
</style>
