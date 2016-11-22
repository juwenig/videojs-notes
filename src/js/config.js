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
		marker: 'ntk-marker',
		parent: 'fa-stack',
		icons: {
			CreateNote: 'fa fa-stack-2x fa-pencil',
			SelectNote: 'fa fa-stack-2x fa-hand-pointer-o',
			ScrollBar: 'fa fa-stack-2x fa-sticky-note-o',
		},
		active: 'ntk-marker-active'
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
    'Mark',
    'BoardSelect',
    'BoardCreate'
  ],
  className: 'vjs-progress-control ntk-disable-control',
	inject: [
		{src: 'Mark', dest: 'BoardSelect'},
		{src: 'Mark', dest: 'BoardCreate'}
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
	idName: {
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