var count = 0;
var msg = "";

function setCount(c) {
	count = c;
}

function clean() {
	document.getElementById('myform').reset();
	$("#basefield").remove();
	$("#basefieldHolder").append("<table id='basefield'></table>");
	$("#details").remove();
	$("#detailsHolder").append("<table id='details'></table>");
}

function showDetails() {
	if ($('#detailsHolder').css('display') == "none") $('#detailsHolder').css('display','inline');
	else $('#detailsHolder').css('display','none');
}

function build(countOfShifts) { 

	setCount(countOfShifts);

	if ($("#hours1").length) {
		$("#basefield").remove();
		$("#basefieldHolder").append("<table id='basefield'></table>");
	}
	
	for (var i = 1; i <= countOfShifts; i++) {
		$('#basefield').append("<tr>"
		+ "<td><input onchange='calc()' type='number' placeholder='Часов'			id='hours" 		+ i + "'></td>"      
		+ "<td><input onchange='calc()' type='number' placeholder='Авто'			id='car" 		+ i + "' step='10'></td>"
		+ "<td><input onchange='calc()' type='number' placeholder='Грузчики'		id='mover" 		+ i + "' step='10'></td>"
		+ "<td><input onchange='calc()' type='number' placeholder='Упаковка'		id='packaging" 	+ i + "' step='10'></td>"
		+ "<td><input onchange='calc()' type='number' placeholder='Экспедирование'	id='forwarding" + i + "' step='10'></td>"
		+ "<td><input onchange='calc()' type='number' placeholder='Сборка-Разборка'	id='assembly" 	+ i + "' step='10'></td>"
		+ "<td><input onchange='calc()' type='number' placeholder='Заказов'			id='orders" 	+ i + "'></td>"
		+ "<td><input onchange='calc()' type='number' placeholder='Звонков'			id='calls" 		+ i + "'></td></tr>");
	} 
}

function calc() {

	var result = 0;
	msg = "";

	if ($("#hours1").length) {
		$("#details").remove();
		$("#detailsHolder").append("<table id='details'></table>");
	}

	$('#details').append("<tr><td>Эффективность</td><td>Оклад</td><td>Авто</td><td>Грузчики</td><td>Упаковка</td><td>Сборка/Разборка</td><td>Экспедирование</td></tr>");
	
	for (var j = 1; j <= count; j++) {
		var out_hours, hours = document.getElementById("hours" + j).value; 
		var out_car, car = document.getElementById("car" + j).value;
		var out_mover, mover = document.getElementById("mover" + j).value;
		var out_packaging, packaging  = document.getElementById("packaging" + j).value;
		var out_forwarding, forwarding = document.getElementById("forwarding" + j).value;
		var out_assembly, assembly = document.getElementById("assembly" + j).value;
		var orders = document.getElementById("orders" + j).value;
		var calls = document.getElementById("calls" + j).value;
		var out_oklad, out_efficiency;
		var efficiency = orders / calls;


		if (efficiency > 0.45) {
			out_oklad = "<span class='good'>" + (hours * 80).toFixed(2) + "</span>";
			out_efficiency = "<span class='good'>" + (efficiency * 100).toFixed(1)  + "%</span>";
			result += hours * 80;
		}
		else if (efficiency > 0.42) {
			out_oklad = "<span class='regular'>" + (hours * 70).toFixed(2) + "</span>";
			out_efficiency = "<span class='regular'>" + (efficiency * 100).toFixed(1)  + "%</span>";
			result += hours * 70; 
		}
		else {
			out_oklad = "<span class='bad'>" + (hours * 60).toFixed(2) + "</span>";
			out_efficiency = "<span class='bad'>" + (efficiency * 100).toFixed(1)  + "%</span>";
			result += hours * 60; 
		}
		
		
		if (orders >= 50 && car >= 180000) {
			out_car = "<span class='good'>" + (car * 0.0085).toFixed(2) + "</span>";
			result += (car * 0.0085); 
		}
		else if (orders >= 40 && car >= 100000) {
			out_car = "<span class='regular'>" + (car * 0.007).toFixed(2) + "</span>";
			result += (car * 0.007); 
		}
		else {
			out_car = "<span class='bad'>" + (car * 0.0055).toFixed(2) + "</span>";
			result += (car * 0.0055); 
		}
		
		
		if (mover >= 30000) {
			out_mover = "<span class='good'>" + (mover * 0.015).toFixed(2) + "</span>";
			result += (mover * 0.015); 
		}
		else if (mover >= 15000) {
			out_mover = "<span class='regular'>" + (mover * 0.0125).toFixed(2) + "</span>";
			result += (mover * 0.0125); 
		}
		else {
			out_mover = "<span class='bad'>" + (mover * 0.01).toFixed(2) + "</span>";
			result += (mover * 0.01); 
		}
		
		
		if (packaging >= 4000) {
			out_packaging = "<span class='good'>" + (packaging * 0.05).toFixed(2) + "</span>";
			result += (packaging * 0.05); 
		}
		else if (packaging >= 2000) {
			out_packaging = "<span class='regular'>" + (packaging * 0.035).toFixed(2) + "</span>";
			result += (packaging * 0.035); 
		}
		else {
			out_packaging = "<span class='bad'>" + (packaging * 0.03).toFixed(2) + "</span>";
			result += (packaging * 0.03); 
		}
		
		
		if (assembly >= 5000) {
			out_assembly = "<span class='good'>" + (assembly * 0.015).toFixed(2) + "</span>";
			result += (assembly * 0.015); 
		}
		else if (assembly >= 3000) {
			out_assembly = "<span class='regular'>" + (assembly * 0.0125).toFixed(2) + "</span>";
			result += (assembly * 0.0125); 
		}
		else {
			out_assembly = "<span class='bad'>" + (assembly * 0.01).toFixed(2) + "</span>";
			result += (assembly * 0.01); 
		}
		
		
		if (forwarding >= 4000) {
			out_forwarding = "<span class='good'>" + (forwarding * 0.05).toFixed(2) + "</span>";
			result += (forwarding * 0.05); 
		}
		else if (forwarding >= 2000) {
			out_forwarding = "<span class='regular'>" + (forwarding * 0.035).toFixed(2) + "</span>";
			result += (forwarding * 0.035); 
		}
		else {
			out_forwarding = "<span class='bad'>" + (forwarding * 0.03).toFixed(2) + "</span>";
			result += (forwarding * 0.03); 
		}
		
		$('#details').append("<tr><td>" 
			+ out_efficiency + "</td><td>" 
			+ out_oklad + "</td><td>" 
			+ out_car + "</td><td>" 
			+ out_mover + "</td><td>" 
			+ out_packaging + "</td><td>" 
			+ out_assembly + "</td><td>" 
			+ out_forwarding + "</td></tr>");
	}
	
	document.getElementById('result').value = result.toFixed(2);

}