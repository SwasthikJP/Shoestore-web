import { useContext } from "react";
import { userAuth } from "../components/userAuth";

export  function useGetcontext(){
 return useContext(userAuth);
}