import miImagen from '../../public/images/suculentas.jpg';


const Header = () => {
    return (
        <header className='d-flex mt-3 align-items-left align-self-sm justify-content-around my-5'>
            <div
                className="p-5 text-center bg-image my-4"
                style={{
                    backgroundImage: `url(${miImagen})`,
                    height: '30rem',
                    width: '100%',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    margin: '0'
                }}
            >
                <div
                    className="mask"
                    
                >
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <div className="text-white">
                            <h1 className="mb-3">PLANTFIZ</h1>
                            <h4 className="mb-3">¡El verde perfecto para tu rincón favorito!</h4>

                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;