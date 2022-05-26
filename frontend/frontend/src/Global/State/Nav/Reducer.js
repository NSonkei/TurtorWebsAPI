import {LOGIN, NAV_MESS_MESS, NAV_CON, NAV_MESS, NAV_INTRO, ADD_RERENDER_SIDEBAR, GET_CONTACT, SAVE_STOMP, DELETE_CONTACT} from './contants'
const initState = {
    user:{},
    navSide:'mess',
    reRenderSidebar:()=>{},
    content:'introduce',
    messContent:{},
    contactContent:{},
    contact:[],
    stompClient:{}
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
        case NAV_INTRO:
            return ({
                ...state,
                content:'introduce',
                messContent:{}
            })
        case ADD_RERENDER_SIDEBAR:
            return ({
                ...state,
                reRenderSidebar: actions.payload
            })
        case GET_CONTACT:
            return ({
                ...state,
                contact: actions.payload
            })
        case SAVE_STOMP:
            return ({
                ...state,
                stompClient:actions.payload
            })
        case DELETE_CONTACT:
            const contact = state.contact.filter((value)=> value.userId!==actions.payload)
            return ({
                ...state,
                contact:contact
            })
        default:
            console.log("not now")
    }
}

export default reducer
export {initState}