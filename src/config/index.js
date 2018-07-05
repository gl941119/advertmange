// const ajaxURL
export default {
    Login: 'advertmange/mange-user/login',
    SignOut: 'advertmange/mange-user/signout',
    //广告项目审核
    QueryHome: 'advertmange/advertservice/advert/all',
    QueryDetails: 'advertmange/advertservice/advert/advert-id',
    QueryPass: 'advertmange/advertservice/advert/pass',
    QueryNotPass: 'advertmange/advertservice/advert/nopass',
    //众筹项目审核
    QueryCrowdfunding: 'advertmange/crowd-funding/all',
    QueryCrowdfundingDetails: 'advertmange/crowd-funding/crowd-id',
    QueryCrowdfundingPass: 'advertmange/crowd-funding/pass',
    QueryCrowdfundingNotpass: 'advertmange/crowd-funding/nopass',
    //身份认证
    QueryAuthentication: 'advertmange/idAuthentication/findApplyAuth',
    ChangeRefuseOrPass: 'advertmange/idAuthentication/modifyAuthState',
    // 概念标签管理
    QueryConcept: 'advertmange/concept/findConcept',
    QueryChangeConceptName: 'advertmange/concept/modifyConceptName',
};
