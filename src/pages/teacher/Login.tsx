import React from 'react';
import { Input, Button } from '@nextui-org/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginTeachers, studentLogins } from '../../api/user';
import { studentLogin } from '../../services/interface/form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setStudentData } from '../../redux/studentSlice';
import { teacherLogin } from '../../services/interface/studetns';
import { setUserData } from '../../redux/userSlice';

// Define Zod schema for validation
const loginFormSchema = z.object({
    email: z.string().email("Invalid email address"),
  password: z.string()
      .min(7, "Password should be at least 7 characters")
      .refine(s => /[a-zA-Z]/.test(s), {
        message: "Password must contain letters.",
      })
      .refine(s => /\d/.test(s), {
        message: "Password must contain numbers.",
      })
      .refine(s => /[!@#$%^&*(),.?":{}|<>]/.test(s), {
        message: "Password must contain special characters.",
      }),
});

type LoginFormInputs = z.infer<typeof loginFormSchema>;

const Login: React.FC = () => {


    const dispatch = useDispatch()
    const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<teacherLogin> =async (data) => {
    console.log("Form submitted successfully", data);
    try {
        const response = await LoginTeachers(data)
        localStorage.setItem('token',response.data.token)
        console.log(response.data.checkName);
        dispatch(setUserData(response.data.findTeacher))
        navigate('/')
    } catch (error) {
        
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-100">
      {/* Left Section: Image */}
      <img 
        className="lg:w-1/2 w-full h-72 lg:h-screen object-cover bg-center"
        src="https://img.freepik.com/free-photo/education-day-arrangement-table-with-copy-space_23-2148721266.jpg?ga=GA1.1.985132408.1720016698&semt=ais_hybrid" 
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
                label="email"
                type="text"
                {...register("email")}
                fullWidth
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            {/* Date of Birth Input */}
            <div className="mb-4 w-full">
              <Input
                variant="bordered"
                size="sm"
                label="password"
                type="text"
                {...register("password")}
                fullWidth
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
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
