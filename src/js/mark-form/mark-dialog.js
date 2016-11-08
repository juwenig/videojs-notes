import * as Dom from './utils/dom.js';

import mergeOptions from './utils/merge-options.js';
import log from './utils/log.js';

import {Component} from '../videojs-classes.js';


class MarkDialog extends Component {
	constructor(player, options){
		super(player, options);
		
		this.options = mergeOptions(this.options_, options);
	}
	
	createEl() {
		var props = {
			className: `${this.options.className}`
		}
	
		var parentDiv = Dom.createEl('div', props);
		
		props = {
			className: `${this.options.className}`
		}
		
		var form = parentDiv.insertBefore(Dom.createEl('form', props), null);
		
		
	}
	
	
}
