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

		this.header = false;
		this.icon = false;
		this.title = false;

		if (this.element)
			this.init();

	}

	CategoriesItem.prototype.init = function () {

		console.log(this.element);

		// TODO
		// obter elementos aqui....

	};

	return CategoriesItem;

})();

/* Categories Nav */

var CategoriesNav = (function () {

	/**
	 * Categories Nav constructor
	 * @constructor
	 */
	function CategoriesNav(element, categories) {

		this.element = element;

	}

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

		if (this.element)
			this.init();

	}

	Categories.prototype.init = function () {

		var items = this.element.querySelectorAll('.CategoriesItem');

		for (var i = items.length; i--; )
		{

			this.items.push(new CategoriesItem(items[i]));

		}

	};

	return Categories;

})();