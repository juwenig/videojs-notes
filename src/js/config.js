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

options.DialogTExt = {
	name: 'DialogText',
	registerElement: false
}

options.DialogButtons = {
	name: 'DialogButtons',
	children: [
		'DialogSave',
		'DialogDelete'
	], 
	registerElement: false
}

options.DialogTime = {
	name: 'DialogTime',
	children: [
		'DialogTimeStart',
		'DialogTimeEnd'
	],
	registerElement: false
}

options.DialogTimeStart = {
	name: 'DialogTimeStart',
	registerElement: false
}

options.DialogTimeEnd = {
	name: 'DialogTimeEnd',
	registerElement: false
}


export default options;