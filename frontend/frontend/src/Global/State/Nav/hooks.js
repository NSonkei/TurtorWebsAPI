import { useContext } from "react";
import NavContext from "./Context";

export const useNav = () => {
    const [state,dispatch] = useContext(NavContext)
    return [state,dispatch]
}