import { createContext, useReducer } from "react";


export const store = createContext();

const reducer = (state, action)=>{
  switch(action.type){
    case 'INCREMENT':
      let val = state.count+1
      localStorage.setItem('count', JSON.stringify(val));
      return {
       ...state,
        count: state.count + 1
      }
    case 'DECREMENT':
      let val1 = state.count-1
      localStorage.setItem('count', JSON.stringify(val1));

      return {
       ...state,
        count: state.count - 1
      }
    case 'RESET':
      const val2 = 0
      localStorage.setItem('count', JSON.stringify(val2));
      localStorage.setItem('count', JSON.stringify(state.count));

      return {
       ...state,
        count: 0
      }
   
    default:
      return state;
  }
}


const StoreProvider = ({children})=>{
  let countValue = JSON.parse(localStorage.getItem('count'))??0;
  console.log(countValue)
  const initialState = {
    count: countValue,
  }
const[state, dispatch] =  useReducer(reducer, initialState)

  return(
    <store.Provider value={{state, dispatch}}>
      {children}
    </store.Provider>
  )

}

export default StoreProvider;