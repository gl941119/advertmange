<template>
	<el-container>
		<el-header class="bierinc-header">
			<el-row class="bierinc-header-left" style='z-index: 100;'>
				<el-col :span="8" class="bierinc-logo-content">
					<img src="../../assets/img/logo.png" alt="logo">
					<div>阿凡达运营管理后台</div>
				</el-col>
				<el-col :span="8" :offset="8" class="bierinc-lanuage">
					<div class="bierinc-lanuage-icon">
						<img src="../../assets/img/yuyan.png">
					</div>
					<el-dropdown class="bierinc-lanuage-drop" @visible-change="handleChange">
						<span class="el-dropdown-link">
                            选择语言
                            <i class="el-icon-arrow-down el-icon--right"
                               :class="{active: isActive}"></i>
                            <i class="el-icon-arrow-up el-icon--right"
                               :class="{active: !isActive}"></i>
                        </span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item>简体中文</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</el-col>
			</el-row>
		</el-header>
		<el-container class="login-container">
			<div class="waveWrapper waveAnimation">
			  <div class="waveWrapperInner bgTop">
			    <div class="wave waveTop" ></div>
			  </div>

			  <div class="waveWrapperInner bgMiddle">
			    <div class="wave waveMiddle" ></div>
			  </div>
			  <div class="waveWrapperInner bgBottom">
			    <div class="wave waveBottom"></div>
			  </div>
			</div>
			<div class="login-container-content" style="z-index: 100;">
				<el-form :model="formLabelAlign" label-position="left" label-width="100px" class="login-container-content-right">
					<h3>欢迎进入阿凡达运营管理后台</h3>
					<el-form-item label="用户名">
						<el-input v-model="formLabelAlign.name" placeholder="请输入用户名"></el-input>
					</el-form-item>
					<el-form-item label="登录密码">
						<el-input type="password" v-model="formLabelAlign.password" @keyup.enter.native="submitForm" placeholder="请输入密码"></el-input>
					</el-form-item>
					<el-checkbox-group v-model="formLabelAlign.type">
						<!--<el-checkbox label="《阿凡达大数据产品注意事项及法律声明》" name="type"></el-checkbox>-->
					</el-checkbox-group>
					<el-form-item class="login-container-content-right-btn">
						<el-button type="primary" :loading="loading" @click="submitForm">提交</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-container>
	</el-container>
</template>
<script>
	import Request from '../../utils/require';
	import Cache from '../../utils/cache';

	export default {
		data() {
			return {
				isActive: true,
				formLabelAlign: {
					name: '',
					password: '',
					type: true
				},
				loading: false
			};
		},
		methods: {
			handleChange(flag) {
				this.isActive = flag ? false : true;
			},
			submitForm() {//登录
				if(this.formLabelAlign.type) {
					if(this.formLabelAlign.name && this.formLabelAlign.password) {
						let {
							name: username,
							password
						} = this.formLabelAlign;
						this.loading = true;
						let params = {
							url: 'Login',
							data: {
								username,
								password,
								sequence: 1 // login
							},
							type: 'post',
							flag:true
						};
						Request.requestHandle(
							params,
							res => {
								this.loading = false;
								this.successHandle(res.data);


								this.$router.push({
									name: 'index'
								});
							},
							null,
							() => {
								this.loading = false;
							},
							res => {
								this.loading = false;
								if(res.data.data && res.data.data.iscontinue) {
									this.$confirm(
											'该账户已在别处登录, 继续登录将导致他直接下线，是否继续?',
											'提示', {
												confirmButtonText: '确定',
												cancelButtonText: '取消',
												type: 'warning'
											}
										)
										.then(() => {
											let paramsAgain = {
												url: 'Login',
												data: {
													username,
													password,
													sequence: 2
												},
												type:'post',
												flag:true
											};
											Request.requestHandle(paramsAgain, res => {
												this.successHandle(res.data);

												this.$router.push({
													name: 'index'
												});
											})
										})
										.catch(() => {
											this.$message({
												type: 'info',
												message: '已取消'
											});
										});
								}
							}
						);
					} else {
						this.$message({
							message: '用户名和密码不能为空',
							type: 'warning'
						});
					}
				} else {
					this.$message({
						message: '请先阅读注意事项和法律声明',
						type: 'warning'
					});
				}
			},
			successHandle(data) {
				if(data) {
					let {
						userid,
						username,
						token,
						userType
					} = data;

					this.$store.commit('setUserUId', userid); // 主账户id
					this.$store.commit('setUserName', username);
					this.$store.commit('setToken', token);
					this.$store.commit('setUserType', userType);
					Cache.setSession('bier_token', token);
					Cache.setSession('bier_username', username);
					Cache.setSession('bier_userid', userid);
					Cache.setSession('bier_userType', userType);

				} else {
					console.error('login error');
				}
			}
		}
	};
</script>
<style lang="scss" scoped>
	@import '../../assets/css/variable.scss';
	@import '../../assets/css/loginBack.css';


	.login-container {
		height: calc(100vh - 60px);
		background: $basicColor;
		display: flex;
		justify-content: center;
		align-items: center;
		&-content {
			display: flex;
			width: 100%;
			justify-content: space-around;
			&-left {
				color: #fff;
				&>h3 {
					font-size: 32px;
					font-weight: 400;
					margin-bottom: 50px;
				}
				&>p {
					margin-bottom: 20px;
				}
			}
			&-right {
				padding: 30px;
				background: #fff;
				border-radius: 10px;
				&>h3 {
					margin-bottom: 22px;
					font-weight: normal;
					font-size: 22px;
				}
				&-btn {
					margin: 10px 0 0 0;
					width: 100%;
				}
			}
		}
	}


@keyframes move_wave {
0% {
    transform: translateX(0) translateZ(0) scaleY(1)
}
50% {
    transform: translateX(-25%) translateZ(0) scaleY(0.55)
}
100% {
    transform: translateX(-50%) translateZ(0) scaleY(1)
}
}
.waveWrapper {
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
}
.waveWrapperInner {
    position: absolute;
    width: 100%;
    overflow: hidden;
    height: 100%;
    bottom: -1px;
    background-image: linear-gradient(to top, #86377b 20%, #27273c 80%);
}
.bgTop {
    z-index: 15;
    opacity: 0.5;
}
.bgMiddle {
    z-index: 10;
    opacity: 0.75;
}
.bgBottom {
    z-index: 5;
}
.wave {
    position: absolute;
    left: 0;
    width: 200%;
    height: 100%;
    background-repeat: repeat no-repeat;
    background-position: 0 bottom;
    transform-origin: center bottom;
}
.waveTop {
    background-image: url('../../assets/img/wave-top.png');
    background-size: 50% 100px;
}
.waveAnimation .waveTop {
  animation: move-wave 3s;
   -webkit-animation: move-wave 3s;
   -webkit-animation-delay: 1s;
   animation-delay: 1s;
}
.waveMiddle {
    background-image: url('../../assets/img/wave-mid.png');
    background-size: 50% 120px;
}
.waveAnimation .waveMiddle {
    animation: move_wave 10s linear infinite;
}
.waveBottom {
    background-image: url('../../assets/img/wave-bot.png');
    background-size: 50% 100px;
}
.waveAnimation .waveBottom {
    animation: move_wave 15s linear infinite;
}
</style>
