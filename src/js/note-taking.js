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

import config from './config.js';

import MarkerButton from './components/marker-button.js'
import Board from './components/board.js';

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
    
    // Separate the Mark and the DisableControl options from config
		const boardOptions = options.Board;
    const markerButtonOptions = options.MarkerButton;
    
    this.injectBoard(boardOptions);
    this.injectMarkerButton(markerButtonOptions);
  }
 
	/**
	 * Adds disable control to the progress control that exists on the current player
	 *
	 * @param options Options for the DisableControl component
	 * @return {Object=} Created Board element
	 * @method addDisableControl
	 */
  injectBoard(options) { 
		let player = this.player();
		
    if (player && player.controlBar) {
      let controlBar = player.controlBar;
      
      if (controlBar.progressControl) {
        let progressControl = controlBar.progressControl;
        if (progressControl.getChild('Board')) {
					throw new Error(
						'There is already a Board attached to the progress control'
					);
				}
        let board = progressControl.addChild('board', options);
        return board;
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
      let markerButton = controlBar.addChild('markerButton', options);
      return markerButton;
    }
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
			return;
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
		if (name) {
			name = toTitleCase(name);
		} else {
			return;
		}
		
		return this.elements_[name];
	}
}

NoteTaking.prototype.options_ = config;

Component.registerComponent('NoteTaking', NoteTaking);
export default NoteTaking;