import React from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Link } from 'react-router-dom';

function Header() {
  const { authStatus, signOut } = useAuthenticator(context => [context.authStatus]);

  const renderAuthButton = () => {
    if (authStatus === 'authenticated') {
      return (
        <ul className="flex items-center space-x-4">
          <li className="bg-red-500 rounded-md p-2 hover:text-purple-600">
            <button onClick={signOut}>LogOut</button>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex items-center space-x-4">
          <Link to='/LoginPage'>
            <li className="bg-red-500 rounded-md p-2 flex items-center hover:text-purple-600">
              <img src="images/loginpic.jpg" alt="" className="mr-2 w-6 h-6" />
              <span>Login</span>
            </li>
          </Link>
        </ul>
      );
    }
  };

  return (
    <nav className="flex flex-col md:flex-row justify-between items-center bg-orange-400 text-white py-4 px-7 text-lg w-full">
      <div className="flex items-center space-x-4">
        <ul className="flex items-center space-x-4">
          <li>
            <Link to='/'>
              <img className="h-16" src="images/eb_Logo.png" alt="Home" />
            </Link>
          </li>
          <li className="hover:text-orange-600 leading-tight">
            <Link to='/sports'>Sports</Link>
          </li>
          <li className="hover:text-orange-600 leading-tight">
            <Link to='/music'>Music</Link>
          </li>
          <li className="hover:text-orange-600 leading-tight">
            <Link to='/shows'>Shows</Link>
          </li>
          <li className="hover:text-orange-600 leading-tight">
            <Link to='/eventForm'>Host event</Link>
          </li>
        </ul>
      </div>
      <div className="items-center flex space-x-4">
        <ul className="hidden md:flex">
          <a href="">
            <li className="hover:text-orange-600"><Link to='/Tickets'>My Tickets</Link></li>
          </a>
        </ul>
        {renderAuthButton()}
      </div>
    </nav>
  );
}

export default Header;
