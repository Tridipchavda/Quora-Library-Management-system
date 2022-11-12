import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Axios from "axios";


function LibrarianLogin() {

	const [Lid,setLid] = useState("");
	const [Lpass,setLpass] = useState("");

	const nav = useNavigate();

	const sendLibrarianDetails = async (e) =>{
		e.preventDefault();

		
		await Axios.post('http://localhost:3001/LibrarianLogin',{id:Lid,password:Lpass}).then(
				(res)=>{
		
					if(res.data==""){
						alert("Enter valid credentials");
					}
					else{
						console.log(res.data);
						alert(res.data);
						if(res.data=="Successful Login"){
							nav("/LibrarianProfile");
							window.localStorage.setItem("l_id",Lid);
						}
						// nav("/");						
					}	
				}
			)	
	}
    return (
		<>
        <div class=" flex place-items-center justify-center py-12 px-4 ">
		<div class="max-w-md w-full ">
			<div>
				<h2 class="mt-6 text-center text-4xl text-green-600">
					Log in to Librarian account
				</h2>
			</div>
			<form class="mt-8 space-y-6" action="#" method="POST" onSubmit={(e)=>sendLibrarianDetails(e)}>
				<input type="hidden" name="remember" value="True" />
				<div class="rounded-md shadow-sm -space-y-px">
					<div>
						<label for="id" class="sr-only">Enter Librarian Id</label>
						<input value={Lid} onChange={(e)=>{setLid(e.target.value)}} name="id" type="id" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-green-500 focus:z-10 sm:text-sm" placeholder="Enter Librarian Id"/>
					</div>
                    <br></br>
					<div>
						<label for="password" class="sr-only">Enter Password</label>
						<input value={Lpass} onChange={(e)=>{setLpass(e.target.value)}} name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-green-500 focus:z-10 sm:text-sm" placeholder="Enter Password"/>
					</div>
				</div>

				<div class="flex items-center justify-between">
					<div class="flex items-center">
						<input id="remember_me" name="remember_me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
						<label for="remember_me" class="ml-2 block text-sm text-green-600">
							Remember me
						</label>
					</div>

					<div class="text-sm">
						
					</div>
				</div>

				<div>
					<button type="submit" class="group relative w-full flex border-2 border-green-500 justify-center py-2 px-4 text-sm font-medium hover:bg-green-600 hover:text-white rounded-md text-green-500 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2">
						<span class="absolute left-0 inset-y-0 flex items-center pl-3">
							
						</span>
						Sign in as Librarian
					</button>
				</div>
			</form>
		</div>
	</div>


	</>
    );
}

export default LibrarianLogin;