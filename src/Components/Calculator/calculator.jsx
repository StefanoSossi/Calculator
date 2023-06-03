import React, { useEffect, useState, useRef  } from "react";
import "./style.css";
import axios from "axios";
import evalOperation from "./eval";

const Calculator = () => {
  const [result, setResult] = useState("");
  const [historial, setHistorial] = useState([]);
  const listRef = useRef(null);

  useEffect(()=> {
    fetchData();
  }, []);

  useEffect(() => {
    if (listRef.current && listRef.current.lastElementChild) {
        listRef.current.lastElementChild.scrollIntoView({ behavior: 'smooth' });
    }
  }, [historial]);

  const fetchData = async () => {
    try {
      const response = await axios.get("../../../public/historial.json");
      setHistorial(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const calculateHandler = () => {
    if( result !== "" && !["/","*","+","-"].includes(result[0])){
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
        alert("Operation can not be empty or start with an operator")
        //see case of -4+5 it should be possible
    }
  };

  const deleteHandler = () => {
    setResult(result.slice(0,-1));
  };

  const typeHandler = (value) => {
    setResult((prevResult) => prevResult + value);
  };

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