/**
 * @file create-state.js
 */

import * as Dom from '../utils/dom.js';
import * as Fn from '../utils/fn.js';
import mergeOptions from '../utils/merge-options.js';

import * as Logic from '../../logic/occlusion.js'

import Config from '../../config.js';
import State from './state.js';
im

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
	
	initialize() {
		this.style_.zIndex = 100;
	}
	
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
		options = {
			position: {
				left: start, 
				right: 1
			},
			anchor: start,
			vertical: this.vertical()
		};
		// creates mark-item and adds to mark-collection
		context.addMark(options);
		
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
		const mark = context.getCurrentMark();
		const anchor = mark.getAnchor();
		
		let progressLeft = context.calculateDistance(event);
		let progressRight = 1 - progressLeft;
		
		if (progress < anchor) {
			mark.setPosition({
				left: progressLeft,
				right: start
			});
		} else if (pregress >= start) {
			mark.setPosition({
				left: start,
				right: progressRight
			})
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
    
    let endPoint = context.calculateDistance(event);
  }
}

CreateState.prototype.options_ = Config.CreateState;

State.registerState('Create', CreateState);
export default CreateState;