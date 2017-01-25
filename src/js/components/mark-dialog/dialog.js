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
		
		this.mark_ = null;
		
		this.form_ = this.getChild('DialogForm');
		
		const formHandler = Fn.bind(this, this.handleFormSubmit);
		this.form_.on('submit', formHandler);
		
		// hide initially
		this.hide();
		this.active_ = false;
	}
	
	/**
	 * Gets if element is shown or hidden
	 *
	 * @return {Boolean} true if active
	 * @method isActive
	 */
	isActive() {
		if (typeof active === 'undefined') {
			return this.active_;
		} 
	}
	
	/**
	 * Overrides super method and sets active
	 *
	 * @method show
	 */
	show() {
		super.show();
		this.active_ = true;
	}
	
	/**
	 * Overrides super method and sets inactive
	 *
	 * @method hide
	 */
	hide() {
		super.hide();
		this.active_ = false;
	}
	
	/**
	 * Loads mark into the dialog
	 * 
	 * @param {MarkItem} mark Mark object to be loaded
	 * @method loadMark
	 */
	loadMark(mark) {
		this.mark_ = mark;
		
		// add step for checking if there's data associated with this mark
		// and add note data here
		
		this.position();
		this.setTimeValues();
		
		if (!this.isActive()) {
			this.show();
		}
	}
	
	/**
	 * Unloads mark from dialog
	 * 
	 * @method unloadMark
	 */
	unloadMark() {
		if (this.mark_) {
			this.mark_ = null;
			
			if (this.isActive()) {
				this.hide();
			}
		}
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
		
		this.setTimeValues();
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
	 * @method dispose
	 */
	dispose() {
		const formHandler = Fn.bind(this, this.handleFormSubmit);
		this.form_.off('submit', formHandler);
		
		// clears the internal references
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
		const duration = this.player_.duration();
		const mark = this.mark_;
		
		if (mark) {
			const markPos = mark.getPosition();
			const startTime = formatTime(markPos.left * duration);
			const endTime = formatTime(markPos.right * duration);
			
			this.setFormData({
				'time-start': startTime,
				'time-end': endTime
			});
		} else {
			Log.error('no mark item associated with dialog');
		}
	}
	
	/**
	 * Sets data into respective form elements
	 *
	 * @param {Object} data The data object to set
	 * @method setFormData
	 */
	setFormData(data) {
		const els = this.getAllFormElements();
		
		for (name in els) {
			if (name === '') {
			
			}
			console.log("Form Element: ", name, " is : ", els[name]);
		}
		
	}
		
	/**
	 * Changed name from createEl because Component calls createDialog and 
	 * that is unintended
	 *
	 * @method createEl
	 */
	createEl(tag = 'div', props = {}, attrs = {}) {
		let size = this.player().notetaking().getPlayerSize();
		let sizeClass = 'ntk-dialog-md';
		
		switch(size) {
			case 'large': 
				sizeClass = 'ntk-dialog-lg';
				break;
			case 'medium':
				sizeClass = 'ntk-dialog-md';
				break;
			default:
				break;
		}
		
		props = assign({
			className: `ntk-dialog ${sizeClass}`
		}, props);
		
		const el = super.createEl(tag, props, attrs);
		
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