import React from 'react';
import SideBar from '../app/components/SideBar';
import TestUtils from 'react-addons-test-utils';
import testData from './.data/testData';

describe('SideBar', () => {
	// sentId represents the cat.id sent to changeActive callback
	var sentId = null;
	const component = TestUtils.renderIntoDocument(
			<SideBar
				activeCat={testData.cats[testData.currentActive]}
				cats={testData.cats}
				changeActive={(id) => { sentId = id; }}
			/>
		);

	it('calling changeActive with correct params', () => {
		let listItems = TestUtils.scryRenderedDOMComponentsWithTag(component, 'li'),
				clickedIndex = 1,
				itemId = listItems[clickedIndex].getAttribute('data-id');

		TestUtils.Simulate.click(listItems[clickedIndex]);

		expect(sentId).toEqual(itemId);
	});
});
