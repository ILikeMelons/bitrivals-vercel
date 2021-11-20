const Container = (props) => {
    const {children, className, style, custom} = props;
    
    const getClassNames = () => {
        let classNames = [];
        
        if(!custom){
            classNames = ['container p-10 ']
        }
         
        className && classNames.push(className)
        return classNames.join(' ')
    }

    return (
        <div className={getClassNames()} style={style}>
            {children}
        </div>
    )
}

export default Container