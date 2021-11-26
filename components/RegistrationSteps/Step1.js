import { Formik, Form, Field, validateYupSchema } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Loader from "../Loader";
const SignupSchema = Yup.object().shape({
	password: Yup.string()
		.min(6, "Password must contain more than 6 characters")
		.required("Required"),
	rivalID: Yup.string()
		.min(3, "Rival ID minimum length is 3")
		.max(50, "Too Long!")
		.strict(true)
		.required("Required"),
	email: Yup.string().email("Invalid email").required("Required"),
});



const Step1 = ({ submitData, inviteCode }) => {

	const [prevValue, setprevValue] = useState('');
	const [errorMessage, setErrorMessage] = useState('')

	const validateRival = async(value) => {
	
		if(value !== prevValue){
			setprevValue(value);
			setErrorMessage(await ValidateRivalID(value))
		}
		return errorMessage;
	}
	return (
		<div className="w-full mt-4 md:mt-0">
	
			{inviteCode == '' || inviteCode == undefined ? <Header /> : <InvitationHeader />}
			<Formik
				initialValues={{
					password: "",
					rivalID: "",
					email: "",
				}}
				validationSchema={SignupSchema}
				onSubmit={(values, actions) => {
					submitData(values);
			
					setTimeout(() => {
						actions.setSubmitting(false);
					  }, 500);
				}}
			>
				{({ errors, touched, isSubmitting }) => (
					<Form className="relative flex flex-col pt-6 font-semibold text-black-150 text-14px">
						<div
							className={
								touched.email && errors.email
									? "relative inputWrapper error mb-4"
									: "relative inputWrapper  mb-4"
							}
						>
							<label htmlFor="email" className="block mb-2">
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

						<div
							className={
								touched.rivalID && errors.rivalID
									? "relative inputWrapper error mb-4"
									: "relative inputWrapper  mb-4"
							}
						>
							<label htmlFor="rivalID" className="block mb-2">
								Rival ID
							</label>

							{errors.rivalID  ? (
								<div className="absolute top-0 right-0 text-pink">
									{errors.rivalID}
								</div>
							) : (
								""
							)}

							<Field name="rivalID" validate={validateRival} >
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

						<div
							className={
								touched.password && errors.password
									? "relative inputWrapper error  mb-4"
									: "relative inputWrapper  mb-4"
							}
						>
							{errors.password && touched.password ? (
								<div className="absolute top-0 right-0 text-pink">
									{errors.password}
								</div>
							) : (
								""
							)}
							<label htmlFor="password" className="block mb-2">
								Password
							</label>

							<Field
								name="password"
								type="password"
								className="px-6 py-3 border-2 bg-black-50 border-black-100"
							>
								{({ field, meta: { touched, error } }) => (
									<input
										type="password"
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

						<div
							className={
								touched && errors
									? "relative inputWrapper error mb-4"
									: "relative inputWrapper mb-4"
							}
						>
							{!isSubmitting  ? (
								<button
									type="submit"
									className="w-full px-4 py-3 mt-6 transition-colors duration-200 border-2 h-14 text-pink hover:bg-pink hover:text-white border-pink"
								>
									Register my Rival ID
								</button>
							) : (
								<button
									type="submit"
									className="w-full px-4 py-6 mt-6 font-bold bg-blue-500 h-14 text-pink bg-pink border-pink"
								>
								<div className="relative">
									<Loader />
								</div>
								
								</button>
							)}
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

const Header = () => {
	return (
		<>
		<h1 className="mb-2 uppercase text-30px font-morgan text-yellow">
				Register your Rival ID
			</h1>
			<p className="text-white text-14px">
				The Rival ID is your gateway to the Bit Rivals ecosystem. Don’t let your
				dream Rival ID get taken! Register yours today and it’s yours forever.
			</p>
		</>
	)
}
const InvitationHeader = () => {
	return (
		<>
		<h1 className="mb-2 uppercase text-30px font-morgan text-yellow">
				YOU HAVE BEEN INVITED TO REGISTER YOUR RIVAL ID!
			</h1>
			<p className="text-white text-14px">
				The Rival ID is your gateway to the Bit Rivals ecosystem. Don’t let your
				dream Rival ID get taken! Register now and get 100 $RIVAL!
			</p>
		</>
	)
}


const ValidateRivalID = async(value) => {
	//console.log(value);
	if(value.length > 2 ){
		const response = fetch("/api/auth/validateRivalId", {
			body: JSON.stringify({
				rivalID: value
			}),
			headers: {
				"Content-type":"application/json"
			},
			method: "POST"
		}).then((res)=> { 
			
			return res;
		})
		.catch((e)=>{return e})
		const code = await response;
		const json = await code.json();

		
		if(json.data > 0){
			return "This Rival ID is unavailable!"
		}
	}
	
	
};


export default Step1;
