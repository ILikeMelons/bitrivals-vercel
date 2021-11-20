
import {useFormik} from "formik";
import router, {useRouter} from 'next/router'

const AuthenticateUser = async(values) => {
    const res = await fetch("/api/auth/login", {
        body: JSON.stringify({
          email: values.email,
          password: values.password
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
  
      const user = await res.json()
      
      if(res.status==200 && user){
           router.push('/');
      }else{
        alert(res.status)
      }
}
const Login = () => {
    const formik = useFormik({
        initialValues: {email: "", password: "" },
        onSubmit: async(values) => {
         //Getting value from useRef()
         AuthenticateUser(values)
        }
      });
    return (
      <div className="flex justify-center h-screen bg-black-50">
        <div className="flex flex-col justify-center">
          <h1 className="mb-5 ">login</h1>
          <form onSubmit={formik.handleSubmit} className="flex flex-col ">
            <label htmlFor="email" className="">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="px-2 py-2 mb-3 rounded-lg"
              onChange={formik.handleChange}
              value={formik.values.email}
            />

            <label htmlFor="password" className="">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="px-2 py-2 mb-3 rounded-lg"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <button
              type="submit"
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
}

export default Login;