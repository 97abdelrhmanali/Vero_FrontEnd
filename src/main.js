import Vue from 'vue'
import App from './App.vue'

// import VueHtml2Canvas from 'html2canvas';

// Vue.use(VueHtml2Canvas)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
