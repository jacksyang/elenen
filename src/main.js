import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';

import {
    messages
} from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './assets/css/font.css';
import './components/common/directives';
import 'babel-polyfill';
import store from './store'

Vue.config.productionTip = false;

Vue.use(ElementUI, {
    size: 'small'
});


//使用钩子函数对路由进行权限跳转

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');