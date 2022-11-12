import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
  } from "react-router-dom";

function EnterComponent() {

    return (
    <div className="enterComponent flex justify-center align-center h-screen place-items-center">
        <Link to="/ReaderLogin">
        <div class="max-w-sm rounded-xl overflow-hidden h-3/6 bg-green-50 mx-4 cursor-pointer">
            
            <div class="px-6 py-10">
            <p class="text-green-700 text-3xl">
                Log In (as Reader)
            </p>
            </div>
            <center>
            <img src="https://img.icons8.com/external-bearicons-glyph-bearicons/100/12B886/external-log-in-call-to-action-bearicons-glyph-bearicons.png"/>
            </center>
            <div class="pt-8">
            <span class="flex bg-green-300 px-5 py-5 text-bg font-semibold text-gray-700 ">
                You can log in here and can rent or request books from higher authorities.
            </span>
            </div>
        </div>
        </Link>
        
        <Link to="/LibrarianLogin">
        <div class="max-w-sm rounded-xl overflow-hidden h-3/6 bg-green-50 mx-4 cursor-pointer">
            
            <div class="px-6 py-10">
            <p class="text-green-700 text-3xl">
                Log In (as Librarian)
            </p>
            </div>
            <center>
            <img src="https://img.icons8.com/external-bearicons-glyph-bearicons/100/12B886/external-log-in-call-to-action-bearicons-glyph-bearicons.png"/>
            </center>
            <div class="pt-8">
            <span class="flex bg-green-300 px-5 py-5 text-bg font-semibold text-gray-700 ">
                Librarian can log in here and can approve and request books.
            </span>
            </div>
        </div>
        </Link>

        <Link to="/Signin">
        <div class="max-w-sm rounded-xl overflow-hidden  h-3/6 bg-green-50 mx-4 cursor-pointer">
            
            <div class="px-6 py-10">
            <p class="text-green-700 text-3xl">
                Sign In
            </p>
            </div>
            <center>
            <img src="https://img.icons8.com/wired/128/12B886/key.png" width="100px" height="100px"/>
            </center>
            <div class="pt-8">
            <span class="flex bg-green-300 px-5 py-5 text-bg font-semibold text-gray-700 ">
                If you haven't done registration yet Please click here for using Library Application.
            </span>
            </div>
        </div>
        </Link>

      </div>
    );
  }
  
  export default EnterComponent;