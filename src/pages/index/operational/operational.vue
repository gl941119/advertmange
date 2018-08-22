<template>
	<div class="user-management-list">
		<el-row>
			<el-button type="info" :class="{'tab-active': clickTab===0}" plain @click="clickTabs(0)">日数据</el-button>
			<el-button type="info" :class="{'tab-active': clickTab===1}" plain @click="clickTabs(1)">周数据</el-button>
			<el-button type="info" :class="{'tab-active': clickTab===2}" plain @click="clickTabs(2)">月数据</el-button>
		</el-row>

		<div v-if="clickTab===0">
			<br>
			<div class="user-management-list-title">
				<h3>日数据</h3>
			</div>
			<el-table :data="tableData" style="width: 100%;margin-top: 20px;" tooltip-effect="dark" border stripe  :header-cell-class-name="tableHeaderClassName">
				<el-table-column label="时间" prop='createDate'></el-table-column>
				<el-table-column label="PV" prop='pv'></el-table-column>
				<el-table-column label="UV" prop='uv'></el-table-column>
				<el-table-column label="新增注册" prop='register'></el-table-column>
				<el-table-column label="日活(不包含新增注册)" prop='dayLive'></el-table-column>
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
				<chart :options="registerdata" theme="ovilia-green" style="width 100%"></chart>
				<chart :options="daylivedata" theme="ovilia-green" style="width 100%"></chart>
			</div>
		</div>

		<!-- 周 -->
		<div v-if="clickTab===1">
			<br>
			<div class="user-management-list-title">
				<h3>周数据</h3>
			</div>
			<el-table :data="tableData" style="width: 100%;margin-top: 20px;" tooltip-effect="dark" border stripe  :header-cell-class-name="tableHeaderClassName">
				<el-table-column label="周数" prop='week'></el-table-column>
				<el-table-column label="PV" prop='pv'></el-table-column>
				<el-table-column label="UV" prop='uv'></el-table-column>
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
				<chart :options="registerdata_week" theme="ovilia-green" style="width 100%"></chart>
			</div>
		</div>

		<!-- 月 -->
		<div v-if="clickTab===2">
			<br>
			<div class="user-management-list-title">
				<h3>月数据</h3>
			</div>
			<el-table :data="tableData" style="width: 100%;margin-top: 20px;" tooltip-effect="dark" border stripe  :header-cell-class-name="tableHeaderClassName">
				<el-table-column label="月份" prop='month'></el-table-column>
				<el-table-column label="PV" prop='pv'></el-table-column>
				<el-table-column label="UV" prop='uv'></el-table-column>
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
				<chart :options="registerdata_month" theme="ovilia-green" style="width 100%"></chart>
			</div>
		</div>
	</div>
</template>

<script>
    import Config from '../../../utils/config';
    import Request from '../../../utils/require';
    import Cache from '../../../utils/cache';

    export default {
        name: 'Operational',
        data() {
            return {
                searchStr: undefined,
                tableData: [],
                tableData_week: [],
                tableData_month: [],
                totalPage: 0,
                page: 1, //当前页
                currPage: 0,
                pageSize: 7,
                clickTab: 0, //选项卡
                pvdata: {
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
                        data: [], // operDataDay.zx_createDate_data
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [], // operDataDay.zx_pv_data,
                        type: 'line'
                    }]
                },
                uvdata: {
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
                        data: [], // operDataDay.zx_createDate_data
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [], // operDataDay.zx_uv_data,
                        type: 'line'
                    }]
                },
                registerdata: {
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
                        data: [], // operDataDay.zx_createDate_data
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [], // operDataDay.zx_register_data,
                        type: 'line'
                    }]
                },
                daylivedata: {
                    title: {
                        text: '日活(不包含新增注册) 折线图',
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
                        data: [], // operDataDay.zx_createDate_data
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [], // operDataDay.zx_daylive_data,
                        type: 'line'
                    }]
                },

                //周
                pvdata_week: {
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
                        data: [], // operDataDayWeek.zx_week_data
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [], // operDataDayWeek.zx_pv_data,
                        type: 'line'
                    }]
                },
                uvdata_week: {
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
                        data: [], // operDataDayWeek.zx_week_data
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [], // operDataDayWeek.zx_uv_data,
                        type: 'line'
                    }]
                },
                registerdata_week: {
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
                        data: [], // operDataDayWeek.zx_week_data
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [], // operDataDayWeek.zx_register_data,
                        type: 'line'
                    }]
                },
                //月
                pvdata_month: {
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
                        data: [], // operDataDayMonth.zx_month_data
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [], // operDataDayMonth.zx_pv_data,
                        type: 'line'
                    }]
                },
                uvdata_month: {
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
                        data: [], // operDataDayMonth.zx_month_data
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [], // operDataDayMonth.zx_uv_data,
                        type: 'line'
                    }]
                },
                registerdata_month: {
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
                        data: [], // operDataDayMonth.zx_month_data
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [], // operDataDayMonth.zx_register_data,
                        type: 'line'
                    }]
                }
            }
        },
        created() {
            this.getDayTable();
            this.handleDayChartData();
        },
        methods: {
            queryData(dataType, sort, page, pageSize) {
                return new Promise((resolve, reject) => {
                    Request.requestHandle({
                        url: 'QueryAllReportData',
                        data: {
                            page,
                            pageSize,
                            dataType,
                            sort,
                        },
                        type: 'get'
                    }, res => {
                        console.log('res->', res);
                        resolve(res)
                    })
                });
            },
            // day table
            getDayTable(dataType = 0, sort = 'desc', page = this.page, pageSize = this.pageSize) {
                this.queryData(dataType, sort, page, pageSize).then(res => {
                    this.tableData = res.data;
                    this.totalPage = res.total;
                })
            },
            // handle day chart data
            handleDayChartData(dataType = 0, sort = 'asc', page = 1, pageSize = 10000){
                this.queryData(dataType, sort, page, pageSize).then(res => {
                    let {date, month, week, pv, uv, register, dayLive} = this.chartData(res.data);
                    console.log('handleDayChartData->', {date, month, week, pv, uv, register, dayLive});
                    switch (dataType) {
                        case 0:
                            this.pvdata.xAxis.data = date;
                            this.uvdata.xAxis.data = date;
                            this.registerdata.xAxis.data = date;
                            this.daylivedata.xAxis.data = date;
                            this.pvdata.series[0].data = pv;
                            this.uvdata.series[0].data = uv;
                            this.registerdata.series[0].data = register;
                            this.daylivedata.series[0].data = dayLive;
                            break;
                        case 1:
                            this.pvdata_week.xAxis.data = week;
                            this.uvdata_week.xAxis.data = week;
                            this.registerdata_week.xAxis.data = week;
                            this.pvdata_week.series[0].data = pv;
                            this.uvdata_week.series[0].data = uv;
                            this.registerdata_week.series[0].data = register;
                            break;
                        case 2:
                            this.pvdata_month.xAxis.data = month;
                            this.uvdata_month.xAxis.data = month;
                            this.registerdata_month.xAxis.data = month;
                            this.pvdata_month.series[0].data = pv;
                            this.uvdata_month.series[0].data = uv;
                            this.registerdata_month.series[0].data = register;
                            break;
                    }
                })
            },
            clickTabs(tab){
                this.clickTab = tab;
                this.getDayTable(tab);
                this.handleDayChartData(tab);
            },
            currentChange(val) {
                this.currPage = val;
                this.getDayTable(0, 'desc', this.currPage, this.pageSize);
            },
            tableHeaderClassName({
                row,
                rowIndex
            }) {
                return 'custom-header';
            },
            chartData(data){
                let { date, month, week, pv, uv, register, dayLive }= {date: [], month: [], week: [], pv: [], uv: [], register: [], dayLive: []};
                data.forEach(item => {
                    date.push(item.createDate);
                    month.push(item.month);
                    week.push(item.week);
                    pv.push(item.pv);
                    uv.push(item.uv);
                    register.push(item.register);
                    dayLive.push(item.dayLive);
                })
                return {date, month, week, pv, uv, register, dayLive};
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
            &>h3 {
                color: $textColor;
                height: 23px;
                line-height: 23px;
                /*color: rgba(16, 16, 16, 1);*/
                font-size: 16px;
                text-align: left;
            }
        }
        .tab-active {
            border-color: #82848a;
            background-color: #909399;
            color: #fff;
        }
    }

    .echarts {
        width: 100%;
        height: 399px;
    }
</style>
