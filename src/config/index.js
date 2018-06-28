// const ajaxURL
export default {
    Login: 'supermange/super/adminuser/superlogin',
    SignOut: 'supermange/super/adminuser/loginout',
    // user management
    QueryAccountInfo: 'supermange/amazon/adminuserprimary/selectaccountprimary',
    AddAccountInfo: 'supermange/amazon/adminuserprimary/addaccountprimary',
    UpdateAccountInfo: 'supermange/amazon/adminuserprimary/updateaccountprimary',
    FrozenAndInitialUser: 'supermange/amazon/adminuserprimary/updatestatus',
    // user detail
    QueryBindDevice: 'supermange/amazon/devices/selectdevicebyuserid',
    QueryUnBindDevice: 'supermange/amazon/devices/selectdevicenobind',
    BindDevice: 'supermange/amazon/devices/binddevices',
    DeleteBindDevice: 'supermange/amazon/devices/deldevicesbyuserpid',
    // bulletin management
    QueryBulletin: 'supermange/amazon/pagehome/selectpagehome',
    QueryBulletinById: 'supermange/amazon/pagehome/selectbyid',
    AddBulletin: 'supermange/amazon/pagehome/addpagehome',
    UpdateBulletin: 'supermange/amazon/pagehome/updatepagehome',
    DeleteBulletin: 'supermange/amazon/pagehome/deletepagehome',
    // feedback management
    QueryFeedback: 'supermange/amazon/feedback/selectfeedback',
    QueryFeedbackById: 'supermange/amazon/feedback/selectfeedbackbyid',
    ReplyFeedback: 'supermange/amazon/feedback/updatefeedback',
};
