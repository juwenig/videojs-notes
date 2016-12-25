import videojs from 'video.js';

/**
 *  Get classes 
 */

let vjsComponent = videojs.getComponent('Component');
let vjsButton = videojs.getComponent('Button');
let vjsSlider = videojs.getComponent('Slider');
let vjsMenu = videojs.getComponent('Menu');
let vjsMenuButton = videojs.getComponent('MenuButton');
let vjsMenuItem = videojs.getComponent('MenuItem');

/**
 * Mixin for Component and Button classes
 */

let componentExtension = function(A) {
	return class Extension extends A {
		constructor(player, options) {
			super(player, options);

			this.registerElement();
		}

		/**
		 * Wrapper method for notetaking register element
		 *
		 * @method registerElement
		 */
		registerElement() {
			const player = this.player();
			if (!player.notetaking()) {
				throw new Error('No notetaking object created');
			}

			const notetaking = player.notetaking();
			const name = this.name();

			notetaking.registerElement(name, this);
		}

		/**
		 * Gets the notetaking component by name
		 *
		 * @param name The name of the class you would like to get the instance of
		 * @return {Object}
		 * @method getElement
		 */
		getElement(name) {
			const player = this.player();
			if (!player.notetaking()) {
				throw new Error('No notetaking object created');
			}

			const notetaking = player.notetaking();
			
			return notetaking.getElement(name);
		}
	}
};

export class Component extends componentExtension(vjsComponent) {}
export class Button extends componentExtension(vjsButton) {}
export class Slider extends componentExtension(vjsSlider) {}
export class Menu extends componentExtension(vjsMenu) {}
export class MenuButton extends componentExtension(vjsMenuButton) {}
export class MenuItem extends componentExtension(vjsMenuItem) {}

componentExtension = null;