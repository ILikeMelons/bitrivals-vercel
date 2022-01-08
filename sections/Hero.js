import Navbar from "../components/Navbar"
import About from "./About"
import { union_white, union_red} from '../public/absolutes'
import { RequireAuth, useUser } from '../hooks/authUser'
const Hero = ({variant}) => {
    RequireAuth();
    const { user } = useUser();
    return (
        <div className={`relative overflow-hidden ${variant}`}>
            <div className="transform scale-50 md:scale-100">
                <div className="absolute w-screen -top-28 md:-top-40 heroMask" style={{background: variant == 'token' ? "url('images/bg/heroImage03.jpg')" : "url('images/bg/heroImage.jpg')" }}></div>
            </div>
            <img className="absolute -right-72 -top-80 shape--one" src={union_white.src} />
            <img className="absolute -right-0 -top-40 shape--two" src={union_red.src} /> 
            <Navbar user={user}/>
            <About variant={variant} user={user} />
        </div>
    )
}

export default Hero;