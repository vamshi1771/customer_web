import { DARK_MODE, LIGHT_MODE } from "../Types/DarkModeTypes";

export const INITIAL_STATE = {
    theme: "light"
}

export const DarkModeReducers = (state, action) => {
    switch (action.type) {
        case DARK_MODE:
            return {
                theme: "dark"
            }
        case LIGHT_MODE:
            return INITIAL_STATE
        default: return INITIAL_STATE
    }
}