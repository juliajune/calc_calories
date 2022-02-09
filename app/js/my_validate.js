/*  
    let field - array of input elements

    generateError() - Generate error element 
    removeValidation() - Remove validate error message 
    validateAll() - Turn on validate
	checkFieldEmpty() - field must be  not empty
	checkFielddValue() - value must be in the valid range
	checkFieldNumber() - variable is a number
*/


//Generate error element 
function generateError(text){
	var error = document.createElement('div');
	error.className = 'text-field__error';
	//error.style.color = 'red';
	error.innerHTML = text;
	return error;
}//generateError(text)


//Remove validate error message  
function removeValidation(){
    var errors = document.querySelectorAll('.text-field__error')
    for (var i = 0; i < errors.length; i++) {
        errors[i].remove();
    }
}//removeValidation()

	
//Turn on all validation function
function validateAll(field){
    if(checkFieldEmpty(field)==0 && checkFieldNumber(field)==0 && checkFieldValue(field)==0){
        return 0;
    } else{
        return 1;
    }
}

//Check - field must be  not empty
function checkFieldEmpty(field){
    let k=0;  //error counter
    for (var i = 0; i < field.length; i++){
        if (!field[i].value) {
            var error = generateError('Поле не может быть пустым');
            field[i].parentElement.insertBefore(error, field[i].nextSibling); 
            k=k+1; 
        }
    } 
    //if errror counter > 0
    if(k>0) return 1;   // error
    else return 0; 		// no error
}// checkFieldEmpty()


//Field value is not number
function checkFieldNumber(field){
    let k=0;  //error counter
    for (var i = 0; i < field.length; i++) {
        //Разрешаем ввод только цифр и 1 точки
        if (/^\.|\d+\..*\.|[^\d\.{1}]/.test(field[i].value)) {
            var error = generateError('Введите число. Допустимы целые числа и дробные с разделителем-точкой');
            field[i].parentElement.insertBefore(error, field[i].nextSibling);
            k=k+1;
        }
    } 
    //if errror counter > 0
    if(k>0) return 1;   // error
    else return 0; 		// no error
}//checkFieldNumber()


//Variable value must be in the valid range
function checkFieldValue(field){
let k=0;  //error counter
for (var i = 0; i < field.length; i++) {
    user_value=Number(field[i].value);
    min_value=Number(field[i].getAttribute('data-min'));
    max_value=Number(field[i].getAttribute('data-max'));
    if((user_value<min_value)||(user_value>max_value)){
        var error = generateError(`Введите значение в диапазоне от ${min_value} до ${max_value}`);
        field[i].parentElement.insertBefore(error, field[i].nextSibling);
        k=k+1;
    }
}
//if errror counter > 0
if(k>0) return 1;   // error
else return 0; 		// no error
}//checkFieldValue()