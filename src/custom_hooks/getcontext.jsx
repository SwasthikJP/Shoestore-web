import { useContext } from "react";
import { userAuth } from "../functions/userAuth";

export  function useGetcontext(){
 return useContext(userAuth);
}