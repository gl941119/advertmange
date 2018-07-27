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
				<!--核心团队按钮-->
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">核心团队成员</label>
					<el-button type="text" @click="centerDialogVisible = true">点击打开核心团队成员</el-button>
				</li>
				
				<!--核心团队成员弹框-->
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
									<el-button :disabled="disabled" :loading='crowdTeamAmendLoading' @click="recomposeCore(scope.row)">修改</el-button>
								</template>
							</el-table-column>
						</el-table>
						<div slot="footer" class="dialog-footer">
							<el-button :disabled="disabled" :loading='crowdTeamSaveLoading' @click="saveLink">保存</el-button>
							<el-button :disabled="disabled" @click="addCore">添加</el-button>
							<el-button :disabled="disabled" :loading='crowdTeamDelLoading' @click="deletedLink">删除</el-button>
						</div>
					</el-dialog>
				</div>
				
				<!--顾问团队按钮-->
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">顾问团队</label>
					<el-button type="text" @click="CrowdTeamDialogVisible = true">点击打开顾问团队成员</el-button>
				</li>
				<!--顾问团队弹框-->
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
									<el-button :disabled="disabled" @click="recomposeConsultant(scope.row)">修改</el-button>
								</template>
							</el-table-column>
						</el-table>
						<div slot="footer" class="dialog-footer">
							<el-button :disabled="disabled"  :loading='consultantTeamSaveLoading' @click="saveLinkConsultant">保存</el-button>
							<el-button :disabled="disabled" @click="addConsultant">添加</el-button>
							<el-button :disabled="disabled" :loading='consultantTeamdeletedLoading' @click="deletedLinkConsultant">删除</el-button>
						</div>
					</el-dialog>
				</div>
			</ul>
		</div>
		<!--项目列表-->
		<div class="project_review_details_project">
			<div class="project_review_details_title">项目情况</div>
			<ul class="project_review_details_item">
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">项目名称</label>
					<el-input class="project_review_details_item_li_intro" :disabled="disabled" v-model="details.proName"></el-input>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">项目简介</label>
					<el-input class="project_review_details_item_li_intro" :disabled="disabled" v-model="details.proDesc"></el-input>
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
		<!--概念弹窗-->
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
					<el-upload class="avatar-uploader" 
									:action="uploadImg" 
									:show-file-list="false" 
									:on-success="handleAvatarSuccess"
									:headers="requestToken"
									:limit="1"
									accept=".jpg,.jpeg,.png">
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
					<a :href="details.whitePaper" download  style="line-height: 30px;margin-right: 10px;">{{details.whitePaper}}</a>
					<div v-if="!disabled">
						<el-upload class="upload-demo" 
									:action="uploadImg" 
									:on-success="getFile" 
									:headers="requestToken"
									:before-upload='brforeGetFile'
									:limit='1'
									accept=".jpg,.jpeg,.png,.pdf"
									multiple>
							<el-button size="small" :loading='whitePaperSubBtnLoading'>上传</el-button>
						</el-upload>
					</div>
					
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">Telegram</label>
					<el-input class="project_review_details_item_li_intro" :disabled="disabled" v-model="details.telegrameUrl"></el-input>
				</li>
				<li class="project_review_details_item_li" v-for="(item, index) in websites">
					<label class="project_review_details_item_li_label">
					<el-input placeholder="自定义站点名"  v-model="websites[index].websiteName" :disabled="disabled">
			        </el-input>
					</label>
					<el-input placeholder="自定义站点地址"  v-model="websites[index].websiteAddress" :disabled="disabled">
					</el-input>
				</li>
			</ul>
		</div>
		 
		<div v-if="disabled">
			<el-button class="check" @click="passed">审核通过</el-button>
			<el-button class="check" @click="notPassed">审核不通过</el-button>
			<p>请在众筹合约部署完成后点击通过</p>
		</div>
		<div v-if="!disabled">
			<el-button class="check" @click="deitAdvertItem()" :loading='saveSubmitLoading'>保存修改</el-button>
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
//				网站数据
				details: {
					fullEnName: '',
					id: '',
					logo: '',
					proDesc: '',
					proName: '',
					shotCnName: '',
					shotEnName: '',
					teamContact: '',
					teamLocation: '',
					teamName: '',
					technology1: '',
					technology2: '',
					website: '',
					whitePaper: '',
				},
//				核心团队数据
				coreTeam: [{
					accountId: '',
					name: '',
					title: '',
					desc: '',
				}],
//				顾问团队数据
				consultantTeam: [{
					accountId: '',
					name: '',
					title: '',
					desc: '',
				}],
				newCore: {},
				newConsultant: {},
				disabled: false,
				centerDialogVisible: false,
				CrowdTeamDialogVisible: false,
				accountId:undefined,
				advertId:undefined,
				multipleSelection:[],
				timeInterval: [],
				concept: false,
				technology: false,
				conceptDatas: '',
				technologyDatas: '',
				websites:[{},{},{},{},{},{},{},{}],
				websitesSubmit:[],//自定义站点列表
				conceptResult:[],
				newconcept:[],//概念数据
				requestToken: {
					token:
                        this.$store.state.token ||
                        Cache.getSession('bier_token')
				},
				uploadImg: Config.UploadImg,
				WaitSubmitWhitePaper:'',
				crowdTeamSaveLoading:false,
				crowdTeamDelLoading:false,
				crowdTeamAmendLoading:false,
				saveSubmitLoading:false,
				whitePaperSubBtnLoading:false,
				consultantTeamSaveLoading:false,
				consultantTeamdeletedLoading:false

			};
		},
		components: {
			conceptCom,
		},
		mounted() {
			this.queryDetails();
		},
		methods: {
			//通過ID查詢data
			queryDetails() {
				var id = this.$route.params.id;
				var value = this.$route.params.value;
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
					this.accountId = res.data.accountId
					this.advertId = res.data.id

					// this.QueryAdCoreMember() //请求核心团队
					this.coreTeam =  res.data.advertTeamMemberResults
					this.newCore={
						accountId:res.data.accountId,
						advertId:res.data.id,
						desc: '',
						name: '',
						title: ''
					}
					// this.QueryAdConsultantMember()//请求概念团队
					this.consultantTeam = res.data.advertTeamConsultantsResults
					this.newConsultant={
						accountId:res.data.accountId,
						advertId:res.data.advertId,
						desc: '',
						name: '',
						title: ''
					}
					
					var that = this;//请求回后覆盖websites
					if(res.data.websiteResultList.length>0){
						let number = -1;
						res.data.websiteResultList.forEach(function(item, index){
							number++;
							that.websites.splice(number,1,item);
						})
					}
					
					this.conceptResult = res.data.concepManagetResultList;

					var conceptData = [];
					this.conceptResult.forEach(function(item, index){
						conceptData.push(item.name);
					})
					this.conceptDatas = conceptData.join('-');
					
					
					var technologyArr = [];//请求回技术后将字符串连接显示
					if(res.data.technology1) {
						technologyArr.push(res.data.technology1);
					}
					if(res.data.technology2) {
						technologyArr.push(res.data.technology2);
					}
					this.technologyDatas = technologyArr.join('-');
	
				});
			},
			deitAdvertItem(){//提交编辑广告
				this.saveSubmitLoading = true;
				if(this.newconcept.length==0){
					this.newconcept = this.details.concepManagetResultList
				}
				var arr = [],
					thas = this
					if(this.websites.length>0){
						this.websites.forEach(function(item, index){
							item.advertProjId = thas.advertId;
							if(item.websiteName){
								arr.push(item);
							}
						})
					}
					this.websitesSubmit = arr
				let params = {url:'QuerydeitAdvertItem',data:{
					  accountId: this.accountId,
					  conceptManageList: this.conceptResult,
					  fullEnName: this.details.fullEnName,
					  id: this.details.id,
					  isCheck: this.details.isCheck,
					  logo: this.details.logo,
					  proDesc: this.details.proDesc,
					  proName: this.details.proName,
					  shotCnName: this.details.shotCnName,
					  shotEnName: this.details.shotEnName,
					  teamContact: this.details.teamContact,
					  teamLocation: this.details.teamLocation,
					  teamName: this.details.teamName,
					  technology1: this.details.technology1,
					  technology2: this.details.technology2,
					  website: this.details.website,//官方网址
					  websiteList: this.websitesSubmit,
					  whitePaper: this.details.whitePaper,
					  telegrameUrl:this.details.telegrameUrl
					},
					type:'post',
					flag:true}
					
				Request.requestHandle(params, res => {
				
					this.saveSubmitLoading = false;
					if(res.success == 1){
					this.$message('操作成功');
					this.$router.back(-1)
					}
				});
			},
			passed() {//审核通过
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
						this.$router.back(-1)
					}
				});
			},
			notPassed() {//审核不通过
				let id = this.$route.params.id;
				this.$prompt('', '不通过理由', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          inputPattern: /\S/,
		          inputErrorMessage: '请输入理由'
		        }).then(({ value }) => {
					let params = {
						url: 'QueryNotPass',
						data: {
							id: id,
							noPassReason:value
						},
						type: 'get',
					}
					Request.requestHandle(params, res => {
						if(res.success) {
							this.$message('提交成功');
							this.$router.back(-1)
						}
					});
			           
			        })
			},
			saveLink() {//核心团队新增请求
				if(this.multipleSelection.length==0)
					return;
				// this.crowdTeamSaveLoading = true
				for(let i=0,len=this.multipleSelection.length;i<len;i++){
					let params = {
						url: 'AddAdCoreMember',
						data:{	
						  "accountId": this.accountId,	
						  "advertId": this.advertId,	
						  "desc": this.multipleSelection[i].desc,	
						  "name": this.multipleSelection[i].name,	
						  "title": this.multipleSelection[i].title
						  },
						type: 'post',
						flag: true,
					}
					Request.requestHandle(params, res => {
						if(res.success == 1) {
							this.centerDialogVisible= false;
							this.$message('增添成功');
							// this.crowdTeamSaveLoading = false;
							this.QueryAdCoreMember();
						}
					});
				}
				
			},
			recomposeCore(row){//核心团队修改请求
				if(row.id==undefined){
					this.$message('不能为空')
					return;
				}
				// this.crowdTeamAmendLoading = true
				let params = {
					url: 'ChangeAdCoreMember',
					data: {
						accountId: row.accountId,
						advertId: row.advertId,
						desc: row.desc,
						id: row.id,
						name: row.name,
						title: row.title
					},
					type: 'put',
					flag:true
				}
				Request.requestHandle(params, res => {
					if(res.success==1){
						this.$message('修改成功');
						// this.crowdTeamAmendLoading = false;
						this.QueryAdCoreMember();
					}
				});
			},
			deletedLink() {//核心团队删除请求
				if(this.multipleSelection.length==0)
					return;
				this.crowdTeamDelLoading = true
				for(let i=0;i<this.multipleSelection.length;i++){
					let params = {
						url: 'DeletedAdCoreMember',
						data: {
							advertId: this.multipleSelection[i].advertId,
							id: this.multipleSelection[i].id
						},
						type: 'DELETE',
						flag: true,
					}
					Request.requestHandle(params, res => {
						if(res.success==1){
							this.$message('删除成功');
							this.crowdTeamDelLoading = false;
							this.QueryAdCoreMember();
						}	
					});
				}
			},
			saveLinkConsultant() {//顾问团队保存请求
				if(this.multipleSelection.length==0)
					return;
				// this.consultantTeamSaveLoading = true
				var id = this.$route.params.id;
				for(let i=0;i<this.multipleSelection.length;i++){
					let params = {
						url: 'AddAdConsultant',
						data: {
							"accountId": this.accountId,
							  "advertId": this.advertId,
							  "desc": this.multipleSelection[i].desc,
							  "name": this.multipleSelection[i].name,
							  "title": this.multipleSelection[i].title
						},
						type: 'post',
						flag: true,
					}
					Request.requestHandle(params, res => {
						if(res.success == 1) {
							// this.consultantTeamSaveLoading=false;
							this.CrowdTeamDialogVisible = false;
							this.$message('添加成功');
							this.QueryAdConsultantMember()
						}
					});
				}
			},
			recomposeConsultant(row){//顾问团队修改请求
				if(row.id==undefined){
					this.$message('不能为空')
					return;
				}
				let params = {
						url: 'ChangeAdConsultant',
						data: {
							advertId: this.advertId,
							desc: row.desc,
							id: row.id,
							name: row.name,
							title: row.title
						},
						type: 'put',
						flag: true,
					}
					Request.requestHandle(params, res => {
						if(res.success == 1) {
							this.$message('修改成功');
							this.QueryAdConsultantMember()
						}
					});
			},
			deletedLinkConsultant() {//顾问团队删除请求
				if(this.multipleSelection.length==0)
					return;
				this.consultantTeamdeletedLoading = true;
				for(let i=0;i<this.multipleSelection.length;i++){
					let params = {
						url: 'DeletedAdConsultant',
						data: {
							advertId: this.advertId,
							id: this.multipleSelection[i].id
						},
						type: 'DELETE',
						flag: true,
					}
					Request.requestHandle(params, res => {
						if(res.success==1){
							this.consultantTeamdeletedLoading = false;
							this.$message('删除成功');
							this.QueryAdConsultantMember();
						}
					});
				}
			},
			QueryAdCoreMember(){//请求核心团队成员
				let params = {
						url: 'QueryAdCoreMember',
						data:{	
						  advertId: this.advertId,
						  },
						type: 'get',
						flag: true,
					}
					Request.requestHandle(params, res => {
					   this.coreTeam = res.data;//核心團隊
					});
			},
			QueryAdConsultantMember(){//顾问团队成员
				let params = {
						url: 'QueryAdConsultant',
						data:{	
						  advertId: this.advertId,
						  },
						type: 'get',
						flag: true,
					}
					Request.requestHandle(params, res => {
					   	this.consultantTeam = res.data;//顾问团队
					});
				
			},
			addCore() {//核心团队增添一行
				var tmpPersions = this.coreTeam;
				tmpPersions.push(this.newCore);
				this.newCore = {};
				this.coreTeam = tmpPersions;

			},
			addConsultant(){//顾问团队增添一行
				var tmpPersions = this.consultantTeam;
				tmpPersions.push(this.newCore);
				this.newCore = {};
				this.consultantTeam = tmpPersions;
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;	
			},
			brforeGetFile(file){//白皮书上传之前
				this.whitePaperSubBtnLoading = true
			},
			getFile(res) {
				this.details.whitePaper = res.data;	
				this.whitePaperSubBtnLoading = false		
			},
			conceptFun() { //概念弹出窗
				this.concept = !this.concept;
			},
			handleAvatarSuccess(res) {
				
				this.details.logo = res.data;
			},
			technologyFun() {//点击技术
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
			listenCondept(checked) {//概念组件绑定的事件
				
				var newCheckedData = [];
				checked.forEach(function(item, index) {
					newCheckedData.push(item.name);
				})
				this.conceptDatas = newCheckedData.join('-');
				this.conceptResult = checked;
			  	
				
			
				
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
		border-radius: 50%;
		line-height: 178px;
		text-align: center;
	}
	
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
		border-radius: 50%;
	}
	.el-form-item__label{
		
	}
</style>