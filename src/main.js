import Vue from 'vue/dist/vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App.vue'
import DrillQuiz from './components/Drill-Quiz.vue'
import Admin from './Admin.vue'
import AdminQuestion from './components/Admin-Question.vue'

Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({
	// mode: 'history', // need to look into routing more to see if we can do this.
	routes: [
		{ path: '/', component: App },
		{ path: '/Drill/:id', component: DrillQuiz },
		{ path: '/Admin', component: Admin },
		{ path: '/Admin/Question/:id', component: AdminQuestion }
	]
})

new Vue({
	router
}).$mount('#app')
