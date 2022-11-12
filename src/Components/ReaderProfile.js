import { createContext, useContext, useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useSearchParams,
  } from "react-router-dom";
import Axios from "axios";



function ReaderProfile(props) {

    const [t_id,setI] = useState("");
    const [t_email,setE] = useState("");
    const [t_name,setN] = useState("");
    const [t_amount,setA] = useState("");


    useEffect(()=>{
        Axios.post('http://localhost:3001/getBalance',{id:window.localStorage.getItem('id')}).then(
            (res)=>{
                // alert("MoneyAdded");
                window.localStorage.setItem('amount',res.data[0].balance);
                setA(res.data[0].balance);
            }
        )
           if(window.localStorage.getItem('id')==null){
            window.localStorage.setItem('id',props.id);
            window.localStorage.setItem('email',props.email);
            window.localStorage.setItem('name',props.name);
            window.localStorage.setItem('amount',props.amount);
           }
           else{
               setI(window.localStorage.getItem('id'));
               setE(window.localStorage.getItem('email'));
               setN(window.localStorage.getItem('name'));
               setA(window.localStorage.getItem('amount'));
           }
            
            
            console.log("Yr");

      },[]);

    return (
        <>

        <div>
            <div className=" min-h-[200px] flex flex-col max-w-full mx-auto bg-green-50 opacity-100 font-poppins px-4 bg-no-repeat bg-cover bg-center">

                <div className="flex items-center ml-[50px] px-4 pt-12 justify-between">
                    <div className="w-20 h-20 bg-blue-600 flex items-center rounded-full">
                        <img className="h-35 w-35 mx-auto" src="https://devitt-forand.com/wp-content/uploads/2018/05/person-icon.png" />
                        
                    </div>
                    <div className="w-[1200px] flex items-center">
                        <div className=" flex flex-col">
                            <p className="text-2xl mx-3 my-3">Name : {t_name}</p>
                            <p className="text-2xl mx-3 my-3">College : V.G.E.C</p>

                            <p className="text-2xl mx-3 my-3">Balance : {t_amount}</p>
                        </div>
                        <div className=" mx-[40px] flex flex-col">
                            <p className="text-2xl mx-3 my-3">Id : {t_id}</p>
                            <p className="text-2xl mx-3 my-3">Email : {t_email}</p>
                        </div>
                        
                    </div>
                </div>
            </div>

            <div className="enterComponent flex justify-center align-center h-screen my-7">
                <Link to="/RequestBook">
                    <div class="max-w-sm rounded-xl overflow-hidden h-2/6 bg-cyan-800 mx-4 cursor-pointer">

                        <div class="px-6 py-10">
                            <p class="text-white text-3xl">
                                Request Book
    </p>
                        </div>
                        <center>
                            <img src="https://img.icons8.com/external-bearicons-glyph-bearicons/100/12B886/external-log-in-call-to-action-bearicons-glyph-bearicons.png" />
                        </center>
                    
                    </div>
                </Link>

                <Link to="/IssueBook">
                    <div class="max-w-sm rounded-xl overflow-hidden h-2/6 bg-cyan-800 mx-4 cursor-pointer">

                        <div class="px-6 py-10">
                            <p class="text-white text-3xl">
                                Issue Book
    </p>
                        </div>
                        <center>
                            <img src="https://img.icons8.com/external-bearicons-glyph-bearicons/100/12B886/external-log-in-call-to-action-bearicons-glyph-bearicons.png" />
                        </center>
                    
                    </div>
                </Link>

                <Link to="/AddMoney">
                    <div class="max-w-sm rounded-xl overflow-hidden h-2/6 bg-cyan-800 mx-4 cursor-pointer">

                        <div class="px-6 py-10">
                            <p class="text-white text-3xl">
                                Add Money
    </p>
                        </div>
                        <center>
                            <img src="https://img.icons8.com/external-bearicons-glyph-bearicons/100/12B886/external-log-in-call-to-action-bearicons-glyph-bearicons.png" />
                        </center>
                    
                    </div>
                </Link>

            </div>
        </div>
        
        </>
    );
}

export default ReaderProfile;