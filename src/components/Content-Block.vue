<template>
	<div class="content" v-html="data">
	</div>
</template>

<script>
	export default {
		name: 'content-block',
		props: ['data'],
		// This runs when mounted (first render)
		mounted: function () {
			this.renderContent()
			// console.log('mounted')
		},
		// this runs when data is changed
		updated: function () {
			this.renderContent()
			// console.log('updated')
		},
		methods: {
			renderContent: function () {
				this.$nextTick(function () {
					MathJax.Hub.Queue(['Typeset', MathJax.Hub])
				})
			}
		}
	}
</script>
