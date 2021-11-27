import {Formik, Form, Field, useFormik } from "formik";
import {useEffect, useState} from 'react';
import * as Yup from 'yup';
import {registerUserComplete} from '../../requests/registration'

const SignupSchema = Yup.object().shape({
	RivalID: Yup.string()
		.min(3, "Rival ID minimum length is 3")
		.max(50, "Too Long!")
		.strict(true)
		.required("Required")
});

const RegisterID = ({userID, userEmail, setUserShareCode, setRivalID }) => {
  const [errorMsg, setErrorMsg] = useState('');
 
    return (
        <Formik id='rivalIDForm'
                onSubmit={(values)=> { registerUserComplete(userID ,values.RivalID, userEmail).then(res=>{setUserShareCode(res.invitation); setRivalID(res.rivalID);}).catch(e=>{setErrorMsg(e)})}} 
                validationSchema={SignupSchema} 
                initialValues={{
					RivalID: "",
				}}
        
        >
          {({ errors, touched, isSubmitting }) => (
            <Form >
              <div
                className={
                  touched.RivalID && errors.RivalID
                    ? "relative inputWrapper error mb-4"
                    : "relative inputWrapper  mb-4"
                }
              >
                <p className='text-pink'>{errorMsg} </p>
                <label htmlFor="RivalID" className="text-white">
                  RivalID
                </label>

                {errors.RivalID  ? (
								<div className="absolute top-0 right-0 text-pink">
									{errors.RivalID}
								</div>
							) : (
								""
							)}
                <Field
                  name="RivalID"
                  type="RivalID"
                  className="w-full px-5 py-3 mt-2 text-white border-2 bg-black-50 border-black-100"
                >
                  {({ field, meta: { touched, error } }) => (
                    <input
                      className={
                        touched && error
                          ? "border-2 border-pink bg-black-50 py-3 px-5 w-full outline-none text-white"
                          : "text-white py-3 px-5 border-2 bg-black-50 border-black-100 w-full outline-none"
                      }
                      {...field}
                     
                    />
                  )}
                </Field>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-3 mt-6 transition-colors duration-200 border-2 h-14 text-pink hover:bg-pink hover:text-white border-pink"
              >
                Register my Rival ID
              </button>
            </Form>
          )}
        </Formik>
    )
}

export default RegisterID;