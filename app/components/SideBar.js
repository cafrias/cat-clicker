import React, { Component, PropTypes } from 'react';

class SideBar extends Component {

	constructor() {
		super(...arguments);

		// Bind methods
		this.clickHandler = this.clickHandler.bind(this);
	}

	clickHandler(evt) {
		let targetID = evt.target.attributes['data-id'].value;
		this.props.changeActive(targetID);
	}

	render() {
		var items = this.props.cats.map((cat) => {
			return (
				<li
					key={cat.id}
					data-id={cat.id}
					className={cat.id == this.props.activeCat.id ? 'option--active' : ''}					
				>
					{cat.name}
				</li>
			);
		});
		return (
			<div className="float-left pad-sides bg-02 hth-vh-100 pad-top box-shadow">
				<ul id="side-bar" className="dtl-no-pad-mar wth-100" role="nav"
					onClick={this.clickHandler}
				>
					{items}
				</ul>
			</div>
		);
	}

}

SideBar.propTypes = {
	activeCat: PropTypes.object.isRequired,
	cats: PropTypes.array.isRequired,
	changeActive: PropTypes.func.isRequired
};

export default SideBar;
