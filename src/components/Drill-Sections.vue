<template>
	<ol class="section">
		<li v-for="section in data" >
			<router-link :to="'Drill/' + section.questionID" v-if="section.questionID" class="button button--primary button--small">Start</router-link>
			<span>{{section.title}}</span>
			<ol v-if="section.children">
				<question-set :data="section.children"></question-set>
			</ol>
		</li>
	</ol>
</template>

<style>
	.section {
		display: block;
		margin: 0;
		padding: 0;
	}

	.section li {
		display: block;
		margin: 0;
		padding: 0.25rem 0;
	}

	.section ol {
		margin-left: 1rem;
	}

</style>

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
