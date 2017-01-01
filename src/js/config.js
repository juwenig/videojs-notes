const options = {
  id: 'vjs-notetaking',
  savenotes: 'none',
  url: '',
  livefeed: true,
  notesSection: true
}

options.MarkerButton = {
  name: 'MarkerButton',
}

options.CreateIcon = {
	name: 'Create',
	state: 'Create'
}

options.NormalIcon = {
	name: 'Normal',
	state: 'Normal'
}

options.SelectIcon = {
	name: 'Select',
	state: 'Select'
}

options.Board = {
  name: 'DisableControl',
  addTo: 'controlBar:progressControl',
  children: [
    'MarkCollection'
  ],
  className: 'vjs-progress-control ntk-disable-control',
}

options.SelectState = {
  name: 'BoardSelect',
  className: 'ntk-board-select',
	mark: 'Marks'
}

options.CreateState = {
  name: 'BoardCreate',
  className: 'ntk-board-create',
	mark: 'Marks'
}

options.NormalState = {
	
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




export default options;