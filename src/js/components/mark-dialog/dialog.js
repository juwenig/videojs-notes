/**
 * @file dialog.js
 */

import * as Dom from '../utils/dom.js';
import mergeOptions from '../utils/merge-options.js';
import * as Fn from '../utils/fn.js';
import Log from '../utils/log.js';
import * as Form from '../utils/form.js';
import {Component} from '../utils/vjs-classes.js';
import {assign} from '../utils/obj.js'
import formatTime from '../utils/format-time.js';

import Config from '../../config.js';

import DialogForm from './dialog-form.js';

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
		
		this.form_ = this.el_.children[0];
		
		const formHandler = Fn.bind(this, this.handleFormSubmit);
		this.form_.on('submit', formHandler);
					
	}
	
	/**
	 * Calculates and sets the position of dialog
	 * Call function after inserting dialog into DOM
	 * 
	 * @method setPosition
	 */
	position() {		
		const playerEl = this.player().el();
		const markEl = this.mark().el();

		let boxPlayer = Dom.findElPosition(playerEl);
		let boxMark = Dom.findElPosition(markEl);
		
		const markL = boxMark.left;
		const playerL = boxPlayer.left;
		
		// offsets only work after element
		// has been added into the DOM
		const markW = this.mark().el_.offsetWidth;
		const dialogW = this.el_.offsetWidth;
		const playerW = this.player().el_.offsetWidth;
		
		let leftPos = markL - playerL + 0.5*(markW - dialogW); 
		let leftMax = playerW - dialogW;
		
		// we do not want dialog to end outside
		// of player
		leftPos = Math.max(0, Math.min(leftMax, leftPos));
		
		this.el_.style['left'] = leftPos + 'px';
		
		return leftPos;
	}
	
	/**
	 * Returns the mark 
	 *
	 * @return {MarkItem}
	 * @method mark
	 */
	mark() {
		return this.mark_;
	}
	
	/**
	 * Gets all the dialog elements
	 *
	 * @method getAllFormElements
	 */
	getAllFormElements() {
		return this.form_.elements;
	}
	
	/**
	 * Gets the form object
	 *
	 * @method getForm
	 */
	getForm() {
		return this.form_;
	}
	
	/**
	 * Disposes the dialog
	 *
	 * @dispose
	 */
	dispose() {
		const formHandler = Fn.bind(this, this.handleFormSubmit);
		this.form_.off('submit', formHandler);

		this.mark_ = null;
		this.form_ = null;
		
		this.form_.off();
		
		super.dispose();
	}
	
	/**
	 * Sets initial time values
	 *
	 * @method setTimeValues
	 */
	setTimeValues() {
		const duration = this.player.duration();
		const mark = this.mark_;
		
		if (mark) {
			const markPos = mark.position_;
			
		} else {
			Log.error('no mark item associated with dialog');
		}
	}
		
	/**
	 * Changed name from createEl because Component calls createDialog and 
	 * that is unintended
	 *
	 * @method createEl
	 */
	createEl(tag = 'div', props = {}, attrs = {}) {
		let width;
		let size = this.player().notetaking().getPlayerSize();
		
		switch(size) {
			case 'large': 
				width = '200px';
				break;
			case 'medium':
				width = '150px';
				break;
			default:
				width = '';
		}
		
		props = assign({
			className: 'ntk-dialog'
		}, props);
		
		const el = super.createEl(tag, props, attrs);
		el.style.width = width;
		
		return el;
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
	
	/**
	 * Handles dialog form submit
	 *
	 * @method handleFormSubmit
	 */
	handleFormSubmit(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		
		const data = Form.formToJson(this.getAllFormElements());
	}
}

Dialog.prototype.options_ = Config.Dialog;

Component.registerComponent('Dialog', Dialog);
export default Dialog;