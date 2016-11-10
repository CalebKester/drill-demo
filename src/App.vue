<template>
	<div id="home" class="notecard">
		<div class="notecard-header">{{title}}</div>
		<div class="notecard-content">
			<!--<h2>Choose your formula</h2>-->
			<drill-sections :data="sections"></drill-sections>
		</div>
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
	/*body {
		background: #B0BEC5;
		font-family: "Gotham Rounded SSm A", "Gotham Rounded SSm B";
	}*/

	#app {
		display: flex;
		justify-content: center;
		padding: 1rem;
		/*align-items: center;*/
	}

</style>