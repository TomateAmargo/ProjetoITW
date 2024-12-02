var operacao = "+"

function getOperator() {
    var o = document.getElementById("operator");
    var operacao = o.options[o.selectedIndex].value;
    return operacao;
}

function calcula() {
    var op1 = document.getElementById("op1")
    var op2 = document.getElementById("op2") 
    var x = parseFloat(op1.value)
    var y = parseFloat(op2.value)  
    var res = document.getElementById("res")
    switch (getOperator()) {
        case "+":
            res.value= x + y;
            break;
        case "-":
            res.value= x - y;
            break;
        case "*":
            res.value= x * y;
            break;
        case "/":
		    if(y == 0) {
			console.log("Error: dividing by 0");
			break;
			}	   
            res.value= x / y;
            break;
        default:
            return "Invalid operator";}
}
