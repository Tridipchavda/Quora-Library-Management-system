import { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
  } from "react-router-dom";
import Axios from "axios";

export const RequestBookPopUp = () =>{

    const nav = useNavigate();
    const [requestBookName,setRequestBookName] = useState("");
    const [requestBookAuthName,setRequestBookAuthName] = useState("");

    const [flag,setFlag] = useState(false);
    const id = window.localStorage.getItem('id');

    console.log(id);

    const name = window.localStorage.getItem('name');

    const sendBookRequest = () =>{
        
        Axios.post('http://localhost:3001/requestBook',{id:id,rName:name,bookName:requestBookName.toLowerCase(),authName:requestBookAuthName.toLowerCase()}).then(
				(res)=>{
                    if(res.data!=""){
                        alert(res.data);
                    }
                    else{
                        alert("Requested Book "+requestBookName+" to Higher Authorites");
                    }
                    console.log(res);
                }
            )
        
        console.log(flag);
        if(flag==true){
            nav("/LibrarianProfile");
        }
        else{
            nav("/ReaderProfile");
        }
    }
    return (
        <div className="flex items-center justify-center min-h-full my-[80px]">
    <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <div className="flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-blue-600" fill="none" viewBox="0 0 24 24"
                stroke="green">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
        </div>
        <h3 className="text-2xl font-bold text-center">Not Available ? Request Book </h3>
        <form action="" method="POST" onSubmit={()=>{sendBookRequest()}}>
            <div className="mt-4">
                <div>
                    
                            <input type="text" placeholder="Enter Book Name" onChange={(e)=>{setRequestBookName(e.target.value)}}
                                value={requestBookName} className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-600"/>
                </div>
                <div className="mt-4">
                    
                            <input type="text" placeholder="Enter Author Name" onChange={(e)=>{setRequestBookAuthName(e.target.value)}}
                                value={requestBookAuthName} className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-600"/>
                </div>
                <div className="flex items-baseline justify-between">
                    <button className="px-6 py-2 mt-4 text-white bg-green-600 rounded-lg hover:bg-green-900">Request Book</button>
                    <Link to="/IssueBook" className="text-sm text-green-600 hover:underline">Issue Book?</Link>
                </div>
            </div>
        </form>
    </div>
</div>
    )
}