import { SNACK_CLOSE,SNACK_OPEN } from "../Types/sanckBarTypes";

export const openSnackBar=(data)=>({
    type:SNACK_OPEN,
    payload:data
})

export const closeSnackBar=(data)=>({
    type:SNACK_CLOSE,
    
})