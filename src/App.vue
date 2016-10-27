<template>
	<div id="home">
		<h1>{{title}}</h1>
		<h2>Choose your formula</h2>
		<QuestionSet :data="sections"></QuestionSet>
	</div>
</template>

<script>
	import QuestionSet from './components/QuestionSet'

	export default {
		name: 'home',
		components: {
			QuestionSet
		},
		data () {
			return {
				sections: null,
				title: 'Adapt Drill FM'
			}
		},
		created: function () {
			this.getQuestionSet()
		},
		methods: {
			// Gather data from the json file/url
			getQuestionSet: function () {
				this.$http.get('http://localhost:3004/sections').then(function (response) {
					this.sections = response.data
				})
			}
		}
	}
</script>