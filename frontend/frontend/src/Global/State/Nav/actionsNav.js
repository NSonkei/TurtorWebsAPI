import { LOGIN,NAV_MESS_MESS, NAV_MESS, NAV_CON } from "./contants";

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