import { z } from "zod";
import Api from "../services/axios";
import errorHandler from "./error";
import { signupFormSchema } from "../services/validations/zod";
import { studentSchema } from "../services/validations/zod";
import { studentLogin } from "../services/interface/form";
import { teacherLogin } from "../services/interface/studetns";

type SignupFormInputs = z.infer<typeof signupFormSchema>;
type StudentFormData = z.infer<typeof studentSchema>;


//studentLogin

export const studentLogins = async(data : studentLogin)=>{
    try {
        const response = await Api.post('/user/student-login', data)
        return response.data
        
    } catch (error) {
        const err:Error = error as Error;
        errorHandler(err);
    }
}

export const signup = async(data:SignupFormInputs) =>{
    try {
        const response = await Api.post('/user/teacher-signup', data)
        return response.data
    } catch (error) {
        const err:Error = error as Error;
        errorHandler(err);
    }
}


export const addStudents = async (data:StudentFormData ) => {
    try {
        const response = await Api.post('/user/add-students', data)
        return response.data
    } catch (error) {
        const err:Error = error as Error;
        errorHandler(err);
    }

}

export const getStudents = async(teacherId:string) => {
  try {
    const response = await Api.get(`/user/${teacherId}`)
    return response.data; 

  } catch (error) {
    const err:Error = error as Error;
    errorHandler(err);
  }
}

export const deleteStudent = async(id: string) =>{
    try {
        const response = await Api.delete(`/user/delete/${id}`)
        return response.data
        
    } catch (error) {
        const err:Error = error as Error;
        errorHandler(err);
    }
}


export const  blockStudent = async(id: string , status: boolean) =>{
    try {
        const response = await Api.post(`/user/block/${id}` ,{ blocked: !status })
        return response.data
        
    } catch (error) {
        const err:Error = error as Error;
        errorHandler(err);
    }
}


export const LoginTeachers = async(data: teacherLogin) =>{
    try {
        const response = await Api.post('/user/teacher-login', data)
        return response.data
    } catch (error) {
        const err:Error = error as Error;
        errorHandler(err);
    }
}