

const Layout = ({children, className}) => {
    return(
        <div className={'relative overflow-hidden bg-black-50 ' + className} >
            {children}
        </div>
    )
}

export default Layout;