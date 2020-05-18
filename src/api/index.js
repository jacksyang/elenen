

import { request } from '@/utils/request'
export const loginUser = async (data) => {
    return await request({
        url: '/user/loginUser',
        method: 'post',
        data: data,
       
    })
}
