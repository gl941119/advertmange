const url = {
    localTestUrl: 'http://192.168.1.173:9010/',
    // localTestUrl: 'http://192.168.1.254:9002/',
    productUrl: 'http://192.168.1.254:9002/',
};

export default {
    url,
    pageSize: 10, // 一页的数量
    miniPageSize: 10, // 小量
    pageStart: 1,
    UploadBulletinFileUrl: process.env.NODE_ENV === 'development' ? url.localTestUrl : url.productUrl + 'amazonsuper/pagehome/uploadfile',
};
