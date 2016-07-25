
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

	CategoriesItem.prototype.init = function () {

		this.title = this.element.querySelector('span.CategoriesItem-title');

		if (this.element.querySelector('span.CategoriesItem-icon')) {

			// means that icon element is already created
			this.icon = this.element.querySelector('span.CategoriesItem-icon');

		} else {

			// if icon is not created, create icon with first letter of the categorie
			var selectArea = this.element.querySelector('a.CategoriesItem-select-area');
			this.icon = document.createElement('span');
			this.icon.className = 'CategoriesItem-icon';
			var innerLetter = document.createElement('span');

			// manipulating letter to remove graphic accents
			var letter = this.title.innerText.charAt(0).toUpperCase();

			var letters = {
				graphic: 'áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÔÖÚÙÛÜÇ'.split(''),
				lean: 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC'.split('')
			};

			if (letters.graphic.indexOf(letter) != -1) { // didnt find it on the letters with graphic accent
				letter = letters.lean[letters.graphic.indexOf(letter)]; // 'replace' with the corresponding letter without
			}

			innerLetter.innerText = letter;
			// css background default = #B71C1C (red 900)
			innerLetter.style.backgroundColor = this.pickColor(letter);

			this.icon.appendChild(innerLetter);
			selectArea.insertBefore(this.icon, selectArea.firstChild); //append icon as first child

		}

	};

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

	return CategoriesItem;

})();