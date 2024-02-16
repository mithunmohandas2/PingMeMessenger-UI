import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { SignupAPI } from '../services/interactionsAPI';
// import backgroundImg from '/images/loginBg.jpg';
import { useDispatch } from 'react-redux';
import { login } from '../features/user/userSlice';

function Resgister() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [loading, setLoading] = useState(false)
    const Navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSignup = async (event: { preventDefault: () => void; }) => {
        try {
            event.preventDefault()
            if (password !== password2) {
                return toast('Password mismatch', { icon: '⛔', });
            }
            setName(name.trimEnd());
            setEmail((email).trimEnd());

            // console.log(name, email, password)   //test mode

            if (!name || !email || !password) {
                return toast.error("Missing required fields");
            }
            setLoading(true);
            const response = await SignupAPI(name, email, password);
            // console.log("Reg", response)    //test
            if (response?.data) {
                toast.success('Signup successful');
                setTimeout(() => {
                    dispatch(login(response.data))
                    Navigate('/chats')
                }, 2000);
            } else {
                toast.error(response?.response?.data?.message)
                setLoading(false);
            }

        } catch (error) {
            console.log((error as Error).message);
        }
    }
    const backgroundImageStyle = {
        backgroundColor: 'gray',
        backgroundImage: `url("https://images.pexels.com/photos/665214/pexels-photo-665214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    };
    return (
        <div className="flex min-h-screen flex-col justify-center px-6 py-16 sm:py-10 lg:px-8" style={backgroundImageStyle}>
            <Toaster />
            <div className='p-8 bg-slate-100 rounded-2xl mx-auto'>
                <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
                    <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 ">Create a new account</h2>
                </div>

                <div className="pt-10 sm:mx-auto w-full ">
                    <form className="space-y-6" onSubmit={handleSignup}>

                        <div className="mb-3">
                            <input id="name" name="name" type="name" required className="block w-full ps-2 sm:me-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6" placeholder="Full name" pattern="[A-Za-z ]*" minLength={3} value={name} onChange={(input) => { setName(input.target.value.trimStart()) }} />
                        </div>

                        <div className="mb-3">
                            <input id="email" name="email" type="email" required className="block w-full ps-2 sm:me-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6" pattern="^(?=.*[@])(?=.*[.]).{5,}$" placeholder="Email address" value={email}
                                onChange={(input) => setEmail(input.target.value.toLowerCase())} />
                        </div>

                        <div className="mb-3">
                            <input id="password" name="password" type="password" required className="block w-full ps-2 sm:me-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                // pattern="^(?=.*[A-Za-z0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-=|]).{6,}$" 
                                placeholder="Enter password" value={password}
                                onChange={(input) => setPassword(input.target.value)} />
                        </div>

                        <div className="mb-3">
                            <input id="password2" name="password2" type="password" autoComplete="name" required className="block w-full ps-2 sm:ms-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                // pattern="^(?=.*[A-Za-z0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-=|]).{6,}$" 
                                placeholder="Confirm password" value={password2} onChange={(input) => setPassword2(input.target.value)} />
                        </div>

                        <div>
                            {!loading ? <button type="submit" className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">Register</button> :
                                <button type="button" className="flex w-full justify-center rounded-md bg-opacity-50 bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">Register</button>}
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Have an account?  <span className="font-semibold leading-6 text-cyan-600 hover:text-cyan-500 cursor-pointer" onClick={() => Navigate("/")}>Login</span>
                    </p>
                </div>
            </div >
        </div >
    )
}

export default Resgister