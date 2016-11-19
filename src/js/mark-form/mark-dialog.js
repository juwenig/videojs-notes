import * as Dom from '../utils/dom.js';

import mergeOptions from '../utils/merge-options.js';
import * as Events from '../utils/events.js';
import log from '../utils/log.js';

import {Component} from '../videojs-classes.js';
import config from '../config.js';


class MarkDialog extends Component {
	constructor(player, options){
		options = mergeOptions(MarkDialog.prototype.options_, options);
		super(player, options);
		
		this.options = options;
		this.player = player;
	}
	
	/**
	 * Changed name from createEl because Component calls createDialog and 
	 * that is unintended
	 *
	 * @method createDialog
	 */
	createDialog() {
		// Determine the size and add appropriate class
		var sizeClass = this.calculateSizeClass();
		var parentDiv = this.createContainer(sizeClass);
		
		// ** FORM ** //
		var form = parentDiv.insertBefore(this.createForm(), null);
		
		// ** TITLE ** //
		var title = form.insertBefore(this.createTitle(), null);
		
		// ** TEXTAREA ** //
		var note = form.insertBefore(this.createNoteInput(sizeClass), null);
		
		// ** BUTTONS ** //
		var buttons = form.insertBefore(Dom.createEl('div'), null);
		
		// ** SAVE BUTTON ** //
		var save = buttons.insertBefore(this.createSaveButton(), null);
		Events.on(save, 'click', this.handleSave);
		// ** DELETE BUTTON ** //
		var del = buttons.insertBefore(this.createDeleteButton(), null);
		Events.on(del, 'click', this.handleDelete);
		
		return parentDiv;
	}
	
	createContainer(addClasses) {
		var props = {
			className: `${this.options.className}`	
		}
		var el = Dom.createEl('div', props);
		if (addClasses !== '') {
			Dom.addElClass(el, addClasses);
		} 
		
		return el;
	}
	
	createForm() {
		var props = { 
			className: `${this.options.form.className}`
		}
		return Dom.createEl('form', props);
	}
	
	createTitle() {
		var props = {
			className: `${this.options.title.className}`
		}
		var attrs = {
			placeholder: 'Title',
			type: 'text'
		}
		return Dom.createEl('input', props, attrs);
	}
	
	createNoteInput(addClasses) {
		var rows = 3;
		var props = {
			placeholder: 'Note',
			className: `${this.options.textArea.className}`
		}
		
		if (addClasses === 'ntk-lg-dialog') {
			rows = 5;
		}
		var attrs = {
			rows: rows
		}
		return Dom.createEl('textarea', props, attrs);
	}
	
	createSaveButton() {
		var props = {
			className: `${this.options.save.className}`
		}
		var attrs = {
			type: 'button'
		}
		return Dom.createEl('button', props, attrs);
	}
	
	createDeleteButton() {
		var props = {
			className: `${this.options.delete.className}`
		}
		var attrs = {
			type: 'button'
		}
		return Dom.createEl('button', props, attrs);
	}
	
	/*
	 * Handles the saving of the notes
	 * 
	 * @method handleSave
	 */
	handleSave() {
		console.log('saving...');
	}
	
	handleDelete() {
		console.log('deleting...')
	}
	
	calculateSizeClass() {
		// YouTube videos have 1.77 ratio width:height
		// Coursera videos have 1.77 ratio width:height
		var className = 'ntk'
		var height = this.player.videoHeight();
		var width = this.player.videoWidth();
		console.log('' + height + 'px :' + width + 'px');
		if (width >= 850 && height >= 400) {
			className = 'ntk-lg-dialog';
		} else if (width >= 700 && height >= 400) {
			className = 'ntk-md-dialog';
		} else {
			className = '';
		}
		
		return className;
	}
}

MarkDialog.prototype.options_ = config.MarkDialog;
MarkDialog.prototype.controlText_ = 'markDialog';

Component.registerComponent('MarkDialog', MarkDialog);
export default MarkDialog;