
import Vue from 'vue/dist/vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App.vue'
import DrillQuiz from './components/Drill-Quiz.vue'

Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({
	// mode: 'history', // need to look into routing more to see if we can do this.
	routes: [
		{ path: '/', component: App },
		{ path: '/Drill/:id', component: DrillQuiz }
	]
})

new Vue({
	router
}).$mount('#app')
