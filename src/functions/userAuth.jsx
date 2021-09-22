import {createContext} from "react";

export const userAuth=createContext({
    uid:"",
    checkUser:()=>{}
})