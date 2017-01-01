import * as Dom from '../utils/dom.js';
import mergeOptions from '../utils/merge-options.js';
import * as Fn from '../utils/fn.js';
import Log from '../utils/log.js';
import {Component} from '../utils/vjs-classes.js';
import {assign} from '../utils/obj.js'

import Config from '../../config.js';

class Dialog extends Component {
	constructor(player, options){
		options = mergeOptions(Dialog.prototype.options_, options);
		super(player, options);
		
		// Disables player controls so that background click does not pause/play video
		if ("controls_" in this.player()) {
			this.player().controls_ = false;
		}
	}
	
// SECTION : CREATE DIALOG
	
	/**
	 * Changed name from createEl because Component calls createDialog and 
	 * that is unintended
	 *
	 * @method createEl
	 */
	createEl(tag = 'div', props = {}, attrs = {}) {
		let sizeClass = this.assignSizeClass();
		
		props = assign({
			className: `${sizeClass} ntk-dialog`
		});
		
		const el = super.createEl(tag, props, attrs);
		
		// We cannot add this to the tech_ object so this will have to do for now..
		this.player().tech_.on('click', Fn.bind(this, this.handleTechClick));
		return el;
	}
	
	// should be moved over to mark-item on click event handler 
	// whenever mark-item is created, the dialog should be created
	// whenever mark-item is selected ('clicked on'), the dialog should be created
	// therefore 
	/**
	 * Handles clicking on the player object to exit dialog
	 *
	 * @param event Event object
	 * @method handlePlayerClick
	 */
	handleTechClick(event) {
		let mark = this.player().el().ntk.activeMark;
		if ('controls_' in this.player()) {
			this.player().controls_ = true;
		}
		
		let parent = mark.parentElement;
		
		if (mark !== '') {
			parent.removeChild(mark);
		}
		
		event.preventDefault();
		event.stopImmediatePropagation();
		
		this.player().tech_.off('click', this.handleTechClick);
	}
	
	/**
	 * Disables the click from propogating to the player
	 *
	 * @param event Event object
	 * @method handleContainerClick
	 */
	handleContainerClick(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
	}
	
// END SECTION : EVENT HANDLERS
	
// SECTION : DIALOG UTILITY
	
	/**
   * Adds a class name that corresponds to a dialog size dependent on the video dim
	 * 
	 * @method calculateSizeClass
	 */
	assignSizeClass() {
		// YouTube videos have 1.77 ratio width:height
		// Coursera videos have 1.77 ratio width:height
		let className = '';

		let height = this.player().videoHeight();
		let width = this.player().videoWidth();
		
		if (width >= 850 && height >= 400) {
			className = 'ntk-lg-dialog';
		} else if (width >= 700 && height >= 400) {
			className = 'ntk-md-dialog';
		} else {
			className = '';
		}
		
		return className;
	}
	
// END SECTION : DIALOG UTILITY
}

Dialog.prototype.options_ = Config.Dialog;

Component.registerComponent('Dialog', Dialog);
export default MarkDialog;