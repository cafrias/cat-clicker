import React, { Component, PropTypes } from 'react';
import SideBar from './SideBar';
import MainContent from './MainContent';

class CatClicker extends Component {

	render() {
		let activeCat = this.props.catCallbacks.getActiveCat();
		return (
			<div id="app-wrapper">
				<SideBar
					cats={this.props.cats}
					activeCat={activeCat.id}
					changeActive={this.catCallbacks.changeActive}
				/>
				<MainContent
					cat={activeCat}
					countOne={this.props.catCallbacks.countOne}
				/>
			</div>
		);
	}

}

CatClicker.propTypes = {
	catCallbacks: PropTypes.object.isRequired,
	cats: PropTypes.array.isRequired
};

export default CatClicker;
