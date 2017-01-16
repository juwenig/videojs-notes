/**
 * @file create-state.js
 */

import * as Dom from '../utils/dom.js';
import * as Fn from '../utils/fn.js';
import mergeOptions from '../utils/merge-options.js';

import * as Logic from '../../logic/occlusion.js'

import Config from '../../config.js';
import State from './state.js';
import Dialog from '../mark-dialog/dialog.js';

/**
 * Handles events for creating marks
 * 
 * @param {Player|Object} player
 * @param {Object=} options
 * @class CreateState
 */
class CreateState extends State {
	constructor(context, options) {
		options = mergeOptions(CreateState.prototype.options_, options);
		super(context, options);
	}
	
	/**
	 * Initialization of state
	 * 
	 * @method initialize
	 */
	initialize() {
		const marks = this.context_.getAllMarks();
		// set board zindex
		this.style_.zIndex = 100;
		
		// reset all zindexes behind the board
		for (let item in marks) {
			if (marks[item]) {
				marks[item].el().style.zIndex = -10;
			}
		}
	}
	
	/**
	 * Binds the events to the context - called on state changes
	 * 
	 * @method bindEvents
	 */
	bindEvents() {
		const context = this.context_;
		const target = context.contentEl();
		
		// bind events to the ntk board el
		context.on(target, 'click', Fn.bind(this, this.handleClick));
		context.on(target, 'mousedown', Fn.bind(this, this.handleMouseDown));
    context.on(target, 'touchstart', Fn.bind(this, this.handleMouseDown));
	}
	
	/**
	 * Disposes of class properties
	 *
	 * @method dispose
	 */
	dispose() {
		const context = this.context_;
		const target = context.contentEl();
		
		// remove any active mark
		if (this.currentMark_) {
			context.removeMark(this.currentMark_.id());
		}
		
		// remove any dialog from player
		if (this.currentDialog_) {
			context.player().removeChild(this.currentDialog_);
		}
		
		// allow garbage collector to collect these items
		this.currentMark_ = null;
		this.currentDialog_ = null;
		this.anchor_ = null;
		
		// dispose attached events to board
		context.off(target, 'click', Fn.bind(this, this.handleClick));
		context.off(target, 'mousedown', Fn.bind(this, this.handleMouseDown));
    context.off(target, 'touchstart', Fn.bind(this, this.handleMouseDown));
	}
	
	/**
	 * Creates a new mark on the board
	 *
	 * @param {Object} pos The position indicating start and end values
	 * @method createMark
	 */
	createMark(start) {
		const context = this.context_; 
		
		// we assume user starts from left and moves right
		let options = {
			position: {
				left: start, 
				right: 1
			},
			vertical: context.vertical()
		};
		
		// creates mark-item and adds to mark-collection
		let mark = context.addMark(options);
		
		mark.addClass('ntk-mark-selected');
		// must set active mark for referencing later
		if (this.currentMark_) {
			context.removeMark(this.currentMark_.id());
		}
		
		this.currentMark_ = mark;
		this.anchor_ = start;
		
		if (this.currentDialog_) {
			context.player().removeChild(this.currentDialog_);
		}
	}
	
	/**
	 * Creates a new dialog on the board
	 * 
	 * @method createDialog
	 */
	createDialog() {
		const mark = this.currentMark_;
		const context = this.context_;
		
		// brings the active mark behind the board in order to allow
		// more items to be created
		mark.el().style.zIndex = -10;
		
		let player = context.player();
		
		// add mark id to associate dialog with mark
		const dialog = new Dialog(player, {mark: mark});
		player.addChild(dialog);
		dialog.position();
		
		// the current dialog is kept until user
		// saves dialog or clicks away to exit
		this.currentDialog_ = dialog;
	}
	
  /**
	 * Stops propogation of marks element click event to parent elements
	 *
	 * @param {Event} event
	 * @method handleClick
	 */
	handleClick(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
	}
	
	/**
   * Initiates creation of a new mark item
   * 
   * @param {Event} event
   * @method handleMouseDown
   */
  handleMouseDown(event) {	
		const context = this.context_;
		const doc = context.el().ownerDocument;
		
    event.preventDefault();
    Dom.blockTextSelection();
		
		// enable other mouse events to implement
		// user sequence of input
		context.on(doc, 'mousemove', Fn.bind(this, this.handleMouseMove));
    context.on(doc, 'mouseup', Fn.bind(this, this.handleMouseUp));
    context.on(doc, 'touchend', Fn.bind(this, this.handleMouseUp));
		
		// get the distance of where the anchor should be
		// and create mark
		let start = context.calculateDistance(event);
		this.createMark(start);		
		
		// used to capture other pos of mark
		this.handleMouseMove(event);
  }
  
  /**
   * Draws the highlighted segment by calling Marks API
   *
   * @param {Event} event
   * @method handleMouseMove
   */
  handleMouseMove(event){
    const context = this.context_;
		
		// gets current mark that was created
		const mark = this.currentMark_;
		
		// gets the first time point user selected with mousedown event
		const anchor = this.anchor_;
		
		// calculates the position of mouse in percent of scroll bar
		let progress = context.calculateDistance(event);
		
		// updates the left or right depending on which direction
		// the user is updating the mark item
		if (progress < anchor) {
			mark.setElPosition({
				left: progress,
				right: anchor
			});
		} else if (progress >= anchor) {
			mark.setElPosition({
				left: anchor,
				right: progress
			});
		}
  }
  
  /**
   * Triggers the mark end event for the active mark
   *
   * @param {Object} event Event object
   * @method handleMouseUp
   */
  handleMouseUp(event) {
    const context = this.context_;
		const doc = context.el().ownerDocument;
		
    Dom.unblockTextSelection();
    
    context.off(doc, 'mousemove', Fn.bind(this, this.handleMouseMove));
    context.off(doc, 'mouseup', Fn.bind(this, this.handleMouseUp));
    context.off(doc, 'touchend', Fn.bind(this, this.handleMouseUp));
    
		// create dialog on finish
		this.createDialog();
	}
	
	
}

CreateState.prototype.options_ = Config.CreateState;

State.registerState('Create', CreateState);
export default CreateState;