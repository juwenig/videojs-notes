/**
 * @file board.js
 */

import * as Dom from './utils/dom.js';
import mergeOptions from './utils/merge-options.js';
import Log from './utils/log.js';
import {Component} from './utils/vjs-classes.js';

import config from './config.js';

import State from './state/state.js';

let boardExtension = function(A) {
	if (Component.isPrototypeOf(A)) {
		console.log('Component identified');
	} else {
		return Log.error('Board needs to be a subclass of Component');
	}
	

/**
 * Overalys element over the player seek bar in order to prevent triggering of seek bar events
 * Adds state dependent behavior for selecting and creating notes on the seekbar
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Component
 * @Board
 */

class Board extends A {
  constructor(player, options) {
    options.reportTouchActivity = false;
    options = mergeOptions(Board.prototype.options_, options);
    super(player, options);
    
		// state name to state instance dict
		this.states_ = {};
		
		// holds current state
		this.currentState_ = null;
		
		// keeps the order of the states if sequential
		this.nextState_ = {};
		
		// adds states from the State array and initializes order
		let initialOrder = [];
		for (state in State.getStates()) {			
			this.addState(State.getState(state));
			initialOrder.push(state);
		}
		
		this.setStateOrder(initialOrder);
		let firstState = Object.keys(this.states_)[0];
		this.setDefaultState(firstState);
		
		this.bindEvents();
  }
 
	/**
	 * Sets the default state and swaps 
	 * 
	 * @param {String=} name Name of state
	 * @method setDefaultState
	 */
	setDefaultState(name) {
		if (!this.states_) {
			return;
		}
		
		this.currentState_ = this.states_[name];
		
		return this.states_[name];
	}
	
	/**
	 * Add state to the Board
	 * 
	 * @param {Class} state The class for the state
	 * @method addState
	 */
	addState(StateClass, options) {
		if (!State.isPrototypeOf(StateClass)) {
			Log.error("State should contain a name property.");
		}
		
		if (!options) {
			options = {};
		}
		
		let state = new StateClass(this, options);
		let name = state.name();
		this.states_[name] = state;
	}
  
	/**
	 * Binds the Board events to state's event handlers
	 *
	 * @method bindEventsToState
	 */
	bindEvents() {
		Dom.unblockTextSelection();

		let state = this.currentState_;
		this.on('click', state.handleClick);
		this.on('mousedown', state.handleMouseDown);
    this.on('touchstart', state.handleMouseDown);
		
		this.triggerReady();
	}
	
	/**
	 * Converts an array describing state order to the private order data structure
	 * 
	 * @param {Array} order Ordered array
	 * @method setStateOrder
	 */
	setStateOrder(order) {
		if (!this.nextState_) {
			this.nextState_ = {};
		}  
		
		let orderLen = order.length;
		for (let i = 0; i < orderLen; i++) {
			let state = order[i]
			let next = order[(i+1) % orderLen];
			
			if (!this.states_[state]){
				Log.error("The following state is not registered with the States class: ", state);
			}
			
			this.nextState_[state] = next;
		}
	}
	
	/**
	 * Goes to the next state
	 *
	 * @method goToNextState
	 */
	goToNextState() {
		let current = this.currentState_;
		let next = this.nextState_[current];
		
		this.currentState_ = this.states_[next];
		
		this.bindEvents();
		return this.currentState_;
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
	
return Board;
} // end of boardExtension definition

export default boardExtension;