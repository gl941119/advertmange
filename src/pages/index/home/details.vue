<template>
	<div class="project_review_details">
		<div class="project_review_details_team">
			<div class="project_review_details_title">团队</div>
			<ul class="project_review_details_team_item">
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">团队名称</label>
					<div class="project_review_details_item_li_intro">毕尔大数据</div>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">团队联系方式</label>
					<div class="project_review_details_item_li_intro">123456789789456123</div>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">主要成员所在地</label>
					<div class="project_review_details_item_li_intro">杭州杭州西湖区</div>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">核心团队成员</label>
				</li>
				<div class="project_review_details_item_li_info">
					<el-table :show-header=false border :data="coreTeamMembers" style="width: 100%">
						<el-table-column prop="a" label="日期" width="180">
						</el-table-column>
						<el-table-column prop="b" label="姓名" width="180">
						</el-table-column>
						<el-table-column prop="c" label="地址">
						</el-table-column>
					</el-table>
				</div>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">顾问团队</label>
				</li>
				<div class="project_review_details_item_li_info">
					<el-table :show-header=false border :data="consultantTeam" style="width: 100%">
						<el-table-column prop="a" label="日期" width="180">
						</el-table-column>
						<el-table-column prop="b" label="姓名" width="180">
						</el-table-column>
						<el-table-column prop="c" label="地址">
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
					<div class="project_review_details_item_li_intro">阿凡达</div>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">项目简介</label>
					<div class="project_review_details_item_li_intro">阿凡达阿凡达阿凡达阿凡达阿凡达阿凡达阿凡达阿凡达阿凡达阿凡达阿凡达阿凡达阿凡达阿凡达阿凡达阿凡达阿凡达阿凡达阿凡达阿凡达阿凡达阿凡达</div>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">概念</label>
					<span style="margin-right: 20px;">平台币</span>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">技术</label>
					<span>数据经济</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
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
				}]
			};
		},
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
		.project_review_details_item_li_label {
			width: 150px;
		}
		.project_review_details_item_li_intro {
			flex: 1;
		}
	}
	.project_review_details_item_li_info{
		margin: 10px 0;
	}
</style>