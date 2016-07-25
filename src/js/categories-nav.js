
/* Categories Nav */

var CategoriesNav = (function () {

	/**
	 * Categories Nav constructor
	 * @constructor
	 */
	function CategoriesNav(element, categories) {

		var self = this;

		this.element = element;
		this.categories = categories;

		this.items = [];

		this.config  = {
			backgroundSelector: '.CategoriesNav-background',
			innerSelector: '.CategoriesNav-inner',
			listSelector: '.CategoriesNav-list',
			titleSelector: '.Categories-title'
		};

		this.items = [];

		this.onScroll = function (event) {

			var h = document.documentElement,
				b = document.body,
				st = 'scrollTop',
				sh = 'scrollHeight';

			var pageY = h[st]||b[st];

			if (event.path)
				pageY = event.path;
			else
				pageY = event.pageY;

			var itemsLenght = self.items.length;

			var current = false;

			for (var i = 0; i < itemsLenght; i++) {

				if (self.items[i].item.offsetTop < pageY)
					current = self.items[i];
				else
					break;

			}

			if (current)
				current.focus();

		};

		this.onItemClick = function () {

			var scrollItem = self.categories.element.querySelector('[data-letter=' + this.item + ']');

			if (scrollItem) {

				var scrollY = scrollItem.offsetTop;

				window.scrollTo(0, scrollY);

			}

		};

		if (this.element && this.categories)
			this.init();

	}

	CategoriesNav.prototype.createArray = function () {

		var items = [];

		function existsOnArray(array, letter) {

			for (var i = array.length; i--; )
				if (array[i] == letter)
					return false;

			return letter;

		}

		for (var i = categories.items.length; i--; ) {

			var letter = categories.items[i].firstLetter;

			if (letter)
				if (existsOnArray(items, letter))
					items.push(letter);

		}

		// order by alphabitcal
		items.sort();

		return items;

	};

	CategoriesNav.prototype.getElements = function () {

		this.background = this.element.querySelector(this.config.backgroundSelector);
		this.inner = this.element.querySelector(this.config.innerSelector);
		this.list = this.element.querySelector(this.config.listSelector);

	};

	CategoriesNav.prototype.buildList = function () {

		this.list.innerHTML = '';

		for (var i = 0; i < this.categories.titles.length; i++) {

			var item = new CategoriesNavItem(document.createElement('li'), this.categories.titles[i]);

			this.list.appendChild(item.element);

			item.callback = this.onItemClick;

			this.items.push(item);

		}

	};

	CategoriesNav.prototype.build = function () {

		if (this.list)
			this.buildList();

	};

	CategoriesNav.prototype.init = function () {

		this.getElements();

		//this.items = this.createArray();

		this.build();

		try {

			window.addEventListener('scroll', this.onScroll, false);

		} catch (e) {}

	};

	return CategoriesNav;

})();