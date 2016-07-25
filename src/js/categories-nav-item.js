
/* Categories Nav Item */

var CategoriesNavItem = (function () {

	/**
	 * Categories Nav Item constructor
	 * @constructor
	 */
	function CategoriesNavItem(element, item) {

		var self = this;

		this.element = element;
		this.item = item;

		this.callback = false;

		this.config = {
			elementClass: 'CategoriesNavItem',
			selectAreaClass: 'CategoriesNavItem-select-area'
		};

		this.delay = false;

		this.focus = function () {

			self.selectArea.classList.add('has-focus');

			if (self.delay)
				clearTimeout(self.delay);

			setTimeout(function () {

				self.selectArea.classList.remove('has-focus');

			}, 100);

		};

		this.onTouchStart = function () {

			self.jumpTo();

		};

		this.onClick = function (event) {

			//event.preventDefault();
			self.jumpTo();

		};

		if (this.element && this.item)
			this.init();

	}

	CategoriesNavItem.prototype.jumpTo = function () {

		if (this.callback)
			this.callback();

		// do something here...

	};

	CategoriesNavItem.prototype.build = function () {

		if (!this.element)
			this.element = document.createElement('li');

		this.element.className = this.config.elementClass;

		this.selectArea = document.createElement('a');
		this.selectArea.className = this.config.selectAreaClass;
		this.selectArea.href = '#' + this.item.dataset.letter;
		this.selectArea.addEventListener('click', this.onClick);
		this.selectArea.addEventListener('touchstart', this.onClick);

		var selectAreaSpan = document.createElement('span');
		selectAreaSpan.innerText = this.item.dataset.letter;

		this.selectArea.appendChild(selectAreaSpan);
		this.element.appendChild(this.selectArea);

	};

	CategoriesNavItem.prototype.init = function () {

		if (!this.element.CategoriesNavItem)
			this.element.CategoriesNavItem = this;

		this.build();

	};

	return CategoriesNavItem;

})();