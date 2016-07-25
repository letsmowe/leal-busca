/*!
 * Elbit Leal Busca Project v0.0.1 (http://elbit.com.br/)
 * Copyright 2013-2016 Elbit Cookies
 * Licensed under MIT (https://github.com/mowekabanas/base/blob/master/LICENSE)
*/

/* Categories Item */

var CategoriesItem = (function () {

	/**
	 * Categories Item constructor
	 * @constructor
	 */
	function CategoriesItem(element) {

		this.element = element;

		this.icon = false;
		this.title = false;

		if (this.element)
			this.init();

	}

	CategoriesItem.prototype.pickColor = function (letter) {

		// material color 900 (less opacity could be better)
		var color = [
			"#B71C1C", "#880E4F", "#4A148C", "#311B92",
			"#1A237E", "#0D47A1", "#01579B", "#006064",
			"#004D40", "#1B5E20", "#33691E", "#827717",
			"#E65100", "#BF360C", "#3E2723", "#212121",
			"#263238", "#B71C1C", "#880E4F", "#4A148C",
			"#311B92", "#1A237E", "#0D47A1", "#01579B",
			"#006064", "#004D40"];

		var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

		//returns color as the order of the corresponding letter
		return color[alphabet.indexOf(letter)];

	};

	CategoriesItem.prototype.getFirstLetter = function (text) {

		// manipulating letter to remove graphic accents
		var letter = text.charAt(0).toUpperCase();

		var letters = {
			graphic: 'áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÔÖÚÙÛÜÇ'.split(''),
			lean: 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC'.split('')
		};

		if (letters.graphic.indexOf(letter) != -1) // didnt find it on the letters with graphic accent
			letter = letters.lean[letters.graphic.indexOf(letter)]; // 'replace' with the corresponding letter without

		return letter;

	};

	CategoriesItem.prototype.init = function () {

		this.selectArea = this.element.querySelector('a.CategoriesItem-select-area');
		this.title = this.element.querySelector('span.CategoriesItem-title');
		this.firstLetter = this.getFirstLetter(this.title.innerText);
		this.icon = this.element.querySelector('span.CategoriesItem-icon');

		if (this.icon) { // means that icon element is already created

			this.icon.innerLetter = this.icon.querySelector('span') || false;

		} else {

			// if icon is not created, create icon with first letter of the categorie
			this.icon = document.createElement('span');
			this.icon.className = 'CategoriesItem-icon';

			if (this.selectArea)
				this.selectArea.insertBefore(this.icon, this.selectArea.firstChild); //append icon as first child

		}

		if (!this.icon.innerLetter) {

			this.icon.innerLetter = document.createElement('span');
			this.icon.appendChild(this.icon.innerLetter);

			// get the first letter of category title and put this to icon element
			this.icon.innerLetter.innerText = this.firstLetter;

		}

		// put a color to icon
		// css background default = #B71C1C (red 900)
		this.icon.innerLetter.style.backgroundColor = this.pickColor(this.firstLetter);

	};

	return CategoriesItem;

})();

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

			var scrollItem = self.categories.element.querySelector('[data-letter=' + this.item.dataset.letter + ']');

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

/* Categories */

var Categories = (function () {

	/**
	 * Categories constructor
	 * @constructor
	 */
	function Categories(element) {

		this.element = element;

		this.items = [];
		this.titles = [];

		if (this.element)
			this.init();

	}

	Categories.prototype.getItems = function () {

		var items = this.element.querySelectorAll('.CategoriesItem');

		for (var i = 0; i < items.length; i++)
			this.items.push(new CategoriesItem(items[i]));

	};

	Categories.prototype.getTitles = function () {

		var titles = this.element.querySelectorAll('.Categories-title');

		for (var i = 0; i < titles.length; i++)
			this.titles.push(titles[i]);

	};

	Categories.prototype.init = function () {

		this.getItems();
		this.getTitles();
		// this.getTitles(); // title get with item (returns item object with icon and title)

	};

	return Categories;

})();