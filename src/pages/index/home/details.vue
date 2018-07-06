<template>
	<div class="project_review_details">
		<div class="project_review_details_team">
			<div class="project_review_details_title">团队</div>
			<ul class="project_review_details_team_item">
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">团队名称</label>
					<div class="project_review_details_item_li_intro">{{details.teamName}}</div>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">团队联系方式</label>
					<div class="project_review_details_item_li_intro">{{details.teamContact}}</div>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">主要成员所在地</label>
					<div class="project_review_details_item_li_intro">{{details.teamLocation}}</div>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">核心团队成员</label>
				</li>
				<div class="project_review_details_item_li_info">
					<el-table :show-header=false border :data="details.advertTeamMemberResults" style="width: 100%">
						<el-table-column prop="name" label="日期" width="180">
						</el-table-column>
						<el-table-column prop="title" label="姓名" width="180">
						</el-table-column>
						<el-table-column prop="desc" label="地址">
						</el-table-column>
					</el-table>
				</div>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">顾问团队</label>
				</li>
				<div class="project_review_details_item_li_info">
					<el-table :show-header=false border :data="details.advertTeamConsultantsResults" style="width: 100%">
						<el-table-column prop="name" label="日期" width="180">
						</el-table-column>
						<el-table-column prop="title" label="姓名" width="180">
						</el-table-column>
						<el-table-column prop="desc" label="地址">
						</el-table-column>
					</el-table>
				</div>
			</ul>
		</div>
		<div class="project_review_details_project">
			<div class="project_review_details_title">项目情况</div>
			<ul class="project_review_details_item">
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">项目名称</label>
					<div class="project_review_details_item_li_intro">{{details.proName}}</div>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">项目简介</label>
					<div class="project_review_details_item_li_intro">{{details.teamName}}</div>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">概念</label>
					<span style="margin-right: 20px;" v-if="details.concept1Id">{{details.concept1Id}}</span>
					<span style="margin-right: 20px;" v-if="details.concept2Id">{{details.concept2Id}}</span>
					<span style="margin-right: 20px;" v-if="details.concept3Id">{{details.concept3Id}}</span>
					<span style="margin-right: 20px;" v-if="details.concept4Id">{{details.concept4Id}}</span>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">技术</label>
					<span style="margin-right: 20px;" v-if="details.technology1">{{details.technology1}}</span>
					<span style="margin-right: 20px;" v-if="details.technology2">{{details.technology2}}</span> 
				</li>
			</ul>
		</div>
		<div class="project_review_details_project">
			<div class="project_review_details_title">代币信息</div>
			<ul class="project_review_details_item">
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">英文简写</label>
					<div class="project_review_details_item_li_intro">{{details.shotEnName}}</div>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">英文全名</label>
					<div class="project_review_details_item_li_intro">{{details.fullEnName}}</div>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">中文简写</label>
					<span style="margin-right: 20px;">{{details.shotCnName}}</span>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">logo</label>
					<span><img style="width: 50px;height: 50px;" :src="details.logo"/></span>
				</li>
			</ul>
		</div>
		<div class="project_review_details_project">
			<div class="project_review_details_title">相关链接</div>
			<ul class="project_review_details_item">
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">官方网站</label>
					<div class="project_review_details_item_li_intro">{{details.website}}</div>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">白皮书</label>
					<div class="project_review_details_item_li_intro">{{details.whitePaper}}</div>
				</li>
				<li class="project_review_details_item_li" v-if="details.customWebsite1 || details.customAddress1">
					<label class="project_review_details_item_li_label">{{details.customWebsite1}}</label>
					<span style="margin-right: 20px;">{{details.customAddress1}}</span>
				</li>
				<li class="project_review_details_item_li" v-if="details.customWebsite2 || details.customAddress2">
					<label class="project_review_details_item_li_label">{{details.customWebsite2}}</label>
					<span style="margin-right: 20px;">{{details.customAddress2}}</span>
				</li>
				<li class="project_review_details_item_li" v-if="details.customWebsite3 || details.customAddress3">
					<label class="project_review_details_item_li_label">{{details.customWebsite3}}</label>
					<span style="margin-right: 20px;">{{details.customAddress3}}</span>
				</li>
				<li class="project_review_details_item_li" v-if="details.customWebsite4 || details.customAddress4">
					<label class="project_review_details_item_li_label">{{details.customWebsite4}}</label>
					<span style="margin-right: 20px;">{{details.customAddress4}}</span>
				</li>
				<li class="project_review_details_item_li" v-if="details.customWebsite5 || details.customAddress5">
					<label class="project_review_details_item_li_label">{{details.customWebsite5}}</label>
					<span style="margin-right: 20px;">{{details.customAddress5}}</span>
				</li>
				<li class="project_review_details_item_li" v-if="details.customWebsite6 || details.customAddress6">
					<label class="project_review_details_item_li_label">{{details.customWebsite6}}</label>
					<span style="margin-right: 20px;">{{details.customAddress6}}</span>
				</li>
				<li class="project_review_details_item_li" v-if="details.customWebsite7 || details.customAddress7">
					<label class="project_review_details_item_li_label">{{details.customWebsite7}}</label>
					<span style="margin-right: 20px;">{{details.customAddress7}}</span>
				</li>
				<li class="project_review_details_item_li" v-if="details.customWebsite8 || details.customAddress8">
					<label class="project_review_details_item_li_label">{{details.customWebsite8}}</label>
					<span style="margin-right: 20px;">{{details.customAddress8}}</span>
				</li>
			</ul>
		</div>
		<button class="check" @click="passed">审核通过</button>
		<button class="check" @click="notPassed">审核不通过</button>
		
	</div>
</template>

<script>
	import Config from '../../../utils/config';
	import Request from '../../../utils/require';
	export default {
		data() {
			return {
				details:{
					
				},
			};
		},
		mounted(){
			this.queryDetails();
		},
		methods:{
			queryDetails(page = Config.pageStart) {
				var id = this.$route.params.id;
				let params = {
					url: 'QueryDetails',
					data: {
						id:id
					},
					type: 'get',
				}
				Request.requestHandle(params, res => {
					this.details = res.data;
					console.log(this.details)
				});
			},
			passed(){
				var id = this.$route.params.id;
				let params = {
					url: 'QueryPass',
					data: {
						id:id
					},
					type: 'get',
				}
				Request.requestHandle(params, res => {
					if(res.success){
						this.$message('操作成功');
					}
				});
			},
			notPassed(){
				var id = this.$route.params.id;
				let params = {
					url: 'QueryNotPass',
					data: {
						id:id
					},
					type: 'get',
				}
				Request.requestHandle(params, res => {
					if(res.success){
						this.$message('操作成功');
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.project_review_details_item_li {
		display: flex;
		font-size: 14px;
		color: rgba(16, 16, 16, 1);
		min-height: 20px;
		line-height: 20px;
		margin: 10px 0;
		&_label {
			width: 150px;
		}
		&_intro {
			flex: 1;
		}
		&_info{
			margin: 10px 0;
		}
	}
	.check{
		border-radius: 4px;
		color: rgba(16, 16, 16, 1);
		font-size: 14px;
		text-align: center;
		border: 1px solid rgba(187, 187, 187, 1);
		padding: 5px 10px;
		background: #ffffff;
	}
</style>