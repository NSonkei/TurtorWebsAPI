import {LOGIN, NAV_MESS_MESS, NAV_CON, NAV_MESS} from './contants'
const initState = {
    user:{},
    navSide:'mess',
    content:'introduce',
    messContent:{},
    contactContent:{}
}

function reducer(state, actions){
    switch (actions.type){
        case NAV_MESS_MESS:
            return ({
                ...state,
                content:'mess',
                messContent:actions.payload
            })
        case NAV_MESS:
            return ({
                ...state,
                navSide:'mess',
                content:'introduce'
            })
        case NAV_CON:
            return ({
                ...state,
                navSide:'contact',
                content:'contact'
            })
        case LOGIN:
            return ({
                ...state,
                user: actions.payload
            })
        default:
            console.log("not now")
    }
}

export default reducer
export {initState}