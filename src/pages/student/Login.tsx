import React from 'react';
import { Input, Button } from '@nextui-org/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { studentLogins } from '../../api/user';
import { studentLogin } from '../../services/interface/form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setStudentData } from '../../redux/studentSlice';

// Define Zod schema for validation
const loginFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  dob: z.string().regex(
    /^\d{4}-\d{2}-\d{2}$/,
    { message: "Date of birth must be in the format YYYY-MM-DD" }
  ),
});

type LoginFormInputs = z.infer<typeof loginFormSchema>;

const Login: React.FC = () => {


    const dispatch = useDispatch()
    const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<studentLogin> =async (data) => {
    console.log("Form submitted successfully", data);
    try {
        const response = await studentLogins(data)
        localStorage.setItem('token',response.data.token)
        
        console.log(response.data.checkName);
          dispatch(setStudentData(response.data.checkName))
          navigate('/studentHome')
    } catch (error) {
        
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-100">
      {/* Left Section: Image */}
      <img 
        className="lg:w-1/2 w-full h-72 lg:h-screen object-cover bg-center"
        src="https://img.freepik.com/free-photo/close-up-hands-holding-diplomas-caps_23-2148950575.jpg?ga=GA1.1.985132408.1720016698&semt=ais_hybrid" 
        alt="Signup background"
      />

      {/* Right Section: Form */}
      <div className="lg:w-1/2 w-full px-8 lg:px-16 lg:h-screen bg-white flex items-center justify-center shadow-lg">
        <div className="w-full max-w-md text-center flex flex-col items-center">
          <h2 className="text-3xl font-semibold text-gray-700 mt-6 mb-6">Login</h2>

          <form className="space-y-4 w-full flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
            {/* Name Input */}
            <div className="mb-2 w-full">
              <Input
                variant="bordered"
                size="sm"
                label="Name"
                type="text"
                {...register("name")}
                fullWidth
              />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            {/* Date of Birth Input */}
            <div className="mb-4 w-full">
              <Input
                variant="bordered"
                size="sm"
                label="Date of birth"
                type="text"
                {...register("dob")}
                fullWidth
              />
              {errors.dob && <p className="text-red-500">{errors.dob.message}</p>}
            </div>

            {/* Submit Button */}
            <Button type="submit" color="warning" className="w-full max-w-xs mx-auto ">
              Login
            </Button>

            {/* Sign-in Link */}
          
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
