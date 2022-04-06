import Layout from '../components/Layout'
import Navbar from "../components/Navbar"
import { Parallax } from 'react-parallax';
import { triangle_solid_white, cross_solid_yellow, triangle_outline_pink, circle_solid_white, square_outline_yellow } from '../public/shapes'
const Presale = () => {
    return(
        <Layout>
            <Navbar hideLinks={true}/>
            <div className='w-full relative h-screen bg-brand flex justify-center items-center'>
            
                <div className='p-2 flex justify-center'>
               
                    <h1 className='text-pink font-morgan text-30px'>PRESALE COMING SOON!</h1>
                    <div>

                    </div>
                </div>
                
            </div>
        </Layout>
    );
}

export default Presale;