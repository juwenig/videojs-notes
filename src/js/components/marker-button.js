/**
 * @file marker.js
 */

import * as Dom from './utils/dom.js';
import * as Fn from './utils/fn.js';
import mergeOptions from './utils/merge-options.js';
import {Button, Component} from './utils/vjs-classes.js';

import Config from '../config.js';

import Icon from './button-icons/icon.js';

class MarkerButton extends Button {
  constructor(player, options) {
		options = mergeOptions(MarkerButton.prototype.options_, options);
    super(player, options);
    
		// store instances of icons
		this.icons_ = {};
		
		this.currentIcon_ = null;
		
		this.nextIcon_ = {};
		
		// the element that changes state
		this.target_ = this.getElement('Board');
		
		let initialOrder = [];
		
		for (icon in Icon.getIcons()) {
			this.addIcon(icon, Icon.getIcon(icon));
			initialOrder.push(icon);
		}
		
		this.setIconOrder(initialOrder);
		let firstIcon = Object.keys(this.icons_)[0];
		this.setDefaultIcon(firstIcon);
		
    // change on click handler
    this.controlText(this.status.replace(/([A-Z])/g, ' $1'));
  }
  
  /**
   * Creates a wrapper element for changing icons
   * 
   * @method createChild
   */
  createEl() {
		// Button creates the container el with classnames taken from buildCSSClass
    const el = super.createEl();
    
		// Container Span
    let tag = 'span';
    let props = {
      className: `${className.parent}`
    };
    const topEl = el.insertBefore(Dom.createEl(tag, props), null);
    
		// Icon 1
    props = {
      className: `${className.icons['Base']} ${className.icons['ScrollBar']}`
    };
    const iconTop = topEl.insertBefore(Dom.createEl('i', props), null);
    
		// Icon 2 used for 
    props = {
      className: `${className.modeIcon}  ${className.icons['Base']} ${className.icons[statuses[0]]}`
    };
    const iconBottom = topEl.insertBefore(Dom.createEl('i', props), iconTop);
    
    this.modeIcon = iconBottom;
    
    return el;
  }

  /**
   * Updates ARIA accessibility attributes
   *
   * @method updateARIAAttributes
   */
  updateARIAAttributes() {
    // Current playback rate
    this.el().setAttribute('aria-valuenow', this.player().playbackRate());
  }
	
	/**
	 * Adds an icon for a state
	 *
	 * @param {Object=} options The options for DOM node
	 * @method addIcon
	 */
	addIcon(name, IconClass, options) {
		// Creates new icon and add element as child element to this
		if (!Icon.isPrototypeOf(IconClass)) {
			return;
		}
		
		if (!options) {
			options = {};
		}
				
		let icon = new IconClass(options);
		
		this.icons_[name] = icon;
	}
	
	/**
	 * Converts an array describing state order to the private order data structure
	 * 
	 * @param {Array} order Ordered array
	 * @method setIconOrder
	 */
	setIconOrder(order) {
		if (!this.nextIcon_) {
			this.nextIcon_ = {};
		}  
		
		let orderLen = order.length;
		for (let i = 0; i < orderLen; i++) {
			let icon = order[i]
			let next = order[(i+1) % orderLen];
			
			if (!this.icons_[icon]){
				Log.error("The following state is not registered with the States class: ", icon);
			}
			
			this.nextIcon_[icon] = next;
		}
		
		this.syncStateOrder(order);
	}
	
	/**
	 * Sets the state order from current icon order
	 * 
	 * @param {Array} order Ordered array
	 * @method setStateOrder
	 */
	syncStateOrder(order) {
		if (!this.target_) {
			return;
		}
		
		let stateOrder = [];
		let orderLen = order.length;
		for (let i = 0; i < orderLen; i++) {
			let icon = order[i];
			let state = this.icons_[icon].state();
			stateOrder.push(state);
		}
		
		this.target_.setStateOrder(stateOrder);
	}
	
	/**
	 * Sets the default state and swaps 
	 * 
	 * @param {String=} name Name of state
	 * @method setDefaultState
	 */
	setDefaultIcon(name) {
		if (!this.icons_) {
			return;
		}
		
		this.currentIcon_ = this.icons_[name];
		
		let state = this.currentIcon_.state();
		this.target_.setDefaultState(state);
		
		return this.currentIcon_;
	}
  
  /**
   * Toggles Board
   *
   * @method handleClick
   */ 
  handleClick() {  
    
  }
  
  /**
   * Give the element button specific class names
   * 
   * @method buildCSSClass
   */
  buildCSSClass() {
    return 'ntk-marker fa-stack';
  }
  
  /**
   * Hide playback rate controls when they're no playback rate options to select
   *
   * @method updateVisibility
   */
  updateVisibility() {
    if (this.playbackRateSupported()) {
      this.removeClass('vjs-hidden');
    } else {
      this.addClass('vjs-hidden');
    }
  }
}

MarkerButton.prototype.options_ = Config.MarkerButton;
MarkerButton.prototype.controlText_ = 'markerButton';

Component.registerComponent('MarkerButton', MarkerButton);
export default MarkerButton;