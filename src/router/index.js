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
//测试



import PublicAccountCom from '@/pages/index/public-account';
import BulletinCom from '@/pages/index/material/bulletin';
import FeedbackCom from '@/pages/index/material/feedback';

Vue.use(Router);

export default new Router({
    routes: [
    	
        {
            path: '/',
            redirect: {name: 'login'},
        },
        {
            path: '/login',
            name: 'login',
            component: LoginCom,
        },
        {
            path: '/index',
            name: 'index',
            meta: {requiresAuth: true},
            component: IndexCom,
            redirect: {name: 'home'},
            children: [
                {
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
                    component: CrowdfundingCom ,
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
                }
            ],
        },	
    ],
});
