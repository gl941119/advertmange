<template>
	<el-container>
		<el-header class="bierinc-header">
			<el-row class="bierinc-header-left">
				<el-col :span="8" class="bierinc-logo-content">
					<div>Accurate Flow of Data</div>
				</el-col>
				<el-col :span="8" :offset="8" class="bierinc-lanuage">
					<el-dropdown class="bierinc-lanuage-drop" @command="handleCommand">
						<span class="el-dropdown-link">
                            <span>管理员账号</span>
						</span>
					</el-dropdown>
				</el-col>
			</el-row>
		</el-header>
		<el-container class="bierinc-main-container">
			<el-aside width="200px" class="bierinc-main-container-aside">
				<ul class="bierinc-main-container-aside-menu">
					<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: platform==='amazon'?'home':'tikhome' }">项目审核</router-link>
					<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: platform==='amazon'?'bulletin':'tikbulletin' }">广告审核</router-link>
					<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: platform==='amazon'?'feedback':'tikfeedback' }">众筹项目</router-link>
					<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: platform==='amazon'?'feedback':'tikfeedback' }">广告位管理</router-link>
					<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: platform==='amazon'?'feedback':'tikfeedback' }">身份认证审核</router-link>
					<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: platform==='amazon'?'feedback':'tikfeedback' }">概念标签管理</router-link>
				</ul>
			</el-aside>
			<el-main class="bierinc-main-container-view">
				<router-view :key="$route.name"></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>
<script>
	import Cache from '../../utils/cache';
	import Request from '../../utils/require';
	export default {
		data() {
			return {
				id: this.$store.state.id || Cache.getSession('bier_userid'),
				token: this.$store.state.token || Cache.getSession('bier_token'),
				platform: Cache.getSession('platform_type') || this.$store.state.type,
			};
		},
		computed: {
			activeIndex() {
				return this.$route.name;
			},
			userName() {
				return(
					this.$store.state.username || Cache.getSession('bier_username')
				);
			},
		},
		filters: {
			showPlatformType(type) {
				switch(type) {
					case 'amazon':
						return 'Amazon';
						break;
					case 'tiktokv':
						return '抖音';
						break;
				}
			},
		},
		methods: {
			handleCommand(command) {
				switch(command) {
					case 'out':
						{
							let params = {
								url: 'SignOut',
								data: {
									id: this.id,
									token: this.token
								}
							};
							Cache.removeSession('bier_username');
							Cache.removeSession('bier_token');
							Cache.removeSession('platform_type');
							Request.requestHandle(params, res => {
								this.$router.push({
									name: 'login'
								});
							});
							break;
						}
					case 'amazon':
						{
							this.platform = command;
							this.$router.push({
								name: 'index'
							})
							this.handleInfo('setPlatformType', command)
							break;
						}
					case 'tiktokv':
						{
							this.platform = command;
							this.$router.push({
								name: 'tikindex'
							})
							this.handleInfo('setPlatformType', command)
							break;
						}
					default:
						break;
				}
			},
			handleInfo(type, val) {
				this.$store.commit(type, val);
				Cache.setSession('platform_type', val);
			}
		}
	};
</script>
<style lang="scss" scoped>
	.bierinc-type {
		font-size: 20px;
		color: #69c390;
	}
</style>