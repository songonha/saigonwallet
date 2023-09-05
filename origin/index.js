import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import BonsaiCertification from './contracts/BonsaiCertification.json';

function App() {
    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [contract, setContract] = useState(null);
    const [bonsaiInfo, setBonsaiInfo] = useState('');
    const [newBonsaiInfo, setNewBonsaiInfo] = useState('');

    useEffect(() => {
        async function init() {
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                setWeb3(web3);

                try {
                    // Yêu cầu quyền truy cập tài khoản MetaMask
                    await window.ethereum.enable();
                    const accounts = await web3.eth.getAccounts();
                    setAccounts(accounts);

                    // Lấy thông tin của smart contract đã triển khai
                    const networkId = await web3.eth.net.getId();
                    const deployedNetwork = BonsaiCertification.networks[networkId];
                    const contract = new web3.eth.Contract(
                        BonsaiCertification.abi,
                        deployedNetwork && deployedNetwork.address
                    );
                    setContract(contract);

                    // Lấy thông tin từ smart contract
                    const bonsaiInfo = await contract.methods.bonsaiInfo().call();
                    setBonsaiInfo(bonsaiInfo);
                } catch (error) {
                    console.error(error);
                }
            }
        }
        init();
    }, []);

    async function updateBonsai() {
        if (contract) {
            await contract.methods.updateBonsaiInfo(newBonsaiInfo).send({ from: accounts[0] });
            const updatedBonsaiInfo = await contract.methods.bonsaiInfo().call();
            setBonsaiInfo(updatedBonsaiInfo);
        }
    }

    return (
        <div className="App">
            <h1>Bonsai Certification DApp</h1>
            <p>Bonsai Info: {bonsaiInfo}</p>
            <input
                type="text"
                placeholder="New Bonsai Info"
                value={newBonsaiInfo}
                onChange={(e) => setNewBonsaiInfo(e.target.value)}
            />
            <button onClick={updateBonsai}>Update Bonsai Info</button>
        </div>
    );
}

export default App;

