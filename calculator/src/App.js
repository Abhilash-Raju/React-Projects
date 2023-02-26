import { useReducer } from 'react';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';

import './App.css';
export const ACTIONS ={
  ADD_DIGIT : 'add-digit',
  CLEAR:'clear',
  CHOOSE_OPERATION:'choose-operation',
  DELETE_DIGIT:'delete-digit',
  EVALUATE:'evaluate'
}
function reducer(state,{type, payload}){
  switch(type){
    
    // Entering a Digit
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite){
        return {
          ...state,
          currentOperand:payload.digit,
          overwrite:false
        }
      }
      if(payload.digit ==='0' && state.currentOperand ==='0') { return state}
      if (payload.digit === "." && state.currentOperand == null) {
        return {
          ...state,
          currentOperand: payload.digit,
        };
      }      
      if(payload.digit ==='.' && state.currentOperand.includes('.')) { return state }
      return {
        ...state,
        currentOperand : `${state.currentOperand || ""}${payload.digit}`,
      }
    
    // Clearing the Calculator Screen
    case ACTIONS.CLEAR:
      return {}

    
    // Choosing an operation in Calculator
    case ACTIONS.CHOOSE_OPERATION:
      if(state.currentOperand == null && state.previousOperand == null) {
        return state;
      }

      if(state.currentOperand == null) {
        return {
          ...state,
          operation:payload.operation
        }
      }
      if (state.previousOperand == null){
        return {
          ...state,
          operation:payload.operation,
          previousOperand:state.currentOperand,
          currentOperand:null
        }
      }
        return {
          ...state,
          previousOperand:evaluate(state),
          currentOperand:null,
          operation:payload.operation
        }

      // Doing the Calculation
      case ACTIONS.EVALUATE:
        if(state.operation == null || state.currentOperand == null || state.previousOperand == null) {
          return state
        }
        return {
          ...state,
          overwrite: true,
          previousOperand:null,
          currentOperand:evaluate(state),
          operation:null
        }


        // Deleting a Digit
        case ACTIONS.DELETE_DIGIT:
          if(state.overwrite){
            return{
              ...state,
              overwrite:false,
              currentOperand:null
            }
          }
          if(state.currentOperand == null) return state
          if(state.currentOperand.length === 1) {return {...state,currentOperand:null}}
          return {
            ...state,
            currentOperand:state.currentOperand.slice(0,-1)
          }
  } 
}

function evaluate({currentOperand,previousOperand,operation}){
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);
  if(isNaN(prev) || isNaN(curr)) return ""
  let computation ='';

  switch(operation){
    case '+':
      computation=prev + curr;
      break
    case '-':
      computation=prev - curr;
      break
    case '*':
      computation=prev * curr;
      break
    case '÷':
      computation=prev / curr;
      break
  }
  return computation.toString()
}


const INTEGER_FORMATTER = new Intl.NumberFormat("en-us",{
  maximumFractionDigits:0
})

function formatOperand(operand){
  if(operand == null ) return 
  const [integer,decimal] = operand.split('.')
  if(decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}
function App() {
  const [{currentOperand,previousOperand,operation},dispatch] = useReducer(reducer,{})

  return (
  <div className='calculator'>
  <div  className='calculator-grid'>
    <div className='output'>
      <div className='previous-operand'>{formatOperand(previousOperand)} {operation}</div>
      <div className='current-operand'>{formatOperand(currentOperand)}</div>
    </div>
    <button className='span-two' onClick={() =>dispatch({type:ACTIONS.CLEAR})}>AC</button>
    <button onClick={() =>dispatch({type:ACTIONS.DELETE_DIGIT})}>DEL</button>
    <OperationButton operation='÷' dispatch={dispatch}/>
    <DigitButton digit='1' dispatch={dispatch}/>
    <DigitButton digit='2' dispatch={dispatch}/>
    <DigitButton digit='3' dispatch={dispatch}/>
    <OperationButton operation='*' dispatch={dispatch}/>
    <DigitButton digit='4' dispatch={dispatch}/>
    <DigitButton digit='5' dispatch={dispatch}/>
    <DigitButton digit='6' dispatch={dispatch}/>
    <OperationButton operation='+' dispatch={dispatch}/>
    <DigitButton digit='7' dispatch={dispatch}/>
    <DigitButton digit='8' dispatch={dispatch}/>
    <DigitButton digit='9' dispatch={dispatch}/>
    <OperationButton operation='-' dispatch={dispatch}/>
    <DigitButton digit='.' dispatch={dispatch}/>
    <DigitButton digit='0' dispatch={dispatch}/>
    <button className='span-two' onClick={() =>dispatch({type:ACTIONS.EVALUATE})}>=</button>
  </div>
  </div>
  );
}

export default App;
