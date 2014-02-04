window.model = {
inputNumber: 0,
valueOfX: 210,
valueOfY: 210,
}

window.view = {
	addClickEvent: function (id, method) {
		var element = document.getElementById(id);
		element.addEventListener('click', method, false);
	},

	activateEvents: function() {
		this.addClickEvent('radio_buttton_1', function() { view.displayDayValue(this.value) });
		this.addClickEvent('radio_buttton_2', function() { view.displayDayValue(this.value) });
		this.addClickEvent('radio_buttton_3', function() { view.displayDayValue(this.value) });
		this.addClickEvent('radio_buttton_4', function() { view.displayDayValue(this.value) });
		this.addClickEvent('radio_buttton_5', function() { view.displayDayValue(this.value) });
		this.addClickEvent('radio_buttton_6', function() { view.displayDayValue(this.value) });
		this.addClickEvent('radio_buttton_7', function() { view.displayDayValue(this.value) });
		this.addClickEvent('submitDayButton', function() { view.getTextFieldValue() });
		this.addClickEvent('drop_down_list', function() { view.functionSwitchifelse() });
		this.addClickEvent('drop_down_list1', function() { view.functionSwitchifelse() });
		this.addClickEvent('startButton', function() { view.startButton() });
		this.addClickEvent('nextButton', function() { view.nextButton() });
		this.addClickEvent('resetButton', function() { view.resetWindowButton() });
		this.addClickEvent('position_drop_down', function() { view.replaceDiv('control_flow_switch_experiment','Position_Point_control_flow') });
		this.addClickEvent('week_drop_down', function() { view.replaceDiv('Position_Point_control_flow','control_flow_switch_experiment') });
		this.addClickEvent('if_else_list', function() { view.replaceDiv('if_elseif_else_code','if_else_code') });
		this.addClickEvent('if_elseif_else_list', function() { view.replaceDiv('if_else_code','if_elseif_else_code') });
		this.addClickEvent('save_if', function() { view.saveButtonIf() });
		this.addClickEvent('edit_if', function() { view.editButtonIf() });
		this.addClickEvent('start_if', function() { view.startButtonIf() });
		this.addClickEvent('stop_if', function() { view.stopButtonIf() });
		this.addClickEvent('next_if', function() { view.nextButtonIf() });	
	},

	replaceDiv: function (x, y) {
 		document.getElementById(x).style.display = 'none'
 		document.getElementById(y).style.display = 'block'
 	},

 	
 	saveButtonIf: function () {
 		this.showButton('save_if', 'edit_if');
		this.disableElement('x_if');
		this.disableElement('y_if');
		this.getTextBoxValue('x_if', 'y_if');
		this.setInnerHtml('x_innerHTML', model.valueOfX);
		this.setInnerHtml('y_innerHTML', model.valueOfY);
 	},

 	editButtonIf: function () {
 		this.enableElement('x_if');
		this.enableElement('y_if');
		this.showButton('edit_if', 'save_if');
 	},

 	startButtonIf: function () {
 		this.showButton('start_if', 'stop_if');
		//this.disableElement('save_if');
		//this.disableElement('edit_if');
		//this.disableElement('loop_list_if');
		this.drawCircle(model.valueOfX, model.valueOfY);
		this.displayText('(x, y)', model.valueOfX + 10, model.valueOfY);
		this.enableElement('next_if');
		var selected_loop = this.getSelectedLoopIf('loop_list_if');
		if (selected_loop === 'if_else_list')
		{
			var firstChildId = this.getFirstChildNode('if_else_code');
			this.changeColorRed(firstChildId, 'redClass');
		}
		if (selected_loop === 'if_elseif_else_list')
		{
			var firstChildId = this.getFirstChildNode('if_elseif_else_code');
			this.changeColorRed(firstChildId, 'redClass');
		}
 	},

 	stopButtonIf: function () {
 		this.enableElement('save_if');
		this.enableElement('edit_if');
		this.showButton('stop_if', 'start_if');
		this.enableElement('loop_list_if');
		this.disableElement('next_if');
 	},

 	nextButtonIf: function() {
  		var selected_loop = this.getSelectedLoopIf('loop_list_if');
		if (selected_loop === 'if_else_list')
		{
			this.executionIfElse();
		}
		if (selected_loop === 'if_elseif_else_list')
		{
			this.executionIfElseIfElse();
		}
	},

	executionIfElse: function () {
		var currentChildId = this.lastNewAddClass('redClass');
		currentChildId = this.getNextChildNode(currentChildId);
		var nextChildId = this.getNextChildNode(currentChildId);
		var previousChildNodeId = this.getPreviousChildNode(currentChildId);
		
		if (currentChildId === 'codeContentIfElse_23' || currentChildId === 'codeContentIfElse_27')
		{
			this.changeColorRed('codeContentIfElse_28', 'redClass');
			this.removeColorRed(previousChildNodeId);
			alert('Code running is Over !');
		}
		else 
		{
			if (currentChildId === 'codeContentIfElse_2' || currentChildId === 'codeContentIfElse_3') 
			{
				this.changeColorRed(currentChildId, 'redClass');
				this.removeColorRed(previousChildNodeId);
			}

			if (currentChildId === 'codeContentIfElse_4' || nextChildId === 'codeContentIfElse_6') 
			{
				if (currentChildId === 'codeContentIfElse_4') 
				{
					this.changeColorRed(currentChildId, 'redClass');
					this.removeColorRed(previousChildNodeId);
				} 
				else if (model.valueOfX >= 100) 
				{
					this.changeColorRed('codeContentIfElse_6', 'redClass');
					this.removeColorRed(previousChildNodeId);
				}
				else
				{
					this.changeColorRed('codeContentIfElse_8', 'redClass');
					this.removeColorRed(previousChildNodeId);
				}

			}

			if (nextChildId === 'codeContentIfElse_8' || nextChildId === 'codeContentIfElse_10') 
			{
				if (nextChildId === 'codeContentIfElse_8') 
				{
					this.changeColorRed('codeContentIfElse_8', 'redClass');
					this.removeColorRed(previousChildNodeId);
				} 
				else if (model.valueOfX <= 350) 
				{
					this.changeColorRed('codeContentIfElse_10', 'redClass');
					this.removeColorRed(previousChildNodeId);
				}
				else
				{
					this.changeColorRed('codeContentIfElse_12', 'redClass');
					this.removeColorRed(previousChildNodeId);
				}
			}

			if (nextChildId === 'codeContentIfElse_12' || nextChildId === 'codeContentIfElse_14') 
			{
				if (nextChildId === 'codeContentIfElse_12') 
				{
					this.changeColorRed('codeContentIfElse_12', 'redClass');
					this.removeColorRed(previousChildNodeId);
				} 
				else if (model.valueOfY >= 100) 
				{
					this.changeColorRed('codeContentIfElse_14', 'redClass');
					this.removeColorRed(previousChildNodeId);
				}
				else
				{
					this.changeColorRed('codeContentIfElse_16', 'redClass');
					this.removeColorRed(previousChildNodeId);
				}
			}

			if (nextChildId === 'codeContentIfElse_16' || nextChildId === 'codeContentIfElse_18') 
			{
				if (nextChildId === 'codeContentIfElse_16') 
				{
					this.changeColorRed('codeContentIfElse_16', 'redClass');
					this.removeColorRed(previousChildNodeId);
				} 
				else if (model.valueOfY <= 400) 
				{
					this.changeColorRed('codeContentIfElse_18', 'redClass');
					this.removeColorRed(previousChildNodeId);
				}
				else
				{
					this.changeColorRed('codeContentIfElse_20', 'redClass');
					this.removeColorRed(previousChildNodeId);
				}
			}

			if (nextChildId === 'codeContentIfElse_20' || nextChildId === 'codeContentIfElse_22') 
			{
				if (nextChildId === 'codeContentIfElse_20') 
				{
					this.changeColorRed('codeContentIfElse_20', 'redClass');
					this.removeColorRed(previousChildNodeId);
				} 
				else if (model.valueOfX > 100 && model.valueOfX < 350 && model.valueOfY > 100 && model.valueOfY < 400) 
				{
					this.changeColorRed('codeContentIfElse_22', 'redClass');
					this.removeColorRed(previousChildNodeId);
				}
				else
				{
					this.changeColorRed('codeContentIfElse_24', 'redClass');
					this.removeColorRed(previousChildNodeId);
				}
			}

			if (nextChildId === 'codeContentIfElse_24' || nextChildId === 'codeContentIfElse_26') 
			{
				if (nextChildId === 'codeContentIfElse_24') 
				{
					this.changeColorRed('codeContentIfElse_24', 'redClass');
					this.removeColorRed(previousChildNodeId);
				} 
				else if (nextChildId === 'codeContentIfElse_26') 
				{
					this.changeColorRed('codeContentIfElse_26', 'redClass');
					this.removeColorRed(previousChildNodeId);
				}
			}
		}
	},

	executionIfElseIfElse: function () {
		var currentChildId = this.lastNewAddClass('redClass');
		currentChildId = this.getNextChildNode(currentChildId);
		var nextChildId = this.getNextChildNode(currentChildId);
		var previousChildNodeId = this.getPreviousChildNode(currentChildId);
		
		if (currentChildId === 'codeContentIfElseIfElse_2') 
		{
			this.changeColorRed(currentChildId, 'redClass');
			this.removeColorRed(previousChildNodeId);
		}

		if (currentChildId === 'codeContentIfElseIfElse_3') 
		{			
			this.changeColorRed('codeContentIfElseIfElse_3a', 'redClass');
			this.removeColorRed(previousChildNodeId);
		}

		if (currentChildId === 'codeContentIfElseIfElse_3b' && model.valueOfX < 100) 
		{			
			this.changeColorRed('codeContentIfElseIfElse_5', 'redClass');
			this.removeColorRed(previousChildNodeId);
		}

		if (currentChildId === 'codeContentIfElseIfElse_3b' && model.valueOfX > 350) 
		{			
			this.changeColorRed('codeContentIfElseIfElse_3c', 'redClass');
			this.removeColorRed(previousChildNodeId);
		}

		if (currentChildId === 'codeContentIfElseIfElse_3d' && model.valueOfX > 350) 
		{			
			this.changeColorRed('codeContentIfElseIfElse_5', 'redClass');
			this.removeColorRed(previousChildNodeId);
		}

		if (currentChildId === 'codeContentIfElseIfElse_3b' && (100 <= model.valueOfX) && (model.valueOfX <= 350)) 
		{
			this.changeColorRed('codeContentIfElseIfElse_3c', 'redClass');
			this.removeColorRed(previousChildNodeId);
		}
			
		if (currentChildId === 'codeContentIfElseIfElse_3d' && (100 <= model.valueOfX) && (model.valueOfX <= 350)) 
		{
			this.changeColorRed('codeContentIfElseIfElse_7a', 'redClass');
			this.removeColorRed(previousChildNodeId);
		}

		if (currentChildId === 'codeContentIfElseIfElse_7b' && model.valueOfY < 100) 
		{
			this.changeColorRed('codeContentIfElseIfElse_9', 'redClass');
			this.removeColorRed(previousChildNodeId);
		}

		if (currentChildId === 'codeContentIfElseIfElse_7b' && model.valueOfY > 400) 
		{
			this.changeColorRed('codeContentIfElseIfElse_7c', 'redClass');
			this.removeColorRed(previousChildNodeId);
		}
		
		if (currentChildId === 'codeContentIfElseIfElse_7d' && model.valueOfY > 400) 
		{
			this.changeColorRed('codeContentIfElseIfElse_9', 'redClass');
			this.removeColorRed(previousChildNodeId);
		}

		if (currentChildId === 'codeContentIfElseIfElse_7b' && (100 <= model.valueOfY) && (model.valueOfY <= 400)) 
		{
			this.changeColorRed('codeContentIfElseIfElse_7c', 'redClass');
			this.removeColorRed(previousChildNodeId);
		}

		if (currentChildId === 'codeContentIfElseIfElse_7d' && (100 <= model.valueOfX) && (model.valueOfX <= 350) && (100 <= model.valueOfY) && (model.valueOfY <= 400)) 
		{
			this.changeColorRed('codeContentIfElseIfElse_11', 'redClass');
			this.removeColorRed(previousChildNodeId);
		}

		if ((currentChildId === 'codeContentIfElseIfElse_12' || currentChildId === 'codeContentIfElseIfElse_14' || currentChildId === 'codeContentIfElseIfElse_16') && (100 <= model.valueOfX) && (model.valueOfX <= 350) && (100 <= model.valueOfY) && (model.valueOfY <= 400))
		{
			this.changeColorRed(nextChildId, 'redClass');
			this.removeColorRed(previousChildNodeId);
		}

		if (currentChildId ==='codeContentIfElseIfElse_6' || currentChildId ==='codeContentIfElseIfElse_10') 
		{
			this.changeColorRed('codeContentIfElseIfElse_15', 'redClass');
			this.removeColorRed(previousChildNodeId);
		}

		if (currentChildId === 'codeContentIfElseIfElse_16' && !((100 <= model.valueOfX) && (model.valueOfX <= 350) && (100 <= model.valueOfY) && (model.valueOfY <= 400))) 
		{
			this.changeColorRed('codeContentIfElseIfElse_19', 'redClass');
			this.removeColorRed(previousChildNodeId);
		}

		if (currentChildId === 'codeContentIfElseIfElse_20') 
		{
			this.changeColorRed('codeContentIfElseIfElse_21', 'redClass');
			this.removeColorRed(previousChildNodeId);
		}

		if (currentChildId === 'codeContentIfElseIfElse_18' || currentChildId === 'codeContentIfElseIfElse_22') 
		{
			this.changeColorRed('codeContentIfElseIfElse_23', 'redClass');
			this.removeColorRed(previousChildNodeId);
			alert('Code running is Over !');
		}	
	},

	getSelectedLoopIf: function(id) {
		var list_of_loop = document.getElementById(id);
		var selected_loop = list_of_loop.options[list_of_loop.selectedIndex].id;
		return selected_loop;
	},

 	setInnerHtml: function (id, innerHTML) {
 		document.getElementById(id).innerHTML = innerHTML;
 	},

 	drawFillRectangle: function () {
 		var rect = document.getElementById('myCanvas').getContext('2d');
 		rect.fillStyle = '#FFFF99';
 		rect.fillRect (100, 100, 250, 300);
 		rect.strokeStyle = '#000000';
 		rect.rect(100, 100, 250, 300);
 		rect.stroke();	
 	},

  	drawCircle: function (x ,y) {
 		var circ = document.getElementById('myCanvas').getContext('2d');
 		circ.beginPath();
 		circ.fillStyle = '#000000'; 
 		circ.arc(x, y, 3, 0, 2 * Math.PI, true);
 		circ.fill();
 	},

    displayText: function (text1, x, y) {
    	var text = document.getElementById('myCanvas').getContext('2d');
       	text.font = 'italic 20px Arial';
		text.fillText(text1, x, y);
    },

    displayText1: function (text1, x, y, color) {
    	var text = document.getElementById('myCanvas').getContext('2d');
       	text.font = 'italic 20px Arial';
       	text.fillStyle = color;
		text.fillText(text1, x, y);
			
    },

    displayFigures: function () {
    	this.drawFillRectangle();
    	this.drawCircle(100, 100);
		this.drawCircle(350, 100);
		this.drawCircle(100, 400);
		this.drawCircle(350, 400);
		this.displayText('(x1, y1)', 90, 90);
		this.displayText('(x2, y2)', 340, 90);
		this.displayText('(x3, y3)', 340, 420);
		this.displayText('(x4, y4)', 90, 420);
    },
	
    enableElement: function (id) {
    	document.getElementById(id).disabled = false;
    },

    disableElement: function (id) {
    	document.getElementById(id).disabled = true;
    },

    showButton: function (id1, id2) {
    	document.getElementById(id1).style.display = 'none';
    	document.getElementById(id2).style.display = 'block';  	 
    },

    getTextBoxValue: function (idx, idy) {
    	model.valueOfX = Number(document.getElementById(idx).value);
    	model.valueOfY = Number(document.getElementById(idy).value);
    	if ((model.valueOfX == '' || model.valueOfY == '') || isNaN(model.valueOfX && model.valueOfY)) {
			alert('Enter Numeric Values Only');
			return false;
		}
    },


// Working Day / Holiday in a Week : CODE

	displayDayValue: function (day_radio) {
		document.getElementById('text_field_id').value = day_radio;
		document.getElementById('submitDayButton').disabled = false;
		document.getElementById('startButton').style.display = 'block';
		document.getElementById('nextButton').style.display = 'none';
		document.getElementById('resetButton').style.display = 'none';
		document.getElementById('startButton').style.disabled = true;
	},

	getTextFieldValue: function () {
		var valueOfTextField = document.getElementById('text_field_id').value;
		if ( isNaN(valueOfTextField)) {
			alert('Enter Numeric Values Only');
			return false;
		} else {
			document.getElementById('idOfDay').innerHTML = valueOfTextField;
			document.getElementById('startButton').disabled = false;	
		}
		model.inputNumber = Number(valueOfTextField);
	},

	selectedCase: function () {
		var list_of_case = document.getElementById('drop_down_list_option');
		var selected_case = list_of_case.options[list_of_case.selectedIndex].text
		return selected_case;
	},

	changeColorRed: function (id, colorClass) {
		var elementbyid = document.getElementById(id);
		elementbyid.classList.remove('blackClass');
		elementbyid.className += ' ' + colorClass;
	},

	removeColorRed: function (id) {
		var elementbyid = document.getElementById(id);
		elementbyid.classList.remove('redClass');
	},

	getFirstChildNode: function (id) {
		var node = document.getElementById(id);
		var allChild = node.childNodes;
		var firstChildId = allChild[1].id;
		return firstChildId;
	},

	getNextChildNode: function (id) {
		var nextChild1 = document.getElementById(id).nextSibling;
		var nextChild2 = nextChild1.nextSibling;
		var nextChildId = nextChild2.id;
		return nextChildId; 
	},

	getPreviousChildNode: function (id) {
		var previousChild1 = document.getElementById(id).previousSibling;
		var previousChild2 = previousChild1.previousSibling;
		var previousChildId = previousChild2.id;
		return previousChildId;
	},

	lastNewAddClass: function (colorClass) {
		var element = document.getElementsByClassName(colorClass);
		var elementId = element[0].id;
		return elementId;		
	},
	
	switchMonday: function (previousChildNodeId) {
		var currentChildId = 'case1_id';
		this.changeColorRed(currentChildId, 'redClass');
		this.removeColorRed(previousChildNodeId);
		document.getElementById('monday_images').style.opacity = '1';
		document.getElementById('str_null').innerHTML = 'Monday';	
	},
	
	switchTuesday: function (previousChildNodeId) {
		var currentChildId = 'case2_id';
		this.changeColorRed(currentChildId, 'redClass');
		this.removeColorRed(previousChildNodeId);
		document.getElementById('tuesday_images').style.opacity = '1';
		document.getElementById('str_null').innerHTML = 'Tuesday';		
	},

	switchWednesday: function (previousChildNodeId) {
		var currentChildId = 'case3_id';
		this.changeColorRed(currentChildId, 'redClass');
		this.removeColorRed(previousChildNodeId);
		document.getElementById('wednesday_images').style.opacity = '1';
		document.getElementById('str_null').innerHTML = 'Wednesday';
	},

	switchThursday: function (previousChildNodeId) {
		var currentChildId = 'case4_id';
		this.changeColorRed(currentChildId, 'redClass');
		this.removeColorRed(previousChildNodeId);
		document.getElementById('thursday_images').style.opacity = '1';
		document.getElementById('str_null').innerHTML = 'Thursday';	
	},

	switchFriday: function (previousChildNodeId) {
		var currentChildId = 'case5_id';
		this.changeColorRed(currentChildId, 'redClass');
		this.removeColorRed(previousChildNodeId);
		document.getElementById('friday_images').style.opacity = '1';
		document.getElementById('str_null').innerHTML = 'Friday';	
	},

	switchSaturday: function (previousChildNodeId) {
		var currentChildId = 'case6_id';
		this.changeColorRed(currentChildId, 'redClass');
		this.removeColorRed(previousChildNodeId);
		document.getElementById('saturday_images').style.opacity = '1';	
		document.getElementById('str_null').innerHTML = 'Saturday';
	},

	switchSunday: function (previousChildNodeId) {
		var currentChildId = 'case7_id';
		this.changeColorRed(currentChildId, 'redClass');
		this.removeColorRed(previousChildNodeId);
		document.getElementById('sunday_images').style.opacity = '1';
		document.getElementById('str_null').innerHTML = 'Sunday';
	},

	switchDefault: function (previousChildNodeId) {
		var currentChildId = 'default_id';
		this.changeColorRed(currentChildId, 'redClass');
		this.removeColorRed(previousChildNodeId);		
	},

	getHoliday: function (currentChildId, previousChildNodeId) {
		this.changeColorRed(currentChildId, 'redClass');
		this.removeColorRed(previousChildNodeId);
		document.getElementById('holiday_image').style.opacity = '1';
		document.getElementById('outputDay').innerHTML = 'HOLIDAY';
	},

	getWorkingDay: function (currentChildId, previousChildNodeId) {
		this.changeColorRed(currentChildId, 'redClass');
		this.removeColorRed(previousChildNodeId);
		document.getElementById('workingday_image').style.opacity = '1';
		document.getElementById('outputDay').innerHTML = 'WORKING DAY';
	},

	getLastClosedBracket: function () {
		this.changeColorRed('close_brc2_id', 'redClass');
		this.removeColorRed(previousChildNodeId);
		document.getElementById('resetButton').style.display = 'block';
		document.getElementById('nextButton').style.display = 'none';
		document.getElementById('startButton').style.display = 'none';
		alert('Code running is Over !');
	},

	startButton: function () {
		document.getElementById('submitDayButton').disabled = true;
		document.getElementById('startButton').style.display = 'none';
		document.getElementById('nextButton').style.display = 'block';
		document.getElementById('resetButton').style.display = 'none';
		var firstChildId = this.getFirstChildNode('switchCase_id');
		this.changeColorRed(firstChildId, 'redClass');
		this.getTextFieldValue()
	},

	resetWindowButton: function () {
   		location.reload(true);
   		document.getElementById('submitDayButton').disabled = false;
 	},

	getCurrentClass: function (id) {
		var currentClassName = document.getElementById(id).className;
		return currentClassName;
	},

	getLastlass: function (id) {
		var currentClassName = document.getElementById(id).className;
		return currentClassName;
	},

	nextButton: function () {
		var selected_case = this.selectedCase();
		var currentChildId = this.lastNewAddClass('redClass');
		currentChildId = this.getNextChildNode(currentChildId);
	 	var previousChildNodeId = this.getPreviousChildNode(currentChildId);
	 	var currentClassName = this.getCurrentClass(currentChildId);
	 	var lastClassName = this.getLastlass(previousChildNodeId);

	 	if (currentChildId === 'close_brc2_id' || currentChildId === 'else_id' || currentChildId === 'else_if_id') 
	 	{
	 		this.changeColorRed('close_brc2_id', 'redClass');
			this.removeColorRed(previousChildNodeId);
			alert('Code running is Over !');
	 	}

	 	if ( model.inputNumber > 7 ) 
	 	{
	 		if (currentChildId === 'holiday_id') 
	 		{
	 			this.changeColorRed('else_if_id', 'redClass');
				this.removeColorRed(previousChildNodeId);
	 		}
	 		if (currentChildId === 'workingday_id') 
	 		{
	 			this.changeColorRed('else_id', 'redClass');
				this.removeColorRed(previousChildNodeId);
	 		}
	 		if (currentChildId === 'invalidIP_id') 
	 		{
	 			this.changeColorRed(currentChildId, 'redClass');
				this.removeColorRed(previousChildNodeId);
	 		}
	 	}

	 	if ( (1 <= model.inputNumber) && (model.inputNumber <= 6) ) 
	 	{
	 		if (currentChildId === 'holiday_id') 
	 		{
	 			this.changeColorRed('else_if_id', 'redClass');
				this.removeColorRed(previousChildNodeId);
	 		}
	 		if (currentChildId === 'workingday_id') 
	 		{
	 			this.changeColorRed(currentChildId, 'redClass');
				this.removeColorRed(previousChildNodeId);
	 		}	
	 	}

	 	if (model.inputNumber === 7)
	 	{
	 		if (currentChildId === 'holiday_id') 
	 		{
	 			this.changeColorRed(currentChildId, 'redClass');
				this.removeColorRed(previousChildNodeId);
	 		}
	 	}

	 	if (currentChildId === 'if_id') 
	 	{
	 		this.changeColorRed(currentChildId, 'redClass');
			this.removeColorRed(previousChildNodeId);
	 	}

	 	if (currentClassName === 'break') 
	 	{
	 		this.changeColorRed(currentChildId, 'redClass');
			this.removeColorRed(previousChildNodeId);
	 	}

	 	if (lastClassName === 'break redClass') 
	 	{
	 		this.changeColorRed('close_brc1_id', 'redClass');
			this.removeColorRed(previousChildNodeId);
	 	}
		
		if (currentChildId === 'char_id' || currentChildId === 'str_id' || currentChildId === 'switch_id') {
			this.changeColorRed(currentChildId, 'redClass');
			this.removeColorRed(previousChildNodeId);        
		} 
		else if (currentChildId === 'case1_id')
		{
       		switch (model.inputNumber){
				case 1:
					this.switchMonday(previousChildNodeId);
  					break;
				case 2:
  					this.switchTuesday(previousChildNodeId);
  					break;
				case 3:
  					this.switchWednesday(previousChildNodeId);
  					break;
				case 4:
  					this.switchThursday(previousChildNodeId);
  					break;
				case 5:
  					this.switchFriday(previousChildNodeId);
  					break;
				case 6:
  					this.switchSaturday(previousChildNodeId);
  					break;
				case 7:
  					this.switchSunday(previousChildNodeId);
  					break;
  				default:
  					this.switchDefault(previousChildNodeId);
        			break;
			}
			
		}

	},
	
	init: function () {
		this.activateEvents()
	}
}
window.onload = function () { 
	window.view.init();
	window.view.displayFigures();
}