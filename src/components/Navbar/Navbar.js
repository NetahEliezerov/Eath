import React from 'react';
import { Outlet } from 'react-router-dom';
import cookies from 'js-cookie';
import './Navbar.css';

const MainNavbarComponent = () => {
    console.log(window.location.href);
    return (
        <div>
            <h1 onClick={() => window.location.href = "/"} className='headerNav'>Eath</h1>
            { !window.location.pathname.startsWith("/r") && <span>
                {!cookies.get('pubkey') && <button className='headerBtnNav'>Connect Wallet</button>}
                {cookies.get('pubkey') && <button className='headerBtnNav' onClick={() => window.location.href = "/account"}>My Account</button>}
            </span>
            }
            { window.location.pathname.startsWith("/r") && <span>
                {!cookies.get('pubkey') && <button className='headerBtnNavBgBlur'>Connect Wallet</button>}
                {cookies.get('pubkey') && <button className='headerBtnNavBgBlur' onClick={() => window.location.href = "/account"}>My Account</button>}
            </span>
            }
            <Outlet />
        </div>
    )
}

export default MainNavbarComponent
