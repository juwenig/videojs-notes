const options = {
  id: 'vjs-notetaking',
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
  name: 'Board',
  children: [
    'MarkCollection'
  ]
}

options.SelectState = {
  name: 'Select',
}

options.CreateState = {
  name: 'Create',
}

options.NormalState = {
	name: 'Normal'
}

options.MarkItem = {
	name: 'MarkItem',
	className: {
		active: 'ntk-active-mark',
		inactive: 'ntk-inactive-mark'
	},
	registerElement: false
}

options.Dialog = {
	name: 'Dialog',
	className: 'ntk-marks',
	children: [
		'DialogForm'
	],
	registerElement: false
}

options.DialogForm = {
	name: 'DialogForm',
	children: [
		'DialogTitle',
		'DialogText',
		'DialogTime',
		'DialogButtons'
	],
	registerElement: false
}

options.DialogTitle = {
	name: 'DialogTitle',
	registerElement: false
}

options.DialogButtons = {
	name: 'DialogButtons',
	registerElement: false
}

options.DialogTime = {
	name: 'DialogTime',
	registerElement: false
}

/*
		save: 'ntk-dialog-save fa fa-floppy-o',
		delete: 'ntk-dialog-delete fa fa-trash-o'*/




export default options;