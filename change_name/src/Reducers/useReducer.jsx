//It is a function and it access state and action 
import {createReducer} from '@reduxjs/toolkit'

const initialState={
    name:"Mousom",
    age:"23",
    status:"Programmer",
    city:"Uttarpara",
    phone:"9903419235",
    company:"Webskitters"
  }
// using reducer 
// export default(state=initialState,action)=>{
//     if(action.type==='UPDATE_AGE'){
//         return {
//             ...state,
//             age:action.payload
//         } 
//     }
//     if(action.type==='UPDATE_PHONE'){
//         return {
//             ...state,
//             phone:action.payload
//         } 
//     }
//     return state
// }

// use toolkit

export default createReducer(initialState,(builder)=>{

    // Change Age Static
    builder.addCase('UPDATE_AGE',(state,action)=>{
        state.age=action.payload
    })
    
    // Change Name Static 
    builder.addCase('UPDATE_NAME',(state,action)=>{
        state.name=action.payload
    })

    // Change City Static
    builder.addCase('UPDATE_CITY',(state,action)=>{
        state.city=action.payload
    })
    
    // Change Phone Static
    builder.addCase('UPDATE_PHONE',(state,action)=>{
        state.phone=action.payload
    })
    
    // Change Company Static
    builder.addCase('UPDATE_COMPANY',(state,action)=>{
        state.company=action.payload
    })
})