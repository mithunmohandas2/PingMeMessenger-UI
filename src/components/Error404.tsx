import { useNavigate } from 'react-router-dom'
import './Error404.css'
function Error404() {
    const Navigate = useNavigate()
    return (
        <section className='mt-4'>
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="col-sm-12 col-sm-offset-1 text-center">
                            <div className="bg-img">
                                <h1 className="text-center">404</h1>
                            </div>
                            <div className="content">
                                <h3 className="h2">Page not found!</h3>
                                <p>are you sure you want to be here?</p>
                                <p onClick={() => Navigate(-1)} className="link cursor-pointer m-2">Go Back</p>
                                <p onClick={() => Navigate('/')} className="link cursor-pointer m-2">Go to Home</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Error404