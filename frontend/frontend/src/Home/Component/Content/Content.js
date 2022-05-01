import Introduce from "./Introduce/Introduce"
import Mess from "./Mess/Mess"
import Contact from "./Contact/Contact"
import {useNav} from "../../../Global/State/Nav"
import clsx from "clsx"
import styles from "./Content.module.scss"
function Content(){
    //useNav
    const [navState,dispatchNavState] = useNav()
    //classes
    const contentContainerClasses = clsx(styles.contentContainer)
    return(
        <div className={contentContainerClasses}>
            {(navState.content === "introduce") && <Introduce></Introduce>}
            {(navState.content === "mess") && <Mess></Mess>}
            {(navState.content === "contact") && <Contact></Contact>}
        </div>
        
    )
}

export default Content