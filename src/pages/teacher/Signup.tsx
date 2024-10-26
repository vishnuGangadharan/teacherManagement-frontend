import React from 'react';
import { Input } from '@nextui-org/react';
import { BsEyeFill } from 'react-icons/bs';
import { FaEyeSlash } from 'react-icons/fa';
import { Button } from '@nextui-org/react';
import { useForm , SubmitHandler} from 'react-hook-form';
import * as z from "zod";
import { signupFormSchema } from '../../services/validations/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signup } from '../../api/user';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = React.useState(false);
  const [isVisible1, setIsVisible1] = React.useState(false);
  type SignupFormInputs = z.infer<typeof signupFormSchema>;

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibility1 = () => setIsVisible1(!isVisible1);

  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    mode: "onTouched"
  });

  const onSubmit: SubmitHandler<SignupFormInputs> = async(data) => {
        try {
          console.log('ddd',data);
          const response = await signup(data)
          console.log('fff',response);
          
          localStorage.setItem('token',response.token)
          dispatch(setUserData(response.data))
          toast.success(response.message)
                navigate('/')
          
          
        } catch (error) {
          console.log(error);
          
        }
        
  }

  
  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-100">
      
      <img 
      className="lg:w-1/2 w-full h-72 lg:h-screen flex items-center justify-center object-cover bg-center"
      src="https://img.freepik.com/free-photo/close-up-hands-holding-diplomas-caps_23-2148950575.jpg?ga=GA1.1.985132408.1720016698&semt=ais_hybrid" alt="" />

      {/* Right Section with Centered Form */}
      <div className="lg:w-1/2 w-full px-8  lg:px-16 lg:h-screen bg-white flex items-center justify-center shadow-lg">
        <div className="w-full max-w-md text-center flex flex-col items-center">
          <h2 className="text-3xl font-semibold text-gray-700 mt-6 mb-6">Sign Up</h2>

          <form className="space-y-4 w-full flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2 w-full">
              <Input
                variant="bordered"
                size={'sm'}
                type="text"
                label="Name"
                id="name"
                {...register("name")}
                fullWidth
              />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>


            <div className="mb-4 w-full">
              <Input
                variant="bordered"
                size={'sm'}
                type="email"
                {...register("email")}
                label="Email"
                fullWidth
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            <div className="mb-4 w-full">
              <Input
                label="Password"
                id="password"
                {...register("password")}
                variant="bordered"
                size={'sm'}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                    aria-label="toggle password visibility"
                  >
                    {isVisible ? (
                      <FaEyeSlash className="text-2xl mb-1 text-default-400 pointer-events-none" />
                    ) : (
                      <BsEyeFill className="text-2xl mb-1 text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? 'text' : 'password'}
                fullWidth
              />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>


            <div className="mb-6 w-full">
              <Input
                label="Confirm Password"
                id="confirmPassword"
                {...register("confirmPassword")}
                size={'sm'}
                variant="bordered"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility1}
                    aria-label="toggle password visibility"
                  >
                    {isVisible1 ? (
                      <FaEyeSlash className="text-2xl mb-1 text-default-400 pointer-events-none" />
                    ) : (
                      <BsEyeFill className="text-2xl mb-1 text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible1 ? 'text' : 'password'}
                fullWidth
              />
            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
            </div>


            {/* Centered Button */}
            <Button type='submit' color="warning" className="w-full max-w-xs mx-auto">
              Sign up
            </Button>

            <p className="text-center text-sm text-gray-500 mt-4 pb-5">
              Already have an account?{' '}
              <a href="#" className="text-blue-500 hover:underline">
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
