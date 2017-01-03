import mergeOptions from '../utils/merge-options.js';
import {Component} from '../utils/vjs-classes.js';
import {assign} from '../utils/obj.js';

import Config from '../config.js';

class DialogTime extends Component {
	constructor(player, options) {
		options = mergeOptions(DialogDelete.prototype.options_, options);
		super(player, options);
	}
	
	createEl(tag = 'div', props = {}, attrs = {}) {
		props = assign({
			className: 'ntk-dialog-time'
		}, props);
		
		return super.createEl(tag, props, attrs);
	}
}

DialogTime.prototype.options_ = Config.DialogTime;

Component.registerComponent('DialogTime', DialogTime);
export default DialogTime;