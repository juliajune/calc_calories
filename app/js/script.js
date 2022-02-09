
//Variables
let calculator=document.querySelector('#calculator');  //Calculator div

let gender=document.getElementsByName('gender'); 	   //User gender (radio button group) - array
let life=document.getElementsByName('life-style'); 	   //User life style (radio button group) - array
let goal=document.getElementsByName('goal');  		   //Users goal (radio button group) - array

let age=document.getElementById('user-age');           //User age (input) - string
let height=document.getElementById('user-height');     //User height (input) - string
let weight=document.getElementById('user-weight');     //User height (input) - string

let field=calculator.querySelectorAll('.inputtxt');    //Input field -  array (for validation)

let result_btn=document.getElementById('result-btn');  //Result button. Click on this button and get result
let result_area=document.getElementById('result');     //Result area

let gender_value=getRadiobuttonValue(gender);  			//Gender

//Click button
result_btn.onclick=()=>{

	// Clear(remove) validate message, if it exist	
	removeValidation();  	
	
	let age_value=Number(age.value);               		// Age
	let height_value=Number(height.value);         		// Height
	let weight_value=Number(weight.value);        		// Weight

	let life_value=Number(getRadiobuttonValue(life));   // Life style
	let goal_value=getRadiobuttonValue(goal);      		// Goal
	let BMR;                                            // Coefficient
	let a;                                              // intermediate variable
	let calories;                                       // Daily calories, cal
	let protein;                                        // Daily protein, grams
	let fat;                                            // Daily fat, grams
	let carbohydrate;                                   // Daily carbohydrate, grams

							   

	//validate
	if ((validateAll(field)>0)){
	//alert ('Исправь ошибки');
	//document.getElementById("result-btn").disabled = true; 
	} else {

		/*	Харриса-Бенедикта. Выглядит она так:
			для женщин: BMR = 447,593 + (9,247 * вес в кг) + (3,098 * рост в см) — (4,330 * возраст в годах);
			для мужчин: BMR = 88,362 + (13,397 * вес в кг) + (4,799 * рост в см) — (5,677 * возраст в годах).
		*/

		// Intermediate value calculation
		if (gender_value=="woman"){
			BMR=447.593+(9.247*weight_value)+(3.098*height_value)-(4.330*age_value);
			a=BMR*life_value;
		} else {
			BMR=88.362 + (13.397 * weight_value) + (4.799 * height_value) - (5.677 * age_value);
			a=BMR*life_value;
		}

		//Calories limit calculation 
		switch (goal_value) {
			case "normal":
				calories=a;
				protein=(Math.ceil(calories) * 0.4) / 4;      
				fat=(Math.ceil(calories) * 0.2) / 9;
				carbohydrate=(Math.ceil(calories) * 0.4) / 4;
				break;
			case "down":
				calories=a-a*0.2;
				protein=(Math.ceil(calories) * 0.5) / 4;
				fat=(Math.ceil(calories) * 0.2) / 9;
				carbohydrate=(Math.ceil(calories) * 0.3) / 4;
				break;
			case "up":
				calories=a+a*0.2;
				protein=(Math.ceil(calories) * 0.3) / 4;
				fat=(Math.ceil(calories) * 0.2) / 9;
				carbohydrate=(Math.ceil(calories) * 0.5) / 4;
				break;
			default:
				console.log("Eror");
		} //switch


		//round results to an integer to print
		let calories_print=Math.ceil(calories);
		let protein_print=Math.ceil(protein);
		let fat_print=Math.ceil(fat);
		let carbohydrate_print=Math.ceil(carbohydrate);

		result_area.innerHTML=`
				<span class="result-area__title">Расчет по формуле Харриса-Бенедикта:</span>
				<ul class="result-area__list">
				    <li class="result-area__item"><span>Каллорий:</span>	${calories_print} в день </li>
					<li class="result-area__item"><span>Белков:</span>	${protein_print} грaммов в день</li>
					<li class="result-area__item"><span>Жиров:</span>	${fat_print} граммов в день</li>
					<li class="result-area__item"><span>Углеводов:</span>	${carbohydrate_print} грамов в день</li>
				</ul>`;
	}//else

} //onclick function


//Get radiobutton value
function getRadiobuttonValue(data_array){
	for (var i = 0; i < data_array.length; i++) {
		if (data_array[i].checked){
			return data_array[i].value;
		}
	}
}//getRadiobuttonValue()	
