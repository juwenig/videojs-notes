var options = {
  id: 'vjs-notetaking',
  savenotes: 'none',
  url: '',
  livefeed: true,
  notesSection: true
}

options.MarkerToggle = {
  name: 'MarkerToggle',
  addTo: 'controlBar',
  className: {
		
	},
	
	'ntk-marker',
  parentClassName: 'fa-stack',
  iconClassName: 'fa fa-stack-2x',
  iconClassNames: {
    CreateNote: 'fa-pencil',
    SelectNote: 'fa-hand-pointer-o',
    ScrollBar: 'fa-sticky-note-o',
  },
  activeIcon: 'ntk-marker-active',
  markerStatuses: [
    'CreateNote',
    'SelectNote',
    'ScrollBar'
  ],
}

options.DisableControl = {
  name: 'DisableControl',
  addTo: 'controlBar:progressControl',
  children: [
    'Mark',
    'BoardSelect',
    'BoardCreate'
  ],
  className: 'vjs-progress-control ntk-disable-control',
	inject: [
		{what: 'Mark', into: 'BoardSelect'},
		{what: 'Mark', into: 'BoardCreate'}
	]
}

options.Board = {
  name: 'Board',
  markName: 'Mark',
  className: 'vjs-progress-holder vjs-slider ntk-board'
}

options.BoardSelect = {
  name: 'BoardSelect',
  className: 'ntk-board-select'
}

options.BoardCreate = {
  name: 'BoardCreate',
  className: 'ntk-board-create'
}

options.Marks = {
  name: 'Marks',
  className: 'vjs-progress-holder ntk-marks',
	dialogName: 'MarkDialog'
}

options.MarkItem = {
	name: 'MarkItem',
	className: {
		active: 'ntk-active-mark',
		inactive: 'ntk-mark'
	},
	id: {
		mark: 'M'
	}
}

options.MarkDialog = {
	name: 'MarkDialog',
	className: {
		dialog: 'ntk-dialog',
		form: 'ntk-dialog-form',
		title: 'ntk-dialog-title',
		note: 'ntk-dialog-note',
		save: 'ntk-dialog-save fa fa-floppy-o',
		delete: 'ntk-dialog-delete fa fa-trash-o'
	}
}

options.Notes = {
  name: 'Notes',
  display: options.notesSection || options.livefeed || true
}

options.LiveFeed = {
  name: 'LiveFeed',
  display: options.livefeed || true
}

export default options;