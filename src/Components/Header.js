
function Header() {

  return (
    <div className="flex justify-between  bg-green-200">
      <div className="logoAndName flex place-items-center">
        <img src="https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color-round-1/254000/51-512.png" className="h-12 mx-5 my-3" />
        <b className="text-3xl text-green-800"> Quora Library </b>
      </div>
      <ul className="justify-end text-xl space-x-li flex text-green-700">
          <li className=" py-5 px-7 cursor-pointer">Home</li>
          <li className="py-5 px-7 cursor-pointer">About</li>
          <li className="py-5 px-7 cursor-pointer">Help</li>
          <li className="py-5 px-7 cursor-pointer">Contact Us</li>
        
      </ul>

    </div>
  );
}

export default Header;