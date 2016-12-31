/**
 * @file marker.js
 */

import * as Dom from './utils/dom.js';
import * as Fn from './utils/fn.js';
import mergeOptions from './utils/merge-options.js';
import {Button, Component} from './utils/vjs-classes.js';

import Config from './config.js';

import Icon from './button-icons/icon.js';

class MarkerButton extends Button {
  constructor(player, options) {
		options = mergeOptions(MarkerButton.prototype.options_, options);
    super(player, options);
    
		// store instances of icons
		this.icons_ = {};
		
		this.currentIcon_ = null;
		
		this.nextIcon_ = {};
		
		this.target_ = this.getElement('Board');
		
    this.targetParent = this.getElement('DisableControl')[0];
    this.targetSelect = this.targetParent.getChild('BoardSelect');
    this.targetCreate = this.targetParent.getChild('BoardCreate');
		
    this.statusInd = 0;
    this.status = this.options_.statuses[this.statusInd];
    
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
    
		const className = this.options_.className;
    const statuses = this.options_.statuses;
  	
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
	
	initializeIcons() {
		let initialOrder = [];
		
		for (icon in Icon.getIcons()) {
			this.addIcon(Icon.getIcon(icon));
			initialOrder.push(icon);
		}
	}
	
	/**
	 * Adds an icon for a state
	 *
	 * @param {Object=} options The options for DOM node
	 * @method addIcon
	 */
	addIcon(IconClass, options) {
		// Creates new icon and add element as child element to this
		if (!Icon.isPrototypeOf(IconClass)) {
			return;
		}
				
		let icon = new IconClass(options);
		let name = icon.name();
		
		this.icons_[name] = icon;
	}
  
  /**
   * Toggles Board
   *
   * @method handleClick
   */ 
  handleClick() {  
    let modeIcon = this.modeIcon;
		let statuses = this.options_.statuses;
		let className = this.options_.className;
    let numStats = statuses.length;
    
    Dom.removeElClass(modeIcon, className.icons[this.status]);
    
    // Change the icon for the button
    this.statusInd = (this.statusInd + 1) % numStats;
    this.status = statuses[this.statusInd];
    this.controlText(this.status.replace(/([A-Z])/g, ' $1'));
    if (this.statusInd < 2) {
      Dom.addElClass(modeIcon, className.icons[this.status]);
    }
    
		switch (this.status) {
			case statuses[1]:
				this.trigger('oncreatemode');
				break;
			case statuses[2]:
				this.trigger('onselectmode');
				break;
			case statuses[0]:
				this.trigger('onnormalmode');
				break;
		}
				
		// The default shows the icon for 'CreateNote' - after transitioning to this mode 
    // icon should change to 'SelectNote' and the targetCreate should be enabled
    // Similarly, when the icon for 'SelectNote' shows, the icon should change to
    // 'ScrollBar' and should hide the parent
    if (this.status === statuses[1]) {
      this.targetParent.show();
      this.targetCreate.show(); // Normal -> Create
      this.targetSelect.hide();
    } else if (this.status === statuses[2]) {
      this.targetParent.show();
      this.targetSelect.show(); // Create -> Select
      this.targetCreate.hide();
    } else if (this.status === statuses[0]) {
      this.targetParent.hide(); // Go to Create
    }
    
    event.stopImmediatePropagation();
    event.preventDefault(); 
  }
  
  /**
   * Give the element button specific class names
   * 
   * @method buildCSSClass
   */
  buildCSSClass() {
    return `${this.options_.className.marker} ${super.buildCSSClass()}`;
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