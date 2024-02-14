import { useNavigate } from 'react-router-dom'
import './Error404.css'

function Error401() {
    const Navigate = useNavigate()
    return (
        <section className='mt-4'>
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="col-sm-12 col-sm-offset-1 text-center">
                            <img className='flex mx-auto' src="https://cdn.dribbble.com/users/576558/screenshots/3801681/media/f2148dc5132ea854540a3c693bc51d5d.png?resize=400x0" alt="unauthorized" />
                            <div className="content">
                                <h3 className="h2">Access Unauthorized</h3>
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

export default Error401