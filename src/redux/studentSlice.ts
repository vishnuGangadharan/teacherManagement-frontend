import { createSlice } from "@reduxjs/toolkit";

const getStudentInfo = () => {
    const storedStudentInfo = localStorage.getItem('studentInfo');
    try {
        return storedStudentInfo ? JSON.parse(storedStudentInfo) : null;
    } catch (error) {
        console.log("Error in parsing stored user info", error);
        localStorage.removeItem("studentInfo");
        return null;
    }
};

const initialState = {
    studentInfo: getStudentInfo() 
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setStudentData: (state, action) => {
            state.studentInfo = action.payload;
            localStorage.setItem('studentInfo', JSON.stringify(action.payload));
        },
        studentLogout: (state) => {
            state.studentInfo = null;
            localStorage.removeItem('studentInfo');
        }
    }
});

export const { setStudentData, studentLogout } = authSlice.actions;
export default authSlice.reducer;
