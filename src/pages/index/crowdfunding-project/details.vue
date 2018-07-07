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
						<el-table :data="details.memberResults" border class="tForm" ref="multipleTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
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
					<!--<el-table :show-header=false border :data="details.CrowdTeamConsultantsResult" style="width: 100%">
						<el-table-column prop="name" label="日期" width="180">
						</el-table-column>
						<el-table-column prop="title" label="姓名" width="180">
						</el-table-column>
						<el-table-column prop="desc" label="地址">
						</el-table-column>
					</el-table>-->
					<el-dialog title="顾问团队成员" :visible.sync="CrowdTeamDialogVisible" size="small">
						<el-table :data="details.consultantsResults" border class="tForm" ref="multipleTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
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
							<el-button :disabled="disabled" @click="addLinkConsultant">添加</el-button>
							<el-button :disabled="disabled" @click="deletedLinkConsultant">删除</el-button>
						</div>
					</el-dialog>
				</div>
			</ul>
		</div>
		<div class="project_review_details_team">
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
		<div class="project_review_details_team">
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
					<!--<span><img style="width: 50px;height: 50px;" :src="details.logo"/></span>-->
					<el-upload class="avatar-uploader" action="" :show-file-list="false" :on-change="handleAvatarSuccess">
						<img v-if="details.logo" :src="details.logo" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</li>
			</ul>
		</div>
		<div class="project_review_details_team">
			<div class="project_review_details_title">本轮众筹标题</div>
			<ul class="project_review_details_item">
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">发行总量</label>
					<el-input class="project_review_details_item_li_intro" :disabled="disabled" v-model="details.circulation"></el-input>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">众筹总量</label>
					<el-input class="project_review_details_item_li_intro" :disabled="disabled" v-model="details.totalCrowdfund"></el-input>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">本轮次发行量</label>
					<el-input class="project_review_details_item_li_intro" :disabled="disabled" v-model="details.currCirculation"></el-input>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">众筹价格</label>
					<el-input class="project_review_details_item_li_intro" :disabled="disabled" v-model="details.price"></el-input>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">目标货币</label>
					<el-input class="project_review_details_item_li_intro" :disabled="disabled" v-model="details.targetCurrency"></el-input>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">发行硬顶</label>
					<el-input class="project_review_details_item_li_intro" :disabled="disabled" v-model="details.lowLimit"></el-input>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">发行软顶</label>
					<el-input class="project_review_details_item_li_intro" :disabled="disabled" v-model="details.topLimit"></el-input>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">本轮众筹时间</label>
					<div v-if="disabled" class="project_review_details_item_li_intro">
						<span>{{details.startTime}}</span> ~ <span>{{details.endTime}}</span>
					</div>
					<div v-if="!disabled" class="project_review_details_item_li_intro">
						<el-date-picker v-if="disabled" v-model="timeInterval" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
						</el-date-picker>
					</div>
				</li>
			</ul>
		</div>
		<div class="project_review_details_team">
			<div class="project_review_details_title">合规性文件</div>
			<ul class="project_review_details_item">
				<!--<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">官方网站</label>
					<el-input class="project_review_details_item_li_intro" :disabled="disabled" v-model="details.website"></el-input>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">白皮书</label>
					<el-input class="project_review_details_item_li_intro" :disabled="disabled" v-model="details.whitePaper"></el-input>
				</li>-->
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">相关牌照</label>
					<a v-if="disabled && details.license" :href="details.license" download>下载</a>
					<div v-if="!disabled">
						<el-upload class="upload-demo" action="" :on-change="getFile" multiple>
							<el-button size="small">上传</el-button>
						</el-upload>
					</div>
				</li>
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
				coreTeam: [{
					accountId: 1,
					number: '1',
					name: '1',
					title: '1',
					desc: '1',
				}],
				consultantTeam: [{
					accountId: 1,
					name: '',
					title: '',
					desc: '',
				}],
				newCore: {
					accountId: 1,
					name: '',
					title: '',
					desc: '',
				},
				newConsultant: {
					accountId: 1,
					name: '',
					title: '',
					desc: '',
				},
				details: {

				},
				disabled: false,
				centerDialogVisible: false,
				CrowdTeamDialogVisible:false,
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
				if(value == 1){
					this.disabled = false;
				}else{
					this.disabled = true;
				}
				let params = {
					url: 'QueryCrowdfundingDetails',
					data: {
						id: id
					},
					type: 'get',
				}
				Request.requestHandle(params, res => {
					this.details = res.data;
					console.log(res);
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
				});
			},
			passed() {
				var id = this.$route.params.id;
				let params = {
					url: 'QueryCrowdfundingPass',
					data: {
						id: id
					},
					type: 'get',
				}
				Request.requestHandle(params, res => {
					if(res.success == 1) {
						this.$message('操作成功');
					}
				});
			},
			notPassed() {
				var id = this.$route.params.id;
				let params = {
					url: 'QueryCrowdfundingNotpass',
					data: {
						id: id
					},
					type: 'get',
				}
				Request.requestHandle(params, res => {
					if(res.success == 1) {
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
			deleted() {
				var id = this.$route.params.id;
				let params = {
					url: 'DeletedCoreMember',
					data: {
						accountId: this.accountId,
						crowdId: this.details.id,
						desc: this.multipleSelection[0].desc,
						name: this.multipleSelection[0].name,
						title: this.multipleSelection[0].title
					},
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
			deletedLinkConsultant() {
				var id = this.$route.params.id;
				let params = {
					url: 'DeletedCoreMember',
					data: {
						accountId: this.accountId,
						crowdId: this.details.id,
						desc: this.multipleSelection[0].desc,
						name: this.multipleSelection[0].name,
						title: this.multipleSelection[0].title
					},
				}
				Request.requestHandle(params, res => {
					console.log(res);
				});
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			deletedLink() {

			},
			handleAvatarSuccess(file) {
				console.log(file);
				this.details.logo = file.url;
			},
			getFile() {
				this.details.license = file.url;
			},
			conceptFun() { //概念弹出窗
				this.concept = !this.concept;
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
	.project_review_details_team {
		padding: 20px;
		margin-bottom: 10px;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
		border: 1px solid rgba(228, 231, 237, 1);
	}
	
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