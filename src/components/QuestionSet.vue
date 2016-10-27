<template>
	<ol>
		<li v-for="section in data" >

			<router-link :to="'Drill/' + section.content.id" v-if="section.content">Start</router-link>
			<span>{{section.name}}</span>

			<span v-if="section.content">{{section.content.id}}</span>
			<ol v-if="section.children">
				<question-set :data="section.children"></question-set>
			</ol>
		</li>
	</ol>
</template>

<script>
	import QuestionSet from './QuestionSet'

	export default {
		name: 'question-set',
		components: {
			QuestionSet
		},
		props: ['data']
	}
</script>
