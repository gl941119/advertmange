<template>
	<div class="project_review_details">
		<div class="project_review_details_team">
			<div class="project_review_details_title">团队</div>
			<ul class="project_review_details_team_item">
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">团队名称</label>
					<el-input class="project_review_details_item_li_intro" :disabled="disabled" v-model="details.teamName"></el-input>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">团队联系方式</label>
					<el-input class="project_review_details_item_li_intro" :disabled="disabled" v-model="details.teamContact"></el-input>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">主要成员所在地</label>
					<el-input class="project_review_details_item_li_intro" :disabled="disabled" v-model="details.teamLocation"></el-input>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">核心团队成员</label>
					<el-button type="text" @click="centerDialogVisible = true">点击打开核心团队成员</el-button>
				</li>
				<div class="project_review_details_item_li_info">
					<el-dialog title="核心团队成员" :visible.sync="centerDialogVisible" size="small">
						<el-table :data="coreTeam" border class="tForm" ref="multipleTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
							<el-table-column type="selection" width="55">
							</el-table-column>
							<el-table-column property="year" align="center" label="全名">
								<template slot-scope="scope">
									<el-input :disabled="disabled" v-model="scope.row.name"></el-input>
								</template>
							</el-table-column>
							<el-table-column property="name" align="center" label="头衔" width="200">
								<template slot-scope="scope">
									<el-input :disabled="disabled" v-model="scope.row.title"></el-input>
								</template>
							</el-table-column>
							<el-table-column property="address" align="center" label="简介">
								<template slot-scope="scope">
									<el-input :disabled="disabled" v-model="scope.row.desc"></el-input>
								</template>
							</el-table-column>
							<el-table-column property="address" align="center" label="操作">
								<template slot-scope="scope">
									<el-button :disabled="disabled" @click="addCore">添加</el-button>
									<el-button :disabled="disabled" @click="deletedCore(scope.$index)">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
						<div slot="footer" class="dialog-footer">
							<el-button :disabled="disabled" @click="saveLink">保存</el-button>
							<el-button :disabled="disabled" @click="addLink">添加</el-button>
							<el-button :disabled="disabled" @click="deletedLink">删除</el-button>
						</div>
					</el-dialog>
				</div>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">顾问团队</label>
					<el-button type="text" @click="CrowdTeamDialogVisible = true">点击打开顾问团队成员</el-button>
				</li>
				<div class="project_review_details_item_li_info">
					<el-dialog title="顾问团队成员" :visible.sync="CrowdTeamDialogVisible" size="small">
						<el-table :data="consultantTeam" border class="tForm" ref="multipleTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
							<el-table-column type="selection" width="55">
							</el-table-column>
							<el-table-column property="year" align="center" label="全名">
								<template slot-scope="scope">
									<el-input :disabled="disabled" v-model="scope.row.name"></el-input>
								</template>
							</el-table-column>
							<el-table-column property="name" align="center" label="头衔" width="200">
								<template slot-scope="scope">
									<el-input :disabled="disabled" v-model="scope.row.title"></el-input>
								</template>
							</el-table-column>
							<el-table-column property="address" align="center" label="简介">
								<template slot-scope="scope">
									<el-input :disabled="disabled" v-model="scope.row.desc"></el-input>
								</template>
							</el-table-column>
							<el-table-column property="address" align="center" label="操作">
								<template slot-scope="scope">
									<el-button :disabled="disabled" @click="addConsultant">添加</el-button>
									<el-button :disabled="disabled" @click="deletedConsultant(scope.$index)">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
						<div slot="footer" class="dialog-footer">
							<el-button :disabled="disabled" @click="saveLinkConsultant">保存</el-button>
							<el-button :disabled="disabled" @click="addLinkConsultant">添加</el-button>
							<el-button :disabled="disabled" @click="deletedLinkConsultant">删除</el-button>
						</div>
					</el-dialog>
				</div>
			</ul>
		</div>
		<div class="project_review_details_project">
			<div class="project_review_details_title">项目情况</div>
			<ul class="project_review_details_item">
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">项目名称</label>
					<el-input class="project_review_details_item_li_intro" :disabled="disabled" v-model="details.proName"></el-input>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">项目简介</label>
					<el-input class="project_review_details_item_li_intro" :disabled="disabled" v-model="details.teamName"></el-input>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">概念</label>
					<div class="project_review_details_item_li_intro" style="position: relative;">
						<el-input v-model="conceptDatas" :disabled="disabled" placeholder="请输入内容">
						</el-input>
						<i class="el-icon-circle-plus" v-if="!disabled" style="position: absolute;top: 14px;right: 15px;" @click="conceptFun"></i>
					</div>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">技术</label>
					<div class="project_review_details_item_li_intro" style="position: relative;">
						<el-input v-model="technologyDatas" :disabled="disabled" placeholder="请输入内容">
						</el-input>
						<i class="el-icon-circle-plus" v-if="!disabled" style="position: absolute;top: 14px;right: 15px;" @click="technologyFun"></i>
					</div>
				</li>
			</ul>
		</div>
		<!--概念-->
		<div v-if="concept" class="withdraw">
			<div class="withdraw_box">
				<span class="withdraw_box_back" @click="conceptFun"><i class="el-icon-close"></i></span>
				<div>
					<conceptCom @listenCondept="listenCondept"></conceptCom>
				</div>
			</div>
		</div>
		<!--技术-->
		<div v-if="technology" class="withdraw">
			<div class="withdraw_box">
				<span class="withdraw_box_back" @click="technologyFun"><i class="el-icon-close"></i></span>
				<el-input placeholder="请输入技术" v-model="details.technology1">
				</el-input>
				<el-input placeholder="请输入技术" v-model="details.technology2">
				</el-input>
				<button class="right_now" style=";position:absolute;top: 278px;" @click="technologyFun">好的</button>
			</div>
		</div>
		<div class="project_review_details_project">
			<div class="project_review_details_title">代币信息</div>
			<ul class="project_review_details_item">
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">英文简写</label>
					<el-input class="project_review_details_item_li_intro" :disabled="disabled" v-model="details.shotEnName"></el-input>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">英文全名</label>
					<el-input class="project_review_details_item_li_intro" :disabled="disabled" v-model="details.fullEnName"></el-input>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">中文简写</label>
					<el-input class="project_review_details_item_li_intro" :disabled="disabled" v-model="details.shotCnName"></el-input>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">logo</label>
					<el-upload class="avatar-uploader" action="" :show-file-list="false" :on-change="handleAvatarSuccess">
						<img v-if="details.logo" :src="details.logo" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</li>
			</ul>
		</div>
		<div class="project_review_details_project">
			<div class="project_review_details_title">相关链接</div>
			<ul class="project_review_details_item">
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">官方网站</label>
					<el-input class="project_review_details_item_li_intro" :disabled="disabled" v-model="details.website"></el-input>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">白皮书</label>
					<span style="line-height: 30px;margin-right: 10px;">{{details.whitePaper}}</span>
					<div v-if="!disabled">
						<el-upload class="upload-demo" action="" :on-change="getFile" multiple>
							<el-button size="small">上传</el-button>
						</el-upload>
					</div>
				</li>
				<div v-if="disabled">
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
				</div>
				<div v-else>
					<li class="project_review_details_item_li">
						<label class="project_review_details_item_li_label">
							<el-input placeholder="自定义站点名" v-model="siteName1" >
							</el-input>
						</label>
						<el-input placeholder="自定义站点地址" v-model="siteAddress1">
						</el-input>
					</li>
					<li class="project_review_details_item_li">
						<label class="project_review_details_item_li_label">
							<el-input placeholder="自定义站点名" v-model="siteName2" >
							</el-input>
						</label>
						<el-input placeholder="自定义站点地址" v-model="siteAddress2">
						</el-input>
					</li>
					<li class="project_review_details_item_li">
						<label class="project_review_details_item_li_label">
							<el-input placeholder="自定义站点名" v-model="siteName3" >
							</el-input>
						</label>
						<el-input placeholder="自定义站点地址" v-model="siteAddress3">
						</el-input>
					</li>
					<li class="project_review_details_item_li">
						<label class="project_review_details_item_li_label">
							<el-input placeholder="自定义站点名" v-model="siteName4" >
							</el-input>
						</label>
						<el-input placeholder="自定义站点地址" v-model="siteAddress4">
						</el-input>
					</li>
					<li class="project_review_details_item_li">
						<label class="project_review_details_item_li_label">
							<el-input placeholder="自定义站点名" v-model="siteName5" >
							</el-input>
						</label>
						<el-input placeholder="自定义站点地址" v-model="siteAddress5">
						</el-input>
					</li>
					<li class="project_review_details_item_li">
						<label class="project_review_details_item_li_label">
							<el-input placeholder="自定义站点名" v-model="siteName6" >
							</el-input>
						</label>
						<el-input placeholder="自定义站点地址" v-model="siteAddress6">
						</el-input>
					</li>
					<li class="project_review_details_item_li">
						<label class="project_review_details_item_li_label">
							<el-input placeholder="自定义站点名" v-model="siteName7" >
							</el-input>
						</label>
						<el-input placeholder="自定义站点地址" v-model="siteAddress7">
						</el-input>
					</li>
					<li class="project_review_details_item_li">
						<label class="project_review_details_item_li_label">
							<el-input placeholder="自定义站点名" v-model="siteName8" >
							</el-input>
						</label>
						<el-input placeholder="自定义站点地址" v-model="siteAddress8">
						</el-input>
					</li>
				</div>
			</ul>
		</div>
		<div v-if="disabled">
			<button class="check" @click="passed">审核通过</button>
			<button class="check" @click="notPassed">审核不通过</button>
			<p>请在众筹合约部署完成后点击通过</p>
		</div>
	</div>
</template>

<script>
	import Config from '../../../utils/config';
	import conceptCom from '../common/concept.vue';
	import Cache from '../../../utils/cache';
	import Request from '../../../utils/require';
	export default {
		data() {
			return {
				details: {

				},
				coreTeam: [{
					accountId: '',
					number: '',
					name: '',
					title: '',
					desc: '',
				}],
				consultantTeam: [{
					accountId: '',
					name: '',
					title: '',
					desc: '',
				}],
				newCore: {
					accountId: '',
					name: '',
					title: '',
					desc: '',
				},
				newConsultant: {
					accountId: '',
					name: '',
					title: '',
					desc: '',
				},
				disabled: false,
				centerDialogVisible: false,
				CrowdTeamDialogVisible: false,
				accountId: this.$store.state.id || Cache.getSession('bier_userid'),
				multipleSelection: [],
				timeInterval: [],
				concept: false,
				technology: false,
				conceptDatas: '',
				technologyDatas: '',
				checkeData: [],
			};
		},
		components: {
			conceptCom,
		},
		mounted() {
			this.queryDetails();

		},
		methods: {
			queryDetails(page = Config.pageStart) {
				var id = this.$route.params.id;
				var value = this.$route.params.value;
				console.log(this.$route);
				if(value == 1) {
					this.disabled = false;
				} else {
					this.disabled = true;
				}
				let params = {
					url: 'QueryDetails',
					data: {
						id: id
					},
					type: 'get',
				}
				Request.requestHandle(params, res => {
					this.details = res.data;
					let {
						concept1Id,
						concept2Id,
						concept3Id,
						concept4Id,
					} = res.data;
					this.conceptDatas = [concept1Id, concept2Id, concept3Id, concept4Id].join('-');
					var technologyArr = [];
					if(res.data.technology1) {
						technologyArr.push(res.data.technology1);
					}
					if(res.data.technology2) {
						technologyArr.push(res.data.technology2);
					}
					this.technologyDatas = technologyArr.join('-');
					this.coreTeam = res.data.memberResults;
					this.consultantTeam = res.data.consultantsResults;
					console.log(this.details)
				});
			},
			changeDetails() {
				
				let params = {
					url: 'ChangeDetails',
					data: {
						accountId: this.details.accountId,
						circulation: this.details.circulation,
						concept1Id: this.details.concept1Id,
						concept2Id: this.details.concept2Id,
						concept3Id: this.details.concept3Id,
						concept4Id: this.details.concept4Id,
						currCirculation: this.details.currCirculation,
						endTime: this.timeInterval[1],
						fullEnName: this.details.fullEnName,
						id: this.details.id,
						license: this.details.license,
						logo: this.details.logo,
						lowLimit: this.details.lowLimit,
						mostNumber: this.details.mostNumber,
						price: this.details.price,
						proDesc: this.details.proDesc,
						proName: this.details.proName,
						shotCnName: this.details.shotCnName,
						shotEnName: this.details.shotEnName,
						startTime: this.timeInterval[0],
						targetCurrency: this.details.targetCurrency,
						teamContact: this.details.teamContact,
						teamLocation: this.details.teamLocation,
						teamName: this.details.teamName,
						technology1: this.details.technology1,
						technology2: this.details.technology2,
						title: this.details.title,
						topLimit: this.details.topLimit,
						totalCrowdfund: this.details.totalCrowdfund,
						website: this.details.website,
						whitePaper: this.details.whitePaper
					},
					type: 'put',
					flag:true,
				}
				Request.requestHandle(params, res => {
					console.log(res);
				});
			},
			passed() {
				var id = this.$route.params.id;
				let params = {
					url: 'QueryPass',
					data: {
						id: id
					},
					type: 'get',
				}
				Request.requestHandle(params, res => {
					if(res.success) {
						this.$message('操作成功');
					}
				});
			},
			notPassed() {
				var id = this.$route.params.id;
				let params = {
					url: 'QueryNotPass',
					data: {
						id: id
					},
					type: 'get',
				}
				Request.requestHandle(params, res => {
					if(res.success) {
						this.$message('操作成功');
					}
				});
			},
			addCore() { //核心团队
				var tmpPersions = this.coreTeam;
				tmpPersions.push(this.newCore);
				this.newCore = {};
				this.coreTeam = tmpPersions;
			},
			deletedCore(value) { //核心团队
				console.log(value)
				var length = this.coreTeam.length;
				if(length <= 1) {
					alert("不要删了o，再删就没有了")
				} else {
					this.coreTeam.splice(value, 1);
				}
			},
			saveLink() {
				var id = this.$route.params.id;
				let params = {
					url: 'ChangeCoreMember',
					data: {
						id: this.multipleSelection[0].id,
						accountId: this.accountId,
						crowdId: this.multipleSelection[0].crowdId,
						desc: this.multipleSelection[0].desc,
						name: this.multipleSelection[0].name,
						title: this.multipleSelection[0].title
					},
					type: 'put',
					flag: true,
				}
				Request.requestHandle(params, res => {
					console.log(res);
					if(res.success == 1) {
						this.$message('修改成功');
					}
				});
			},
			addLink() {
				var id = this.$route.params.id;
				let params = {
					url: 'AddCoreMember',
					data: {
						accountId: this.accountId,
						crowdId: this.details.id,
						desc: this.multipleSelection[0].desc,
						name: this.multipleSelection[0].name,
						title: this.multipleSelection[0].title
					},
					flag: true,
				}
				Request.requestHandle(params, res => {
					console.log(res);
					if(res.success == 1) {
						this.$message('添加成功');
					}
				});
			},
			deletedLink() {
				var id = this.$route.params.id;
				let params = {
					url: 'DeletedCoreMember',
					data: {
						crowdId: this.multipleSelection[0].crowdId,
						id: this.multipleSelection[0].id
					},
					type: 'DELETE',
					flag: true,
				}
				Request.requestHandle(params, res => {
					console.log(res);
				});
			},
			addConsultant() { //顾问团队
				var tmpPersions = this.consultantTeam;
				tmpPersions.push(this.newConsultant);
				this.newConsultant = {};
				this.consultantTeam = tmpPersions;
			},
			deletedConsultant(value) { //顾问团队
				console.log(value)
				var length = this.consultantTeam.length;
				if(length <= 1) {
					alert("不要删了o，再删就没有了")
				} else {
					this.consultantTeam.splice(value, 1);
				}
			},
			addLinkConsultant() {
				var id = this.$route.params.id;
				let params = {
					url: 'addConsultant',
					data: {
						accountId: this.accountId,
						crowdId: this.details.id,
						desc: this.multipleSelection[0].desc,
						name: this.multipleSelection[0].name,
						title: this.multipleSelection[0].title
					},
					flag: true,
				}
				Request.requestHandle(params, res => {
					console.log(res);
					if(res.success == 1) {
						this.$message('添加成功');
					}
				});
			},
			deletedLinkConsultant() {
				var id = this.$route.params.id;
				let params = {
					url: 'deletedConsultant',
					data: {
						accountId: this.accountId,
						crowdId: this.details.id,
						desc: this.multipleSelection[0].desc,
						name: this.multipleSelection[0].name,
						title: this.multipleSelection[0].title
					},
					type: 'DELETE',
					flag: true,
				}
				Request.requestHandle(params, res => {
					console.log(res);
				});
			},
			saveLinkConsultant() {
				var id = this.$route.params.id;
				let params = {
					url: 'ChangeConsultant',
					data: {
						id: this.multipleSelection[0].id,
						accountId: this.accountId,
						crowdId: this.multipleSelection[0].crowdId,
						desc: this.multipleSelection[0].desc,
						name: this.multipleSelection[0].name,
						title: this.multipleSelection[0].title
					},
					type: 'put',
					flag: true,
				}
				Request.requestHandle(params, res => {
					console.log(res);
					if(res.success == 1) {
						this.$message('修改成功');
					}
				});
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
				console.log(val)
			},
			getFile() {
				this.details.license = file.url;
			},
			conceptFun() { //概念弹出窗
				this.concept = !this.concept;
			},
			handleAvatarSuccess(file) {
				console.log(file);
				this.details.logo = file.url;
			},
			technologyFun() {
				this.technology = !this.technology;
				var technologyArr = [];
				if(this.details.technology1) {
					technologyArr.push(this.details.technology1);
				}
				if(this.details.technology2) {
					technologyArr.push(this.details.technology2);
				}
				this.technologyDatas = technologyArr.join('-');
			},
			listenCondept(checkedData) {
				var newCheckedData = [];
				checkedData.forEach(function(item, index) {
					newCheckedData.push(item.value);
				})
				this.conceptDatas = newCheckedData.join('-');
				this.checkeData = checkedData;
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../assets/css/global.scss';
	@import '../../../assets/css/variable.scss';
	@import '../../../assets/css/newProjectDetails.scss';
	@import '../../../assets/css/withdraw.scss';
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
		&_info {
			margin: 10px 0;
		}
	}
	
	.check {
		border-radius: 4px;
		color: rgba(16, 16, 16, 1);
		font-size: 14px;
		text-align: center;
		border: 1px solid rgba(187, 187, 187, 1);
		padding: 5px 10px;
		background: #ffffff;
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
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>