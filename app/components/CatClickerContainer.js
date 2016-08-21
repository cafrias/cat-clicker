import React, { Component } from 'react';
import update from 'react-addons-update';
// import CatClicker from 'CatClicker';

class CatClickerContainer extends Component {
	
	constructor() {
		super(...arguments);
		this.state = {
			cats: [
				{
					id: 0,
					name: 'pepe',
					img: 'https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426',
					counter: 0
				},
				{
					id: 1,
					name: 'diego',
					img: 'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496',
					counter: 0
				},
				{
					id: 2,
					name: 'mary and lucy',
					img: 'https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454',
					counter: 0
				}
			],
			currentActive: 0
		};

		// Bind methods
		this.changeActive = this.changeActive.bind(this);
		this.countOne = this.countOne.bind(this);
		this.getActiveCat = this.getActiveCat.bind(this);
	}

	changeActive(newActiveId) {
		if(!this.state.cats[newActiveId]) this.notFoundError(newActiveId);

		this.setState(
			update(
				this.state,
				{ 'currentActive': { $set: newActiveId } }
			)
		);
	}

	countOne(id) {
		let catIndex = this.state.cats.findIndex((cat) => cat.id == id);

		if(catIndex == -1) this.notFoundError(id);

		this.setState(update(
			this.state,
			{
				'cats': {
					[catIndex]: { 
						'counter': { $set: this.state.cats[catIndex].counter + 1 }
					}
				}
			}
		));
	}

	getActiveCat() {
		return this.state.cats[this.state.currentActive];
	}

	notFoundError(id) {
		throw new Error('No cat with id ' + id + ' found');
	}

	render() {
		const catCallbacks = {
			changeActive: this.changeActive,
			countOne: this.countOne,
			getActiveCat: this.getActiveCat
		};

		return (
			<CatClicker
				cats={this.state.cats}
				catCallbacks={catCallbacks} />
		);
	}

}

export default CatClickerContainer;
