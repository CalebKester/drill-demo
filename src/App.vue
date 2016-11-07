<template>
	<div id="home">
		<h1>{{title}}</h1>
		<h2>Choose your formula</h2>
		<drill-sections :data="sections"></drill-sections>
	</div>
</template>

<script>
	import DrillSections from './components/Drill-Sections'

	export default {
		name: 'home',
		components: {
			DrillSections
		},
		data () {
			return {
				sections: null,
				title: 'Adapt Drill FM'
			}
		},
		created: function () {
			this.getDrillSections()
		},
		methods: {
			// Gather data from the json file/url
			getDrillSections: function () {
				this.$http.get('http://localhost:3004/sections').then((response) => {
					this.sections = response.data
				}, (response) => {

				})
			}
		}
	}
</script>

<style>
	body {
		background: #B0BEC5;
		font-family: "Gotham Rounded SSm A", "Gotham Rounded SSm B";
	}

	html, body, #app {
		height: 100%;
	}

	#app {
		display: flex;
		justify-content: center;
		align-items: center;
	}

</style>