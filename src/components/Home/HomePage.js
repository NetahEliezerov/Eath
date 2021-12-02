import React, { useState } from 'react';
import { Box, Button, Typography, Modal } from '@mui/material';
import cookies from 'js-cookie';
// import { observer, inject } from "mobx-react"
import { ethers } from 'ethers';
import './HomePage.css';
import web3Service from '../../services/web3';
import Web3 from 'web3';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'black',
    color: 'white',
    fontFamily: 'Poppins',
    boxShadow: 24,
    p: 4,
    borderRadius: '20px'
};

var toChecksumAddress = function (address) {    
    address = address.toLowerCase().replace('0x','');
    var addressHash = this.web3.utils.sha3(address);
    var checksumAddress = '0x';

    for (var i = 0; i < address.length; i++ ) { 
        // If ith character is 9 to f then make it uppercase 
        if (parseInt(addressHash[i], 16) > 8) {
          checksumAddress += address[i].toUpperCase();
        } else {
            checksumAddress += address[i];
        }
}
}

const HomePage = () =>{
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const coinbaseWallet = window.walletLinkExtension;

    const web3 = new Web3(coinbaseWallet)

    const connectWallet = async (walletProvider) => {
        switch(walletProvider) {
            case 'coinbase':
                if(typeof coinbaseWallet === 'undefined') {
                    alert('Coinbase Wallet is not installed!');
                    break;
                }
                    await coinbaseWallet.request({ method: 'eth_requestAccounts' })
                    const acc = await web3Service.getAddress();
                    
                    // console.log(toChecksumAddress(acc[0]))
                    cookies.set('pubkey', acc);
                    window.location.href = "/explore";

        }
    }

    return (
        <div>
            <div className='homepageTitleHeader'>
                <h1 className='homepageTitle'>Hey,<br/>Want some pizzas? 🍕</h1>
                { !cookies.get('pubkey') && <button className='goldBtn' onClick={handleOpen}>Connect MetaMask and order now</button> }
                { cookies.get('pubkey') && <button className='goldBtn' onClick={() => window.location.href = "/explore"}>Let's eat!</button> }
                <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                    <Box sx={style} className='connectWalletModal'>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Connect Wallet
                        </Typography>
                        <button className='whiteConnectBtn' onClick={() => connectWallet("metamask")}>MetaMask</button>
                        <button className='blueConnectBtn' onClick={() => connectWallet("coinbase")}>Coinbase Wallet</button>
                    </Box>
                </Modal>
            </div>
        </div>
    )
}

export default HomePage