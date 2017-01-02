/**
 * @file normal-state.js
 */
import * as Dom from '../utils/dom.js';
import mergeOptions from '../utils/merge-options.js';

import Config from '../../config.js';

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
	

}

NormalState.prototype.options_ = Config.NormalState;

State.registerState('Normal', NormalState);
export default NormalState;