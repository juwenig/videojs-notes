/* 
 *  Used to 
 *    
 */

import videojs from 'video.js';

import * as Dom from './utils/dom.js';
import log from './utils/log.js';
import mergeOptions from './utils/merge-options.js';
import toTitleCase from './utils/to-title-case.js';
import {Component} from './utils/vjs-classes.js';

import config from './config.js';

import Notes from './notes/notes.js';
import MarkerButton from './marker-button.js'
import DisableControl from './disable-control.js';

class NoteTaking extends Component {
  constructor(player, options) {
    options = mergeOptions(NoteTaking.prototype.options_, options);
		super(player, options);
		
    this.player = player;
    
		if (!this.player.notetaking_) {
			this.player.notetaking_ = this;
		} else {
			// Keep Old Data for conflicts with notetaking_
			this.oldData = this.player.notetaking_;
			this.player.notetaking_ = this;
		}
    
    if (options.id === 'string'){
      this.id = options.id;
    }
    
    // Keeps track of the notes objects for possibility that one notetaking object 
    // connects to 2 or more different notes objects
    if (!this.notes_) {
      this.notes_ = {};
    }
    
    // Separate the Mark and the DisableControl options from config
    const markerButtonOptions = options.MarkerButton;
    const disableControlOptions = options.DisableControl;
    
    // Register and add the control bar to the player only once and on constructor
    const notetaking = this.player.notetaking_; 
    
    this.addDisableControl(disableControlOptions);
    this.addMarkerButton(markerButtonOptions);
  }
 
	/**
	 * Adds disable control to the progress control that exists on the current player
	 *
	 * @param options Options for the DisableControl component
	 * @method addDisableControl
	 */
  addDisableControl(options) {    
    if (this.player && this.player.controlBar) {
      let controlBar = this.player.controlBar;
      
      if (controlBar.progressControl) {
        let progressControl = controlBar.progressControl;
        if (progressControl.getChild('DisableControl')) {
					throw new Error('There is already a Disable Control attached to the progress control');
				}
        let disableControl = progressControl.addChild('disableControl', options);
        return disableControl;
      }
    }
  }
  
  addMarkerButton(options) {
    if (this.player && this.player.controlBar) {
      let controlBar = this.player.controlBar;
      
			if (controlBar.getChild('MarkerButton')) {
				throw new Error('There is already a Marker Button attached to the control bar');
			}
      let markerButton = controlBar.addChild('markerButton', options);
      return markerButton;
    }
  }
	
	notetaking() {
		if (!this.player.notetaking_) {
			return;
		}
		
		return this.player.notetaking_;
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
		if (name) {
			name = toTitleCase(name);
		} else {
			return;
		}
		
		return this.elements_[name];
	}
	
	/**
	 * Retrieves the old data that was set to 
	 *
	 * @return {Object}
	 * @method retrieveOldData
	 */
	retrieveOldData() {
		return this.oldData;
	}
	
	/// MIGHT DELETE
  registerNotes(el) {    
    // Checks if the el is already in notes_
    if (!this.notes_[el]) {
      this.notes_[el] = new Notes(this.player, mergeOptions({}, this.options.Notes));
      if (!Dom.hasElClass(el, 'vjs-notetaking')) {
        Dom.addElClass(el, 'vjs-notetaking'); 
      }
    } else {
      log.warn('The notes element is already registered.');
    }
  }
	
	
}

NoteTaking.prototype.options_ = config;

Component.registerComponent('NoteTaking', NoteTaking);
export default NoteTaking;