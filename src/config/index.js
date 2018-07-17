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
    QuerydeitAdvertItem: 'advertmange/advertservice/modifyAdvertProj',
    QueryAdCoreMember: 'advertmange/advert-team-member/getAll/advert-id',//查询核心团队
    AddAdCoreMember: 'advertmange/advert-team-member/add',//添加核心团队
    DeletedAdCoreMember: 'advertmange/advert-team-member/delete/advert-id/id',//删除核心团队
    ChangeAdCoreMember: 'advertmange/advert-team-member/put',//修改核心团队
    QueryAdConsultant: 'advertmange/advert-team-consultants/getAll/advert-id',//查询顾问团队
    AddAdConsultant: 'advertmange/advert-team-consultants/add',//添加顾问团队
    DeletedAdConsultant: 'advertmange/advert-team-consultants/delete/advert-id/id',//删除顾问团队
    ChangeAdConsultant: 'advertmange/advert-team-consultants/put',//修改顾问团队
    // 众筹项目审核
    QueryCrowdfunding: 'advertmange/crowd-funding/all',//请求众筹页面
    QueryCrowdfundingDetails: 'advertmange/crowd-funding/crowd-id',
    QueryCrowdfundingPass: 'advertmange/crowd-funding/pass',
    QueryCrowdfundingNotpass: 'advertmange/crowd-funding/nopass',
    QueryAuthentication: 'advertmange/idAuthentication/findApplyAuth',
    ChangeRefuseOrPass: 'advertmange/idAuthentication/modifyAuthState',//审核
    bindContractAddress: 'advertmange/crowd-funding/bindAddress',//绑定合约地址
    ChangeCrowdfundingDetails: 'advertmange/crowd-funding/put',//修改众筹申请
    AddCoreMember: 'advertmange/crowd-team-member',//添加核心团队
    DeletedCoreMember: 'advertmange/crowd-team-member/delete/crowd-id/id',//删除核心团队
    ChangeCoreMember: 'advertmange/crowd-team-member/put',//修改核心团队
    addConsultant: 'advertmange/crowd-team-consultants',//添加顾问团队
    deletedConsultant: 'advertmange/crowd-team-consultants/delete/crowd-id/id',//删除顾问团队
    ChangeConsultant: 'advertmange/crowd-team-consultants/put',//修改顾问团队
    //项目审核
    ChangeContract:'advertmange/crowd-funding/bindContractMessage',//修改合约地址
    // 概念标签管理
    QueryConcept: 'advertmange/concept/findConcept',
    QueryChangeConceptName: 'advertmange/concept/modifyConceptName',//修改
    addConceptLink:'advertmange//concept/addConceptManage',//新增概念标签
    //广告位管理
    QueryAdvertisingBanner:'advertmange/advertisement/findAdvertiseAll', //查询bannner项目
    ChangeAdvertisingBanner:'advertmange/advertisement/modifyAdvertisementMes', //修改信息
    ChangeAdvertisingSort:'advertmange/advertisement/modifyAdvertSort', //修改项目顺序
    DeletedAdvertising:'advertmange/advertisement/removeAdvertise', //delted
};
