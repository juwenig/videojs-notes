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
  className: 'ntk-marker',
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

options.Mark = {
  name: 'Mark',
  className: 'vjs-progress-holder ntk-marks',
  activeClassName: 'ntk-activeMark',
  idPrefix: 'M',
}

options.MarkDialog = {
	name: 'MarkDialog',
	className: 'ntk-dialog',
	form: {
		className: 'ntk-dialog-form'
	},
	textArea: {
		className: 'ntk-dialog-textarea'
	},
	save: {
		className: 'ntk-dialog-save'
	},
	delete: {
		className: 'ntk-dialog-delete'
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