<template>
	<ol>
		<li v-for="section in data" >

			<router-link :to="'Drill/' + section.questionID" v-if="section.questionID">Start</router-link>
			<span>{{section.title}}</span>
			<ol v-if="section.children">
				<question-set :data="section.children"></question-set>
			</ol>
		</li>
	</ol>
</template>

<script>
	import DrillSections from './Drill-Sections'

	export default {
		name: 'question-set',
		components: {
			DrillSections
		},
		props: ['data']
	}
</script>
