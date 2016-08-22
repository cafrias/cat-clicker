import React from 'react';
import MainContent from '../app/components/MainContent';
import TestUtils from 'react-addons-test-utils';
import testData from './.data/testData';

describe('MainContent', () => {
	// sentId represents the cat.id sent to changeActive callback
	var sentId = null;
	const component = TestUtils.renderIntoDocument(
			<MainContent
				cat={testData.cats[testData.currentActive]}
				countOne={(id) => { testData.cats[id].counter += 1; }}
			/>
		);

	it('counts up onClick', () => {
		let img = TestUtils.findRenderedDOMComponentWithTag(component, 'img'),
				oldCounter = testData.cats[testData.currentActive].counter;

		TestUtils.Simulate.click(img);

		expect(testData.cats[testData.currentActive].counter).toEqual(oldCounter + 1);
	});
});
