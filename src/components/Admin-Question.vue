<template>
	<div class="admin">
		<div class="notecard">
			<div class="notecard-header">Question ID#{{question.id}}: {{question.title}}</div>
			<div class="notecard-content">
				<form v-on:submit.prevent="setQuestion">
					<label class="label">Section</label>
					<input v-model="question.sectionid" type="number" />

					<label class="label">Title</label>
					<input v-model="question.title" type="text" />

					<label class="label">Question</label>
					<textarea v-model="question.question" @input="update('question')"></textarea>

					<!--<label class="label">Question Display</label>
					<div v-html="question.questionCache"></div>-->

					<label class="label">Solution</label>
					<textarea v-model="question.solution" @input="update('solution')"></textarea>

					<label class="label">Answer</label>
					<input class="input" v-model="question.answer" type="number" step="any" />

					<label class="label">Tolerance</label>
					<input v-model="question.tolerance" type="number" step="any" />

					<label class="label">Placeholder</label>
					<input v-model="question.placeholder" type="text" />

					<button type="submit" class="button button--primary">Save</button>
				</form>
			</div>
			<div class="notecard-footer">
				<router-link to="/Admin" class="button">Back</router-link>
			</div>
		</div>
		<div>
			<div class="notecard">
				<div class="notecard-header">{{ question.title }}</div>
				<div class="notecard-content">
					<content-block :data="question.questionCache"></content-block>
					<form v-on:submit.prevent="" class="search input--medium search--center">
						<input v-model="question.placeholder" class="search-input" />
						<button type="submit" class="button button--primary">Score</button>
					</form>
						<strong>Solution:</strong>
						<content-block :data="question.solutionCache"></content-block>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import ContentBlock from './Content-Block'

	export default {
		name: 'Admin-Question',
		components: {
			ContentBlock
		},
		data () {
			return {
				question: {}
			}
		},
		// computed: {
		// 	questionCache: function () {
		// 		return marked(this.question.question, { sanitize: false, smartypants: true })
		// 	}
		// },
		created: function () {
			var id = parseInt(this.$route.params.id)
			if (!isNaN(id) && id !== 0) {
				this.getQuestion(id)
			}
		},
		methods: {
			update: function (field) {
				console.log('update' + field)
				// var content = this.question[field].replace('\\', '\\\\')
				var content = this.question[field]
				var md = require('markdown-it')().use(require('markdown-it-mathjax'))
				// var md = require('markdown-it')().use(require('markdown-it-mathjax'))
				this.question[field + 'Cache'] = md.render(content)
				// this.question.questionCache = marked(this.question.question, { sanitize: false, smartypants: true })
			},
			getQuestion: function (id) {
				this.$http.get('http://localhost:3004/questions/' + id).then((response) => {
					this.question = response.data
				}, (response) => {
					console.log('error fetching data')
				})
			},
			setQuestion: function () {
				this.$http.post('http://localhost:3004/questions/', this.question).then((response) => {
					console.log('Post Success!')
					console.log(response)
				}, (response) => {
					console.log('Post of Data Failed :( ')
					console.log(response)
				})
			}
		}
	}
</script>

<style>
	.admin {
		display: flex;
		margin: -1rem;
	}

	.admin > div {
		margin: 1rem;
	}
	textarea {
		font-size: 12px;
		font-family: sans-serif;
		min-height: 200px;
	}
</style>