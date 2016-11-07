import Vue from 'vue'
import DrillSections from 'src/components/Drill-Sections'

// helper function that mounts and returns the rendered text
function getRenderedText (Component, propsData) {
	const Ctor = Vue.extend(Component)
	const vm = new Ctor({ propsData }).$mount()
	return vm.$el.textContent
}

describe('Drill-Sections', () => {
	it('render correctly with different props', () => {
		expect(getRenderedText(DrillSections, {
			data: 'Hello'
		})).toBe('Hello')
	})
})
