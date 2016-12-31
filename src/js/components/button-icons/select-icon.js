/**
 * @file select-icon.js
 */

import * as Dom from '../utils/dom.js';
import mergeOptions from '../utils/merge-options.js';

import Config from '../../config.js';
import Icon from './icon.js';

class SelectIcon extends Icon { 
	constructor(options) {
		super(options);
	}
	
	/**
   * Create the Icon's DOM element
   *
   * @param {string} Element's node type
   * @param {Object} props Element properties
   * @param {Object} attrs Element attributes
   * @return {Element} The element that gets created
	 * @method createEl
   */
	createEl(type, props, attrs){
		super.createEl(
			'i',
			{
				className: 'ntk-marker-mode-icon fa fa-stack-2x fa-hand-pointer-o',
			},
			attrs
		)
	}
}

SelectIcon.prototype.options_ = Config.SelectIcon;

Icon.registerIcon('Select', SelectIcon);
export default SelectIcon;