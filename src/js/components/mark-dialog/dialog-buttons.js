import mergeOptions from '../utils/merge-options.js';
import {Component} from '../utils/vjs-classes.js';

import Config from '../config.js';

class DialogForm extends Component {
	constructor(player, options) {
		options = mergeOptions(DialogForm.prototype.options_, options);
		super(player, options);
	}
	
	createEl(tag = 'form', props = {}, attrs = {}) {
		props = assign({
			className: 'ntk-dialog-form'
		});
		
		const el = super.createEl(tag, props, attrs);
		
		// We cannot add this to the tech_ object so this will have to do for now..
		return el;
	}
}

DialogForm.prototype.options_ = Config.DialogForm;

Component.registerComponent('DialogForm', DialogForm);
export default DialogForm;