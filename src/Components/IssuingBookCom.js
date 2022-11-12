

import { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useSearchParams,
} from "react-router-dom";

import * as Axios from "axios";
import { RequestBookPopUp } from "./RequestBookPopUp";

function IssueBook() {

    const [bookData, setBookData] = useState([{}]);
    const [filtered,setFiltered] = useState([{}]);
    const [flag,setFlag] = useState([{}]);

    const [bookId,setBookId] = useState();
    const [bookName,setBookName] = useState("");

    useEffect(() => {
        (async () => {
            var flagDataStore = [];
            await Axios.post('http://localhost:3001/getBooksDataForReader').then(
                (res) => {
                    setBookData(res.data); 
                    setFiltered(res.data);     
                    for(var i=0;i<res.data.length;i++){
                        flagDataStore.push({id:res.data[i].book_id,request:false});
                        
                    }
                    
                }
            )
          
            setFlag(flagDataStore);

        })();
        
    },[]);


    const requestIssue = async (num,book_id,book_name,book_price) =>{
        
        const rId = window.localStorage.getItem('id');
        const rName = window.localStorage.getItem('email');

        const newRequest = flag.map( (record,fNum)=>{
            if(fNum == num){
        
                const response = Axios.post('http://localhost:3001/sendBookApproval',{bId:book_id,name:book_name,price:book_price,rId:rId,rName:rName}).then(
				(res)=>{
                    console.log(res.data);
                    if(res.data=="No Balance"){
                        alert("No Book Request Can Be Send Due to Low Balance");
                      
                    }
				}
            )	
                console.log(response);
                if(response == undefined){
                    return {id:num,request:false};
                }
                else{
                    return {id:num,request:true};
                }
            }
            else{
                return record;
            }
        });
    
    
        console.log(newRequest);
        alert("Book Issue Request Send");
        setFlag(newRequest);
        
        
    }

    const filterRecord = (event) =>{
        
        
        setBookName(event.target.value);
  
        if(bookName.length==1 || event.key =="Backspace"){
    
            Axios.post('http://localhost:3001/getBooksDataForReader').then(
                (res) => {
                    
                    setFiltered(res.data);     
                    
                }
            )
        }
        else{
            setFiltered(filtered.filter((record)=>{
                return record.book_name.toLowerCase().includes(bookName.toLowerCase());
            }));
        }
        

    }
    return (
        <>
        <center>
        <div className="max-w-md w-full my-[40px]">
			<div>
				<h2 className="mt-6 text-center text-4xl text-green-600">
					Issue Book by Book Id
				</h2>
			</div>
			<form className="mt-8 space-y-6" method="POST" >
				<input type="hidden" name="remember" value="True" />
				<div className="rounded-md shadow-sm ">
                    <div >
					
						<input onKeyUp={filterRecord} type="text" required className="mt-[20px] rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md sm:text-sm" placeholder="Book Name"/>
					</div>
    
				</div>

				<div>
					<button type="submit" className="group relative w-full flex border-2 border-green-500 justify-center py-2 px-4 text-sm font-medium hover:bg-green-600 hover:text-white rounded-md text-green-500 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2">
						<span className="absolute left-0 inset-y-0 flex items-center pl-3">
							<svg className="h-5 w-5 text-green-500 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="True">
								<path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
							</svg>
						</span>
						Issue Book with Id
					</button>
				</div>
                <div class="flex items-baseline justify-between">
                    <Link to="/RequestBook" class="text-sm text-green-600 hover:underline">Not Available ? Request Book.</Link>
                </div>
			</form>
		</div>
        </center>
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-center">
                            <thead className="border-b bg-green-700">
                                <tr>
                                    <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                        #
                    </th>
                                    <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                        Book Id
                    </th>
                                    <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                        Book Name
                    </th>
                                    <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                        Amount
                    </th>
                                    <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                        Add
                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                {filtered.length != 0 ? filtered.map((record,num) => {
                                 
                                    return (
                                        <tr className="bg-white border-b">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{num+1}</td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {record.book_id}
                    </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {record.book_name}
                    </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {record.book_price}
                    </td>
                                            <td className="text-bg font-light px-6 py-4 whitespace-nowrap">
                                                {
                                                flag[num].request==true ? "Requested" :
                                                <button className="bg-green-500 text-white px-3 py-1 rounded-[4px] border-green-500" onClick={()=>requestIssue(num,record.book_id,record.book_name,record.book_price)}>Add to Cart </button>
                                                }
                                            </td>
                                        </tr>
                                    )
                                })
                                :
                                <tr>
                                    <td className="bg-green-100 px-3 py-3" colspan='5'>No Data Found</td>
                                </tr>
                            }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    
        </>
    );
}

export default IssueBook;
