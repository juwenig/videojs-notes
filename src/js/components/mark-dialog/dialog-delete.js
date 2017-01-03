import mergeOptions from '../utils/merge-options.js';
import {Component} from '../utils/vjs-classes.js';

import Config from '../config.js';

class DialogDelete extends Button {
	constructor(player, options) {
		options = mergeOptions(DialogText.prototype.options_, options);
		super(player, options);
	}
	
	buildCSSClass() {
		
	}
}

DialogText.prototype.options_ = Config.DialogText;

Component.registerComponent('DialogText', DialogText);
export default DialogText;