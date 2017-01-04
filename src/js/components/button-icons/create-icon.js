/**
 * @file create-icon.js
 */

import * as Dom from '../utils/dom.js';
import mergeOptions from '../utils/merge-options.js';

import Config from '../../config.js';
import Icon from './icon.js';

class CreateIcon extends Icon { 
	constructor(options) {
		options = mergeOptions(CreateIcon.prototype.options_, options);
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
	createEl(tag = 'i', props = {}, attrs = {}){
		super.createEl(
			tag,
			{
				className: 'ntk-marker-mode-icon fa fa-stack-2x fa-pencil',
			},
			attrs
		)
	}
}

CreateIcon.prototype.options_ = Config.CreateIcon;

Icon.registerIcon('Create', CreateIcon);
export default CreateIcon;