import Axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReaderProfile from "./ReaderProfile";


var store;


function ReaderLogin(props) {
	const [password,setPassword] = useState("");
	const [id,setId] = useState("");
	
	
	const nav = useNavigate();
	
	const checkLogin = async (e) =>{
		e.preventDefault();

		
		Axios.post('http://localhost:3001/getData',{id:id,password:password}).then(
				(res)=>{
		
					if(res.data==""){
						alert("Enter valid credentials");
						setId("");
						setPassword("");
					}
					else{
						store = res.data;
						console.log(store);
						alert("Success");
						
						
						props.setProfile(store.r_id,store.r_email,store.name,store.balance);
						nav("/ReaderProfile");						
					}	
				}
			)			
	}
	
	useEffect(()=>{
   
		if(window.localStorage.getItem('id') !=null ){
			console.log("-"+window.localStorage.getItem('id')+"-");
		 nav("/ReaderProfile");
		}
	
	

   },[]);

    return (
		<>				
        <div className=" flex place-items-center justify-center py-12 px-4 ">
		<div className="max-w-md w-full ">
			<div>
				<h2 className="mt-6 text-center text-4xl text-green-600">
					Log in to your account
				</h2>
			</div>
			<form className="mt-8 space-y-6" method="POST" onSubmit={checkLogin}>
				<input type="hidden" name="remember" value="True" />
				<div className="rounded-md shadow-sm -space-y-px">
					<div>
						<label for="id" className="sr-only">Enter Log-In Id</label>
						<input value={id} onChange={(e)=>{setId(e.target.value)}} id="id" name="id" type="text" autocomplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-green-500 focus:z-10 sm:text-sm" placeholder="Enter Login Id"/>
					</div>
                    <br></br>
					<div>
						<label for="password" className="sr-only">Password</label>
						<input value={password} onChange={(e)=>{setPassword(e.target.value)}} id="password" name="password" type="password" autocomplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-green-500 focus:z-10 sm:text-sm" placeholder="Password"/>
					</div>
				</div>

				<div className="flex items-center justify-between">
				

					<div className="text-sm">
						<a href="#" className="font-medium text-green-600 hover:text-green-500">
							Forgot your password?
						</a>
					</div>
				</div>

				<div>
					<button type="submit" className="group relative w-full flex border-2 border-green-500 justify-center py-2 px-4 text-sm font-medium hover:bg-green-600 hover:text-white rounded-md text-green-500 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2">
						<span className="absolute left-0 inset-y-0 flex items-center pl-3">
							<svg className="h-5 w-5 text-green-500 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="True">
								<path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
							</svg>
						</span>
						Sign in
					</button>
				</div>
			</form>
		</div>
	</div>
	</>
    );
}

export default ReaderLogin;
