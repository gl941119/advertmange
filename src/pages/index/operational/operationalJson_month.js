/**
 * 月报表数据
 */
let data={};

//表格数据
//8-16号的数据
let table_816_data =[{month:'8',pv:'6435397',uv:'2603894',gmv:'412913',register:'259950'}]
//8-17号的数据
let table_817_data =[{month:'8',pv:'7052051',uv:'2837350',gmv:'492457',register:'287630'}];
//8-18号的数据
let table_818_data = [{month:'8',pv:'7657716',uv:'3075226',gmv:'576585',register:'313308'}];
//8-19号的数据
let table_819_data =[{month:'8',pv:'7113194',uv:'2842938',gmv:'653589',register:'287138'}];

data.table_816_data = table_816_data;
data.table_817_data = table_817_data;
data.table_818_data = table_818_data;
data.table_819_data = table_819_data;

//折线数据
// let zx__816_pv_data = [6435397];
// let zx__816_uv_data = [2603894];
// let zx__816_gmv_data = [412913];
// let zx__816_register_data = [259950];
// let zx__816_month_data = ['8'];

// let zx__817_pv_data = [7052051];
// let zx__817_uv_data = [2837350];
// let zx__817_gmv_data = [492457];
// let zx__817_register_data = [287630];
// let zx__817_month_data = ['8'];

// let zx__818_pv_data = [7657716];
// let zx__818_uv_data = [3075226];
// let zx__818_gmv_data = [576585];
// let zx__818_register_data = [313308];
// let zx__818_month_data = ['8'];

// let zx__819_pv_data = [7113194];
// let zx__819_uv_data = [2842938];
// let zx__819_gmv_data = [653589];
// let zx__819_register_data = [287138];
// let zx__819_month_data = ['8'];
let zx__816_pv_data = [6435397];
let zx__816_uv_data = [2603894];
let zx__816_gmv_data = [412913];
let zx__816_register_data = [259950];
let zx__816_month_data = ['8' ,'9', '10','11'];

let zx__817_pv_data = [7052051];
let zx__817_uv_data = [2837350];
let zx__817_gmv_data = [492457];
let zx__817_register_data = [287630];
let zx__817_month_data = ['8' ,'9', '10','11'];

let zx__818_pv_data = [7657716];
let zx__818_uv_data = [3075226];
let zx__818_gmv_data = [576585];
let zx__818_register_data = [313308];
let zx__818_month_data = ['8' ,'9', '10','11'];

let zx__819_pv_data = [7113194];
let zx__819_uv_data = [2842938];
let zx__819_gmv_data = [653589];
let zx__819_register_data = [287138];
let zx__819_month_data =['8' ,'9', '10','11'];


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
        data.zx_month_data = zx__816_month_data;
        break;
    case 17:
         data.table_data = table_817_data;

        data.zx_pv_data = zx__817_pv_data;
        data.zx_uv_data = zx__817_uv_data;
        data.zx_gmv_data = zx__817_gmv_data;
        data.zx_register_data = zx__817_register_data;
        data.zx_month_data = zx__817_month_data;
        break;
    case 18:
        data.table_data = table_818_data;

        data.zx_pv_data = zx__818_pv_data;
        data.zx_uv_data = zx__818_uv_data;
        data.zx_gmv_data = zx__818_gmv_data;
        data.zx_register_data = zx__818_register_data;
        data.zx_month_data = zx__818_month_data;
        break;
    case 19:
        data.table_data = table_819_data;

        data.zx_pv_data = zx__819_pv_data;
        data.zx_uv_data = zx__819_uv_data;
        data.zx_gmv_data = zx__819_gmv_data;
        data.zx_register_data = zx__819_register_data;
        data.zx_month_data = zx__819_month_data;
        break;
    default:
        break;
}


export default data;