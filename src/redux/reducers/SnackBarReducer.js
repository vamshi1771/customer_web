

import { SNACK_CLOSE,SNACK_OPEN } from "../types/sanckBarTypes";

export const INITIAL_STATE={
    type:'',
    status:false,
    message:''
}

const snackbarReducer=(state= INITIAL_STATE, action)=>{
    switch (action.type){
        case SNACK_OPEN:
            return{
                ...action.payload,
               status:true,
            }
            case SNACK_CLOSE:
            return{
                INITIAL_STATE
            }
            default :
            return  INITIAL_STATE;
    }
}

export default snackbarReducer;