import React, { Component } from 'react';
import { render } from 'react-dom';
import SideBar from './SideBar';
import MainContent from './MainContent';

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
					
				</div>
			</div>
		);
	}
}

export default MainContent;

'<div id="score" class="ps-abs ps-tlf bg-fff-t box-pad bor-radius">' +
			'<p class="txt-cup">Times Clicked: <span id="counter-' + this.id + '">' + this.counter + '</span></p>' +
		'</div>' +
		'<div class="bor-radius bg-04 bor-full box-shadow-02">' +
			'<img src="' + this.img + '" alt="little kitten ' + this.id + '" data-id="' + this.id + '" class="wth-max-100 hth-max-100 bor-radius-top">' +
			'<p class="dtl-no-pad-mar marg-top wth-100 txt-center txt-bold txt-clr-white wth-50 txt-cup box-pad">' + this.name + '</p>' +
		'</div>'