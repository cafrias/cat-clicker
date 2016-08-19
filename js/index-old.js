/* jshint esversion:6 */

(function mainIIFE() {
'use strict';

/**
 * Creates a new instance of `Navigator` if no previous instance exists. Ensures
 * there will be only one instance of `Navigator` in the program.
 *
 * @class NavigatorInstanciator
 * @static
 */
var navigatorInstanciator = (function NavigatorInstanciator() {
	
	/**
	 * Holds the reference to the unique `Navigator` instance of already instanciated.
	 * If not, defaults to null.
	 *
	 * @property instance
	 * @type Navigator
	 */
	var instance;

	/**
	 * Holds all the logic for navigation. It is:
	 * - Active option
	 * - Render menu
	 * - Toggle options
	 *
	 * @class Navigator
	 * @static
	 */
	function Navigator() {

		var activeIndex = 0;

		var options = [];

		/**
		 * Holds the name of the CSS class that holds the styles for an active option.
		 *
		 * @property activeClass
		 * @type String
		 * @private
		 */
		var activeClass = 'option--active';

		/**
		 * Adds `activeClass` CSS class to `element`.
		 *
		 * @method  makeActive
		 * @param  {Element} element Element to make active
		 * @private
		 */
		var makeActive = function(element) {
			activeIndex = element.attributes['data-id'].value - 1;
			element.classList.add(activeClass);
		};

		/**
		 * Removes `activeClass` CSS class from `element`.
		 *
		 * @method  makeInactive
		 * @param  {Element} element Element to make inactive
		 * @private
		 */
		var makeInactive = function(element) {
			element.classList.remove(activeClass);
		};

		/**
		 * Calls the render method of `element` inside the given `container`.
		 *
		 * @method renderMain
		 * @param  {Element} container Element that will contain the rendered HTML
		 * @param  {Element} element   Element that will generate the HTML
		 * @private
		 */
		var renderMain = function(container, element) {
			container.innerHTML = '';
			element.render(container);
		};

		return {
			/**
			 * Holds a reference to the sidebar container to which the navigation will be
			 * appended.
			 *
			 * @property sidebarContainer
			 * @type Element
			 */
			sidebarContainer: document.getElementById('side-bar'),

			/**
			 * Renders the side-bar menu based on the cats instances passed in `cats`.
			 *
			 * @method  renderMenu
			 * @param  {Array} cats Instances of Cat.
			 */
			renderMenu: function(cats, mainContainer) {
				cats.forEach(function navIterator(cat, i) {
					var li = document.createElement('li');
					li.setAttribute('data-id', cat.id);
					li.classList.add('option');
					li.textContent = cat.name;

					if(i === 0) makeActive(li);

					options.push(li);

					this.sidebarContainer.appendChild(li);
				}, this);

				renderMain(mainContainer, cats[0]);
			},

			/**
			 * Handles the click event on the menu. It is:
			 * - Toggles active/inactive option.
			 * - Renders corresponding cat in main view.
			 * 
			 * @param  {Object} evt           Event object from the triggered event.
			 * @param  {Array} cats          Array of all Cat instances.
			 * @param  {Element} mainContainer Container of the main view.
			 */
			clickHandler: function(evt, cats, mainContainer) {
				var clickedIndex = evt.target.attributes['data-id'].value - 1;

				if(activeIndex === clickedIndex) return;

				makeInactive(options[activeIndex]);
				makeActive(options[clickedIndex]);

				renderMain(mainContainer, cats[activeIndex]);
			}
		};
	}

	return {
		/**
		 * Returs the instance of `Navigator` if existing if not creates a new one.
		 *
		 * @method getInstance
		 * @return {Navigator} The single instance of Navigator.
		 * @for NavigatorInstanciator
		 */
		getInstance: function() {
			if(!instance) {
				instance = Navigator();
			}

			return instance;
		}
	};
})();

document.addEventListener('DOMContentLoaded', main);

function main() {
	var mainContainer = document.getElementById('cat-details'),
			cats = [],
			navigator = navigatorInstanciator.getInstance();
	
	// Instanciate cats
	cats.push(new Cat(1, 'pepe', 'https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426'));
	cats.push(new Cat(2, 'diego', 'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496'));
	cats.push(new Cat(3, 'mary and lucy', 'https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454'));

	// Render sidebar
	navigator.renderMenu(cats, mainContainer);

	// Render cats
	// cats.forEach(function renderCats(cat) {
	// 	cat.render(mainContainer);
	// });
	
	navigator.sidebarContainer.addEventListener('click', function onClick(evt) {
		navigator.clickHandler.call({}, evt, cats, mainContainer);
	});

	// Add listener to main
	mainContainer.addEventListener('click', function onClick(evt) {
		if(evt.target.attributes['data-id']){
			var clickedId = evt.target.attributes['data-id'].value,
					counter = document.getElementById('counter-' + clickedId);
			cats[clickedId-1].clicked(counter);
		}
	});
}


/**
 * Creates a new cat
 * 
 * @class Cat
 * @param {Integer} id     (Mandatory). Unique ID
 * @param {String} name    String representing the name of the cat.
 * @param {String} img     URL of an image to set img property.
 * @param {Integer} counter (Optional) Sets the initial value for counter property.
 * @constructor
 */
function Cat(id, name, img, counter) {
	// Throw error if no ID passed
	if(typeof id === 'undefined') {
		throw new Error('You must assign an ID to the cat');
	}

	/**
	 * Unique ID used to represent a given instance of Cat.
	 * 
	 * @property id
	 * @type Integer
	 */
	this.id = id;

	/**
	 * Represents the name of the cat.
	 * 
	 * @property name
	 * @type String
	 */
	this.name = name;

	/**
	 * URL to the image of the cat to be displayed.
	 *
	 * @property img
	 * @type String
	 */
	this.img = img;

	/**
	 * Holds the number of times this instance of Cat has been clicked.
	 * 
	 * @property counter
	 * @type Integer
	 * @default 0
	 */
	this.counter = counter || 0;

	/**
	 * Holds a reference to the counter element represented in the node. This element
	 * will be updated each time the counter increments. It defaults to `null` if the
	 * current instance has not been rendered yet.
	 *
	 * @property reference
	 * @type Element
	 * @default null
	 */
	this.reference = null;
}

/**
 * Renders the current Cat instance inside the DOM `Element` passed in `container`.
 * 
 * @method render
 * @param  {Element} container The Element this instance should be rendered inside.
 * @for Cat
 */
Cat.prototype.render = function(container) {
	var div = document.createElement('div');

	div.id = 'cat-container-' + this.id;
	div.classList.add(
		'wth-50',
		'marg-sides-auto',
		'dtl-no-pad-mar',
		'hth-380',
		'ps-rel'
	);
	div.innerHTML += 
		'<div id="score" class="ps-abs ps-tlf bg-fff-t box-pad bor-radius">' +
			'<p class="txt-cup">Times Clicked: <span id="counter-' + this.id + '">' + this.counter + '</span></p>' +
		'</div>' +
		'<div class="bor-radius bg-04 bor-full box-shadow-02">' +
			'<img src="' + this.img + '" alt="little kitten ' + this.id + '" data-id="' + this.id + '" class="wth-max-100 hth-max-100 bor-radius-top">' +
			'<p class="dtl-no-pad-mar marg-top wth-100 txt-center txt-bold txt-clr-white wth-50 txt-cup box-pad">' + this.name + '</p>' +
		'</div>'
	;

	container.appendChild(div);

	// TODO: think of a better approach
	this.reference = div.firstChild.firstChild.lastChild;
};

/**
 * Increments counter and updates the counter view in the DOM.
 *
 * @method  clicked
 * @for  Cat
 */
Cat.prototype.clicked = function() {
	this.counter += 1;
	this.reference.textContent = this.counter;
};
})();
