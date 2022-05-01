import { useReducer } from "react";
import NavContext from "./Context";
import reducer, { initState } from "./Reducer";

function ProviderNav({children}){
    const [state,dispatch] = useReducer(reducer,initState)

    return (
        <NavContext.Provider value = {[state,dispatch]}>
            {children}
        </NavContext.Provider>
    )
}

export default ProviderNav