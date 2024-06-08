// import { circularProgressClasses } from "@mui/material";

// const bindactioncreators=redux.bindactioncreators;


// //DEFINE ACTION TYPE 
// const CAKE_ORDERED ='CAKE_ORDERED'
// const CAKE_RESTORED ='CAKE_RESTORED'


// ////INITIAL STATE
// const INITIAL_STATE ={
//     numOfCakes:10,
// }

// //ACTION CREATOR FUNCTION

// function ordercake(){
//     return{
//         type:'CAKE_ORDERED',
//         payload:1
//     }
// }

// function restore(data){
//     return{
//         type:'CAKE_RESTORED',
//         payload:data
//     }
// }

// ///REDUCERS TO HANDLE THIS ACTIONS

// const Reducers=(state=INITIAL_STATE,action)=>{
//     switch(action.type){
//         case 'CASE_ORDERED':
//         return{
//             ...state,
//             payload:state.numOfCakes-1,
//         }
//         case 'CASE_REORDERED':
//             return{
//                 ...state,
//                 payload:state.numOfCakes+action.payload,
//             }
//         default :
//         return state
//     }
// }

/////



// store.diapatch(ordercake());


// const action=bindactioncreators(ordercake,restore,store.dispatch)

// action.ordercake();