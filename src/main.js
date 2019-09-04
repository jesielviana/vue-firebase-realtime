import Vue from 'vue';
import VueQuill from 'vue-quill';
import { firestorePlugin } from 'vuefire';
import App from './App.vue'


Vue.use(firestorePlugin);
Vue.use(VueQuill);

new Vue({
  render: h => h(App)
}).$mount('#app')
