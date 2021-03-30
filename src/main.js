import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'

Vue.use(ElementUI);
Vue.use(mavonEditor)
Vue.use(VideoPlayer)

Vue.config.productionTip = false

Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://127.0.0.1:8181'
axios.defaults.withCredentials = true





new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
