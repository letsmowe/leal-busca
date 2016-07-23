
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