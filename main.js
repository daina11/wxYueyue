import App from './App'
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
import store from './store'



const app = new Vue({
	store,
	...App
})
let vuexStore = require("@/store/$u.mixin.js")
Vue.mixin(vuexStore)
// 引入请求封装，将app参数传递到配置中
require('./config/request.js')(app)
app.$mount()
// #endif

import uView from "uview-ui"
Vue.use(uView)


// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
