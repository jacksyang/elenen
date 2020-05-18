import Vue from 'vue'
import Vuex from 'vuex'

import main from './modules/main.module'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
    modules: {
        main
    },
    actions: {
        storeInit: function() {},
        storeReady: function() {}
    },
    strict: debug
})

// const storeReady = store.dispatch('storeInit')
// storeReady.then(() => {
//   store.dispatch('storeReady')
// })

export default store