// const ajaxURL
export default {
    Login: 'advertmange/mange-user/login',
    SignOut: 'advertmange/mange-user/signout',
    QueryConcept:'advertmange/common/concept',
    //广告项目审核
    QueryHome: 'advertmange/advertservice/advert/all',
    QueryDetails: 'advertmange/advertservice/advert/advert-id',
    QueryPass: 'advertmange/advertservice/advert/pass',
    QueryNotPass: 'advertmange/advertservice/advert/nopass',
    ChangeDetails: 'advertmange/advertservice/modifyAdvertProj',
    // 众筹项目审核
    QueryCrowdfunding: 'advertmange/crowd-funding/all',
    QueryCrowdfundingDetails: 'advertmange/crowd-funding/crowd-id',
    QueryCrowdfundingPass: 'advertmange/crowd-funding/pass',
    QueryCrowdfundingNotpass: 'advertmange/crowd-funding/nopass',
    QueryAuthentication: 'advertmange/idAuthentication/findApplyAuth',
    ChangeRefuseOrPass: 'advertmange/idAuthentication/modifyAuthState',//审核
    bindContractAddress: 'advertmange/crowd-funding/bindAddress',//绑定合约地址
    ChangeCrowdfundingDetails: 'advertmange/crowd-funding/put',//修改众筹申请
    //核心团队
    AddCoreMember: 'advertmange/crowd-team-member',//添加核心团队
    DeletedCoreMember: 'advertmange/crowd-team-member/delete/crowd-id/id',//删除核心团队
    ChangeCoreMember: 'advertmange/crowd-team-member/put',//修改核心团队
    //顾问团队
    addConsultant: 'advertmange/crowd-team-consultants',//添加顾问团队
    deletedConsultant: 'advertmange/crowd-team-consultants/delete/crowd-id/id',//删除顾问团队
    ChangeConsultant: 'advertmange/crowd-team-consultants/put',//修改顾问团队
    // 概念标签管理
    QueryConcept: 'advertmange/concept/findConcept',
    QueryChangeConceptName: 'advertmange/concept/modifyConceptName',
    //广告位管理
    QueryAdvertisingBanner:'advertmange/advertisement/findAdvertiseAll',
    ChangeAdvertisingBanner:'advertmange/advertisement/modifyAdvertisementMes',
    ChangeAdvertisingSort:'advertmange/advertisement/modifyAdvertSort',
    DeletedAdvertising:'advertmange/advertisement/removeAdvertise',
};
