import { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
  } from "react-router-dom";
import Axios from "axios";

export const AddMoneyComponent = () =>{

    const nav = useNavigate();
    const [amount,setAmount] = useState("");
    
    const setHotValues = (value) =>{
        setAmount(value);
    }

    const addingMoney = (e) =>{
        e.preventDefault();

        console.log("hlo");
        Axios.post('http://localhost:3001/addMoneyRequest',{id:window.localStorage.getItem('id'),amt:amount}).then(
				(res)=>{
                    // alert("MoneyAdded");
                    alert(res.data);
                }
            )
        console.log("end");
            
    }
    
    return (
        <div className="flex items-center justify-center min-h-full my-[80px]">
    <div className="px-[70px] py-[30px] mt-4 text-left bg-white shadow-xl">
        <div className="flex justify-center">
        <img src="https://img.icons8.com/ios-filled/100/40C057/rupee.png"/>
        </div>
        <h3 className="text-2xl font-bold text-center">Add Balance to Account</h3>
        <form action="" method="POST" onSubmit={(event)=>addingMoney(event)}>
            <div className="mt-4">
                <div>
                    
                            <input type="number" placeholder="Enter Amount" onChange={(e)=>{setAmount(e.target.value)}}
                                value={amount} className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"/>
                </div>
                <div className="mt-2">
                {/* <div className="flex items-baseline justify-between pb-5">
                    <button type="button" onClick={()=>setHotValues(50)} className="px-4 py-1 mt-4 border-2 border-green-400 text-xl rounded-lg hover:bg-green-100 hover:text-green-900">50₹ </button>
                    <button type="button" onClick={()=>setHotValues(100)}  className="px-4 py-1 mt-4 border-2 border-green-400 text-xl rounded-lg hover:bg-green-100 hover:text-green-900">100₹ </button>
                    <button type="button" onClick={()=>setHotValues(200)}  className="px-4 py-1 mt-4 border-2 border-green-400 text-xl rounded-lg hover:bg-green-100 :text-green-900">200₹ </button>
                </div> */}
                </div>
                <div className="flex items-baseline justify-between">
                    <button className="px-5 py-2 mt-4 text-white bg-green-600 rounded-lg hover:bg-green-500" >Add Money</button>
                    <Link to="/IssueBook" className="text-sm text-green-600 hover:underline">Issue Book?</Link>
                </div>
            </div>
        </form>
    </div>
</div>
    )
}