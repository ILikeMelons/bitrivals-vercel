import Table from '../components/Table';
import {getAllUsers} from '../backend/Supabase' 
import { useState } from 'react';
import { login } from '../requests/admin';
export default function Admin({data}) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [text, setText] = useState('');
  const enter = () => {
      login(text).then((e)=>{setIsAdmin(true)}).catch(e=>{setIsAdmin(false)})
   
  }

  return (
    <div className='absolute w-full bg-black-50 h-full'>
      {!isAdmin ? 
        <AdminLogin login={enter} setText={setText} />
      :
      <Table data={data} />   
      }
     
    </div>
  )
}

const AdminLogin = ({login, setText}) => {
  
  return (
    <div className='flex justify-center h-full '>
          
          <div className='m-auto text-center'>
          <h1  className='text-white text-2xl pl-2 font-MorganPoster'>Admin</h1>
        <div className='flex flex-col'>
        <input type="password" className='rounded-lg px-2 py-1 text-center' onChange={(e)=>{setText(e.target.value)}}/>
        <button className='text-white bg-pink rounded-lg mt-2 py-1' onClick={()=>login()}><i class="fa fa-sign-in" aria-hidden="true"></i> </button>
        </div>
          </div>
          
      
        </div>
  )
}

export async function getServerSideProps(context) {
  const response = getAllUsers().then((res)=> {return res}).catch((e) => {return e});
 
  const result = await response;
  let data = result.body;
  return {
      props: {data}
  }
}


