/**
 * 周报表数据
 */
let data={};

//表格数据
//8-16号的数据
let table_816_data =[{week:'34',pv:'2404055',uv:'943683',gmv:'252170',register:'96781'},{week:'33',pv:'3463443',uv:'1660211',gmv:'153989',register:'163169'},{week:'32',pv:'567899',uv:'245678',gmv:'6754',register:'23986'},];
//8-17号的数据
let table_817_data =[{week:'34',pv:'3059015',uv:'1177139',gmv:'331714',register:'124461'},{week:'33',pv:'3463443',uv:'1660211',gmv:'153989',register:'163169'},{week:'32',pv:'567899',uv:'245678',gmv:'6754',register:'23986'},];
//8-18号的数据
let table_818_data =[{week:'34',pv:'3626374',uv:'1415015',gmv:'415842',register:'150139'},{week:'33',pv:'3463443',uv:'1660211',gmv:'153989',register:'163169'},{week:'32',pv:'567899',uv:'245678',gmv:'6754',register:'23986'},];
//8-19号的数据
let table_819_data =[{week:'34',pv:'4238751',uv:'1657160',gmv:'509054',register:'171408'},{week:'33',pv:'3463443',uv:'1660211',gmv:'153989',register:'163169'},{week:'32',pv:'567899',uv:'245678',gmv:'6754',register:'23986'},];

data.table_816_data = table_816_data;
data.table_817_data = table_817_data;
data.table_818_data = table_818_data;
data.table_819_data = table_819_data;

//折线数据
// let zx__816_pv_data = [567899,3463443,4238751];
// let zx__816_uv_data = [245678,1660211,1657160];
// let zx__816_gmv_data = [6754,153989,509054];
// let zx__816_register_data = [23986,163169,171408];
// let zx__816_week_data = ['32', '33' , '34'];

// let zx__817_pv_data = [567899,3588365,3626374];
// let zx__817_uv_data = [245678,1651796,1415015];
// let zx__817_gmv_data = [6754,372781,415842];
// let zx__817_register_data = [23986,167905,150139];
// let zx__817_week_data = ['32', '33' , '34','35','36'];

// let zx__818_pv_data = [567899,2402595,3059015];
// let zx__818_uv_data = [245678,1197044,1177139];
// let zx__818_gmv_data = [6754,263638,331714];
// let zx__818_register_data = [23986,124267,124461];
// let zx__818_week_data = ['32', '33' , '34','35','36'];

// let zx__819_pv_data = [567899,8270093,2404055];
// let zx__819_uv_data = [245678,3563049,943683];
// let zx__819_gmv_data = [6754,669797,252170];
// let zx__819_register_data = [23986,358563,96781];
// let zx__819_week_data = ['32', '33' , '34','35','36'];

let zx__816_pv_data = [567899,3453443];
let zx__816_uv_data = [245678,1414533];
let zx__816_gmv_data = [6754,153989];
let zx__816_register_data = [23986,163169];
let zx__816_week_data = ['32', '33' , '34','35','36'];

let zx__817_pv_data = [567899,3453443];
let zx__817_uv_data = [245678,1414533];
let zx__817_gmv_data = [6754,372781];
let zx__817_register_data = [23986,167905];
let zx__817_week_data = ['32', '33' , '34','35','36'];

let zx__818_pv_data = [567899,3453443];
let zx__818_uv_data = [245678,1414533];
let zx__818_gmv_data = [6754,263638];
let zx__818_register_data = [23986,124267];
let zx__818_week_data = ['32', '33' , '34','35','36'];

let zx__819_pv_data = [567899,3453443];
let zx__819_uv_data = [245678,1414533];
let zx__819_gmv_data = [6754,669797];
let zx__819_register_data = [23986,358563];
let zx__819_week_data = ['32', '33' , '34','35','36'];




let date = new Date();
let myDate = date.getDate();
console.info("今天是：",date);

switch (myDate) {
    case 16:
        data.table_data = table_816_data;

        data.zx_pv_data = zx__816_pv_data;
        data.zx_uv_data = zx__816_uv_data;
        data.zx_gmv_data = zx__816_gmv_data;
        data.zx_register_data = zx__816_register_data;
        data.zx_week_data = zx__816_week_data;
        break;
    case 17:
         data.table_data = table_817_data;

        data.zx_pv_data = zx__817_pv_data;
        data.zx_uv_data = zx__817_uv_data;
        data.zx_gmv_data = zx__817_gmv_data;
        data.zx_register_data = zx__817_register_data;
        data.zx_week_data = zx__817_week_data;
        break;
    case 18:
        data.table_data = table_818_data;

        data.zx_pv_data = zx__818_pv_data;
        data.zx_uv_data = zx__818_uv_data;
        data.zx_gmv_data = zx__818_gmv_data;
        data.zx_register_data = zx__818_register_data;
        data.zx_week_data = zx__818_week_data;
        break;
    case 19:
        data.table_data = table_819_data;

        data.zx_pv_data = zx__819_pv_data;
        data.zx_uv_data = zx__819_uv_data;
        data.zx_gmv_data = zx__819_gmv_data;
        data.zx_register_data = zx__819_register_data;
        data.zx_week_data = zx__819_week_data;
        break;
    default:
        break;
}


export default data;