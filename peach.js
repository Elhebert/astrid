{

	'use strict';

	/**
	 * ScrollY polyfill for old navigator versions. (eg. IE < 9)
	 * @see https://developer.mozilla.org/en/docs/Web/API/Window/scrollY
	 */
	let scrollY = () => {

		'use strict';

		let supportPageOffset = window.pageXOffset !== undefined;
		let isCSS1Compat = ((document.compatMode || '')) === 'CSS1Compat';

		return supportPageOffset ? window.pageYOffset :
					isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
	};

	/**
	 * Make an element sticky
	 * @param {element} element that need to be fixed to the top of the page.
	 */
	let makeSticky = element => {

		'use strict';

		let rect = element.getBoundingClientRect();
		let offset = parseInt(element.getAttribute('data-offset') || 0, 10);
		let constraint = (element.getAttribute('data-constraint') &&
							element.querySelector(element.getAttribute('data-constraint'))) ||
							document.body;
		let constraintRect = constraint.getBoundingClientRect();
		let constraintBottom = constraintRect.top + scrollY() +
								constraintRect.height - offset - rect.height;
		let top = rect.top + scrollY();
		let fake = document.createElement('div');

		fake.style.width = rect.width + 'px';
		fake.style.height = rect.height + 'px';

		/**
		 * Triggered every a scroll event is detected on the page.
		 */
		let onScroll = () => {
			let hasScrollClass = element.classList.contains('sticky');

			if (scrollY() > constraintBottom && element.style.position !== 'absolute') {
				element.classList.remove('sticky');

				element.style.position = 'absolute';
				element.style.top = 'auto';
				element.style. bottom = '0';
			} else if (
				scrollY() > (top - offset) &&
				scrollY() < constraintBottom &&
				!hasScrollClass && element.style.position !== 'fixed'
			) {
				element.classList.add('sticky');

				element.style.position = 'fixed';
				element.style.top = offset + 'px';
				element.style.bottom = 'auto';
				element.style.width = rect.width + 'px';

				element.parentNode.insertBefore(fake, element);
			} else if (
				scrollY() < (top - offset) &&
				hasScrollClass && element.style.position !== 'relative'
			) {
				element.classList.remove('sticky');

				element.style.position = 'relative';

				element.parentNode.contains(fake) && element.parentNode.removeChild(fake);
			}
		};

		/**
		 * Triggered every time a resize event is detected on the page
		 */
		let onResize = () => {
			element.classList.remove('sticky');

			element.style.position = 'relative';
			element.style.width = 'auto';
			fake.style.display = 'none';

			rect = element.getBoundingClientRect();
			top = rect.top + scrollY();

			fake.style.width = rect.width + 'px';
			fake.style.height = rect.height + 'px';
			fake.style.display = 'block';

			onScroll();
		};

		window.addEventListener('scroll', onScroll);
		window.addEventListener('resize', onResize);
	};

	/**
	 * Make every element with the [data-sticky] attribute sticky.
	 */
	let elements = document.querySelectorAll('[data-sticky]');
	for (let key in elements) {
		if (elements.hasOwnProperty(key))
			makeSticky(elements[key]);
	}
}
