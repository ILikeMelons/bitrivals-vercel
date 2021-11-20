import styles from './style.module.css'

const Profile = ({session}) => {
    return(
        <div className='flex w-full'>
           <div className={"md:w-1/4 h-20 w-full "+ styles.content}>
            
            </div>
            <p className='pl-10 text-white text-3xl'>{session!== undefined ? session.user.email : ''}</p>
        </div>
    )
}


 export default Profile;