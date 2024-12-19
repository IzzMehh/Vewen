import Auth from "@/backend/Auth";
import { UserData } from "../typings/global";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState:UserData | null = await Auth.getSession()


const userDataSlice = createSlice({
    name:"userDataSlice",
    initialState,
    reducers:{
        
    }

})

export const {} = userDataSlice.actions
export default userDataSlice.reducer