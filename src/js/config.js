let options = {
  id: 'vjs-notetaking',
  savenotes: 'none',
  url: '',
  livefeed: true,
  notesSection: true
}

options.MarkerButton = {
  name: 'MarkerButton',
  addTo: 'controlBar',
  className: {
		marker: 'ntk-marker',
		parent: 'fa-stack',
		icons: {
			Base: 'fa fa-stack-2x',
			CreateNote: 'fa-pencil',
			SelectNote: 'fa-hand-pointer-o',
			ScrollBar: 'fa-sticky-note-o',
		},
		modeIcon: 'ntk-marker-mode-icon'
	},
  statuses: [
    'CreateNote',
    'SelectNote',
    'ScrollBar'
  ]
}

options.DisableControl = {
  name: 'DisableControl',
  addTo: 'controlBar:progressControl',
  children: [
    'Marks',
    'BoardCreate'
  ],
  className: 'vjs-progress-control ntk-disable-control',
	inject: [
		{src: 'Marks', dest: 'BoardSelect'},
		{src: 'Marks', dest: 'BoardCreate'}
	]
}

options.Board = {
  name: 'Board',
  markName: 'Mark',
  className: 'vjs-progress-holder vjs-slider ntk-board'
}

options.BoardSelect = {
  name: 'BoardSelect',
  className: 'ntk-board-select',
	mark: 'Marks'
}

options.BoardCreate = {
  name: 'BoardCreate',
  className: 'ntk-board-create',
	mark: 'Marks'
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
		inactive: 'ntk-inactive-mark'
	},
	idPrefix: 'M'
}

options.MarkDialog = {
	name: 'MarkDialog',
	className: {
		background: 'ntk-dialog-background',
		dialog: 'ntk-dialog',
		form: 'ntk-dialog-form',
		title: 'ntk-dialog-title',
		note: 'ntk-dialog-note',
		save: 'ntk-dialog-save fa fa-floppy-o',
		delete: 'ntk-dialog-delete fa fa-trash-o'
	},
	markClass: 'ntk-marks',
	markID: ''
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