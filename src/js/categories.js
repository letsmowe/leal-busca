
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

		for (var i = items.length; i--; )
			this.items.push(new CategoriesItem(items[i]));

	};

	Categories.prototype.getTitles = function () {

		var titles = this.element.querySelectorAll('.Categories-title');

		for (var i = titles.length; i--; )
			this.titles.push(new CategoriesItem(titles[i]));

	};

	Categories.prototype.init = function () {

		this.getItems();
		this.getTitles();

	};

	return Categories;

})();