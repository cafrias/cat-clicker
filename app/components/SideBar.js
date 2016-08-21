import React, { Component, PropTypes } from 'react';

class SideBar extends Component {
	render() {
		var items = this.props.cats.map((cat) => {
			return <li key={cat.id}>{cat.name}</li>
		});
		return (
			<div class="float-left pad-sides bg-02 hth-vh-100 pad-top box-shadow">
				<ul id="side-bar" class="dtl-no-pad-mar wth-100" role="nav">
					{items}
				</ul>
			</div>
		);
	}
}

export default SideBar;
