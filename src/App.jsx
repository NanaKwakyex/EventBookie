import 'tailwindcss/base.css';
import 'tailwindcss/components.css';
import 'tailwindcss/utilities.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header.jsx'
import Footer from './Components/Footer.jsx'
import LoginPage from './Pages/LoginPage.jsx'
import Home from './Pages/Home.jsx'
import Sports from './Pages/Sports.jsx';
import Music from './Pages/Music.jsx';
import Shows from './Pages/Shows.jsx';
import EventForm from './Pages/EventForm.jsx';
import Tickets from './Pages/Tickets.jsx';
import {Amplify } from 'aws-amplify';
import {Authenticator} from '@aws-amplify/ui-react';
import awsExports from './aws-exports';
Amplify.configure(awsExports);
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


function App() {
  
    return(
        <>
        <BrowserRouter>
        <Authenticator.Provider>
        <Header/>
        <Routes>
            <Route exact path="/" element={<Home/>} />
        
            <Route path="/Sports" element={<Sports/>} />
            <Route path="/Music" element={<Music/>} />
            <Route path="/Shows" element={<Shows/>} />
            <Route path="/Tickets" element={<Tickets/>} />
            <Route path="/EventForm" element={<EventForm/>} />
            <Route path="/LoginPage" element={<LoginPage/>} />
        </Routes>
        
        <Footer/>
        </Authenticator.Provider>
        </BrowserRouter>
        </>
    );
  
}

export default App
