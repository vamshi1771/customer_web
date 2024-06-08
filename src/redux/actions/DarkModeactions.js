import { DARK_MODE,LIGHT_MODE } from "../types/DarkModeTypes";

export const darkmode= (data)=>({
    type:DARK_MODE
})

export const lightMode=(data)=>({
    type:LIGHT_MODE,
})
