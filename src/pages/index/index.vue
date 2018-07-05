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
                            你好，
                            <span>{{userName}}</span>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="out">退出</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</el-col>
			</el-row>
		</el-header>
		<el-container class="bierinc-main-container">
			<el-aside width="200px" class="bierinc-main-container-aside">
				<ul class="bierinc-main-container-aside-menu">
					<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name:'home' }">广告项目审核</router-link>
					<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name:'crowdfunding'}">众筹项目审核</router-link>
					<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name:'advertising'}">广告位管理</router-link>
					<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name:'authentication'}">身份认证审核</router-link>
					<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name:'concept'}">概念标签管理</router-link>
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
				uid: this.$store.state.id || Cache.getSession('bier_userid'),
				token: this.$store.state.token || Cache.getSession('bier_token')
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
			}
		},
		methods: {
			handleCommand(command) {
				if(command === 'out') {
					let params = {
						url: 'SignOut',
						data: {
							uid: this.userid,
							token: this.token
						}
					};
					Cache.removeSession('bier_username');
					Cache.removeSession('bier_token');
					Request.requestHandle(params, res => {
						this.$router.push({
							name: 'login'
						});
					});
				}
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