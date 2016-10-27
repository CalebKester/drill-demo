<template>
	<div>
		{{ $route.params.id }}
		<br />
		This is drill

		<input type="text" />

		{{questions}}


		<br /><br /><br />

		<router-link to="/">home</router-link>
	</div>
</template>

<script>
	export default {
		name: 'drill-quiz',
		props: ['data'],
		data () {
			return {
				questions: null
			}
		},
		created: function () {
			this.getQuestions()
		},
		watch: {
			'$route' (to, from) {
				this.getQuestions()
			}
		},
		methods: {
			// TODO: http://router.vuejs.org/en/advanced/data-fetching.html
			getQuestions: function () {
				this.$http.get('http://localhost:3004/questions/' + this.$route.params.id).then(function (response) {
					this.questions = response.data
				})
			}
		}
	}
</script>
