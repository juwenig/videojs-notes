import mergeOptions from '../utils/merge-options.js';
import {Component} from '../utils/vjs-classes.js';

import Config from '../config.js';

class DialogText extends Component {
	constructor(player, options) {
		options = mergeOptions(DialogText.prototype.options_, options);
		super(player, options);
	}
	
	createEl(tag = 'form', props = {}, attrs = {}) {
		let rows;
		
		
		
		props = assign({
			className: 'ntk-dialog-text'
		});
		
		attrs = assign({
			placeholder: 'Notes',
			rows: rows
		})
		const el = super.createEl(tag, props, attrs);
		
		// We cannot add this to the tech_ object so this will have to do for now..
		return el;
	}
}

DialogText.prototype.options_ = Config.DialogText;

Component.registerComponent('DialogText', DialogText);
export default DialogText;