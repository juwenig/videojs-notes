/**
 * @file board
 */
import * as Dom from '../utils/dom.js';

import mergeOptions from '../utils/merge-options.js';
import log from '../utils/log.js';
import {Component} from '../utils/vjs-classes.js';

import config from '../config.js';

import MarkerButton from '../marker-button.js';
import Marks from '../marker/marks.js';
import MarkCreate from './mark-create.js';

/**
 * Serves as an adapte the marker button triggers to the marker modes
 * 
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Component
 * @class MarkerBoard
 */
class NormalState extends State {
	constructor(player, options){
		options = mergeOptions(MarkBoard.prototype.options_, options);
		super(player, options);
		
		/*Initialize default mode*/
		this.mode = null;
		this.create = new MarkCreate();
		this.select = new MarkSelect();
		
		/*Attach event listener marker-button*/
		
	}
	
	/**
	 * Handles create mode from marker-button
	 *
	 * @param {Event=} event
	 * @method handleCreateMode
	 */
	handleCreateMode(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
	}
	
	/**
	 * Handles select mode from marker-button
	 *
	 * @param {Event=} event
	 * @method handleSelectMode
	 */
	handleSelectMode(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
	}
}

MarkBoard.prototype.options_ = config.MarkBoard;

Component.registerComponent('MarkBoard', MarkBoard);