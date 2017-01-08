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
		this.style_.zIndex = 100;
		
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
		
		context.on(target, 'click', Fn.bind(this, this.handleClick));
		context.on(target, 'mousedown', Fn.bind(this, this.handleMouseDown));
    context.on(target, 'touchstart', Fn.bind(this, this.handleMouseDown));
	}
	
  /**
	 * Stops propogation of marks element click event to parent elements
	 *
	 * @param {Event} event
	 * @method handleClick
	 */
	handleClick(event) {
		const context = this.context_;
		// close out of any opened dialog
		// TODO
		// delete currently active mark
		// TODO
		
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

		context.on(doc, 'mousemove', Fn.bind(this, this.handleMouseMove));
    context.on(doc, 'mouseup', Fn.bind(this, this.handleMouseUp));
    context.on(doc, 'touchend', Fn.bind(this, this.handleMouseUp));
		
		let start = context.calculateDistance(event);
		
		// we assume user starts from left and moves right
		let options = {
			position: {
				left: start, 
				right: 1
			},
			anchor: start,
			vertical: context.vertical()
		};
		
		// creates mark-item and adds to mark-collection
		let mark = context.addMark(options);
		
		mark.addClass('ntk-mark-selected');
		// must set active mark for referencing later
		context.setActiveMark(mark.id());
		
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
		const mark = context.getActiveMark();
		
		// gets the first time point user selected with mousedown event
		const anchor =  mark.getAnchor();
		
		// calculates the position of mouse in percent of scroll bar
		let progress = context.calculateDistance(event);
		
		// updates the left or right depending on which direction
		// the user is updating the mark item
		if (progress < anchor) {
			mark.setPosition({
				left: progress,
				right: 1 - anchor
			});
		} else if (progress >= anchor) {
			mark.setPosition({
				left: anchor,
				right: 1 - progress
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
    
		const mark = context.getActiveMark();
		// brings the active mark behind the board in order to allow
		// more items to be created
		mark.el().style.zIndex = -10;
		
		// add mark id to associate dialog with mark
		const dialog = new Dialog(context.player(), {mark: mark.id()});
		context.player().addChild(dialog);
	}
}

CreateState.prototype.options_ = Config.CreateState;

State.registerState('Create', CreateState);
export default CreateState;