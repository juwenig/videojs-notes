const options = {
  id: 'vjs-notetaking',
}

options.MarkerButton = {
  name: 'MarkerButton',
	order: [
		'Normal',
		'Create',
		'Select'
	]
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
}

options.SelectState = {
  name: 'Select'
}

options.CreateState = {
  name: 'Create'
}

options.NormalState = {
	name: 'Normal'
}

options.MarkCollection = {
	name: 'MarkCollection'
}

options.MarkItem = {
	name: 'MarkItem',
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
	childre: [
		'DialogSave',
		'DialogDelete'
	], 
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