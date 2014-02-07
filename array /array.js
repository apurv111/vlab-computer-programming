window.view = {
	numbers: new Array(),
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
		this.addClickEvent('btnStart', function() { view.proceedToNextButton() })
		this.addClickEvent('btnNext', function() { view.sortArray() })
	},
	proceedToNextButton: function() {
		var userInput = this.getArraySize()
		if( isNaN( userInput ) === false ) 
		{
			if( userInput !== 0 )
			{
				var element = document.getElementById('inputButtonRadio')
				element.className = 'show, radioButtonDivision'
				this.disableButton('btnStart')
			}
			else
				alert('Enter array size first !')
		}
		//else if ( userInput === 0 )
		//	alert('Enter size of the array') 
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
		var posLeft = String(elements[0].offsetLeft + 1)
		var posTop = String(elements[0].offsetTop + 4)
		var position = []
		position.push(posLeft, posTop)
		return position
	},
	convertFromStringToNumber: function() {
		for ( i = 0 ; i < this.numbers.length ; i++ )
			this.numbers[i] = Number(this.numbers[i])
	},
	sortArray: function() {
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
				var position = this.getPositionOfElement()
				posLeft = position[0]
				posTop = position[1]
				this.createImage(posLeft, posTop)
				this.convertFromStringToNumber()
			} 
		}
		else
			alert('number of inputs must be equal to the size of the array')	
	},
	init: function() {
		this.activateEvents()
	}
}
window.onload = function() { view.init() }