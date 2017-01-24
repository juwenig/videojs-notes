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
		
		this.handleTechClick = Fn.bind(this, this.handleTechClick);
		
		this.anchor_ = 0;
		this.mark_ = null;
		this.currentDialog_ = null;
	}
	
	/**
	 * Binds the events to the context 
	 * 		called on state changes
	 * 
	 * @method bindEvents
	 */
	bindState() {
		this.context_.addClass('ntk-create-state');

		const context = this.context_;
		const target = context.contentEl();
		
		// bind events to the ntk board el
		context.on(target, 'click', Fn.bind(this, this.handleClick));
		context.on(target, 'mousedown', Fn.bind(this, this.handleMouseDown));
    context.on(target, 'touchstart', Fn.bind(this, this.handleMouseDown));
	}
	
	/**
	 * Disposes of state properties
	 *
	 * @method dispose
	 */
	disposeState() {
		const context = this.context_;
		const target = context.contentEl();
		
		// remove any active mark
		if (this.currentMark_) {
			this.mark_.trigger('dispose');
		}
		
		// allow garbage collector to collect these items
		this.mark_ = null;
		this.anchor_ = null;
		
		// dispose attached events to board
		context.off(target, 'click', Fn.bind(this, this.handleClick));
		context.off(target, 'mousedown', Fn.bind(this, this.handleMouseDown));
    context.off(target, 'touchstart', Fn.bind(this, this.handleMouseDown));
		
		if (this.currentDialog_) {
			// dispose should be on dialog class def
			context.player().tech_.off('click', this.handleTechClick);
		}
		
		this.context_.removeClass('ntk-create-state');
	}
	
	/**
	 * Creates a new mark on the board
	 *
	 * @param {Object} pos The position indicating start and end values
	 * @method createMark
	 */
	createMark(start, end) {
		const context = this.context_; 
		
		// we assume user starts from left and moves right
		let options = {
			position: {
				left: start, 
				right: end || 1
			},
			vertical: context.vertical()
		};
		
		// creates mark-item and adds to mark-collection
		let mark = context.addMark(options);
		
		mark.addClass('ntk-mark-selected');
		
		if (this.currentMark_) {
			this.currentMark_.dispose();
			context.removeMark(this.currentMark_.id());
		}
		
		this.currentMark_ = mark;
		this.anchor_ = start;
	}
	
	/**
	 * Creates a new dialog on the board
	 * 
	 * @method createDialog
	 */
	createDialog() {
		const mark = this.currentMark_;
		const context = this.context_;
		
		let player = context.player();
		
		// add mark id to associate dialog with mark
		const dialog = new Dialog(player, {mark: mark});
		player.addChild(dialog);
		dialog.position();
		
		context.on('dispose', Fn.bind(dialog, dialog.dispose()));
		
		// the current dialog is kept until user
		// saves dialog or clicks away to exit
		this.currentDialog_ = dialog;
		
		const techClick = Fn.bind(this, this.handleTechClick);
		context.player().tech_.on('click', techClick);
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
		
    event.preventDefault();
		
		// get the distance of where the anchor should be
		this.anchor_ = context.calculateDistance(event);
		this.mark_ = context.addMark();
		this.mark_.addClass('ntk-mark-selected');
		
		super.handleMouseDown(event);
  }
  
  /**
   * Draws the highlighted segment by calling Marks API
   *
   * @param {Event} event
   * @method handleMouseMove
   */
  handleMouseMove(event){				
		// gets the first time point user selected with mousedown event
		const anchor = this.anchor_;
		// calculates the position of mouse in percent of scroll bar
		let progress = this.context_.calculateDistance(event);
		
		// updates the left or right depending on which direction
		// the user is updating the mark item
		if (progress < anchor) {
			this.mark_.setElPosition({
				left: progress,
				right: anchor
			});
		} else if (progress >= anchor) {
			this.mark_.setElPosition({
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
		
		// create dialog on finish
		context.openMark(this.mark_.id());
		super.handleMouseUp(event);
	}
	
	/**
	 * Handles clicks on the tech
	 *
	 * @method handleTechClick
	 */
	handleTechClick(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		
		this.currentMark_.trigger('dispose');
		this.currentDialog_.trigger('dispose');
		
		// always dereference these properties
		this.currentMark_ = null;
		this.currentDialog_ = null;
		this.anchor_ = null;
	}
	
	/**
	 * Handles dialog form submit
	 *
	 * @method handleDialogFormSubmit
	 */
	handleDialogFormSubmit(event) {
		event.preventDefault();
		
		const mark = this.currentMark_;
		const id = mark.id();
		
		let edges = mark.getPosition();
		
		for (edge in edges) {
			edges[edge] = Math.floor(edges * 100);
		}
		
		const styleRef = mark.el_.style;
		
		Logic.add({
			id: id,
			edges: edges,
			style: styleRef
		});
		
		this.currentMark_ = null;
		this.currentDialog_ = null;
		this.anchor_ = null;
	}
	
	
	
}

CreateState.prototype.options_ = Config.CreateState;

State.registerState('Create', CreateState);
export default CreateState;