import style from './style.module.css'
import { Formik, Form, Field } from "formik";
import Loader from '../Loader';
import * as Yup from "yup";
import { useState } from 'react';

const Newsletter = () => {
	const Subscribe = 'Subscribe'
	const Success = 'Success!'

    const [title, setTitle] = useState(Subscribe)
    const submitData = async(value) => {
        console.log(value);
       /* const response = SubscribeEmail(value).then(res => {
            return res;
        }).catch(e=>{
            return e;
        })
        console.log(response);*/
    }

    const textTitle = () => {
        return `DON'T MISS OUT ON THE LATEST`
    }
    const SignupSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required(),
    });
    return (
        <div className={'relative w-full bg-yellow -bottom-24 md:-bottom-10 transform md:translate-y-1/2 items-center py-8 md:py-16 px-8 md:px-28 overflow-hidden md:-mt-60 ' + style.newsletterWrapper}>
            <div className='grid grid-cols-1 md:grid-cols-5 '>
                <div className='col-span-2 '>
                    <p className='max-w-xs mb-2 font-semibold font-morgan text-42px'>{textTitle()}</p>
                    <p className="pr-6">Enter your email address to receive our newsletter and updates on the latest from the team</p>
                </div>
                
                <Formik
				initialValues={{
					email: ""
				}}
				validationSchema={SignupSchema}
				onSubmit={(values) => {
					SubscribeEmail(values.email);
                    setTitle(Success);
				
				}}
			>
				{({ errors, touched, isSubmitting }) => (
					<Form className="relative flex flex-col items-center pt-6 pb-5 font-semibold md:pb-0 top-4 md:col-span-3 md:flex-row text-black-50 text-14px">
						<div
							className={
								touched.email && errors.email
									? "relative error w-full mb-4 " + style.inputWrapperError
									: "relative mb-4 w-full " + style.inputWrapper
							}
						>
							<label htmlFor="email" className="block mb-2 text-black-100">
								Email Address
							</label>
							{errors.email && touched.email ? (
								<div className="absolute top-0 right-0 text-pink">
									{" "}
									{errors.email}
								</div>
							) : (
								""
							)}

							<Field
								name="email"
								type="email"
								className="w-full px-5 py-4 mt-2 border-3 bg-yellow border-black-100 text-black-50 text-18px"
							>
								{({ field, meta: { touched, error } }) => (
									<input
										className={
											touched && error
												? "border-4 border-pink  bg-yellow py-3 px-5 w-full outline-none text-black-50 text-16px "
												: "py-3 px-5 border-4  bg-yellow border-black-100 w-full outline-none text-black-50 text-16px"
										}
										{...field}
									/>
								)}
							</Field>
						</div>
                        <div
							className={
								touched && errors
									? "relative w-full md:w-auto col-span-1 error md:pl-2"
									: "relative w-full md:w-auto col-span-1 md:pl-2 flex items-center  "
							}
						>
							{(
								<button
									type="submit"
									className={"text-16px transform -translate-y-0.5 h-18 px-10 py-3 md:mt-5 transition-colors duration-200 border-4 text-black-50 hover:bg-black-50 hover:text-white border-black-50 w-full font-bold " + style.buttonWrapper}
								>
								 Subscribe
								</button>
							) }
							
						</div>
						
						
					</Form>
				)}
			</Formik>
             
            </div>

			{
				title == Success && (<div className="w-full mt-8 text-center text-28px md:text-right"> Thank you for subscribing to our newsletter! </div>)
			}
	
        </div>
    )
}


 const SubscribeEmail = async(email) =>{
    const response = await fetch('/api/registerSubscriber',{
        body: JSON.stringify({
            email: email
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
    })

    const result = await response.json();

    return result.valid;
   
}  

export default Newsletter;