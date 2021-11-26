import {Formik, Form, Field } from "formik";
import {useState} from 'react'
import Loader from "../Loader";
import * as Yup from 'yup';

const regex = /^0x[A-z0-9]{40}$/
const WalletSchema = Yup.object().shape({
    walletAddress: Yup.string().test('valid address', 'Must be a valid wallet address', (val)=>val && regex.test(val)).required('Wallet address required'),
});


const Step2 = ({submitData, rivalID}) => {

    return (
      <div className="w-full">
        <h1 className="mb-2 uppercase text-30px font-morgan text-yellow">Congratulations!</h1>
        <p className="text-white text-14px">
          Your rival ID <span className="text-pink">{rivalID}</span> has been created!
        </p>
        <p className="pt-5 pb-1 text-white uppercase text-24px font-morgan">
          Want to EARN $RIVAL BEFORE THE PRESALE?
        </p>
        <p className="max-w-sm text-white text-14px">
          Enter your wallet address to receive your unique invitation code. Share this code with up to 10 friends to get 100
          $RIVAL for everyone that signs up!
        </p>
        <Formik
          initialValues={{
            walletAddress: "",
          }}
          validationSchema={WalletSchema}
          onSubmit={(values) => {
            
            submitData(values);
          }}
        >
              {({ errors, touched, isSubmitting }) => (
                   <Form className='flex flex-col pt-5 '>
                     <div
							className={
								touched.walletAddress && errors.walletAddress
									? "relative inputWrapper error  mb-4"
									: "relative inputWrapper  mb-4"
							}
						>
                   <label htmlFor="walletAddress" className='block mb-2 text-black-150 text-14px' >
                         Wallet address
                       </label>
                     <Field name="walletAddress"  className="px-2 py-2 rounded-lg ">
                     {
                       ({
                         field,
                         meta: {touched, error}
                       }) => <input  className={
                        touched && error
                          ? "border-2 border-pink bg-black-50 py-3 px-5 w-full outline-none text-white"
                          : "text-white py-3 px-5 border-2 bg-black-50 border-black-100 w-full outline-none"
                      } {...field}/>
                     }  
                     </Field>
                     </div>
                     { errors.walletAddress ? <div className='mt-1 mb-1 text-pink text-14px'> {errors.walletAddress}</div> : <br/>}
                     <p className="text-black-150 text-12px">
                        We need your wallet address to airdrop your tokens.
                    </p>
                    <div
							className={
								touched && errors
									? "relative inputWrapper error mb-4"
									: "relative inputWrapper mb-4"
							}
						>
                     {!isSubmitting ? (
								<button
									type="submit"
									className="w-full px-4 py-3 mt-6 transition-all duration-200 border-2 text-pink hover:bg-pink hover:text-white border-pink"
              
								>
									Submit
								</button>
							) : (
								<button
									type="submit"
									className="w-full px-4 py-6 mt-6 font-bold rounded-lg bg-pink h-14 text-pink border-pink"
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
}

export default Step2;