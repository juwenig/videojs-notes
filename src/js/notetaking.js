/* 
 *  videojs-notetaking architecture 
 *    - setup.js: setup and initializing first DOM element for the notetaking plugin
 *    - notetaking.js: outlines the NoteTaking class 
 *    - notes.js: outlines the Notes class
 *    - live-feed.js: outlines the LiveFeed class, which constructs the DOM elements for display
 *    - notes-dialog.js: outlines the NotesDialog class
 *   
 */

import videojs from 'video.js';

import * as Dom from './utils/dom.js';
import log from './utils/log.js';
import mergeOptions from './utils/merge-options.js';
import toTitleCase from './utils/to-title-case.js';
import config from './config.js';

import Notes from './notes/notes.js';
import MarkerToggle from './marker-toggle.js'
import DisableControl from './disable-control.js';

import {Component} from './videojs-classes.js';

class NoteTaking extends Component {
  constructor(player, options) {
    options = mergeOptions(NoteTaking.prototype.options_, options);
		super(player, options);
		
    this.player = player;
    
		if (!this.player.notetaking_) {
			this.player.notetaking_ = this;
		} else {
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
    const markerToggleOptions = options.MarkerToggle;
    const disableControlOptions = options.DisableControl;
    
    // Register and add the control bar to the player only once and on constructor
    const notetaking = this.player.notetaking_; 
    
    this.addDisableControl(disableControlOptions);
    notetaking.markerToggle = this.addMarkerToggle(markerToggleOptions);
  }
 
	/**
	 * Adds disable control to the progress control that exists on the current player
	 *
	 * @param options Options for the DisableControl component
	 * @method addDisableControl
	 */
  addDisableControl(options) {    
    if (this.player && this.player.controlBar) {
      var controlBar = this.player.controlBar;
      
      if (controlBar.progressControl) {
        let progressControl = controlBar.progressControl;
        if (progressControl.getChild('DisableControl')) {
					throw new Error('There is already a Disable Control attached to the progress control');
				}
        var disableControl = progressControl.addChild('disableControl', options);
        return disableControl;
      }
    }
  }
  
  addMarkerToggle(options) {
    if (this.player && this.player.controlBar) {
      var controlBar = this.player.controlBar;
      
			if (controlBar.getChild('MarkerToggle')) {
				throw new Error('There is already a Marker Toggle attached to the control bar');
			}
      var markerToggle = controlBar.addChild('markerToggle', options);
      return markerToggle;
    }
  }
	
	notetaking() {
		if (!this.player.notetaking_) {
			return;
		}
		
		return this.player.notetaking_;
	}
  
	registerElement(name, element) {
		if (name) {
			name = toTitleCase(name);
		} else {
			return;
		}
		
		if (!this.elements_) {
			this.elements_ = {};
		}
		
		this.elements_[name] = element;
		
		return element;
	}
	
	getElement(name) {
		if (name) {
			name = toTitleCase(name);
		} else {
			return;
		}
		
		return this.elements_[name];
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