function evalOperation ( operation ) {
    let operands = operation.split(/[-+/*]/);
    let operators = operation.match(/[-+/*]/g);
    let result = 0;

    do {
        [operators, operands, result] = evalMultDiv(operators, operands, result)
        console.log("condition", operators.some((element) => ["/","*"].includes(element)) )
    } while (operators.some((element) => ["/","*"].includes(element)));
    
    return evalSumSubst(operators, operands, result)
};

function evalMultDiv(operators, operands, result){
    for (let i = 0; i < operators.length; i++) {
        result = parseFloat(operands[i]);
        const operator = operators[i];
        const operand = parseFloat(operands[i + 1]);

        if (operator === '*') {
            result *= operand;
            operands[i] = String(result)
            operands.splice(i + 1, 1);
            operators.splice(i, 1);
            break;
        } else if (operator === '/') {
            result /= operand;
            operands[i] = String(result)
            operands.splice(i + 1 , 1);
            operators.splice(i, 1);
            break;
        }
    }
    return [operators, operands, result]
}

function evalSumSubst(operators, operands, result){
    for (let i = 0; i < operators.length; i++) {
        const operator = operators[i];
        result = parseFloat(operands[i]);
        const operand = parseFloat(operands[i + 1]);
      
        if (operator === '+') {
          result += operand;
        } else if (operator === '-') {
          result -= operand;
        }
    }

    return result
}

export default evalOperation;

//95-63*25/2 = -692.5
// 95 - ((63*25)/2)