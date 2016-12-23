/**
 * @file board
 */

import * as Dom from '../utils/dom.js';

import mergeOptions from '../utils/merge-options.js';
import log from '../utils/log.js';
import {Component} from '../utils/vjs-classes.js';
import toTitleCase from '../utils/to-title-case.js';

import config from '../config.js';
import Board from './board.js';

/**
 * Used to interface between the 
 */
class State {
	constructor() {
		if (!State.states) {
			State.states = {};
		}
		
		let name = toTitleCase(this.name());
		
		State.states[name] = this;
	}
	
	/**
	 * To be implemented by subclass
	 *
	 * @method handleClick
	 */
	handleClick(event) {}
	
	/**
	 * To be implemented by subclass
	 *
	 * @method handleMouseDown
	 */
	handleMouseDown(event) {}
	
	/**
	 * To be implemented by subclass
	 *
	 * @method handleMouseMove
	 */
	handleMouseMove(event) {}
	
	/**
	 * To be implemented by subclass
	 *
	 * @method handleUp
	 */
	handleMouseUp(event) {}
}

