import axios from 'axios'
import router from '@/router'
import Vue from 'vue';





const buildErrorResponse = (err) => {
    /**
     * 接口返回统一格式定义
     */
    let res = {
        data: {
            resCode: 999,
            resMsg: '网络不给力，重试一下吧～'
        },
        status: 999,
        statusText: '网络错误',
        config: {},
        headers: {}
    }

    if (err.response) {
        res = err.response
    } else {
        res.config = err.config
    }

    // 发生错误，服务端返回404，500一个html串
    if (typeof res.data !== 'object') {
        res.data = {
            resCode: 999,
            msg: '网络不给力，重试一下吧～'
        }
    }

    return res
}

export const request = async ({
    url = '',
    method = 'GET',
    data = {},
    params = {},
    timeout = 1000,
    withCredentials = true,
    headers = {
        'Content-Type': 'application/json'
    },
   
}, {
    autoToastError = true
} = {}) => {
    let res
    let baseUrl

    try {
       
        baseUrl=process.env.NODE_ENV === 'development' ?  "/tcnp-web": process.env.VUE_APP_BASE_API+"tcnp-web"
        console.log(baseUrl)
        res = await axios({
            url: `${baseUrl}${url}`,
            method,
            data,
            params,
            timeout,
            headers,
            //跨域请求是否需要凭证，默认false
            withCredentials
        })
    } catch (err) {
        
        res = buildErrorResponse(err)
    }


    if (autoToastError) {
        console.log(res.data);
        // return;
        

        try {
            if (res.data.resCode == 999) {
               
                Vue.prototype.$notify.error({
                    title: '网络错误',
                    message:res.data.resMsg
                });
                // return $app.$Message.error("登录已失效请重新登录")


            }
            else if (res.data.resCode !== '0') {
                Vue.prototype.$notify.error({
                    title: '错误',
                    message: res.data.resMsg
                });
            }
        } catch (err) {

        }

    }
    return res.data
}