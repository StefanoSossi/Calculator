import React, { useEffect, useState, useRef  } from "react";
import "./style.css";
import axios from "axios";
import evalOperation from "./eval";

const Calculator = () => {
  const [result, setResult] = useState("");
  const [historial, setHistorial] = useState(null);
  const listRef = useRef(null);

  useEffect(()=> {

    const fetchData = async () => {
      try {
        const response = await axios.get("historial.json");
        setHistorial(response.data.history);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (listRef.current && listRef.current.lastElementChild) {
        listRef.current.lastElementChild.scrollIntoView({ behavior: 'smooth' });
    }
  }, [historial]);


  const calculateHandler = () => {
    if( errorHandler() ){
        const evalResult = evalOperation(result);
        const newResult = {
            id: historial.length + 1,
            operation: result,
            result: evalResult
        }
        setResult(evalResult);
        setHistorial([...historial, newResult]);
        console.log(historial)
    } else{
      setResult('')
    }
  };

  function errorHandler() {
    if( result === ""){
      alert("Operation can not be empty")
      return false
    }

    if(["/","*"].includes(result[0])){
      alert("Operation can not start with an operator")
      return false
    } 

    if(result.includes("/0")){
      alert("Operation can not divide by 0")
      return false
    }

    if(/^[a-z,A-Z]$/.test(result[0])){
      alert("Operation can only have numbers")
      return false
    } 
    
    const operatorsCombined = ['-+','-*','-/','+-','+*','+/','*-','*+','*/','/-','/+','/*'];
    if(operatorsCombined.some(operatorCombined => result.includes(operatorCombined))){
      alert("Operation can not have two consecutive operators")
      return false
    } 

    if(result[0] === '+'){
      result.splice(0, 1);
    } 

    if(result[0] === '-'){
      setResult(['0',...result]);
    }

    return true
  }

  const deleteHandler = () => {
    setResult(result.slice(0,-1));
  };

  const typeHandler = (value) => {
    setResult((prevResult) => prevResult + value);
  };

  if (!historial) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container color-black">
      <ul  ref={listRef} className="historial" style={{ listStyle: 'none', overflowY: 'auto' }}>
        {historial.map((elem)=>(
            <li key={elem.id}>
                {elem.operation} = {elem.result} 
            </li >
        ))
        }
      </ul>
      <div className="display">{result}</div>
      <div className="button clear" onClick={() => { setResult("") }}>
        CLEAR
      </div>
      <div className="button" onClick={() => typeHandler("7")}>
        7
      </div>
      <div className="button" onClick={() => typeHandler("8")}>
        8
      </div>
      <div className="button" onClick={() => typeHandler("9")}>
        9
      </div>
      <div className="button" onClick={() => typeHandler("+")}>
        +
      </div>
      <div className="button" onClick={() => typeHandler("4")}>
        4
      </div>
      <div className="button" onClick={() => typeHandler("5")}>
        5
      </div>
      <div className="button" onClick={() => typeHandler("6")}>
        6
      </div>
      <div className="button" onClick={() => typeHandler("-")}>
        -
      </div>
      <div className="button" onClick={() => typeHandler("1")}>
        1
      </div>
      <div className="button" onClick={() => typeHandler("2")}>
        2
      </div>
      <div className="button" onClick={() => typeHandler("3")}>
        3
      </div>
      <div className="button" onClick={() => typeHandler("*")}>
        *
      </div>
      <div className="button" onClick={() => typeHandler("0")}>
        0
      </div>
      <div className="button" onClick={calculateHandler}>
        =
      </div>
      <div className="button" onClick={() => typeHandler("/")}>
        /
      </div>
      <div className="button" onClick={deleteHandler}>
        DEL
      </div>
    </div>
  );
};

export default Calculator;
