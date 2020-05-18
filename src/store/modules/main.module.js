/**
 * main.module
 * 主布局相关state
 */
import {loginUser} from "@/api"
const state = () => {
    return {
        items: [],
        userInfo: {
            username: "testname",
            orgName: "",
        },
        pageBtns: [
            // {
            //   label: '新建',
            //   icon: 'ios-download',
            //   type: 'primary', // default: primary
            //   cb: () => {} // click callback
            // }
        ]
    };
};

// getters
const getters = {
    userInfo: state => state.userInfo
};

const getMainInfo = async ({
    commit
}, data) => {
    // let res = await requestMainInfo(data)
    // await commit('updateMainInfo', res)
    await commit("updateMainInfo");
};

const setPageBtns = async ({
    commit
}, {
    btns
}) => {
    await commit("updatePageBtns", btns);
};

// actions
const actions = {
    storeInit: getMainInfo,
    getMainInfo,
    setPageBtns
};

// mutations
const mutations = {
    async updateMainInfo(state, data) {
        
        state.userInfo.username = data.username;
        state.userInfo.orgName = data.orgName;
       
        state.items = data.items;

    },

    async updatePageBtns(state, btns) {
        state.pageBtns = btns;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};