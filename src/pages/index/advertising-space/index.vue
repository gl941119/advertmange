<template>
	<div class="user-management-list">
		<div>
			<div class="user-management-list-title">
				<h3>首页钻展位</h3>
				<el-button @click="saveChange">保存更改</el-button>
			</div>
			<el-table ref="multipleTable" :data="homeListData" border tooltip-effect="dark" stripe :header-cell-class-name="tableHeaderClassName" style="width: 100%">
				<el-table-column prop="type" label="位次" align="center">
					<template slot-scope="scope">
						<el-select v-model="value" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</template>
				</el-table-column>
				<el-table-column label="图片" align="center">
					<template slot-scope="scope">
						<el-upload class="avatar-uploader" action="" :show-file-list="false" :on-change="getImg">
							<img v-if="imageUrl" :src="imageUrl" class="avatar">
							<button v-else size="small" class="avatar-uploader-icon" type="primary">点击上传</button>
						</el-upload>
					</template>
				</el-table-column>
				<el-table-column label="链接" align="center">
					<template>
						<div v-if="imageUrl">{{imageUrl}}</div>
						<button v-else>添加</button>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" show-overflow-tooltip>
					<template slot-scope="scope">
						<el-popover placement="top" trigger="click" v-model="scope.row.showDelete">
							<p>确定删除吗？</p>
							<div style="text-align: right; margin-top: 5px;">
								<el-button size="mini" type="text" @click="scope.row.showDelete = false">取消</el-button>
								<el-button type="primary" size="mini" @click="deleteBulletin(scope.$index, scope.row)">确定</el-button>
							</div>
							<el-button size="mini" slot="reference" @click="scope.row.showDelete = true">删除</el-button>
						</el-popover>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div>
			<div class="user-management-list-title">
				<h3>项目二级页</h3>
				<el-button @click="saveChangeProject">保存更改</el-button>
			</div>
			<el-table ref="multipleTable" :data="homeListData" border tooltip-effect="dark" stripe :header-cell-class-name="tableHeaderClassName" style="width: 100%">
				<el-table-column prop="type" label="位次" align="center">
					<template slot-scope="scope">
						<el-select v-model="value" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</template>
				</el-table-column>
				<el-table-column label="图片" align="center">
					<template slot-scope="scope">
						<el-upload class="avatar-uploader" action="" :show-file-list="false" :on-change="getImg">
							<img v-if="imageUrl" :src="imageUrl" class="avatar">
							<button v-else size="small" class="avatar-uploader-icon" type="primary">点击上传</button>
						</el-upload>
					</template>
				</el-table-column>
				<el-table-column label="链接" align="center">
					<template>
						<div v-if="imageUrl">{{imageUrl}}</div>
						<button v-else>添加</button>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" show-overflow-tooltip>
					<template slot-scope="scope">
						<el-popover placement="top" trigger="click" v-model="scope.row.showDelete">
							<p>确定删除吗？</p>
							<div style="text-align: right; margin-top: 5px;">
								<el-button size="mini" type="text" @click="scope.row.showDelete = false">取消</el-button>
								<el-button type="primary" size="mini" @click="deleteBulletin(scope.$index, scope.row)">确定</el-button>
							</div>
							<el-button size="mini" slot="reference" @click="scope.row.showDelete = true">删除</el-button>
						</el-popover>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div>
			<div class="user-management-list-title">
				<h3>众筹二级页</h3>
				<el-button @click="saveChangeCrowdfunding">保存更改</el-button>
			</div>
			<el-table ref="multipleTable" :data="homeListData" border tooltip-effect="dark" stripe :header-cell-class-name="tableHeaderClassName" style="width: 100%">
				<el-table-column prop="type" label="位次" align="center">
					<template slot-scope="scope">
						<el-select v-model="value" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</template>
				</el-table-column>
				<el-table-column label="图片" align="center">
					<template slot-scope="scope">
						<el-upload class="avatar-uploader" action="" :show-file-list="false" :on-change="getImg">
							<img v-if="imageUrl" :src="imageUrl" class="avatar">
							<button v-else size="small" class="avatar-uploader-icon" type="primary">点击上传</button>
						</el-upload>
					</template>
				</el-table-column>
				<el-table-column label="链接" align="center">
					<template>
						<div v-if="imageUrl">{{imageUrl}}</div>
						<button v-else>添加</button>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" show-overflow-tooltip>
					<template slot-scope="scope">
						<el-popover placement="top" trigger="click" v-model="scope.row.showDelete">
							<p>确定删除吗？</p>
							<div style="text-align: right; margin-top: 5px;">
								<el-button size="mini" type="text" @click="scope.row.showDelete = false">取消</el-button>
								<el-button type="primary" size="mini" @click="deleteBulletin(scope.$index, scope.row)">确定</el-button>
							</div>
							<el-button size="mini" slot="reference" @click="scope.row.showDelete = true">删除</el-button>
						</el-popover>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>
<script>
	import Request from '../../../utils/require';
	import Config from '../../../utils/config';
	import Cache from '../../../utils/cache';
	export default {
		data() {
			return {
				value: '',
				options: [{
					value: '1',
					label: '1'
				}, {
					value: '2',
					label: '2'
				}, {
					value: '3',
					label: '3'
				}, {
					value: '4',
					label: '4'
				}, {
					value: '5',
					label: '5'
				}],
				homeListData: [{

				}],
				imageUrl: '',
			}
		},
		created() {

		},
		methods: {
			saveChange() {

			},
			getImg(file) {
				this.imageUrl = file.url;
			},
			saveChangeProject() {

			},
			saveChangeCrowdfunding() {

			},
			tableHeaderClassName({
				row,
				rowIndex
			}) {
				return 'custom-header';
			}
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