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
					<el-table :show-header=false border :data="details.CrowdTeamMemberResult" style="width: 100%">
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
					<el-table :show-header=false border :data="details.CrowdTeamConsultantsResult" style="width: 100%">
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
			<div class="project_review_details_title">本轮众筹标题</div>
			<ul class="project_review_details_item">
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">发行总量</label>
					<div class="project_review_details_item_li_intro">{{details.circulation}}</div>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">众筹总量</label>
					<div class="project_review_details_item_li_intro">{{details.totalCrowdfund}}</div>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">本轮次发行量</label>
					<div class="project_review_details_item_li_intro">{{details.currCirculation}}</div>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">众筹价格</label>
					<div class="project_review_details_item_li_intro">{{details.price}}</div>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">目标货币</label>
					<div class="project_review_details_item_li_intro">{{details.targetCurrency}}</div>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">发行硬顶</label>
					<div class="project_review_details_item_li_intro">{{details.lowLimit }}</div>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">发行软顶</label>
					<div class="project_review_details_item_li_intro">{{details.topLimit}}</div>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">本轮众筹时间</label>
					<div class="project_review_details_item_li_intro">
						<span>{{details.startTime}}</span> ~ <span>{{details.endTime}}</span>
					</div>
				</li>
			</ul>
		</div>
		<div class="project_review_details_project">
			<div class="project_review_details_title">相关链接与文件</div>
			<ul class="project_review_details_item">
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">官方网站</label>
					<div class="project_review_details_item_li_intro">{{details.website}}</div>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">白皮书</label>
					<div class="project_review_details_item_li_intro">{{details.whitePaper}}</div>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">合规性文件</label>
					<a v-if="details.license"
                           :href="details.license"
                           download>下载</a>
				</li>
			</ul>
		</div>
		<button class="check" @click="passed">审核通过</button>
		<button class="check" @click="notPassed">审核不通过</button>
		<p>请在众筹合约部署完成后点击通过</p>
	</div>
</template>

<script>
	import Config from '../../../utils/config';
	import Request from '../../../utils/require';
	export default {
		data() {
			return {
				coreTeamMembers: [{
					a: '1111',
					b: '2222',
					c: '3333'
				}],
				consultantTeam: [{
					a: '1111',
					b: '2222',
					c: '3333'
				}],
				details:{
					
				}
			};
		},
		mounted(){
			this.queryDetails();
		},
		methods:{
			queryDetails(page = Config.pageStart) {
				var id = this.$route.params.id;
				let params = {
					url: 'QueryCrowdfundingDetails',
					data: {
						id:id
					},
					type: 'get',
				}
				Request.requestHandle(params, res => {
					this.details = res.data;
					console.log(res)
				});
			},
			passed(){
				var id = this.$route.params.id;
				let params = {
					url: 'QueryCrowdfundingPass',
					data: {
						id:id
					},
					type: 'get',
				}
				Request.requestHandle(params, res => {
					if(res.data.success){
						this.$message('操作成功');
					}
				});
			},
			notPassed(){
				var id = this.$route.params.id;
				let params = {
					url: 'QueryCrowdfundingNotpass',
					data: {
						id:id
					},
					type: 'get',
				}
				Request.requestHandle(params, res => {
					if(res.data.success){
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