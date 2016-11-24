import * as Dom from '../utils/dom.js';

import mergeOptions from '../utils/merge-options.js';
import * as Events from '../utils/events.js';
import * as Fn from '../utils/fn.js';
import log from '../utils/log.js';

import {Component} from '../videojs-classes.js';
import config from '../config.js';

import Notes from '../notes/notes.js';
import Marks from '../marker/marks.js';


class MarkDialog extends Component {
	constructor(player, options){
		options = mergeOptions(MarkDialog.prototype.options_, options);
		super(player, options);
		
		if (!!this.player_.el().ntk) {
			this.player_.el().ntk.markDialog = this.el();
		} else {
			this.player_.el().ntk = {markDialog: this.el()};
		}
	}
	
// SECTION : CREATE DIALOG
	
	/**
	 * Changed name from createEl because Component calls createDialog and 
	 * that is unintended
	 *
	 * @method createEl
	 */
	createEl() {
		var background = this.createBackground();
		
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
		Events.on(this.player().el(), 'click', Fn.bind(this,this.handlePlayerClick));
		
		return parentDiv;
	}
	
	/**
	 * Creates the background that sits in front of the video player
	 *
	 * @method createBackground
	 */
	createBackground(){
		var props = {
			className: `${this.options_.className.background}`
		}
		return Dom.createEl('div', props);
	}
	
	/**
	 * Creates the container element for the mark
	 *
	 * @param classes The additional class names to add
	 * @method createContainer
	 */
	createContainer(classes) {
		var props = {
			className: `${this.options_.className.dialog}`	
		}
		var el = Dom.createEl('div', props);
		if (classes !== '') {
			Dom.addElClass(el, classes);
		} 
		
		Events.on(el, 'click', this.handleContainerClick);
		return el;
	}
	
	/**
	 * Creates the form element to nest under the container
	 * 
	 * @method createForm
	 */
	createForm() {
		var props = { 
			className: `${this.options_.className.form}`
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
			className: `${this.options_.className.title}`
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
			className: `${this.options_.className.note}`
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
			className: `${this.options_.className.save}`
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
			className: `${this.options_.className.delete}`
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
	 * @param event Event object
	 * @method handleSave
	 */
	handleSave(event) {
		console.log('saving...');
		event.preventDefault();
		event.stopImmediatePropagation();
	}
	
	/**
	 * Handles the deletion of notes
	 *
	 * @param event Event object
	 * @method handleDelete
	 */
	handleDelete(event) {
		console.log('deleting...');
		
		event.preventDefault();
		event.stopImmediatePropagation();
	}
	
	/**
	 * Handles clicking on the player object to exit dialog
	 *
	 * @param event Event object
	 * @method handlePlayerClick
	 */
	handlePlayerClick(event) {
		Events.off(this.player().el(), 'click', this.handlePlayerClick);
		var mark = this.player_.el().ntk.activeMark;
		var parent = mark.parentElement;
		
		if (mark !== '') {
			parent.removeChild(mark);
		}
		
		event.preventDefault();
		event.stopImmediatePropagation();
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