window.model = {
	inp: 0,
    nestedInp: 0,
    fact: 1,
    init: function() {
		this.inp = 0
		this.fact = 1
	},
    computeNextFact: function() {
        this.fact =  this.fact * this.inp
    }
}

window.view = {
	i: 1,
	j: 1,
	m: 1,
	k: 0,
	n: 0,
	disp: 0,
	lastRedDiv: new Object(),
	nextRedDiv: new Object(),
	addClickEvent: function(id, method) {
		var element = document.getElementById(id)
		element.addEventListener('click', method, false)
	},
	addEventOnInputBox: function(id, method) {
		var element = document.getElementById(id)
		element.addEventListener('change', method, false)
	},
	replaceDiv: function(x, y) {
 		document.getElementById(x).style.display = 'none'
 		document.getElementById(y).style.display = 'block' 
 	},
	getInput: function() {
		var inputValue = document.getElementById('simpleLoopInput').value
		model.inp = Number(inputValue)
		this.clearExecutionSection()
	},
	getNestedInput: function() {
		var inputValue = document.getElementById('nestedLoopInput').value
		model.nestedInp = Number(inputValue)
		this.clearExecutionSection()
	},
	activateEvents: function() {
		this.addClickEvent('btnNext', function() { view.nextBtn() })
		this.addClickEvent('optionFor', function() { view.clearExecutionSection() })
		this.addClickEvent('optionWhile', function() { view.clearExecutionSection() })
		this.addClickEvent('optionDoWhile', function() { view.clearExecutionSection() })
		this.addClickEvent('btnStart', function() { view.startBtn() })
		this.addClickEvent('nestedStartBtn', function() { view.startBtnNested() })
		this.addClickEvent('nestedNextBtn', function() { view.nextBtnNested() })
		this.addClickEvent('btnNestedLoop', function() { view.switchMultipleDivForNestedLoop() })
		this.addClickEvent('btnSimpleLoop', function() { view.switchMultipleDivForSimpleLoop() })
		this.addEventOnInputBox('simpleLoopInput', function() { view.getInput() })
		this.addEventOnInputBox('nestedLoopInput', function() { view.getNestedInput() })
	},
	switchMultipleDivForNestedLoop: function() {
		this.replaceDiv('inputDivisionSimpleLoop','nested')
		this.changeClass('nestedLocalI', 'nestedlocalVariableI')
		this.changeClass('nestedLocalJ', 'nestedlocalVariableJ')
		this.changeClass('nestedLocalK', 'nestedlocalVariableK')
		this.changeClass('simpleLocalI', 'hide')
		this.changeClass('simpleLocalFact', 'hide')
	},
	switchMultipleDivForSimpleLoop: function() {
		this.replaceDiv('nested','inputDivisionSimpleLoop')
		this.changeClass('nestedLocalI', 'hide')
		this.changeClass('nestedLocalJ', 'hide')
		this.changeClass('nestedLocalK', 'hide')
		this.changeClass('simpleLocalI', 'localVariableI')
		this.changeClass('simpleLocalFact', 'localVariableFact')
	},
	changeClass: function(id, className) {
		document.getElementById(id).className = className
	},
 	disableButton: function(buttonId) {
		document.getElementById(buttonId).disabled = true
	},
	enableButton: function(buttonId) {
		document.getElementById(buttonId).disabled = false
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
	getSelectedLoop: function() {
		var listOfLoop = document.getElementById('loopList')
		var selectedLoop = listOfLoop.options[listOfLoop.selectedIndex].text
		return selectedLoop
	},
	displayLoop: function(loopId, firstStatementId) {
		var node = document.getElementById(loopId)
		var allChild = node.childNodes
		for( i = 1 ; i < allChild.length ; i+=2)	
		{
			if( allChild[i].id === firstStatementId)
			this.changeClass(allChild[i].id, 'showDivInRed')
			else
			this.changeClass(allChild[i].id, 'showDiv')	
		}
	},
	hideLoop: function(loopId) {
		var node = document.getElementById(loopId)
		var allChild = node.childNodes
		for( i = 1 ; i < allChild.length ; i+=2)	
		{
			this.changeClass(allChild[i].id, 'hide')	
		}
	},
	clearExecutionSection: function() {
		this.hideLoop('forLoopContent')
		this.hideLoop('whileLoopContent')
		this.hideLoop('dowhileLoopContent')
		this.hideLoop('nestedLoopContent')
	},
	printSpace: function() {
		document.getElementById('resultDisplay').innerHTML += '_'
	},
	printStar: function() {
		document.getElementById('resultDisplay').innerHTML += '*'
		this.highlightNextStep()
	},
	insertNewLine: function() {
		document.getElementById('resultDisplay').innerHTML += '<br>'
		this.nextRedDiv = this.jumpTo('codeContentNested20')
		this.highlightNextStep()
		this.n++
		this.i++
		this.resetVariables()
		this.copy--
	},
	resetVariables: function() {
		this.j = 1
		this.m = 1
		this.k = 0
	},
	resultDisplay: function(previousState, currentState, nextState) {
		document.getElementById('resultDisplay').innerHTML += previousState + ' ' + '*' + ' ' + currentState + '=' + ' ' + nextState + '<br>'
		document.getElementById('localVariableI').innerHTML = currentState
		document.getElementById('localVariableFact').innerHTML = nextState
	},
	clearDivs: function() {
		document.getElementById('resultDisplay').innerHTML = ''
		document.getElementById('nestedlocalVariableI').innerHTML = ''
    	document.getElementById('nestedlocalVariableJ').innerHTML = ''
    	document.getElementById('nestedlocalVariableK').innerHTML = ''
    	document.getElementById('localVariableI').innerHTML = ''
    	document.getElementById('localVariableFact').innerHTML = ''
	},
    startBtn: function() {
    	this.getInput()
    	this.clearDivs()
    	var selected_loop = this.getSelectedLoop()
		var inputValue = document.getElementById('simpleLoopInput').value
		if (selected_loop === 'for' && inputValue !== '' && !isNaN(model.inp) )
		{
			this.displayLoop('forLoopContent', 'codeContentFor1')
		}
		if (selected_loop === 'while' && inputValue !== '' && !isNaN(model.inp))
		{
			this.displayLoop('whileLoopContent', 'codeContentWhile1')
		}
		if (selected_loop === 'do-while' && inputValue !== '' && !isNaN(model.inp))
		{
		 	this.displayLoop('dowhileLoopContent', 'codeContentDoWhile1')
		}
		this.disableButton('btnStart')
		this.enableButton('btnNext')
	},
	updateModelAndShowResult: function() {
		if( model.inp >= 1)
		{	
			this.disp = model.fact
			model.computeNextFact()
			this.resultDisplay(this.disp, model.inp, model.fact)
			model.inp --
		}
	},
	highlightNextStep: function() {
		this.changeClass(this.lastRedDiv.id, 'showDiv')
		this.changeClass(this.nextRedDiv.id, 'showDivInRed')
	},
	processSimpleLoopStep: function(loopHeadId) {
		this.updateModelAndShowResult()					
		this.nextRedDiv = this.jumpTo(loopHeadId)
		this.highlightNextStep()
	},
	endTheSimpleLoopCode: function() {
		alert('code running is over')
		clearInterval(this.stampSimple)
		this.disableButton('btnNext')
		this.enableButton('btnStart')
	},
	endTheNestedLoopCode: function() {
		alert('code running is over')
		clearInterval(this.stampNested)
		this.nextRedDiv = this.jumpTo('codeContentNested22')
		this.highlightNextStep()
		this.i = 1
		this.n = 0
		this.disableButton('nestedNextBtn')
		this.enableButton('nestedStartBtn')
	},
	nextBtn: function () {
		this.lastRedDiv = this.getLastHighlightedDiv()
		this.nextRedDiv = this.getNextDivToHighlight(this.lastRedDiv)
		if( model.inp === 0 )
		{	
			if( this.lastRedDiv.id !== 'codeContentFor6' && this.lastRedDiv.id !== 'codeContentWhile6' && this.lastRedDiv.id !== 'codeContentDoWhile7' )
				this.highlightNextStep()		
			else
			{	
				this.endTheSimpleLoopCode()			
				this.changeClass(this.lastRedDiv.id, 'showDiv')
			}
		}	
		else
		{	
			if( this.lastRedDiv.id === 'codeContentFor4' || this.lastRedDiv.id === 'codeContentWhile4' || this.lastRedDiv.id === 'codeContentDoWhile5')
			{
				this.nextRedDiv = this.getNextDivToHighlight(this.nextRedDiv)
				this.nextRedDiv = this.getNextDivToHighlight(this.nextRedDiv)
				this.highlightNextStep()
			}
			else
			{
				if ( this.lastRedDiv.id === 'forLoopTail' )
					this.processSimpleLoopStep('forLoopHead')
				if ( this.lastRedDiv.id === 'whileLoopTail' )
					this.processSimpleLoopStep('whileLoopHead')
				if ( this.lastRedDiv.id === 'dowhileLoopTail' )
					this.processSimpleLoopStep('dowhileLoopHead')
				if( model.inp < 1 )
				{
					this.endTheSimpleLoopCode()
		 			this.changeClass(this.nextRedDiv.id, 'showDiv')
		 			model.init()
				}	
				else
					this.highlightNextStep()
			}
		}
	},
	startBtnNested: function() {
		this.getNestedInput()
		this.clearDivs()
		var inputValue = document.getElementById('nestedLoopInput').value
		if ( inputValue !== '' && !isNaN(model.nestedInp) )
		{
			this.displayLoop('nestedLoopContent', 'codeContentNested1')
			document.getElementById('resultDisplay').innerHTML += '<br>'
			this.copy = model.nestedInp
			this.disableButton('nestedStartBtn')
			this.enableButton('nestedNextBtn')
		}	
	},	
	processNestedLoopStep: function(stepId) {
		this.nextRedDiv = this.jumpTo(stepId)	
		this.highlightNextStep()
	},
	printSpacesInFirstHalf: function() {
		this.processNestedLoopStep('codeContentNested6')
		this.j ++
		this.printSpace()
	},
	printSpacesInSecondHalf: function() {
		this.processNestedLoopStep('codeContentNested16')	
		this.m ++
		this.printSpace()
	},
	displayLocalVariableI: function() {
		document.getElementById('nestedlocalVariableI').innerHTML = this.i - 1
		this.highlightNextStep()
	},
	displayLocalVariableJ: function(val) {
		document.getElementById('nestedlocalVariableJ').innerHTML = val - 1
		this.highlightNextStep()
	},
	displayLocalVariableK: function() {
		document.getElementById('nestedlocalVariableK').innerHTML = this.j - 1 
		this.highlightNextStep()
		this.k++
		this.j++
	},
	nextBtnNested: function() {
		this.lastRedDiv = this.getLastHighlightedDiv()
		this.nextRedDiv = this.getNextDivToHighlight(this.lastRedDiv)
		if ( model.nestedInp === 0 )
		{
			if( this.lastRedDiv.id !== 'codeContentNested4' )
		 		this.highlightNextStep()
		 	else
		 		this.processNestedLoopStep('codeContentNested21')
		 	if ( this.lastRedDiv.id === 'codeContentNested21' )
		 		alert('code running is over')
		}
		else
		{	
			if( this.lastRedDiv.id === 'codeContentNested9' && this.j < this.copy )
				this.printSpacesInFirstHalf()		
			else if( this.lastRedDiv.id === 'codeContentNested6' && this.j < this.copy )
				this.displayLocalVariableJ(this.j)		
			else if( this.lastRedDiv.id === 'codeContentNested6' && this.j >= this.copy )
				this.processNestedLoopStep('codeContentNested10')
			else if( this.lastRedDiv.id === 'codeContentNested10' )
			{
				if( this.k < this.n )
					this.displayLocalVariableK()				
				else
					this.processNestedLoopStep('codeContentNested15')
			}
			else if( this.lastRedDiv.id === 'codeContentNested12' )
				this.printStar()
			else if( this.lastRedDiv.id === 'codeContentNested13' )
			{
				this.printSpace()
				this.highlightNextStep()
			}	
			else if( this.lastRedDiv.id === 'codeContentNested14' )
				this.processNestedLoopStep('codeContentNested10')
			else if( this.lastRedDiv.id === 'codeContentNested15' )
				this.printStar()
			else if( this.lastRedDiv.id === 'codeContentNested19' && this.m < this.copy )
				this.printSpacesInSecondHalf()
			else if( this.lastRedDiv.id === 'codeContentNested16' && this.m < this.copy )
				this.displayLocalVariableJ(this.m)
			else if( this.lastRedDiv.id === 'codeContentNested16' && this.m >= this.copy )
				this.insertNewLine()
			else if( this.lastRedDiv.id === 'codeContentNested4' )
			{
				if( this.i <= model.nestedInp )
					this.displayLocalVariableI()			
				else
					this.endTheNestedLoopCode()
			}
			else if ( this.lastRedDiv.id === 'codeContentNested21' )
				this.processNestedLoopStep('codeContentNested4')
			else
				this.highlightNextStep()			
		}
	},
	init: function() {
		this.activateEvents()
	}
}
window.onload = function() { view.init() }