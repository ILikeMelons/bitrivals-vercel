import { supabase } from "../utils/supabaseClient";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { UserContextProvider, RequireAuth, useUser } from '../hooks/authUser'
import { loadDotaMatchHistory } from '../requests/steam'
export default function Profile({data}) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [steamID, setSteamId] = useState('');
    const [steamName, setSteamName] = useState('')
    RequireAuth();
    const { user } = useUser();
    useEffect(()=>{
        const params = new URL(location.href).searchParams;
        (user);
        setSteamId(params.get('steam_id'));
        setSteamName(params.get('steam_name'))
    })

  return (
    
    <div className='absolute w-full bg-black-50 h-full'>        
            <UserProfile name={steamName} id={steamID}/>
    </div>
 
  )
}

const UserProfile = ({name, id}) => {
    
    const [matchRes, setMatchResult] = useState({});
    RequireAuth();
    const { user } = useUser();
   
    return ( user  ? (
      <div className="w-full flex justify-center text-white py-20">
       {/* <div className="text-center">
          {name}
          <div className="grid grid-cols-2 pt-5 gap-4 text-center">
            <a href={'/api/auth0/battlenet'} ><div className="border-2 rounded-lg p-2 cursor-pointer">Link account to<br/> Battle.net</div></a>
            <a href={'/api/auth0/steam'} ><div className="border-2 rounded-lg p-2 cursor-pointer">Link account to<br/> Steam</div></a>
          </div>
          
            <div className="pt-10" onClick={()=> { loadDotaMatchHistory('').then((res)=>{setMatchResult(res); (matchRes.matches)})}}>
                Load game data
            </div>
            <div className="pt-5 text-white">
               {
                 matchRes.matches !== undefined ? matchRes.matches.map((m,i) => {return(
                      <div>matchID: {m.match_id}</div>
                      )}) : ''
               }
            </div>
         
        </div>*/}
      </div>
    ) : (
     <div></div>
    ));
}





