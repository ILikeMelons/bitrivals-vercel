import {useFormik} from "formik";
import { Link } from 'next/link'
import router, {useRouter} from 'next/router'
import { signIn } from 'next-auth/client';
const registerUser = async value => {
    // call default function in pages/api/register
    // send the email and password from form submission event to that endpoint
    const res = await fetch("/api/auth/register", {
      body: JSON.stringify({
        email: value.email,
        password: value.password,
        rivalID: value.rivalID
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })

    const user = await res.json()
    //(user);
    if(user){
        if (user) router.push('/');
    }
  }

const SignupForm = () => {
    const formik = useFormik({
      initialValues: { rivalID: "", email: "", password: "" },
      onSubmit: async(values) => {
       //Getting value from useRef()
       registerUser(values)
      }
    });
    return (
      <div>
        <h1 className='text-white text-4xl mb-5'>Signup</h1>
        <form onSubmit={formik.handleSubmit} className='flex flex-col '>
         <label htmlFor="rivalID" className='text-white'>RivalID</label>
        <input
          id="rivalID"
          name="rivalID"
          type="rivalID"
          className="mb-5"
          onChange={formik.handleChange}
          value={formik.values.rivalID}
        />
        <label htmlFor="email" className='text-white'>Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          className="mb-5"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <label htmlFor="password" className='text-white'>Password</label>
        <input
          id="password"
          name="password"
          type="password"
          className="mb-5"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
      Signup
      </button>
      </form>
      <p className='text-white'>
        Already have an account?
      </p>
      </div>
    );
  }

  export default SignupForm;