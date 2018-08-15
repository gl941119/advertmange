/**
 * 月报表数据
 */

let data={};

//表格数据
//8-16号的数据
let table_816_data =[{createDate:'2018/8/15',pv:'615554',uv:'237889',gmv:'75103',register:'25654',daylive:'18776'},{createDate:'2018/8/14',pv:'608765',uv:'240096',gmv:'67591',register:'23466',daylive:'16898'},{createDate:'2018/8/13',pv:'598860',uv:'236789',gmv:'59654',register:'21116',daylive:'14865'},{createDate:'2018/8/12',pv:'580876',uv:'228909',gmv:'49822',register:'26545',daylive:'12456'},{createDate:'2018/8/11',pv:'567656',uv:'235667',gmv:'41067',register:'19879',daylive:'10267'},{createDate:'2018/8/10',pv:'566653',uv:'238990',gmv:'35061',register:'23565',daylive:'8765'},{createDate:'2018/8/9',pv:'567880',uv:'226789',gmv:'31567',register:'26876',daylive:'7898'},{createDate:'2018/8/8',pv:'595487',uv:'245567',gmv:'22753',register:'19876',daylive:'5688'},{createDate:'2018/8/7',pv:'576767',uv:'238765',gmv:'14087',register:'25534',daylive:'3523'},{createDate:'2018/8/6',pv:'589000',uv:'228755',gmv:'9454',register:'23453',daylive:'2367'},{createDate:'2018/8/5',pv:'567899',uv:'245678',gmv:'6754',register:'23986',daylive:'1678'}];
//8-17号的数据
let table_817_data =[{createDate:'2018/8/16',pv:'616654',uv:'233456',gmv:'79544',register:'27680',daylive:'19887'},{createDate:'2018/8/15',pv:'615554',uv:'237889',gmv:'75103',register:'25654',daylive:'18776'},{createDate:'2018/8/14',pv:'608765',uv:'240096',gmv:'67591',register:'23466',daylive:'16898'},{createDate:'2018/8/13',pv:'598860',uv:'236789',gmv:'59654',register:'21116',daylive:'14865'},{createDate:'2018/8/12',pv:'580876',uv:'228909',gmv:'49822',register:'26545',daylive:'12456'},{createDate:'2018/8/11',pv:'567656',uv:'235667',gmv:'41067',register:'19879',daylive:'10267'},{createDate:'2018/8/10',pv:'566653',uv:'238990',gmv:'35061',register:'23565',daylive:'8765'},{createDate:'2018/8/9',pv:'567880',uv:'226789',gmv:'31567',register:'26876',daylive:'7898'},{createDate:'2018/8/8',pv:'595487',uv:'245567',gmv:'22753',register:'19876',daylive:'5688'},{createDate:'2018/8/7',pv:'576767',uv:'238765',gmv:'14087',register:'25534',daylive:'3523'},{createDate:'2018/8/6',pv:'589000',uv:'228755',gmv:'9454',register:'23453',daylive:'2367'},{createDate:'2018/8/5',pv:'567899',uv:'245678',gmv:'6754',register:'23986',daylive:'1678'},];
//8-18号的数据
let table_818_data =[{createDate:'2018/8/17',pv:'605665',uv:'237876',gmv:'84128',register:'25678',daylive:'21032'},{createDate:'2018/8/16',pv:'616654',uv:'233456',gmv:'79544',register:'27680',daylive:'19887'},{createDate:'2018/8/15',pv:'615554',uv:'237889',gmv:'75103',register:'25654',daylive:'18776'},{createDate:'2018/8/14',pv:'608765',uv:'240096',gmv:'67591',register:'23466',daylive:'16898'},{createDate:'2018/8/13',pv:'598860',uv:'236789',gmv:'59654',register:'21116',daylive:'14865'},{createDate:'2018/8/12',pv:'580876',uv:'228909',gmv:'49822',register:'26545',daylive:'12456'},{createDate:'2018/8/11',pv:'567656',uv:'235667',gmv:'41067',register:'19879',daylive:'10267'},{createDate:'2018/8/10',pv:'566653',uv:'238990',gmv:'35061',register:'23565',daylive:'8765'},{createDate:'2018/8/9',pv:'567880',uv:'226789',gmv:'31567',register:'26876',daylive:'7898'},{createDate:'2018/8/8',pv:'595487',uv:'245567',gmv:'22753',register:'19876',daylive:'5688'},{createDate:'2018/8/7',pv:'576767',uv:'238765',gmv:'14087',register:'25534',daylive:'3523'},{createDate:'2018/8/6',pv:'589000',uv:'228755',gmv:'9454',register:'23453',daylive:'2367'},{createDate:'2018/8/5',pv:'567899',uv:'245678',gmv:'6754',register:'23986',daylive:'1678'},];
//8-19号的数据
let table_819_data =[{createDate:'2018/8/18',pv:'612377',uv:'242145',gmv:'93212',register:'21269',daylive:'23456'},{createDate:'2018/8/17',pv:'605665',uv:'237876',gmv:'84128',register:'25678',daylive:'21032'},{createDate:'2018/8/16',pv:'616654',uv:'233456',gmv:'79544',register:'27680',daylive:'19887'},{createDate:'2018/8/15',pv:'615554',uv:'237889',gmv:'75103',register:'25654',daylive:'18776'},{createDate:'2018/8/14',pv:'608765',uv:'240096',gmv:'67591',register:'23466',daylive:'16898'},{createDate:'2018/8/13',pv:'598860',uv:'236789',gmv:'59654',register:'21116',daylive:'14865'},{createDate:'2018/8/12',pv:'580876',uv:'228909',gmv:'49822',register:'26545',daylive:'12456'},{createDate:'2018/8/11',pv:'567656',uv:'235667',gmv:'41067',register:'19879',daylive:'10267'},{createDate:'2018/8/10',pv:'566653',uv:'238990',gmv:'35061',register:'23565',daylive:'8765'},{createDate:'2018/8/9',pv:'567880',uv:'226789',gmv:'31567',register:'26876',daylive:'7898'},{createDate:'2018/8/8',pv:'595487',uv:'245567',gmv:'22753',register:'19876',daylive:'5688'},{createDate:'2018/8/7',pv:'576767',uv:'238765',gmv:'14087',register:'25534',daylive:'3523'},{createDate:'2018/8/6',pv:'589000',uv:'228755',gmv:'9454',register:'23453',daylive:'2367'},{createDate:'2018/8/5',pv:'567899',uv:'245678',gmv:'6754',register:'23986',daylive:'1678'},];



//折线数据
let zx__816_pv_data = [567899,589000,576767,595487,567880,566653,567656,580876,598860,608765,615554];
let zx__816_uv_data = [245678,228755,238765,245567,226789,238990,235667,228909,236789,240096,237889];
let zx__816_gmv_data = [6754,9454,14087,22753,31567,35061,41067,49822,59654,67591,75103];
let zx__816_register_data = [23986,23453,25534,19876,26876,23565,19879,26545,21116,23466,25654];
let zx__816_daylive_data = [1678,2367,3523,5688,7898,8765,10267,12456,14865,16898,18776];
let zx__816_createDate_data = ['2018/8/5','2018/8/6','2018/8/7','2018/8/8','2018/8/9','2018/8/10','2018/8/11','2018/8/12','2018/8/13','2018/8/14','2018/8/15'];

let zx__817_pv_data = [567899,589000,576767,595487,567880,566653,567656,580876,598860,608765,615554,616654];
let zx__817_uv_data = [245678,228755,238765,245567,226789,238990,235667,228909,236789,240096,237889,233456];
let zx__817_gmv_data = [6754,9454,14087,22753,31567,35061,41067,49822,59654,67591,75103,79544];
let zx__817_register_data = [23986,23453,25534,19876,26876,23565,19879,26545,21116,23466,25654,27680];
let zx__817_daylive_data = [1678,2367,3523,5688,7898,8765,10267,12456,14865,16898,18776,19887];
let zx__817_createDate_data = ['2018/8/5','2018/8/6','2018/8/7','2018/8/8','2018/8/9','2018/8/10','2018/8/11','2018/8/12','2018/8/13','2018/8/14','2018/8/15','2018/8/16'];

let zx__818_pv_data = [567899,589000,576767,595487,567880,566653,567656,580876,598860,608765,615554,616654,605665];
let zx__818_uv_data = [245678,228755,238765,245567,226789,238990,235667,228909,236789,240096,237889,233456,237876];
let zx__818_gmv_data = [6754,9454,14087,22753,31567,35061,41067,49822,59654,67591,75103,79544,84128];
let zx__818_register_data = [23986,23453,25534,19876,26876,23565,19879,26545,21116,23466,25654,27680,25678];
let zx__818_daylive_data = [1678,2367,3523,5688,7898,8765,10267,12456,14865,16898,18776,19887,21032];
let zx__818_createDate_data = ['2018/8/5','2018/8/6','2018/8/7','2018/8/8','2018/8/9','2018/8/10','2018/8/11','2018/8/12','2018/8/13','2018/8/14','2018/8/15','2018/8/16','2018/8/17'];

let zx__819_pv_data = [567899,589000,576767,595487,567880,566653,567656,580876,598860,608765,615554,616654,605665,612377];
let zx__819_uv_data = [245678,228755,238765,245567,226789,238990,235667,228909,236789,240096,237889,233456,237876,242145];
let zx__819_gmv_data = [6754,9454,14087,22753,31567,35061,41067,49822,59654,67591,75103,79544,84128,93212];
let zx__819_register_data = [23986,23453,25534,19876,26876,23565,19879,26545,21116,23466,25654,27680,25678,21269];
let zx__819_daylive_data = [1678,2367,3523,5688,7898,8765,10267,12456,14865,16898,18776,19887,21032,23456];
let zx__819_createDate_data = ['2018/8/5','2018/8/6','2018/8/7','2018/8/8','2018/8/9','2018/8/10','2018/8/11','2018/8/12','2018/8/13','2018/8/14','2018/8/15','2018/8/16','2018/8/17','2018/8/18'];



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
        data.zx_daylive_data = zx__816_daylive_data;
        data.zx_createDate_data = zx__816_createDate_data;
        break;
    case 17:
        data.table_data = table_817_data;

        data.zx_pv_data = zx__817_pv_data;
        data.zx_uv_data = zx__817_uv_data;
        data.zx_gmv_data = zx__817_gmv_data;
        data.zx_register_data = zx__817_register_data;
        data.zx_daylive_data = zx__817_daylive_data;
        data.zx_createDate_data = zx__817_createDate_data;
        break;
    case 18:
        data.table_data = table_818_data;

        data.zx_pv_data = zx__818_pv_data;
        data.zx_uv_data = zx__818_uv_data;
        data.zx_gmv_data = zx__818_gmv_data;
        data.zx_register_data = zx__818_register_data;
        data.zx_daylive_data = zx__818_daylive_data;
        data.zx_createDate_data = zx__818_createDate_data;
        break;
    case 19:
        data.table_data = table_819_data;

        data.zx_pv_data = zx__819_pv_data;
        data.zx_uv_data = zx__819_uv_data;
        data.zx_gmv_data = zx__819_gmv_data;
        data.zx_register_data = zx__819_register_data;
        data.zx_daylive_data = zx__819_daylive_data;
        data.zx_createDate_data = zx__819_createDate_data;
        break;
    default:
        break;
}

export default data;