/**
 * Depends on the controlBar, progressControl as it exists in the DOM tree (v5.13.2)
 * Used as the API for retrieving notes and retrieving notetaking components
 * 
 */

import videojs from 'video.js';

import * as Dom from './components/utils/dom.js';
import log from './components/utils/log.js';
import mergeOptions from './components/utils/merge-options.js';
import toTitleCase from './components/utils/to-title-case.js';
import {Component} from './components/utils/vjs-classes.js';

import Config from './config.js';

import MarkerButton from './components/marker-button.js'
import MarkCollection from './components/mark/mark-collection.js';

class NoteTaking extends Component {
  constructor(player, options) {
    options = mergeOptions(NoteTaking.prototype.options_, options);
		super(player, options);
		
		player.notetaking_ = player.notetaking_ || this;
    
    if (options.id === 'string'){
      this.id = options.id;
    }
    
    // Keeps track of the notes objects for possibility that one notetaking object 
    // connects to 2 or more different notes objects
    if (!this.notes_) {
      this.notes_ = {};
    }
		
		this.playerSize_ = this.determinePlayerSize();
    
    // Separate the Mark and the DisableControl options from config
		const markCollectionOptions = options.MarkCollection;
    const markerButtonOptions = options.MarkerButton;
    
    this.injectMarkCollection(markCollectionOptions);
    this.injectMarkerButton(markerButtonOptions);
  }
 
	/**
	 * Adds disable control to the progress control that exists on the current player
	 *
	 * @param options Options for the DisableControl component
	 * @return {Object=} Created Board element
	 * @method addDisableControl
	 */
  injectMarkCollection(options) { 
		let player = this.player();
		
    if (player && player.controlBar) {
      let controlBar = player.controlBar;
      
      if (controlBar.progressControl) {
        let progressControl = controlBar.progressControl;
        if (progressControl.getChild('MarkCollection')) {
					throw new Error(
						'There is already a Board attached to the progress control'
					);
				}
        let markCollection = progressControl.addChild('MarkCollection', options);
        return markCollection;
      }
    }
  }
  
	/**
	 * Adds control bar to the control bar that exists on the current player
	 * 
	 * @param {Object=} options Options passed for the MarkerButton component
	 * @returns {Object=} Created MarkerButton object
	 * @method injectMarkerButton
	 */
  injectMarkerButton(options) {
		let player = this.player();
		
    if (player && player.controlBar) {
      let controlBar = player.controlBar;
      
			if (controlBar.getChild('MarkerButton')) {
				throw new Error(
					'There is already a MarkerButton attached to the control bar'
				);
			}
      let markerButton = controlBar.addChild('MarkerButton', options);
      return markerButton;
    }
  }
	
	/**
   * Adds a class name that corresponds to a dialog size dependent on the video dim
	 * 
	 * @method calculateSizeClass
	 */
	determinePlayerSize() {
		// YouTube videos have 1.77 ratio width:height
		// Coursera videos have 1.77 ratio width:height
		let size = 'medium';

		let height = this.player().videoHeight();
		let width = this.player().videoWidth();
		
		if (width >= 850 && height >= 400) {
			size = 'large';
		} else if (width >= 640 && height >= 360) {
			size = 'medium';
		} else {
			size = 'small';
		}
		
		return size;
	}
	
	/**
	 * Returns the size for the dialog
	 *
	 * @return {String} the size descriptor
	 * @method getSize
	 */
	getPlayerSize() {
		if (!this.size_) {
			this.playerSize_ = this.determinePlayerSize();
		}
		
		return this.playerSize_;
	}
	
	/**
	 * Returns the private notetaking object
	 * 
	 * @return {Object}
	 * @method notetaking
	 */
	notetaking() {
		let player = this.player();
		
		if (!player.notetaking_) {
			player.notetaking_ = this;
		}
		
		return player.notetaking_;
	}
  
	/**
	 * Stores instantiated component objects onto this class
	 *
	 * @param {String=} name Name of the object to store, used later for lookup
	 * @param {Object=} element Component object to store
	 * @return {Element}
	 * @method registerElement
	 */
	registerElement(name, element) {
		if (name) {
			name = toTitleCase(name);
		} else {
			return;
		}
		
		if (!this.elements_) {
			this.elements_ = {};
		}
		
		if (this.elements_[name]) {
			this.elements_[name].push(element);
		} else {
			this.elements_[name] = [element];
		}
		
		return element;
	}
	
	/**
	 * Gets the stored object
	 *
	 * @param {String=} name The name of the object you would like to retrieve
	 * @return {Element|Array}
	 * @method getElement
	 */
	getElement(name) {
		if (!name) {
			return;
		}
		
		name = toTitleCase(name);
	
		return this.elements_[name];
	}
}

NoteTaking.prototype.options_ = Config;

Component.registerComponent('NoteTaking', NoteTaking);
export default NoteTaking;