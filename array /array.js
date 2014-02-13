window.view = {
	numbers: new Array(),
	lastRedDiv: new Object(),
	nextRedDiv: new Object(),
	i: 1,
	j: 0,
	key: 0,
	changeClass: function(id, className) {
		document.getElementById(id).className = className
	},
	getLastHighlightedDiv: function() {
		var findClass = document.getElementsByClassName('showDivInRed')
		return findClass[0]
	},
	getNextDivToHighlight: function(lastHighlightedDiv) {
		var next = lastHighlightedDiv.nextSibling
		next = next.nextSibling
		return next
	},
	jumpTo: function(targetDivId) {
		var element = document.createElement('div')
		element.id = targetDivId
		return element
	},
	disableButton: function(buttonId) {
		document.getElementById(buttonId).disabled = true
	},
	enableButton: function(buttonId) {
		document.getElementById(buttonId).disabled = false
	},
	addClickEvent: function(id, method) {
		var element = document.getElementById(id)
		element.addEventListener('click', method, false)
	},
	getArraySize: function() {
		var inputValue = document.getElementById('inputArraySize').value
		inputValue = Number(inputValue)
		return inputValue
	},
	activateEvents: function() {
		this.addClickEvent('btnOk', function() { view.proceedToStartButton() })
		this.addClickEvent('btnStart', function() { view.displayElements() })
		this.addClickEvent('btnNext', function() { view.sortArray() })
	},
	proceedToStartButton: function() {
		var userInput = this.getArraySize()
		if( isNaN( userInput ) === false ) 
		{
			if( userInput !== 0 )
			{
				var element = document.getElementById('inputButtonRadio')
				element.className = 'show, radioButtonDivision'
				this.disableButton('btnNext')
			}
			else
				alert('Enter array size first !')
		}
		else
			alert( 'Size of the array must be an Integer !' )
	},
	generateRandomNumbers: function() {
		var inputValue = this.getArraySize()
		for ( i = 0 ; i < inputValue ; i++ )
		{
			var random = Math.floor(Math.random()*15)
			this.numbers.push(String(random))
		}
	},
	getUserInput: function() {
		var inputValue = document.getElementById('userInput').value
		inputValue = inputValue.replace(/\s/g, ',')
		this.numbers = inputValue.split(',')
	},
	takeInputFromRadioBox: function() {
		var element = document.getElementsByName('radio_group')
		if ( element[0].checked )
			this.generateRandomNumbers()
		else if (element[1].checked)
			this.getUserInput()
	},
	createBoxes: function() {
		for ( i = 0 ; i < this.numbers.length ; i++ ) {
			var outerDiv = document.createElement('div')
			outerDiv.className = 'outerDiv'
			var element = document.createElement('div')
			element.innerHTML = this.numbers[i]
			if ( i === 0 )
				element.className = 'sortedArray'
			else if ( i === 1 )
				element.className = 'keyPosition'
			else
				element.className = 'unSortedArray'
			outerDiv.appendChild(element)
			document.getElementById('sortingDiv').appendChild(outerDiv)
		}
	},
	removeImage: function() {
		var element = document.getElementsByTagName('img')
		if ( element.length > 0 )
			document.getElementById('sortingDiv').removeChild(element[0])
	},
	createImage: function(left, top) {
		var image = document.createElement('img')
		image.src = 'arrow.png'
		image.style.position = 'absolute'
		image.style.left = left + 'px'
		image.style.top = top + 'px'
		image.style.opacity = '0.7'
		document.getElementById('sortingDiv').appendChild(image)
	},
	showCode: function() {
		document.getElementById('1-dArray').className = 'show, codeLayout'
	},
	validateUserInputs: function() {
		var result
		for ( i = 0 ; i < this.numbers.length ; i++ )
		{
			if ( isNaN(Number(this.numbers[i])) )
				return false
		}
	},
	getPositionOfElement: function() {
		var elements = document.getElementById('sortingDiv').childNodes
		var posLeft = String(elements[this.j].offsetLeft + 1)
		var posTop = String(elements[this.j].offsetTop + 4)
		var position = []
		position.push(posLeft, posTop)
		return position
	},
	showSwapping: function() {
		var position = this.getPositionOfElement()
		this.createImage(position[0], position[1])
	},
	highlightNextStep: function() {
		this.changeClass(this.lastRedDiv.id, 'show')
		this.changeClass(this.nextRedDiv.id, 'showDivInRed')
	},
	convertFromStringToNumber: function() {
		for ( i = 0 ; i < this.numbers.length ; i++ )
			this.numbers[i] = Number(this.numbers[i])
	},
	displayElements: function() {
		this.takeInputFromRadioBox()
		var arraySize = this.getArraySize()
		var isValidInput = this.validateUserInputs()
		if ( arraySize === this.numbers.length )
		{	
			if ( isValidInput === false)
				alert('Enter Numeric Values Only!')
			else
			{
				this.createBoxes()
				this.showCode()
				this.convertFromStringToNumber()
				this.disableButton('btnStart')
				this.enableButton('btnNext')
				this.changeClass( 'line1' , 'showDivInRed')
			} 
		}
		else
			alert('number of inputs must be equal to the size of the array')	
	},
	setKey: function() {
		var key = document.getElementById('key')
		var elements = document.getElementById('sortingDiv').childNodes
		var firstElement = elements[this.i-1].firstChild
		firstElement.className = 'sortedArray'
		var secondElement = elements[this.i].firstChild
		secondElement.className = 'keyPosition'
		key.innerHTML = this.numbers[this.i]
		key.style.background = '#7fd1a7'
		this.j = this.i - 1
		this.key = this.numbers[this.i]
	},
	swapElements: function() {
		var elements = document.getElementById('sortingDiv').childNodes
		var firstElement = elements[this.j].firstChild
		var secondElement = elements[this.j+1].firstChild
		secondElement.innerHTML = firstElement.innerHTML
	},
	insertKey: function() {
		var key = document.getElementById('key').innerHTML
		var element = document.getElementById('sortingDiv').childNodes
		element = element[this.j+1].firstChild
		if ( Number(key) < Number(element.innerHTML) )
		{
			element.innerHTML = key
			// var elements = document.getElementById('sortingDiv').childNodes
			// var element = elements[this.j].firstChild		
			// var key = document.getElementById('key')
			// element.innerHTML = key.innerHTML 
			// element.style.background = 'red'
			// key.style.background = 'red'
		}
	},
	sortArray: function() {
		this.lastRedDiv = this.getLastHighlightedDiv()
		this.nextRedDiv = this.getNextDivToHighlight(this.lastRedDiv)
		if ( this.lastRedDiv.id === 'line4' )
		{
			if ( this.i < this.numbers.length )
				this.highlightNextStep()
			else
			{
				this.nextRedDiv = this.jumpTo('line15')
				this.highlightNextStep()
				alert('code running is over!')
				this.disableButton('btnNext')
				this.enableButton('btnStart')
			}
		}
		else if ( this.lastRedDiv.id === 'line6' )
		{
			this.setKey()
			this.highlightNextStep()
		}
		else if ( this.lastRedDiv.id === 'line8' )
		{
			if ( this.j >= 0 && this.numbers[this.j] > this.numbers[this.i] )
				this.highlightNextStep()
			else
			{
				this.nextRedDiv = this.jumpTo('line13')
				this.highlightNextStep()
			}
		}
		else if ( this.lastRedDiv.id === 'line10' )
		{
			this.showSwapping()
			this.swapElements()
			this.highlightNextStep()
			this.j --
		}
		else if ( this.lastRedDiv.id === 'line11' )
		{
			this.removeImage()
			this.highlightNextStep()
		}
		else if ( this.lastRedDiv.id === 'line12' )
		{
			this.nextRedDiv = this.jumpTo('line8')
			this.highlightNextStep()
		}
		else if ( this.lastRedDiv.id === 'line13' )
		{
			this.insertKey()
			this.highlightNextStep()
		}
		else if ( this.lastRedDiv.id === 'line14' )
		{
			var element = document.getElementById('sortingDiv').childNodes
			element = element[this.i].firstChild
			element.className = 'sortedArray'
			this.i ++
			this.nextRedDiv = this.jumpTo('line4')
			this.highlightNextStep()
		}
		else
			this.highlightNextStep()
	},
	init: function() {
		this.activateEvents()
	}
}
window.onload = function() { view.init() }