window.model = {
	textBox1: '',
	textBox2: '',
	textBox3: '', 
	textBox4: '', 
	textBox5: '', 
	textBox6: '', 
	textBox7: '',
	parameter1: '',
	parameter2: '',
	parameter3: '',
	parameter4: '',
	parameter5: '',
	parameter6: '',
	parameter7: '',
	areaFromTextBox1: 0,
	areaFromTextBox2: 0,
	areaFromTextBox3: 0,
	areaFromTextBox4: 0,
	areaFromTextBox5: 0,
	areaFromTextBox6: 0,
	areaFromTextBox7: 0,
	totalArea: 0,
	calculateArea: function() {
		this.areaFromTextBox1 = this.calculateAreaFromTextBox(this.textBox1, this.parameter1, 'incorrect function call at line 1')
		this.areaFromTextBox2 = this.calculateAreaFromTextBox(this.textBox2, this.parameter2, 'incorrect function call at line 2')
		this.areaFromTextBox3 = this.calculateAreaFromTextBox(this.textBox3, this.parameter3, 'incorrect function call at line 3')
		this.areaFromTextBox4 = this.calculateAreaFromTextBox(this.textBox4, this.parameter4, 'incorrect function call at line 4')
		this.areaFromTextBox5 = this.calculateAreaFromTextBox(this.textBox5, this.parameter5, 'incorrect function call at line 5')
		this.areaFromTextBox6 = this.calculateAreaFromTextBox(this.textBox6, this.parameter6, 'incorrect function call at line 6')
		this.areaFromTextBox7 = this.calculateAreaFromTextBox(this.textBox7, this.parameter7, 'incorrect function call at line 7')
		this.totalArea = this.areaFromTextBox1+
						 this.areaFromTextBox2+
						 this.areaFromTextBox3+
						 this.areaFromTextBox4+
						 this.areaFromTextBox5+
						 this.areaFromTextBox6+
						 this.areaFromTextBox7
		if ( typeof(this.totalArea) ===	'number' )
			alert(this.totalArea)				 				 
	},
	calculateAreaFromTextBox: function(textBox, parameter, error) {
		var array = new Array()
		array = parameter.split(',')
		if ( array.length === 1 )
		{
			var a = Number(array[0])
			if ( isNaN(a) )
			{	
				alert(error)
				return error
			}	
			else
			{	
				if ( textBox === 'area_sq()' )
					return a*a
				else if ( textBox === 'area_circle()' )
					return 3.14*a*a
				else if ( textBox === 'area_triangle()' )
					return 0.4330*a*a
				else
				{
					alert(error)
					return error
				}
			}
		}
		else if ( array.length === 2 && textBox === 'area_rect()' )
			{
				var array = new Array()
				array = parameter.split(',')
				var a = Number(array[0])
				var b = Number(array[1])
				if ( isNaN(a) || isNaN(b) )
				{
					alert(error)
					return error
				}
				else
					return a*b
			}
		else
		{
			alert(error)
			return error	
		}
	}
}

window.view = {
	figure: 'square',
	answer1: '',
	answer2: '',
	answer3: '',
	answer4: '',
	errorMsg1: '',
	errorMsg2: '',
	errorMsg3: '',
	errorMsg4: '',
	i: 1,
	userInput: [],
	disableButton: function(buttonId) {
		document.getElementById(buttonId).disabled = true
	},
	enableButton: function(buttonId) {
		document.getElementById(buttonId).disabled = false
	},
	init: function() {
		this.activateClicks()
	},
	takeInputsFromTextBoxes: function() {
		for( this.i ; this.i <= 7 ; this.i++ )
		{
			var a = document.getElementById('textBox'+String(this.i)).value
			this.userInput.push(a)
		}
		this.setValuesOfTextBoxes()
		this.removeSpacesFromUserInputs()
		this.separateFunctionAndParameterForTextBox1()
		this.separateFunctionAndParameterForTextBox2()
		this.separateFunctionAndParameterForTextBox3()
		this.separateFunctionAndParameterForTextBox4()
		this.separateFunctionAndParameterForTextBox5()
		this.separateFunctionAndParameterForTextBox6()
		this.separateFunctionAndParameterForTextBox7()
		model.calculateArea()
	},
	update: function(textBox) {
		var a = textBox.indexOf('(')
		var b = textBox.indexOf(')')
		var c = []
		param = textBox.substring(a+1, b)
		textBox = textBox.replace(param, '')
		c.push(textBox, param)
		return c
	},
	separateFunctionAndParameterForTextBox1: function() {
		var a = this.update(model.textBox1)
		model.textBox1 = a[0]
		model.parameter1 = a[1]
	},
	separateFunctionAndParameterForTextBox2: function() {
		var a = this.update(model.textBox2)
		model.textBox2 = a[0]
		model.parameter2 = a[1]
	},
	separateFunctionAndParameterForTextBox3: function() {
		var a = this.update(model.textBox3)
		model.textBox3 = a[0]
		model.parameter3= a[1]
	},
	separateFunctionAndParameterForTextBox4: function() {
		var a = this.update(model.textBox4)
		model.textBox4 = a[0]
		model.parameter4 = a[1]
	},
	separateFunctionAndParameterForTextBox5: function() {
		var a = this.update(model.textBox5)
		model.textBox5 = a[0]
		model.parameter5 = a[1]
	},
	separateFunctionAndParameterForTextBox6: function() {
		var a = this.update(model.textBox6)
		model.textBox6 = a[0]
		model.parameter6 = a[1]
	},
	separateFunctionAndParameterForTextBox7: function() {
		var a = this.update(model.textBox7)
		model.textBox7 = a[0]
		model.parameter7 = a[1]
	},
	setValuesOfTextBoxes: function() {
		model.textBox1 = this.userInput[0]
		model.textBox2 = this.userInput[1]
		model.textBox3 = this.userInput[2]
		model.textBox4 = this.userInput[3]
		model.textBox5 = this.userInput[4]
		model.textBox6 = this.userInput[5]
		model.textBox7 = this.userInput[6]
	},
	removeSpacesFromUserInputs: function() {
		model.textBox1 = model.textBox1.replace(/\s/g, '')
		model.textBox2 = model.textBox2.replace(/\s/g, '')
		model.textBox3 = model.textBox3.replace(/\s/g, '')
		model.textBox4 = model.textBox4.replace(/\s/g, '')
		model.textBox5 = model.textBox5.replace(/\s/g, '')
		model.textBox6 = model.textBox6.replace(/\s/g, '')
		model.textBox7 = model.textBox7.replace(/\s/g, '')
	},
	activateClicks: function() {
		this.addClickEvent('btnOKSquare', function() { view.validateInputsForSquare() })
		this.addClickEvent('btnProceedSquare', function() { view.goToRectangle() })
		this.addClickEvent('btnOKRectangle', function() { view.validateInputsForRectangle() })
		this.addClickEvent('btnProceedRectangle', function() { view.goToTriangle() })
		this.addClickEvent('btnOKTriangle', function() { view.validateInputsForTriangle() })
		this.addClickEvent('btnProceedTriangle', function() { view.goToCircle() })
		this.addClickEvent('btnOKCircle', function() { view.validateInputsForCircle() })
		this.addClickEvent('btnProceedCircle', function() { view.goToComplexImage() })
		this.addClickEvent('btnExecute', function() { view.takeInputsFromTextBoxes() })
	},
	validateAnswers: function(radioButtonId ,errorMsg) {
		var element = document.getElementById(radioButtonId)
		if( element.checked )
			1===1
		else
			alert(errorMsg)
	},
	validateInputsForSquare: function() {
		this.correctAnswersForSquare()
		this.validateAnswers(this.answer1, this.errorMsg1)
		this.validateAnswers(this.answer2, this.errorMsg2)
		this.validateAnswers(this.answer3, this.errorMsg3)
		this.validateAnswers(this.answer4, this.errorMsg4)
	},
	validateInputsForRectangle: function() {
		this.correctAnswersForRectangle()
		this.validateAnswers(this.answer1, this.errorMsg1)
		this.validateAnswers(this.answer2, this.errorMsg2)
		this.validateAnswers(this.answer3, this.errorMsg3)
		this.validateAnswers(this.answer4, this.errorMsg4)
	},
	validateInputsForTriangle: function() {
		this.correctAnswersForTriangle()
		this.validateAnswers(this.answer1, this.errorMsg1)
		this.validateAnswers(this.answer2, this.errorMsg2)
		this.validateAnswers(this.answer3, this.errorMsg3)
		this.validateAnswers(this.answer4, this.errorMsg4)
	},
	validateInputsForCircle: function() {
		this.correctAnswersForCircle()
		this.validateAnswers(this.answer1, this.errorMsg1)
		this.validateAnswers(this.answer2, this.errorMsg2)
		this.validateAnswers(this.answer3, this.errorMsg3)
		this.validateAnswers(this.answer4, this.errorMsg4)
	},
	correctAnswersForSquare: function () {
		if ( this.figure === 'square' )
		{
			this.answer1 = 'radio_group1Option1'
			this.answer2 = 'radio_group2Option2'
			this.answer3 = 'radio_group3Option2'
			this.answer4 = 'radio_group4Option1'
			this.errorMsg1 = 'Incorrect value of input variables(arguments). Calculating the area of a square only requires the length of the side of the square. Try again.'
			this.errorMsg2 = 'Incorrect datatype of input variables(arguments). The value of the side of a square need not be an integer. Try again.'
			this.errorMsg3 = 'Incorrect datatype for return type. The value of the area of a square need not be an integer. Try again.'
			this.errorMsg4 = 'Incorrect formula for calculating the area of a square. Try again.'
		}
	},
	correctAnswersForRectangle: function () {
		if ( this.figure === 'rectangle' )
		{
			this.answer1 = 'radio_group5Option2'
			this.answer2 = 'radio_group6Option2'
			this.answer3 = 'radio_group7Option2'
			this.answer4 = 'radio_group8Option2'
			this.errorMsg1 = 'Incorrect value of input variables(arguments). Calculating the area of a rectangle requires the length of the two different parallel sides of the rectangle. Try again.'
			this.errorMsg2 = 'Incorrect datatype of input variables(arguments). The value of the sides of a rectangle need not be integers. Try again.'
			this.errorMsg3 = 'Incorrect datatype for return type. The value of the area of a rectangle need not be an integer. Try again.'
			this.errorMsg4 = 'Incorrect formula for calculating the area of a rectangle. Try again.'
		}
	},
	correctAnswersForTriangle: function () {
		if ( this.figure === 'triangle' )
		{
			this.answer1 = 'radio_group9Option1'
			this.answer2 = 'radio_group10Option2'
			this.answer3 = 'radio_group11Option2'
			this.answer4 = 'radio_group12Option3'
			this.errorMsg1 = 'Incorrect value of input variables(arguments). Calculating the area of an equilateral triangle only requires the length of one of the sides of the triangle. Try again.'
			this.errorMsg2 = 'Incorrect datatype of input variables(arguments). The value of the side of an equilateral triangle need not be an integer. Try again.'
			this.errorMsg3 = 'Incorrect datatype for return type. The value of the area of an equilateral triangle need not be an integer. Try again.'
			this.errorMsg4 = 'Incorrect formula for calculating the area of an equilateral triangle. Try again.'
		}
	},
	correctAnswersForCircle: function () {
		if ( this.figure === 'circle' )
		{
			this.answer1 = 'radio_group13Option1'
			this.answer2 = 'radio_group14Option2'
			this.answer3 = 'radio_group15Option2'
			this.answer4 = 'radio_group16Option2'
			this.errorMsg1 = 'Incorrect value of input variables(arguments). Calculating the area of circle only requires the radius. Try again.'
			this.errorMsg2 = 'Incorrect datatype of input variables(arguments). The value of the radius of the circle need not be an integer. Try again.'
			this.errorMsg3 = 'Incorrect datatype for return type. The value of the area of the circle need not be an integer. Try again.'
			this.errorMsg4 = 'Incorrect formula for calculating the area of a circle. Try again.'
		}
	},
	goToRectangle: function() {
		if ( this.answer1 === 'radio_group1Option1' &&
			this.answer2 === 'radio_group2Option2' &&
			this.answer3 === 'radio_group3Option2' &&
			this.answer4 === 'radio_group4Option1' )
		{
			this.disableButton('btnOKSquare')
			this.enableButton('btnOKRectangle')
			this.disableButton('btnProceedSquare')
			this.enableButton('btnProceedRectangle')
			this.displayFunctionForSquare()
			this.figure = 'rectangle'
		}
		else
			alert('choose correct answers before proceeding to next figure')
	},
	goToTriangle: function() {
		if ( this.answer1 === 'radio_group5Option2' &&
			this.answer2 === 'radio_group6Option2' &&
			this.answer3 === 'radio_group7Option2' &&
			this.answer4 === 'radio_group8Option2')
		{
			this.disableButton('btnOKRectangle')
			this.enableButton('btnOKTriangle')
			this.disableButton('btnProceedRectangle')
			this.enableButton('btnProceedTriangle')
			this.displayFunctionForRectangle()
			this.figure = 'triangle'
		}
		else
			alert('choose correct answers before proceeding to next figure')
	},
	goToCircle: function() {
		if ( this.answer1 === 'radio_group9Option1' &&
			this.answer2 === 'radio_group10Option2' &&
			this.answer3 === 'radio_group11Option2' &&
			this.answer4 === 'radio_group12Option3')
		{
			this.disableButton('btnOKTriangle')
			this.enableButton('btnOKCircle')
			this.disableButton('btnProceedTriangle')
			this.enableButton('btnProceedCircle')
			this.displayFunctionForTriangle()
			this.figure = 'circle'
		}
		else
			alert('choose correct answers before proceeding to next figure')
	},
	goToComplexImage: function() {
		if ( this.answer1 === 'radio_group13Option1' &&
			this.answer2 === 'radio_group14Option2' &&
			this.answer3 === 'radio_group15Option2' &&
			this.answer4 === 'radio_group16Option2' )
		{
			this.disableButton('btnOKCircle')
			this.disableButton('btnProceedCircle')
			this.displayFunctionForCircle()
			this.hideAndShow('idSquare', 'hide')
			this.hideAndShow('idRectangle', 'hide')
			this.hideAndShow('idTriangle', 'hide')
			this.hideAndShow('idCircle', 'hide')
			this.hideAndShow('idInputSection', 'hide')
			this.resizeImage('200%', '200%')
			this.hideAndShow('idFigure', 'show')
			this.hideAndShow('idMainProgram', 'show')
			this.figure = 'complex'
		}
		else
			alert('choose correct answers before proceeding to next figure')
	},
	displayFunctionForSquare: function() {
		document.getElementById('functionSquare').innerHTML = 'float area_sq(float a){<br>float area = a*a;<br>return area;<br>}'
	},
	displayFunctionForRectangle: function() {
		document.getElementById('functionRectangle').innerHTML = 'float area_rect(float a,float b){<br>float area = a*b;<br>return area;<br>}'
	},
	displayFunctionForTriangle: function() {
		document.getElementById('functionTriangle').innerHTML = 'float area_triangle(float a){<br>float area = (sqrt(3)/4.0)*a*a;<br>return area;<br>}'
	},
	displayFunctionForCircle: function() {
		document.getElementById('functionCircle').innerHTML = 'float area_circle(float a){<br>float area = 3.14*a*a;<br>return area;<br>}'
	},
	addClickEvent: function(id, method) {
		var element = document.getElementById(id)
		element.addEventListener('click', method, false)
	},
	hideAndShow: function(id, className) {
		document.getElementById(id).className = className
	},
	resizeImage: function(height, width) {
		var element = document.getElementById('idFigure')
		element.style.height = height
		element.style.width = width
	}
}
window.onload = function() { view.init() }