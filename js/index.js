/* jshint esversion:6 */

(function mainIIFE() {
'use strict';

// Execute Main function on DOMContentLoaded
document.addEventListener('DOMContentLoaded', main);

// FUNCTION DEFINITIONS ________________________________________________________

/**
 * Main function instanciates MVC objects and initializes the view calling
 * `__VIEW__.init()` method.
 * 
 * @function main
 */
function main() {

	/**
	 * An instance of `_MODEL_` holds all logic relative to the *model* part ot the
	 * application.
	 *
	 * @class _MODEL_
	 * @static
	 */
	var _MODEL_ = {
		/**
		 * Holds all Cat instances of the application.
		 * 
		 * @property cats
		 * @type Array
		 */
		cats: [
			new Cat(1, 'pepe', 'https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426'),
			new Cat(2, 'diego', 'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496'),
			new Cat(3, 'mary and lucy', 'https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454')
		]
	};

	/**
	 * An instance of `_CONTROLLER_` holds all logic relative to the *controller*
	 * part ot the application.
	 *
	 * @class _CONTROLLER_
	 * @static
	 */
	var _CONTROLLER_ = {

		/**
		 * Returns a reference to all instances of Cat in the application, this
		 * method calls `_MODEL_.cats`.
		 * 
		 * @property getCats
		 * @return {[Array]} Array of instances of Cat in the application.
		 */
		getCats: function() {
			return _MODEL_.cats;
		},

		/**
		 * Holds the logic for adding one to the `counter` of a given `Cat` instance
		 * represented with the `catIndex` parameter.
		 *
		 * @property catClicked
		 * @param  {Array} catIndex         The index in which the Cat instance is stored in _MODEL_.cats array.
		 * @param  {Element} counterContainer A reference to the DOM Element that displays the value of `Cat.counter`.
		 */
		catClicked: function(catIndex, counterContainer) {
			var clickedCat = _MODEL_.cats[catIndex];
			
			if(clickedCat) clickedCat.clicked(counterContainer);

			else throw new Error('No cat with id: ' + (catIndex) + ' found.');
		}
	};

	/**
	 * An instance of `_VIEW_` holds all logic relative to the *view*
	 * part ot the application. This instance holds private properties as opposed
	 * to `_CONTROLLER_` and `_MODEL_`.
	 *
	 * @class _VIEW_
	 * @static
	 */
	var _VIEW_ = (function viewInstanciator() {
		
		/**
		 * A reference to the DOM Element which will/is displaying the currently
		 * active `Cat` instance.
		 *
		 * @property mainContainer
		 * @type Element
		 * @private
		 */
		var mainContainer = document.getElementById('cat-details');

		/**
		 * A reference to the DOM Element which contains the list of `Cat` instances.
		 * (a.k.a. the sidebar).
		 *
		 * @property sidebarContainer
		 * @type Element
		 * @private
		 */
		var sidebarContainer = document.getElementById('side-bar');

		/**
		 * Holds references to each DOM Element representing items in the sidebar
		 * inside `sidebarContainer`.
		 *
		 * @property items
		 * @type Array
		 * @private
		 */
		var items = [];

		/**
		 * Holds the name of the CSS class that holds the styles for an active option.
		 *
		 * @property activeClass
		 * @type String
		 * @private
		 */
		var activeClass = 'option--active';

		/**
		 * Holds the value of the index representing the `Cat` instance currently
		 * being displayed.
		 *
		 * @property activeIndex
		 * @type Number
		 * @private
		 */
		var activeIndex = 1;

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
		
		/**
		 * Renders the side-bar menu based on the cats instances passed in `cats`.
		 *
		 * @method  renderMenu
		 * @param  {Array} cats Instances of Cat.
		 * @private
		 */
		var renderMenu = function(cats) {
			cats.forEach(function navIterator(cat, i) {
				var li = document.createElement('li');
				li.setAttribute('data-id', cat.id);
				li.classList.add('option');
				li.textContent = cat.name;

				if(i === 0) makeActive(li);

				items.push(li);

				sidebarContainer.appendChild(li);
			});
		};

		/**
		 * Handles the click event on the menu. It is:
		 * - Toggles active/inactive option.
		 * - Renders corresponding cat in main view.
		 *
		 * @method clickHandler
		 * @param  {Object} evt           Event object from the triggered event.
		 * @param  {Array} cats          Array of all Cat instances.
		 * @param  {Element} mainContainer Container of the main view.
		 * @private
		 */
		var clickHandler = function(evt, cats, mainContainer) {
			var clickedIndex = evt.target.attributes['data-id'].value - 1;

			if(activeIndex === clickedIndex) return;

			makeInactive(items[activeIndex]);
			makeActive(items[clickedIndex]);

			renderMain(mainContainer, cats[activeIndex]);
		};

		return {
			/**
			 * Initializes the view, that is:
			 *
			 * - Calling the render methods for first time.
			 * - Assigning Event Listener where corresponding.
			 *
			 * @method init
			 */
			init: function() {
				var cats = _CONTROLLER_.getCats();
				renderMenu(cats);
				renderMain(mainContainer, cats[0]);

				sidebarContainer.addEventListener('click', function onClickSide(evt) {
					clickHandler.call({}, evt, _CONTROLLER_.getCats(), mainContainer);
				});

				mainContainer.addEventListener('click', function onClickMain(evt) {
					if(evt.target.attributes['data-id']){
						var clickedId = evt.target.attributes['data-id'].value,
								counter = document.getElementById('counter-' + clickedId);
						_CONTROLLER_.catClicked(clickedId-1, counter);
					}
				});
			}
		};
	})();

	// Initial Render
	_VIEW_.init();
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
