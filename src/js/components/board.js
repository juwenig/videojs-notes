/**
 * @file board.js
 */

import * as Dom from './utils/dom.js';

import mergeOptions from './utils/merge-options.js';
import log from './utils/log.js';
import {Component} from './utils/vjs-classes.js';

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
			
		}
		
		this.currentState = this.setDefaultState(Object.keys()[0]);
		
  }
  
	
	/**
	 * Sets the default state - single use
	 * 
	 * @param {String=} name Name of state
	 * @method setDefaultState
	 */
	setDefaultState(name) {
		if (this.state !== null) {
			return;
		}
		
		this.currentState = this.states[name];
	}
	
	/**
	 * Add state to the Board
	 * 
	 * @param {Class} state The class for the state
	 * @method addState
	 */
	addState(state) {
		if (!State.isPrototypeOf(state)) {
			log.error("State should contain a name property.");
		}
		
		let state = new state(this);
		let name = state.name();
		this.states[name] = state;
	}
  
	/**
	 * Goes to the next state
	 *
	 * @method nextState
	 */
	nextState() {
		if (this.state)
			this.state.nextState();
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