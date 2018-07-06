import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import store from '../store';
import Cache from './cache';
import {Message} from 'element-ui';
import indexURL from '../config';
import config from './config';
import router from '../router';

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? config.url.localTestUrl : config.url.productUrl;
async function ajaxRequest(url = '', data = {}, type = 'POST', isJson = false) {
    type = type.toUpperCase();
    let platformType = Cache.getSession('platform_type') || store.state.type;
    url = indexURL[url];
    let token = store.state.token || Cache.getSession('bier_token');
    if (type === 'GET') {
    	return axios.get(url, {headers:{token},params: data});
    } else if (type === 'POST') {

        if (isJson) {
            return axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                    token,
                },
            });
        }
        return axios.post(url, qs.stringify(data), {
            headers: {token},
        });
    } else if (type === 'PUT') {
        return axios.put(url, data, {
            headers: {'Content-Type': 'application/json', token},
        });
    } else if (type === 'DELETE') {
        return axios.delete(url, {headers:{token}, params: data});
    }
}

function requestHandle(params, callback, load = null, errCB, responseCB) {
    let {url, data, type, flag} = params;

    ajaxRequest(url, data, type, flag).then(
        res => {
            let {data, success, total, message} = res.data;

            // console.log('requestHandle-[%s]->', url, res.data);
            if (success === 1) {
                typeof callback === 'function' && callback(res.data);
            } else {
                if (res.data.data && res.data.data.islogin) {
                    Cache.removeSession('bier_username');
                    Cache.removeSession('bier_token');
                    router.push({name: 'login'});
                } else if (res.data.data && res.data.data.iscontinue) {
                    typeof responseCB === 'function' && responseCB(res);
                } else {
                    typeof responseCB === 'function' && responseCB(res);
                    Message.error({
                        message,
                    });
                }
            }
            load && load.close();
        },
        rej => {
            typeof errCB === 'function' && errCB();
            console.error('[%s] error', url, rej);
            Message.error({message: '网络错误'});
            load && load.close();
        }
    );
}

export default {
    ajaxRequest,
    requestHandle,
}
;
