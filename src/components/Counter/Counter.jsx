import React, { useContext } from 'react'
import { store } from '../../store/Store'
import {Button} from 'antd'

function Counter() {
 const{state, dispatch} = useContext(store);
 const backgroundColor = {
  background: `rgb(${255 - state.count * 10}, ${255 - state.count * 10}, ${255 - state.count * 10})`
};
  return (
    <div className=' w-full h-screen flex items-center justify-center flex-col' style={backgroundColor}>
    <h1 className=' text-2xl font-bold uppercase'>Count - {state.count}</h1>
   <div className=' mt-4 flex gap-5'>
   <Button className=' w-20 font-semibold' onClick={()=>dispatch({type: 'INCREMENT'})} > + </Button>
   <Button className=' w-20 font-semibold'  onClick={()=>dispatch({type: 'RESET'})}> Reset </Button>
   <Button className=' w-20 font-semibold'  onClick={()=>dispatch({type: 'DECREMENT'})}> - </Button>
   </div>
    </div>
  )
}

export default Counter