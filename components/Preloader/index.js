import style from './style.module.css'

const Preloader = () => {
    return (
        <div className={"bg-black-50 fixed inset-0 flex items-center justify-center z-50 " + style.Preloader}>
            <div className="absolute w-20 h-20">
                <img className={"absolute w-10 " + style.preloader_left} src={'preloader/preloader_left.svg'} />
                <img className={"absolute w-10 " + style.preloader_right} src={'preloader/preloader_right.svg'} />
            </div>
        </div>
    );
}

export default Preloader;