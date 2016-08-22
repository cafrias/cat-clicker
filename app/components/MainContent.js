import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

class MainContent extends Component {
	render() {
		return (
			<div id="cat-details" className="fl-box fl-center bg-03 hth-vh-100 pad-top">
				<div id="score" className="ps-abs ps-tlf bg-fff-t box-pad bor-radius">
					<p className="txt-cup">Times Clicked:{' '}
						<span id="counter">{this.props.cat.counter}</span>
					</p>
				</div>
				<div className="bor-radius bg-04 bor-full box-shadow-02">
					<img
						src={this.props.cat.img}
						onClick={this.props.countOne.bind(null, this.props.cat.id)}
						alt={`Picture of ${this.props.cat.name} cat`}
						className="wth-max-100 hth-max-100 bor-radius-top"
					/>
					<p className="dtl-no-pad-mar marg-top wth-100 txt-center txt-bold txt-clr-white wth-50 txt-cup box-pad">
						{this.props.cat.name}
					</p>
				</div>
			</div>
		);
	}
}

MainContent.propTypes = {
	cat: PropTypes.object.isRequired,
	countOne: PropTypes.func.isRequired
};

export default MainContent;
