window.model = {
	i: 0,
	j: 0,
	k: 0,
	p: 0,
	q: 0,
	r: 0,
	a: 0,
	b: 0,
	firstElement: 0,
	secondElement: 0,
	multiplyElements: function() {
		return this.firstElement * this.secondElement
	}
}

window.view = {
	numbers: new Array(),
	matrixA: new Array(),
	matrixB: new Array(),
	rowsA: 0,
	rowsB: 0,
	colsA: 0,
	colsB: 0,
	pA: 0,
	pB: 0,
	qA: 0,
	qB: 0,
	matrixCount: 1,
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
		this.addClickEvent('2DbtnOK', function() { view.getRowsAndCols() })
		this.addClickEvent('generateA', function() { view.generateFirstMatrixElements() })
		this.addClickEvent('generateB', function() { view.generateSecondMatrixElements() })
		this.addClickEvent('btnStart2D', function() { view.generateMatrices() })
		this.addClickEvent('btnNext2D', function() { view.multiplyMatrices() })
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
			alert(this.numbers[this.j])
			alert(this.numbers[this.i])
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
	getRowsAndCols: function() {
		var row = Number(document.getElementById('row').value)
		var col = Number(document.getElementById('col').value)
		if ( row === 0 || col === 0 )
			alert('Enter Matrix Size First !')
		else if ( isNaN(row) || isNaN(col) )
			alert('Matrix Size Must Be An Integer Value !')
		else
		{	
			if ( this.matrixCount === 1 )
			{	
				this.enableButton('generateA')
				this.rowsA = row
				this.colsA = col
			}
			else
			{
				this.enableButton('generateB')
				this.rowsB = row
				this.colsB = col
			}
			this.disableButton('2DbtnOK')
		}
	},
	resetRowsAndCols: function() {
		document.getElementById('row').value = this.colsA
		document.getElementById('col').value = ''
	},
	generateFirstMatrixElements: function() {
		var size = this.rowsA * this.colsA
		for ( i = 0 ; i < size ; i++)
		{
			var random = Math.floor(Math.random()*15)
			this.matrixA.push(random)
		}
		this.resetRowsAndCols()
		this.disableButton('row')
		this.disableButton('generateA')
		this.changeClass('generateA', 'nestedNextButton hide')
		this.changeClass('generateB', 'nestedNextButton show')
		this.enableButton('2DbtnOK')
		this.matrixCount ++
	},
	generateSecondMatrixElements: function() {
		var size = this.rowsB * this.colsB
		for ( i = 0 ; i < size ; i++)
		{
			var random = Math.floor(Math.random()*15)
			this.matrixB.push(random)
		}
		this.disableButton('generateB')
		this.disableButton('col')
		this.enableButton('btnStart2D')
	},
	generateMatrixA: function() {
		var matA = document.createElement('table')
		matA.className = 'table'
		var caption = matA.createCaption();
		caption.innerHTML = "<b>Matrix A</b>"
		for ( i = 0 ; i < this.rowsA ; i++ )
		{	
			var row = document.createElement('tr')
			for ( j = 0 ; j < this.colsA ; j++ )
			{
				var col = document.createElement('td')
				col.className = 'matrixCell'
				row.appendChild(col)
			}
			matA.appendChild(row)
		}
		document.getElementById('matrixA').appendChild(matA)
		var elements = document.getElementById('matrixA').getElementsByTagName('td')
		for ( i = 0 ; i < elements.length ; i++ )
		{
			elements[i].innerHTML = this.matrixA[i]
		}
	},
	generateMatrixB: function() {
		var matB = document.createElement('table')
		matB.className = 'table'
		var caption = matB.createCaption();
		caption.innerHTML = "<b>Matrix B</b>"
		for ( i = 0 ; i < this.rowsB ; i++ )
		{	
			var row = document.createElement('tr')
			for ( j = 0 ; j < this.colsB ; j++ )
			{
				var col = document.createElement('td')
				col.className = 'matrixCell'
				row.appendChild(col)
			}
			matB.appendChild(row)
		}
		document.getElementById('matrixB').appendChild(matB)
		var elements = document.getElementById('matrixB').getElementsByTagName('td')
		for ( i = 0 ; i < elements.length ; i++ )
		{
			elements[i].innerHTML = this.matrixB[i]
		}
	},
	generateResultantMatrix: function() {
		var matResultant = document.createElement('table')
		matResultant.className = 'table'
		var caption = matResultant.createCaption();
		caption.innerHTML = "<b>Resultant Matrix</b>"
		for ( i = 0 ; i < this.rowsA ; i++ )
		{	
			var row = document.createElement('tr')
			for ( j = 0 ; j < this.colsB ; j++ )
			{
				var col = document.createElement('td')
				col.className = 'matrixCell'
				row.appendChild(col)
			}
			matResultant.appendChild(row)
		}
		document.getElementById('resultantMatrix').appendChild(matResultant)
		var elements = document.getElementById('resultantMatrix').getElementsByTagName('td')
		for ( i = 0 ; i < elements.length ; i++ )
		{
			elements[i].innerHTML = -1
		}
	},
	generateMatrices: function() {
		this.generateMatrixA()
		this.generateMatrixB()
		this.generateResultantMatrix()
		this.disableButton('btnStart2D')
		this.enableButton('btnNext2D')
		this.changeClass('line21', 'showDivInRed')
	},
	highlightRowsAndColsMatrixA: function() {
		var tableA = document.getElementById('matrixA').firstChild
		for ( model.i, model.j ; model.j < this.colsA ; model.j ++ )	
			tableA.rows[model.i].cells[model.j].className = 'matrixCell greenCell'
		},
	highlightRowsAndColsMatrixB: function(){
		var tableB = document.getElementById('matrixB').firstChild
		for ( model.p, model.q ; model.p < this.rowsB ; model.p ++ )
			tableB.rows[model.p].cells[model.q].className = 'matrixCell greenCell'
	},
	highlightMatrixElements: function() {
		var tableA = document.getElementById('matrixA').firstChild
		var firstElement = tableA.rows[model.i].cells[model.k]
		firstElement.className = 'matrixCell blueCell'
		model.firstElement = firstElement.innerHTML
		var tableB = document.getElementById('matrixB').firstChild
		var secondElement = tableB.rows[model.r].cells[model.q]
		secondElement.className = 'matrixCell blueCell'
		model.secondElement = secondElement.innerHTML
		var tableRes = document.getElementById('resultantMatrix').firstChild
		var resultantElement = tableRes.rows[model.a].cells[model.b]
		resultantElement.className = 'matrixCell greenCell'
		model.k ++
		model.r ++
	},
	displayResult: function(res) {
		var element = document.getElementById('resultantMatrix').firstChild.rows[model.a].cells[model.b]
		element.innerHTML = Number(element.innerHTML) + res
	},
	setCellValueToZero: function() {
		document.getElementById('resultantMatrix').firstChild.rows[model.a].cells[model.b].innerHTML = 0
	},
	resetPreviousCells: function() {
		if( model.k > 0 )
		{
			var tableA = document.getElementById('matrixA').firstChild
			var firstElement = tableA.rows[model.i].cells[model.k - 1]
			firstElement.className = 'matrixCell greenCell'
			var tableB = document.getElementById('matrixB').firstChild
			var secondElement = tableB.rows[model.r -1].cells[model.q]
			secondElement.className = 'matrixCell greenCell'
		}
	},
	resetPreviousRowsAndCols: function() {
		if ( model.q > 0 )
		{
			var tableA = document.getElementById('matrixA').firstChild
			for ( model.i, model.j ; model.j < this.colsA ; model.j ++ )	
				tableA.rows[model.i].cells[model.j].className = 'matrixCell greenCell'
			var tableB = document.getElementById('matrixB').firstChild
			for ( model.p, model.q ; model.p < this.rowsB ; model.p ++ )
				tableB.rows[model.p].cells[model.q - 1].className = 'matrixCell'
			model.j = 0
			model.p = 0
		}
	},
	resetVariablesForMatrixB: function() {
		model.b ++
		model.q ++
		model.k = 0
		model.r = 0
		model.j = 0
		model.p = 0
	},
	multiplyMatrices: function() {
		this.lastRedDiv = this.getLastHighlightedDiv()
		this.nextRedDiv = this.getNextDivToHighlight(this.lastRedDiv)
		if ( this.lastRedDiv.id === 'line27' )
		{
			this.highlightRowsAndColsMatrixA()
			this.highlightNextStep()
		}
		else if ( this.lastRedDiv.id === 'line29' )
		{
			this.resetPreviousRowsAndCols()
			this.highlightRowsAndColsMatrixB()
			this.highlightNextStep()
		}
		else if ( this.lastRedDiv.id === 'line31' )
		{
			this.setCellValueToZero()
			this.highlightNextStep()
		}
		else if ( this.lastRedDiv.id === 'line32' && model.k >= this.colsA )
		{
			this.nextRedDiv = this.jumpTo('line36')
			this.highlightNextStep()
			this.resetVariablesForMatrixB()
		}
		else if ( this.lastRedDiv.id === 'line34' )
		{
			this.resetPreviousCells()
			this.highlightMatrixElements()
			var result = model.multiplyElements()
			this.displayResult(result)
			this.highlightNextStep()
		}
		else if ( this.lastRedDiv.id === 'line35' )
		{
			this.nextRedDiv = this.jumpTo('line32')
			this.highlightNextStep()
		}
		else if ( this.lastRedDiv.id === 'line36' )
		{
			this.nextRedDiv = this.jumpTo('line29')
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