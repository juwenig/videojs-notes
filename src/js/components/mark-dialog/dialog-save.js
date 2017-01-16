import mergeOptions from '../utils/merge-options.js';
import {Component, Button} from '../utils/vjs-classes.js';

import Config from '../../config.js';

class DialogSave extends Button {
	constructor(player, options) {
		options = mergeOptions(DialogSave.prototype.options_, options);
		super(player, options);
		
		this.controlText(this.localize('Save'));
	}
	
	buildCSSClass() {
		return 'ntk-dialog-save fa fa-floppy-o';
	}
}

DialogSave.prototype.options_ = Config.DialogSave;

Component.registerComponent('DialogSave', DialogSave);
export default DialogSave;