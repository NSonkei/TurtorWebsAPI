import { LOGIN,NAV_MESS_MESS, NAV_MESS, NAV_CON, NAV_INTRO, ADD_RERENDER_SIDEBAR, GET_CONTACT } from "./contants";

export const navMessMess = payload => ({
    type:NAV_MESS_MESS,
    payload
})

export const navMess = payload => ({
    type: NAV_MESS,
    payload
})

export const navCon = payload => ({
    type: NAV_CON,
    payload
})

export const login = payload => ({
    type:LOGIN,
    payload
})

export const navIntro = payload => ({
    type: NAV_INTRO,
    payload
})

export const addReRenderSidebar = payload => ({
    type: ADD_RERENDER_SIDEBAR,
    payload
})

export const getContact = payload => ({
    type: GET_CONTACT,
    payload
})