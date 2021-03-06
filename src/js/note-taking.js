/**
 * Dependencies:
 * controlBar (v5.13.2)
 * progressControl (v5.13.2)
 
 * Description:
 * API for retrieving notes and notetaking components
 * Initializes the notetaking plugin
 
 * Example:
 * 	var options = {
 *		id: 'vjs-notetaking-1'
 * 	}
 *	var notetaking = new NoteTaking(player, options);
 *	notetaking.getElement('board');
 */


import window from 'global/window';
import videojs from 'video.js';

import * as Dom from './components/utils/dom.js';
import * as Fn from './components/utils/fn.js';
import log from './components/utils/log.js';
import mergeOptions from './components/utils/merge-options.js';
import toTitleCase from './components/utils/to-title-case.js';
import {Component} from './components/utils/vjs-classes.js';

import Config from './config.js';

import MarkerButton from './components/marker-button.js';
import Board from './components/board.js';
import Dialog from './components/mark-dialog/dialog.js';

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
	 * @param {Object} options Options for the Board component
	 * @return {Object=} Created Board element
	 * @method injectBoard
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
				
        let board = progressControl.addChild('Board', options);
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
      let markerButton = controlBar.addChild('MarkerButton', options);
      return markerButton;
    }
  }
	
	/**
   * Adds a class name that corresponds to a dialog size dependent on the video dim
	 * 
	 * @return {Object} Object with width and height prop
	 * @method calculateSizeClass
	 */
	determinePlayerSize() {
		// YouTube videos have 1.77 ratio width:height
		// Coursera videos have 1.77 ratio width:height
		let size = {};
		let height, width;
		
		let retrieveDims = Fn.bind(this, () => {
			let playerEl = this.player().el();
			let computeStyle = window.getComputedStyle(playerEl);
			
			height = parseFloat(computeStyle['height']);
			width = parseFloat(computeStyle['width']);
		});
		
		this.player().ready(retrieveDims, true);
				
		size['height'] = height;
		size['width'] = width;
		
		return size;
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