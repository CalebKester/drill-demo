<template>
	<div class="notecard">
		<div class="notecard-content" v-if="loading">
			<!-- TODO: Build loading styles-->
  		Loading...
    </div>

    <div v-if="error" class="notecard-content">
			<!-- TODO: build error styles -->
      {{ error }}
    </div>

    <template v-if="question">
			<div class="notecard-header">{{ question.title }} #{{ user.attempt }}</div>
			<div class="notecard-content">
				<content-block :data="question.questionCache"></content-block>
				<form v-on:submit.prevent="submitScore" class="search input--medium search--center">
					<input v-model.number="user.answer" :placeholder="placeholder" type="number" step="any" required class="search-input" />
					<button type="submit" class="button button--primary">Score</button>
				</form>

				<div v-if="user.isCorrect != null">
					<h3>{{user.isCorrect}}!</h3>
					<strong>Solution:</strong>
					<content-block :data="question.solution"></content-block>
				</div>
			</div>
    </template>
		<template v-else>
			<!-- TODO: build no questions avaible or merge with error-->
			No Questions available.
			Please try again
			<button v-on:click="nextQuestion()" type="button">Try again</button>
		</template>
		<div class="notecard-footer">
			<router-link to="/" class="button">Formulas</router-link>
			<button v-on:click="nextQuestion()" type="button" class="button button--primary">
				<template v-if="user.isCorrect != null">Next</template>
				<template v-else>Skip</template>
			</button>
		</div>
	</div>
</template>

<style>
	.notecard {
		max-width: 700px;
		width: 100%;
	}

	.notecard-header {
		font-weight: 500;
		border-bottom: 1px solid hsla(0, 0%, 0%, 0.14);
		padding: 1rem;
		background: #fff;
		font-size: 1.25rem;
		border-radius: 4px 4px 0 0;
	}

	.notecard-content {
		position: relative;
		z-index: 2;
		padding: 1rem;
		border-radius: 0 0 5px 5px;
		background: #fff;
	}

	.notecard-footer {
		position: relative;
		z-index: 1;
		display: flex;
		justify-content: space-between;
		padding: 1.25rem 1rem 1rem;
		margin-top: -0.25rem;
		background: #263238;
		border-radius: 0 0 5px 5px;
		color: #fff;
	}

	.tableWrap {
		overflow-y: auto;
		padding: 0.5rem;
		margin: 1rem 0;
	}

	.tableWrap table {
		margin: 0;
	}

	.search--center {
		margin: 1rem auto;
	}

</style>

<script>
	import ContentBlock from './Content-Block'

	export default {
		name: 'drill-quiz',
		components: {
			ContentBlock
		},
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
			// this.fetchData()
			this.queueData()
			this.queueData()
			this.nextQuestion()
		},
		watch: {
			'$route' (to, from) {
				this.queueData()
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
				// Temp toggle to make sure we get new data
				this.questionID = 19
				this.$http.get('http://localhost:3004/questions?sectionid=' + this.questionID).then((response) => {
					var question = response.data[Math.floor(Math.random() * response.data.length)]
					this.questionQueue.push(question)
					// console.log(this.questionQueue)
				}, (response) => {
					// add failure
					console.log('Failed to Queue data')
				})
			},

			// Grabs a new question from our queue and then pulls more
			nextQuestion: function () {
				console.log('next')
				if (this.questionQueue.length === 0) {
					this.queueData()
				}
				// 	console.log(this.questionQueue.length)
				// 	// while (this.questionQueue.length < 2) {
				// 	// 	console.log(this.questionQueue.length)
				// 	//	this.queueData()
				// 	// }
				// 	// Probably should make this more foolproof, if the api doesn't
				// 	// return anything then what?
				// }
				this.question = this.questionQueue.shift()
				this.user.attempt++
				this.user.isCorrect = null
				this.user.answer = null
				this.queueData()
			},

			// Grabs the initial data
			// TODO: See if we can merge this with queueData
			fetchData: function () {
				this.error = this.question = null
				this.loading = true
				this.$http.get('http://localhost:3004/questions/' + this.questionID).then((response) => {
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
