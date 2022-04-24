import {NAV_MESS_MESS} from './contants'
const initState = {
    navSide:'mess',
    messContent:{},
    contactContent:{}
}

function reducer(state, actions){
    switch (actions.type){
        case NAV_MESS_MESS:
            return {
                ...state,
                navSide:'mess',
                messContent:actions.payload
            }
        default:
            console.log("not now")
    }
}

export default reducer
export {initState}