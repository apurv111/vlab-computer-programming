window.model = {
	inp: 0,
    fact: 1,
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
	jumpToExitLoop: function(lastHighlightedDiv) {
		var next = lastHighlightedDiv.nextSibling
		for( i = 1 ; i <= 39 ; i++ )
			{
				next = next.nextSibling
			} 
		return next
	},
	goToForLoopHead: function(lastHighlightedDiv) {
		var previous = lastHighlightedDiv.previousSibling
		for( i = 1 ; i <= 5 ; i++ )
		{
			previous = previous.previousSibling
		}
		return previous
	},
	goToWhileLoopHead: function(lastHighlightedDiv) {
		var previous = lastHighlightedDiv.previousSibling
		for( i = 1 ; i <= 7 ; i++ )
		{
			previous = previous.previousSibling
		} 
		return previous
	},
	getSelectedLoop: function() {
		var list_of_loop = document.getElementById('loop_list')
		var selected_loop = list_of_loop.options[list_of_loop.selectedIndex].text
		return selected_loop
	},
    startBtn: function() {
		document.getElementById('div221').innerHTML+="<br>"
		var selected_loop = this.getSelectedLoop()
		var inputValue = document.getElementById("inputValue").value
		if (selected_loop === "for" && inputValue !== "" && !isNaN(this.inp) )
		{
		 	var node = document.getElementById("forLoopContent")
			var allChild = node.childNodes

		 		for( i = 1 ; i < allChild.length ; i+=2)	
				{
					if( allChild[i].id === 'codeContentFor1')
					this.changeClass(allChild[i].id,'showDivInRed')

					else
					this.changeClass(allChild[i].id,"showDiv")	
				}
		}
		if (selected_loop === "while" && inputValue !== "" && !isNaN(this.inp))
		{
		 	var node = document.getElementById("whileLoopContent")
			var allChild = node.childNodes

		 		for( i = 1 ; i < allChild.length ; i+=2)	
				{
					if( allChild[i].id === 'codeContentWhile1')
					this.changeClass(allChild[i].id,'showDivInRed')

					else
					this.changeClass(allChild[i].id,"showDiv")	
				}
		}
		if (selected_loop === "do-while" && inputValue !== "" && !isNaN(this.inp))
		{
		 	var node = document.getElementById("dowhileLoopContent")
			var allChild = node.childNodes

		 		for( i = 1 ; i < allChild.length ; i+=2)	
				{
					if( allChild[i].id === 'codeContentDoWhile1')
					this.changeClass(allChild[i].id,'showDivInRed')

					else
					this.changeClass(allChild[i].id,"showDiv")	
				}
		}
				this.disableButton('btnStart')
		 		this.enableButton('btnNext')
	},	 
	nextBtn: function () {
		var selected_loop = this.getSelectedLoop()
		var lastRedDiv = this.getLastHighlightedDiv()
		var nextRedDiv = this.getNextDivToHighlight(lastRedDiv)
		
		var i = this.inp
		if( this.inp === 0 )
		{	
			if( lastRedDiv.id !== 'codeContentFor6' && lastRedDiv.id !== 'codeContentWhile6' && lastRedDiv.id !== 'codeContentDoWhile7' )
			{
				this.changeClass(lastRedDiv.id,'showDiv')
				this.changeClass(nextRedDiv.id,'showDivInRed')
			}	
			else
			{	
				alert('code running is over')
				this.disableButton('btnNext')
				this.enableButton('btnStart')
				this.changeClass(lastRedDiv.id,'showDiv')
			}
		}	
		else
		{	
			if( lastRedDiv.id === 'codeContentFor4' || lastRedDiv.id === 'codeContentWhile4' || lastRedDiv.id === 'codeContentDoWhile5')
			{
				nextRedDiv = this.getNextDivToHighlight(nextRedDiv)
				nextRedDiv = this.getNextDivToHighlight(nextRedDiv)
				this.changeClass(lastRedDiv.id,'showDiv')
				this.changeClass(nextRedDiv.id,'showDivInRed')
			}
			else
			{
				if (lastRedDiv.id === 'forLoopTail')
				{	
					for( i = this.inp ; i >= 1 ; i--)
					{
						var disp = this.fact
						this.fact = this.fact*i
						break
					}
					nextRedDiv = this.goToForLoopHead(lastRedDiv)
					this.changeClass(lastRedDiv.id,'showDiv')
					this.changeClass(nextRedDiv.id,'showDivInRed')
					document.getElementById('div221').innerHTML+=disp+" "+"*"+" "+this.inp+"="+" "+this.fact+"<br>"
					document.getElementById("localVariablesI").innerHTML= "i="+" "+" "+" "+this.inp
					document.getElementById("localVariablesFact").innerHTML= "fact="+" "+" "+" "+this.fact
					this.inp--
				}	
				if (lastRedDiv.id === 'whileLoopTail')
				{	
					while( i >= 1 )
					{
						var disp = this.fact
						this.fact = this.fact*i
						i--
						break
					}	
					nextRedDiv = this.goToWhileLoopHead(lastRedDiv)
					this.changeClass(lastRedDiv.id,'showDiv')
					this.changeClass(nextRedDiv.id,'showDivInRed')
					document.getElementById('div221').innerHTML+=disp+" "+"*"+" "+this.inp+"="+" "+this.fact+"<br>"
					document.getElementById("localVariablesI").innerHTML= "i="+" "+" "+" "+this.inp
					document.getElementById("localVariablesFact").innerHTML= "fact="+" "+" "+" "+this.fact
					this.inp--
				}	
				if (lastRedDiv.id === 'dowhileLoopTail')
				{	
					do 
					{
						var disp = this.fact
						this.fact = this.fact*i
						i--
						break
					}while( i >= 1)

					nextRedDiv = this.goToWhileLoopHead(lastRedDiv)
					this.changeClass(lastRedDiv.id,'showDiv')
					this.changeClass(nextRedDiv.id,'showDivInRed')
					document.getElementById('div221').innerHTML+=disp+" "+"*"+" "+this.inp+"="+" "+this.fact+"<br>"
					document.getElementById("localVariablesI").innerHTML= "i="+" "+" "+" "+this.inp
					document.getElementById("localVariablesFact").innerHTML= "fact="+" "+" "+" "+this.fact
					this.inp--
				}	
				if( this.inp < 1 )
				{
					alert("code running is over")
					this.changeClass(nextRedDiv.id,'showDiv')
					this.disableButton('btnNext')
		 			this.enableButton('btnStart')
				}	
					
				
				else
				{	
					this.changeClass(lastRedDiv.id,'showDiv')
					this.changeClass(nextRedDiv.id,'showDivInRed')
				}
			}
			
		}
	},
	startBtnNested: function() {
		var inputValue = document.getElementById("nestedInput").value
		if ( inputValue !== "" && !isNaN(window.nestedInp))
		{
			var node = document.getElementById("nestedLoopContent");
			var allChild = node.childNodes

		 		for( i = 1 ; i < allChild.length ; i+=2)	
				{
					if( allChild[i].id === 'codeContentNested1')
					this.changeClass(allChild[i].id,'showDivInRed')

					else
					this.changeClass(allChild[i].id,"showDiv")	
				}
		}	
	},	
	nextBtnNested: function() {
		document.getElementById('div221').innerHTML+="<br>"
		var lastRedDiv = this.getLastHighlightedDiv()
		var nextRedDiv = this.getNextDivToHighlight(lastRedDiv)
		
		if ( window.nestedInp === 0 )
		{
			if( lastRedDiv.id !== 'codeContentNested4' )
			{
				this.changeClass(lastRedDiv.id,'showDiv')
				this.changeClass(nextRedDiv.id,'showDivInRed')
			}	
			else
			{	
				nextRedDiv = this.jumpToExitLoop(lastRedDiv)	
				this.changeClass(nextRedDiv.id,'showDivInRed')
				this.changeClass(lastRedDiv.id,'showDiv')
			}
			if( nextRedDiv.id === 'codeContentNested25' )	
			{	
				alert("code running is over")
				this.changeClass(nextRedDiv.id,'showDiv')
			}	
		} 
	}	
}

window.view = {
	addClickEvent: function(id, method) {
		var element = document.getElementById(id)
		element.addEventListener('click', method, false)
	},
	addEventOnInputBox: function(id, method) {
		var element = document.getElementById(id)
		element.addEventListener('change', method, false)
	},
	mySwitchFunction: function(x, y) {
 		document.getElementById(x).style.display="none"
 		document.getElementById(y).style.display="block" 
 	},
	getInput: function() {
		var inputValue = document.getElementById("inputValue").value
		window.model.inp = Number(inputValue)
		 
	},
	getNestedInput: function() {
		var inputValue = document.getElementById("nestedInput").value
		window.nestedInp = Number(inputValue)
	},
	activateEvents: function() {
		this.addClickEvent('btnNext', function() { window.model.nextBtn() })
		this.addClickEvent('btnStart', function() { window.model.startBtn() })
		this.addClickEvent('nestedStartBtn', function() { window.model.startBtnNested() })
		this.addClickEvent('nestedNextBtn', function() { window.model.nextBtnNested() })
		this.addClickEvent('nestedLoop', function() { window.view.mySwitchFunction('div1-body','nested') })
		this.addClickEvent('localVariables', function() { window.view.mySwitchFunction('div1-body','show') })
		this.addClickEvent('initialize', function() { window.view.mySwitchFunction('show','div1-body') })
		this.addClickEvent('simpleLoop', function() { window.view.mySwitchFunction('nested','div1-body') })
		this.addEventOnInputBox('inputValue', function() { window.view.getInput() })
		this.addEventOnInputBox('nestedInput', function() { window.view.getNestedInput() })
	},
	init: function() {
		this.activateEvents()
	}
}	


window.onload = function() { window.view.init() }



