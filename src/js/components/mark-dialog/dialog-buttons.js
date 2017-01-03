import mergeOptions from '../utils/merge-options.js';
import {Component} from '../utils/vjs-classes.js';
import * as Dom from '../utils/dom.js';

import Config from '../config.js';

class DialogButtons extends Component {
	constructor(player, options) {
		options = mergeOptions(DialogForm.prototype.options_, options);
		super(player, options);
	}
	
	createEl(tag = 'div', props = {}, attrs = {}) {
		props = assign({
			className: 'ntk-dialog-buttons'
		});
		
		const el = super.createEl(tag, props, attrs);
		
		// We cannot add this to the tech_ object so this will have to do for now..
		return el;
	}
}

DialogButtons.prototype.options_ = Config.DialogButtons;

Component.registerComponent('DialogButtons', DialogButtons);
export default DialogButtons;