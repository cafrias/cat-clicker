import React, { Component, PropTypes } from 'react';

class SideBar extends Component {

	constructor() {
		super(...arguments);

		// Bind methods
		this.clickHandler = this.clickHandler.bind(this);
	}

	clickHandler(evt) {
		let targetID = evt.target.attributes.key;
		this.props.changeActive(targetID);
	}

	render() {
		var items = this.props.cats.map((cat) => {
			return (
				<li
					key={cat.id}
					className={cat.id == this.props.activeCat.id ? 'option--active' : ''}
				>
					{cat.name}
				</li>
			);
		});
		return (
			<div class="float-left pad-sides bg-02 hth-vh-100 pad-top box-shadow">
				<ul id="side-bar" class="dtl-no-pad-mar wth-100" role="nav"
					onClick={this.clickHandler}
				>
					{items}
				</ul>
			</div>
		);
	}

}

SideBar.propTypes = {
	activeCat: PropTypes.number.isRequired,
	cat: PropTypes.object.isRequired,
	changeActive: PropTypes.function.isRequired
};

export default SideBar;
