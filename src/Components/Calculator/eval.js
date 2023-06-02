function evalOperation ( operation ) {
    console.log(operation)
    const operands = operation.split(/[-+*/]/);
    const operators = operation.match(/[-+*/]/g);
    console.log(operands)
    console.log(operators)
    let result = parseFloat(operands[0]);

    for (let i = 0; i < operators.length; i++) {
        const operator = operators[i];
        const operand = parseFloat(operands[i + 1]);
      
        switch (operator) {
          case '+':
            result += operand;
            break;
          case '-':
            result -= operand;
            break;
          case '*':
            result *= operand;
            break;
          case '/':
            result /= operand;
            break;
          default:
            console.log('Invalid operator');
            break;
        }
    }
    console.log(result)
    return result
};

export default evalOperation;