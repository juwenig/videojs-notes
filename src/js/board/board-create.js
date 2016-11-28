/**
 * @file board
 */

import * as Dom from '../utils/dom.js';

import mergeOptions from '../utils/merge-options.js';
import log from '../utils/log.js';
import {Component} from '../utils/vjs-classes.js';

import config from '../config.js';
import Board from './board.js';

class BoardCreate extends Board {
  constructor(player, options) {
    options = mergeOptions(BoardCreate.prototype.options_, options);
		super(player, options);
  }
  
  /**
   * Give the element button specific class names
   * 
   * @method buildCSSClass
   */
  buildCSSClass() {
    return `${BoardCreate.prototype.options_.className}`;
  }
  
  /**
   * Selects a mark from mark list
   * 
   * @param {Object} event Event object
   * @method handleClick
   */
  handleClick(event) {
    event.stopImmediatePropagation();
    event.preventDefault();
  }
  
  /**
   * Triggers the mark start event for a new active mark
   * 
   * @param {Object} event Event object
   * @method handleMouseDown
   */
  handleMouseDown(event) {
    const doc = this[this.options_.mark.toLocaleLowerCase()].el_.ownerDocument;
    
    event.preventDefault();
    Dom.blockTextSelection();

		this.on(doc, 'mousemove', this.handleMouseMove);
    this.on(doc, 'mouseup', this.handleMouseUp);
    this.on(doc, 'touchend', this.handleMouseUp);

    let startPoint = this.calculateDistance(event);
    
    this[this.options_.mark.toLocaleLowerCase()].startActiveMark(startPoint);
    this.handleMouseMove(event);
  }
  
  /**
   * Draws the highlighted segment by calling Marks API
   *
   * @param {Event} event
   * @method handleMouseMove
   */
  handleMouseMove(event){
    let progress = this.calculateDistance(event);
    this[this.options_.mark.toLocaleLowerCase()].updateActiveMark(progress);
  }
  
  /**
   * Triggers the mark end event for the active mark
   *
   * @param {Object} event Event object
   * @method handleMouseUp
   */
  handleMouseUp(event) {
    const doc = this[this.options_.mark.toLocaleLowerCase()].el_.ownerDocument;
    
    Dom.unblockTextSelection();
    
    this.off(doc, 'mousemove', this.handleMouseMove);
    this.off(doc, 'mouseup', this.handleMouseUp);
    this.off(doc, 'touchend', this.handleMouseUp);
    
    let endPoint = this.calculateDistance(event);
    this[this.options_.mark.toLocaleLowerCase()].endActiveMark(endPoint);
  }
}

BoardCreate.prototype.options_ = config.BoardCreate;

Component.registerComponent('BoardCreate', BoardCreate)
export default BoardCreate;