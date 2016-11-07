<template>
	<div>
		<div class="loading" v-if="loading">
  		Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="question" class="content">
      <h2>{{ question.title }} #{{ user.attempt }}</h2>
      <div v-html="question.question"></div>
			<form v-on:submit.prevent="submitScore">
				<input v-model.number="user.answer" :placeholder="placeholder" type="number" step="any" required />
				<button type="submit">Score</button>
			</form>

			<div v-if="user.isCorrect != null">
				<h3>{{user.isCorrect}}!</h3>
				<strong>Solution:</strong>
				<div v-html="question.solution"></div>

			</div>
			<!--<button type="button" v-on:click="queueData()">Queue</button>-->
			<button type="button" v-on:click="nextQuestion()">Next</button>
    </div>
		<div v-else>
			<!-- Make this be the loading screen? -->
			No Questions available.
			Please try again
			<button type="button" v-on:click="nextQuestion()">Try again</button>
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
				questionID: this.$route.params.id,
				question: null,
				questionQueue: [],
				user: {
					attempt: 1,
					isCorrect: null,
					answer: null
				}
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
			this.queueData()
			// this.queueData()
		},
		watch: {
			'$route' (to, from) {
				this.fetchData()
			}
		},
		methods: {
			// Scores the attempt
			submitScore: function () {
				var tolerance = this.question.tolerance * this.question.answer
				this.user.isCorrect = (
					this.user.answer >= (this.question.answer - tolerance) &&
					this.user.answer <= (this.question.answer + tolerance)
				)
				this.uploadScore()
			},

			// Upload's attempt to the db
			uploadScore: function () {
				var postObj = {
					questionID: this.question.id,
					seed: this.question.seed,
					answer: this.question.answer,
					tolerance: this.question.tolerance,
					user: this.user
				}
				this.$http.post('http://localhost:3004/attempts/', postObj).then((response) => {
					// It worked!
					console.log('Post Success!')
					console.log(response)
				}, (response) => {
					// It failed :( that's okay, we didn't need that data anyway
					console.log('Post of Data Failed :( ')
					console.log(response)
				})
			},

			// Queues the next question
			queueData: function () {
				// Check to make sure this request won't get cached
				this.questionID = (this.questionID === 1) ? 2 : 1
				this.$http.get('http://localhost:3004/questions/' + this.questionID).then((response) => {
					this.questionQueue.push(response.data)
					console.log(this.questionQueue)
				}, (response) => {
					// add failure
				})
			},

			// Grabs a new question from our queue and then pulls more
			nextQuestion: function () {
				// if (this.questionQueue.length === 0) {
				// 	this.queueData()
				// } else {
				// 	console.log(this.questionQueue.length)
				// 	// while (this.questionQueue.length < 2) {
				// 	// 	console.log(this.questionQueue.length)
				// 	//	this.queueData()
				// 	// }
				// 	// Probably should make this more foolproof, if the api doesn't
				// 	// return anything then what?
				// }
				this.question = this.questionQueue.shift()
				this.queueData()
			},

			// Grabs the initial data
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
