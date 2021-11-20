import ProfileComponent from "../../components/Profile/profile";

export default function Profile(props){
    const handleSignOut = () => {

    }
    
    return <div>
         <ProfileComponent session={props.session}/>
         <button onClick={()=>{handleSignOut()}}>SignOut</button>
    </div>
}

/* export async function getServerSideProps({params}){
    console.log(params);
    return { props : {session: params}};
} */