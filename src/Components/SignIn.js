import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
  } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";

function Signin() {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [id,setId] = useState("");

    const nav = useNavigate();
    const submitForm = (e) =>{
        e.preventDefault();
        Axios.post('http://localhost:3001/',{name:name,email:email,password:password,id:id}).then(
            ()=>{
                alert("Success");
            }
        )
        
        nav('/');
    }
    return (
        <div className="bg-green-lighter mt-[50px] flex flex-col">
            <div className="container max-w-[600px] mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-green-100 px-6 py-8 rounded-xl shadow-md text-green-600 w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                    <form id="signInForm"method="post" action="/" onSubmit={submitForm}>
                        <input 
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="id"
                            placeholder="Enter id" 
                            value={id}
                            onChange ={ (e)=>{setId(e.target.value)}}
                            />

                        <input 
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="name"
                            placeholder="Enter Name"
                            value={name}
                            onChange ={ (e)=>{setName(e.target.value)}}
                             />

                        <input 
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="email"
                            placeholder="email"
                            value={email}
                            onChange ={ (e)=>{setEmail(e.target.value)}}
                            />

                        <input 
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange ={ (e)=>{setPassword(e.target.value)}}
                            />
                        

                        <button
                            className="w-full text-center py-3 rounded my-1 text-white bg-green-500"
                            
                        >Create Account</button>
                    </form>
                    <div className="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the 
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Terms of Service
                        </a> and 
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Privacy Policy
                        </a>
                    </div>
                </div>

                <div className="text-green-600 mt-6">
                    Already have an account? 
                    <Link className="no-underline border-b border-blue text-blue" to="/ReaderLogin">
                        Log in
                    </Link>.
                </div>
            </div>
        </div>

    )
}

export default Signin;