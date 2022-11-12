import { createContext, useContext, useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useSearchParams,
  } from "react-router-dom";
import Axios from "axios";
import LibrarianLogin from "./LibrarianLogin";



function LibrarianProfile(props) {

    const [l_id,setI] = useState("");
    const [l_phone,setP] = useState("");
    const [l_name,setN] = useState("");

    const [approvals,setApprovals] = useState([{}]);

    useEffect(()=>{
        Axios.post('http://localhost:3001/getLibrarianDetails',{id:window.localStorage.getItem('l_id')}).then(
            (res)=>{
                console.log(res.data);
                if(res.data.length != 0){
                    setI(res.data[0].L_id);
                    setP(res.data[0].L_phone);
                    setN(res.data[0].L_name);
                }
            }
        )
        
        Axios.post('http://localhost:3001/getApprovals').then(
            (res)=>{
                console.log(res.data);
                setApprovals(res.data);
            }
        )
      },[]);

    const givingApproval = (record) =>{
        console.log(record);
        
        Axios.post('http://localhost:3001/confirmBookIssue',{bId:record.book_id,rId:record.reader_id,amount:record.book_price}).then(
            (res)=>{
                console.log(res);
            }
        )

        setApprovals(approvals.map(
            (approval)=>{
                if(approval.book_id == record.book_id && approval.reader_id == record.reader_id){
                    return {
                        book_id: approval.book_id,
                        book_name: approval.book_name,
                        book_price: approval.book_price,
                        reader_id: approval.reader_id,
                        reader_name: approval.reader_name,
                        status: 1,
                    }
                }
                else{
                    return approval;
                }
            }
        ))
    }
    return (
        <div className="overflow-hidden">
        <div className="flex">
        <h1 className="text-[30px] mx-5 my-1 text-green-700">Pending Approvals</h1>
        <button className="text-[20px] ml-[900px] mt-3 text-green-700 w-[200px] text-center py-1 rounded text-white bg-green-600">
            <Link to="/RequestBook">
            Request Book ?
            </Link>
        </button>
        </div>
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
							Reader ID
		</th>
                        <th scope="col" className="text-sm font-medium text-white px-6 py-4">
							Amount
		</th>
						<th scope="col" className="text-sm font-medium text-white px-6 py-4">
							Status
		</th>
					</tr>
				</thead>
				<tbody>

					{approvals.length != 0 ? approvals.map((record,num) => {
                        
                        return (
                            record.status ==0 ?
                            (
							<tr className="bg-white border-b">
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{num+1}</td>
								<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
									{record.book_id}
		</td>
								<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
									{record.book_name}
		</td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
									{record.reader_id}
		</td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {record.book_price}
		</td>
								<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                
                                    <>
                                <button
                                    className="w-[30px] mx-2 text-center py-1 rounded my-1 text-white bg-green-500"
                                    onClick={()=>{givingApproval(record)}}
                                >🗸</button>
                                <button
                                    className="w-[30px] text-bold text-center py-1 rounded my-1 text-white bg-red-500"
                                >X</button>
                                </>
                                
		</td>
						
                            </tr>
                            )
                            :
                            ""
                            
                        )
                        
					})
					:
					<tr>
						<td className="bg-green-100 px-3 py-3" colspan='5'>No Request For Approval</td>
					</tr>
				}

				</tbody>
			</table>
		</div>
	</div>
	</div>
	</div>
        </div>
    );
}

export default LibrarianProfile;