import React from 'react';
import TestUtils from 'react-addons-test-utils';
import CatClickerContainer from '../app/components/CatClickerContainer';

describe('CatClickerContainer', () => {
	const component = TestUtils.renderIntoDocument(
		<CatClickerContainer />
	);

	it('Count up cat state', () => {
		let catId = 2,
				oldCats = component.state.cats;

		component.countOne(catId);
		
		// We expects new cat's counter to be equals to the old one plus one.
		expect(component.state.cats[catId].counter)
			.toEqual(oldCats[catId].counter + 1);
	});

	it('changeActive', () => {
		let newActive = 2;

		component.changeActive(newActive);

		// We expect the app to have set the new active cat successfully
		expect(component.state.currentActive).toEqual(newActive);
	});

	it('getActiveCat', () => {
		let catFromFunction = component.getActiveCat().id,
				catFromState = component.state.cats[component.state.currentActive].id;

		expect(catFromFunction).toEqual(catFromState);
	});
});
