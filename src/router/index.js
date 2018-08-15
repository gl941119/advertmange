import Vue from 'vue';
import Router from 'vue-router';

import LoginCom from '@/pages/login/login';
import IndexCom from '@/pages/index/index';
// index children广告项目管理
import HomeCom from '@/pages/index/home/home';
import advertDetails from '@/pages/index/home/details';
//众筹项目管理
import CrowdfundingCom from '@/pages/index/crowdfunding-project/project';
import CrowdfundingDetail from '@/pages/index/crowdfunding-project/details';
//广告位管理
import AdvertisingCom from '@/pages/index/advertising-space/index';
//身份认证审核
import AuthenticationCom from '@/pages/index/authentication/index';
//概念标签管理
import ConceptnCom from '@/pages/index/conceptLabel/concept';
//充值审核
import chargeAudit from '@/pages/index/chargeAudit/chargeAudit'
import chargeAuditDetail from '@/pages/index/chargeAudit/chargeAuditDetail'
//用户访问
import usersVisit from '@/pages/index/usersVisit/usersVisit'
//后台用户访问
import BackUsersVisit from '@/pages/index/backUsersVisit/backUsersVisit'
//对账
import Reconciliation from '@/pages/index/reconciliation/reconciliation';

//运行数据
import Operational from '@/pages/index/operational/operational';

//测试

import PublicAccountCom from '@/pages/index/public-account';
import BulletinCom from '@/pages/index/material/bulletin';
import FeedbackCom from '@/pages/index/material/feedback';

Vue.use(Router);

export default new Router({
	routes: [{
			path: '/',
			redirect: {
				name: 'login'
			},
		},
		{
			path: '/login',
			name: 'login',
			component: LoginCom,
		},
		{
			path: '/index',
			name: 'index',
			meta: {
				requiresAuth: true
			},
			component: IndexCom,
			redirect: {
				name: 'home'
			},
			children: [{
					path: 'home',
					name: 'home',
					component: HomeCom,
				},
				{
					path: 'advertDetails/:id/:value',
					name: 'advertDetails',
					component: advertDetails,
				},
				{
					path: 'crowdfunding',
					name: 'crowdfunding',
					component: CrowdfundingCom,
				},
				{
					path: 'crowdfundingDetail/:id/:value',
					name: 'crowdfundingDetail',
					component: CrowdfundingDetail,
				},
				{
					path: 'advertising',
					name: 'advertising',
					component: AdvertisingCom,
				},
				{
					path: 'authentication',
					name: 'authentication',
					component: AuthenticationCom,
				},
				{
					path: 'concept',
					name: 'concept',
					component: ConceptnCom,
                }, {//提现审核
					path: 'chargeAudit',
					name: 'chargeAudit',
					component: chargeAudit
                }, {//提现审核详情
					path: 'chargeAuditDetail/:accountId/:id',
					name: 'chargeAuditDetail',
					component: chargeAuditDetail
                }, {//对账
                    path: 'reconciliation',
                    name: 'reconciliation',
                    component: Reconciliation,
                }, {
					path: 'usersVisit',
					name: 'usersVisit',
					component: usersVisit
				}, {
					path: 'backUsersVisit',
					name: 'backUsersVisit',
					component: BackUsersVisit
				}, {
					path: 'operational',
					name: 'operational',
					component: Operational
				}

			],
		},
	],
});
