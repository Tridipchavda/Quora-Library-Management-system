import './App.css';
import Header from "./Components/Header";
import { useState } from 'react';
import EnterComponent from './Components/log&sign';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import ReaderLogin from './Components/ReaderLogin';
import LibrarianLogin from './Components/LibrarianLogin';
import Signin from './Components/SignIn';
import ReaderProfile from './Components/ReaderProfile';
import IssueBook from './Components/IssuingBookCom';
import { RequestBookPopUp } from './Components/RequestBookPopUp';
import { AddMoneyComponent } from './Components/AddMoneyComponent';
import LibrarianProfile from './Components/LibrarianProfile';

function App() {

  const [t_id,setI] = useState("");
  const [t_email,setE] = useState("");
  const [t_name,setN] = useState("");
  const [t_amount,setA] = useState("");

  const setProfile = (id,email,name,amount) =>{
      console.log(id,name,email,amount);
      setI(id);
      setE(email);
      setA(amount);
      setN(name);

  };
  return (
    <>
    
    <Router>
      <Header/>
      
    <Routes>
      <Route path="/" element={<EnterComponent/>}></Route>
      <Route path="/RequestBook" element={<RequestBookPopUp/>}></Route>
      <Route path="/ReaderLogin" element={<ReaderLogin setProfile={setProfile} />}></Route>
      <Route path="/LibrarianLogin" element={<LibrarianLogin/>}></Route>
      <Route path="/Signin" element={<Signin/>}></Route>
      <Route path="/IssueBook" element={<IssueBook />}></Route>
      <Route path="/AddMoney" element={ <AddMoneyComponent/>}></Route>
      <Route path="/LibrarianProfile" element={ <LibrarianProfile/>}></Route>
      <Route path="/ReaderProfile" element={<ReaderProfile id={t_id} email={t_email} name={t_name} amount={t_amount}/>}></Route>
    </Routes>
    
    </Router>
    
    </>
  );
}

export default App;
