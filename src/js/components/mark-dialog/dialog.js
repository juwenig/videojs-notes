/**
 * @file dialog.js
 */

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
		
		if (!options.mark) {
			Log.warn('new dialog constructed without associated mark');
			this.mark_ = new MarkItem(player);
		} else {
			this.mark_ = options.mark;
		}
	}
		
	/**
	 * Changed name from createEl because Component calls createDialog and 
	 * that is unintended
	 *
	 * @method createEl
	 */
	createEl(tag = 'div', props = {}, attrs = {}) {
		let sizeClass;
		let size = this.player().notetaking().getPlayerSize();
		
		switch(size) {
			case 'large': 
				sizeClass = 'ntk-lg-dialog';
				break;
			case 'medium':
				sizeClass = 'ntk-md-dialog';
				break;
			default:
				sizeClass = '';
		}
		
		props = assign({
			className: `${sizeClass} ntk-dialog`
		}, props);
		
		const el = super.createEl(tag, props, attrs);
		
		// We cannot add this to the tech_ object so this will have to do for now..
		this.player().tech_.on('click', Fn.bind(this, this.handleTechClick));
		return el;
	}
	
	/**
	 * Handles clicking on the player object to exit dialog
	 *
	 * @param event Event object
	 * @method handlePlayerClick
	 */
	handleTechClick(event) {
		let mark = this.mark_;
		if ('controls_' in this.player()) {
			this.player().controls_ = true;
		}
		
		let parent = mark.parentElement;
		
		if (parent) {
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
}

Dialog.prototype.options_ = Config.Dialog;

Component.registerComponent('Dialog', Dialog);
export default Dialog;