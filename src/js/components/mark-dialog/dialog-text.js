import mergeOptions from '../utils/merge-options.js';
import {Component} from '../utils/vjs-classes.js';
import {assign} from '../utils/obj.js';

import Config from '../config.js';

class DialogText extends Component {
	constructor(player, options) {
		options = mergeOptions(DialogText.prototype.options_, options);
		super(player, options);
	}
	
	createEl(tag = 'form', props = {}, attrs = {}) {
		let rows;
		let size = this.player().notetaking().getPlayerSize();
		
		switch(size) {
			case 'large': 
				rows = 5;
				break;
			case 'medium':
				rows = 3;
				break;
			default:
				rows = 2;
		}
		
		props = assign({
			className: 'ntk-dialog-text'
		}, props);
		
		attrs = assign({
			placeholder: 'Notes',
			rows: rows
		}, attrs);
		const el = super.createEl(tag, props, attrs);
		
		// We cannot add this to the tech_ object so this will have to do for now..
		return el;
	}
}

DialogText.prototype.options_ = Config.DialogText;

Component.registerComponent('DialogText', DialogText);
export default DialogText;