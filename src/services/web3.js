import axios from 'axios';
import { ethers } from 'ethers';
import Web3 from 'web3';

class web3Service {
    constructor() {
    }

    signMessage = async ({ setError, message }) => {
        try {
          console.log({ message });
          if (!window.ethereum)
            throw new Error("No crypto wallet found. Please install it.");
      
          await window.walletLinkExtension.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.providers.Web3Provider(window.walletLinkExtension);
          const signer = provider.getSigner();
          const signature = await signer.signMessage(message);
          const address = await signer.getAddress();
      
          return {
            message,
            signature,
            address
          };
        } catch (err) {
          setError(err.message);
        }
      };

      getAddress = async () => {
        const provider = new ethers.providers.Web3Provider(window.walletLinkExtension);
        const signer = provider.getSigner();
        return await signer.getAddress();
      };

      completeBuy = async (data) => {
        const sig = await this.signMessage({message: data.signMsg, setError: data.setError});
        const options = {
          signature: sig.signature,
          signMsg: sig.message,
          address: sig.address,
          restaurantId: data.restaurantId,
          orderedItems: data.orderedItems,
        }
        const res = (await axios.post('http://localhost:5144/saveOrderToUser', options)).data
      }
      
      getOrders = async (address) => (await axios.post('http://localhost:5144/getOrdersOfUser', {address: address})).data
}

export default new web3Service();