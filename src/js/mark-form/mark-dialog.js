import * as Dom from '../utils/dom.js';

import mergeOptions from '../utils/merge-options.js';
import * as Events from '../utils/events.js';
import * as Fn from '../utils/fn.js';
import log from '../utils/log.js';
import {Component} from '../utils/vjs-classes.js';

import config from '../config.js';

import Notes from '../notes/notes.js';
import Marks from '../marker/marks.js';


class MarkDialog extends Component {
	constructor(player, options){
		options = mergeOptions(MarkDialog.prototype.options_, options);
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
	createEl() {
		const background = this.createBackground();
		
		// Determine the size and add appropriate class
		const sizeClass = this.calculateSizeClass();
		let parentDiv = this.createContainer(sizeClass);
		
		// ** FORM ** //
		let form = parentDiv.insertBefore(this.createForm(), null);
		
		// ** TITLE ** //
		let title = form.insertBefore(this.createTitle(), null);
		
		// ** TEXTAREA ** //
		let note = form.insertBefore(this.createNoteInput(sizeClass), null);

		// ** BUTTONS ** //
		let buttons = form.insertBefore(Dom.createEl('div'), null);
		
		// ** SAVE BUTTON ** //
		let save = buttons.insertBefore(this.createSaveButton(), null);

		// ** DELETE BUTTON ** //
		let del = buttons.insertBefore(this.createDeleteButton(), null);
		// We cannot add this to the tech_ object so this will have to do for now..
		this.player().tech_.on('click', Fn.bind(this, this.handleTechClick));
		return parentDiv;
	}
	
	/**
	 * Creates the background that sits in front of the video player
	 *
	 * @method createBackground
	 */
	createBackground(){
		let props = {
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
		let props = {
			className: `${this.options_.className.dialog}`	
		}
		let el = Dom.createEl('div', props);
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
		let props = { 
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
		let props = {
			className: `${this.options_.className.title}`
		}
		let attrs = {
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
		let rows = 3;
		let props = {
			placeholder: 'Note',
			className: `${this.options_.className.note}`
		}
		
		if (classes === 'ntk-lg-dialog') {
			rows = 5;
		}
		let attrs = {
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
		let props = {
			className: `${this.options_.className.save}`
		}
		let attrs = {
			type: 'button'
		}
		let el = Dom.createEl('button', props, attrs);
		Events.on(el, 'click', this.handleSave);
		return el;
	}
	
	/**
	 * Creates the delete button for the form
	 *
	 * @method createDeleteButton
	 */
	createDeleteButton() {
		let props = {
			className: `${this.options_.className.delete}`
		}
		let attrs = {
			type: 'button'
		}
		let el = Dom.createEl('button', props, attrs);
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
	calculateSizeClass() {
		// YouTube videos have 1.77 ratio width:height
		// Coursera videos have 1.77 ratio width:height
		let className = 'ntk'
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

MarkDialog.prototype.options_ = config.MarkDialog;
MarkDialog.prototype.controlText_ = 'markDialog';

Component.registerComponent('MarkDialog', MarkDialog);
export default MarkDialog;