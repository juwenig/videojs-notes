/**
 * @file board.js
 */

import * as Dom from './utils/dom.js';
import mergeOptions from './utils/merge-options.js';
import log from './utils/log.js';
import {Component} from './utils/vjs-classes.js';
import 

import config from './config.js';

import State from './state/state.js';

let boardExtension = function(A) {
	if (Component.isPrototypeOf(A)) {
		console.log('Component identified');
	} else {
		return false;
	}
	

/**
 * Overalys element over the player seek bar in order to inhibit triggering of seek bar events
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Component
 * @Board
 */

return class Board extends A {
  constructor(player, options) {
    options.reportTouchActivity = false;
    options = mergeOptions(Board.prototype.options_, options);
    super(player, options);
    
		this.states = {};
		
		for (state in State.states) {
			this.addState(state);
		}
		
		let firstState = Object.keys(this.states)[0];
		this.currentState_ = this.setDefaultState(firstState);;
  }
  
	
	/**
	 * Sets the default state
	 * 
	 * @param {String=} name Name of state
	 * @method setDefaultState
	 */
	setDefaultState(name) {
		if (!this.states) {
			return;
		}
		
		return this.states[name];
	}
	
	/**
	 * Add state to the Board
	 * 
	 * @param {Class} state The class for the state
	 * @method addState
	 */
	addState(state, options) {
		if (!State.isPrototypeOf(state)) {
			log.error("State should contain a name property.");
		}
		
		if (!options) {
			options = {};
		}
		
		let state = new state(this, options);
		let name = state.name();
		this.states[name] = state;
	}
  
	/**
	 * Binds the Board events to state's event handlers
	 *
	 * @
	 */
	bindEventsToState() {
		Dom.unblockTextSelection();

		let state = this.currentState_;
		this.on('click', state.handleClick);
		this.on('mousedown', state.handleMouseDown);
    this.on('touchstart', state.handleMouseDown);
	}
	
	/**
	 * Goes to the next state
	 *
	 * @method goToNextState
	 */
	goToNextState() {
		let current = this.currentState_;
		let next = Order[current];
		
		this.currentState_ = this.states[next];
		return this.currentState_;
	}
	
	/**
	 * Sets the state transition order
	 * 
	 * @method setStateOrder
	 */
	setStateOrder(order) {
		if (!this.stateOrder_) {
			this.stateOrder_[order] = {};
		}  
		
		let orderNum = 0;
		for (state in order) {
			if (!this.states[state])
			this.stateOrder_[state] = orderNum;
			orderNum++;
		}
	}

	/**
	 * Creates a Board element
	 *
	 * @return {Element}
	 * @method createEl
	 */
  createEl() {
    return Dom.createEl('div', {
      className: this.options_.className
    });
  }
}

Board.prototype.options_ = config.Board;

Component.registerComponent('Board', Board);

} // end of boardExtension definition
export default boardExtension;