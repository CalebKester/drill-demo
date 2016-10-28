<template>
	<div>
		<div class="loading" v-if="loading">
  		Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="question" class="content">
      <h2>{{ question.title }} #{{ attempt }}</h2>
      <div v-html="question.question"></div>
			<input type="text" :placeholder="placeholder" />
			<button type="button">Score</button>

			<div>
				{{question.seed}}
				{{question.answer}}
				{{question.tolerance}}

			</div>
    </div>


<br /><br />

		<router-link to="/">home</router-link>
	</div>
</template>

<script>
	export default {
		name: 'drill-quiz',
		props: ['data'],
		data () {
			return {
				loading: false,
				error: null,
				attempt: 1,
				question: null
			}
		},
		computed: {
			placeholder: function () {
				if (this.question.placeholder) {
					return this.question.placeholder + ' ='
				}
				return '='
			}
		},
		created: function () {
			this.fetchData()
		},
		watch: {
			'$route' (to, from) {
				this.fetchData()
			}
		},
		methods: {
			fetchData: function () {
				this.error = this.question = null
				this.loading = true
				this.$http.get('http://localhost:3004/questions/' + this.$route.params.id).then((response) => {
					this.loading = false
					this.question = response.data
				}, (response) => {
					this.loading = false
					this.error = response.status + ' ' + response.statusText
				})
			}
		}
	}
</script>
