<template>
	<div id="home" class="notecard">
		<div class="notecard-header">Drill Admin</div>
		<div class="notecard-content">
			<strong>Questions</strong>
			<router-link to="Admin/Question/0" class="button button--small">Add new</router-link>
			<ul>
				<li v-for="question in questions">
					<router-link :to="'Admin/Question/' + question.id">
						{{question.id}}: {{question.title}}
					</router-link>
				</li>
			</ul>

	</div>
</template>

<script>
	export default {
		name: 'admin',
		data () {
			return {
				questions: []
			}
		},
		created: function () {
			this.fetchQuestions()
		},
		methods: {
			fetchQuestions: function () {
				this.$http.get('http://localhost:3004/questions/').then((response) => {
					this.questions = response.data
				}, (response) => {
					console.log('error fetching data')
				})
			}
		}
	}
</script>

<style>
</style>