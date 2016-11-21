import * as Dom from '../utils/dom.js';

import mergeOptions from '../utils/merge-options.js';
import * as Events from '../utils/events.js';
import log from '../utils/log.js';

import {Component} from '../videojs-classes.js';
import config from '../config.js';
import Notes from '../notes/notes.js';
import Mark from '../marker/mark.js';


class MarkDialog extends Component {
	constructor(player, options){
		options = mergeOptions(MarkDialog.prototype.options_, options);
		super(player, options);
		
		this.mark = options.mark;
		this.options = options;
	}
	
// SECTION : CREATE DIALOG
	
	/**
	 * Changed name from createEl because Component calls createDialog and 
	 * that is unintended
	 *
	 * @method createEl
	 */
	createEl() {
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

		// ** DELETE BUTTON ** //
		var del = buttons.insertBefore(this.createDeleteButton(), null);
		
		Events.on(this.player().el(), 'click', this.handleEscape);
		return parentDiv;
	}
	
	/**
	 * Creates the container element for the mark
	 *
	 * @param classes The additional class names to add
	 * @method createContainer
	 */
	createContainer(classes) {
		var props = {
			className: `${this.options_.className}`	
		}
		var el = Dom.createEl('div', props);
		if (classes !== '') {
			Dom.addElClass(el, classes);
		} 
		// Need to stop events from propogating on clicks on container
		let disablePropagation = function(event) {
			event.preventDefault();
			event.stopImmediatePropagation();
		}
		Events.on(el, 'click', disablePropagation);
		return el;
	}
	
	/**
	 * Creates the form element to nest under the container
	 * 
	 * @method createForm
	 */
	createForm() {
		var props = { 
			className: `${this.options_.form.className}`
		}
		return Dom.createEl('form', props);
	}
	
	/**
	 * Creates the title input to nest under the form
	 *
	 * @method createTitle
	 */
	createTitle() {
		var props = {
			className: `${this.options_.title.className}`
		}
		var attrs = {
			placeholder: 'Title',
			type: 'text'
		}
		return Dom.createEl('input', props, attrs);
	}
	
	/**
	 * Creates the note text area for the form
	 *
	 * @param classes The additional class names to add
	 * @method createNoteInput
	 */
	createNoteInput(classes) {
		var rows = 3;
		var props = {
			placeholder: 'Note',
			className: `${this.options_.textArea.className}`
		}
		
		if (classes === 'ntk-lg-dialog') {
			rows = 5;
		}
		var attrs = {
			rows: rows
		}
		return Dom.createEl('textarea', props, attrs);
	}
	
	/**
	 * Creates the save button for the form
	 *
	 * @method createSaveButton
	 */
	createSaveButton() {
		var props = {
			className: `${this.options_.save.className}`
		}
		var attrs = {
			type: 'button'
		}
		var el = Dom.createEl('button', props, attrs);
		Events.on(el, 'click', this.handleSave);
		return el;
	}
	
	/**
	 * Creates the delete button for the form
	 *
	 * @method createDeleteButton
	 */
	createDeleteButton() {
		var props = {
			className: `${this.options_.delete.className}`
		}
		var attrs = {
			type: 'button'
		}
		var el = Dom.createEl('button', props, attrs);
		Events.on(el, 'click', this.handleDelete);
		return el;
	}
	
// END SECTION : CREATE DIALOG
	
// SECTION : EVENT HANDLERS
	/*
	 * Handles the saving of the notes
	 * 
	 * @method handleSave
	 */
	handleSave(event) {
		console.log('saving...');
		event.preventDefault();
		event.stopImmediatePropagation();
	}
	
	handleDelete(event) {
		console.log('deleting...');
		event.preventDefault();
		event.stopImmediatePropagation();
	}
	
	handleEscape(event) {
		console.log('Escaped dialog...');
		
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
	calculateSizeClass() {
		// YouTube videos have 1.77 ratio width:height
		// Coursera videos have 1.77 ratio width:height
		var className = 'ntk'
		var height = this.player().videoHeight();
		var width = this.player().videoWidth();
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

MarkDialog.prototype.options_ = config.MarkDialog;
MarkDialog.prototype.controlText_ = 'markDialog';

Component.registerComponent('MarkDialog', MarkDialog);
export default MarkDialog;