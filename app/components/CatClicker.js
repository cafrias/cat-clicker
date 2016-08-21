import React, { Component, PropTypes } from 'react';
import SideBar from './SideBar';
import MainContent from './MainContent';

class CatClicker extends Component {

	render() {
		return (
			<div id="app-wrapper">
				<SideBar
					cats={this.props.cats}
					changeActive={this.catCallbacks.changeActive}
				/>
				<MainContent
					cat={this.props.catCallbacks.getActiveCat()}
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
