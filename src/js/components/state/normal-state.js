/**
 * @file board
 */
import * as Dom from '../utils/dom.js';
import mergeOptions from '../utils/merge-options.js';

import Config from '../../config.js';
import Board from '../board.js';
import State from './state.js';
/**
 * Serves as an adapte the marker button triggers to the marker modes
 * 
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Component
 * @class MarkerBoard
 */
class NormalState extends State {
	constructor(context, options){
		options = mergeOptions(NormalState.prototype.options_, options);
		super(context, options);
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

NormalState.prototype.options_ = Config.NormalState;

State.registerState('Normal', NormalState);
export default NormalState;