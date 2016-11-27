import videojs from 'video.js';

/**
 *  Get classes 
 */

var Slider = videojs.getComponent('Slider');
var Button = videojs.getComponent('Button');
var MenuButton = videojs.getComponent('MenuButton');
var Menu = videojs.getComponent('Menu');
var MenuItem = videojs.getComponent('MenuItem');
var Component = videojs.getComponent('Component');

/**
 * Extend Component class
 */

class NoteTakingComponent extends Component {
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

Component.registerComponent('NoteTakingComponent', NoteTakingComponent);

class NoteTakingButton extends Button {
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

Component.registerComponent('NoteTakingButton', NoteTakingButton);

/**
 * Export classes 
 */

export {NoteTakingComponent}; 
export {NoteTakingButton};
export {Button};
export {Component};
export {Slider};
export {MenuButton};
export {Menu};
export {MenuItem};