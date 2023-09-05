import { useState, useEffect } from "react";
import Web3 from "web3";

export default function Home() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);

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

          // Replace 'YourContractABI' and 'YourContractAddress' with actual values
          const contractAddress = "YourContractAddress";
          const contractABI = YourContractABI;
          const contract = new web3.eth.Contract(
            contractABI,
            contractAddress
          );
          setContract(contract);
        } catch (error) {
          console.error(error);
        }
      }
    }
    init();
  }, []);

  const handleCreateProposal = async () => {
    // Replace 'yourProposalData' with actual proposal data
    const yourProposalData = "YourProposalData";

    if (contract) {
      try {
        // Gọi hàm tạo đề xuất trong smart contract
        await contract.methods.createProposal(yourProposalData).send({
          from: accounts[0],
        });

        // Cập nhật giao diện người dùng sau khi tạo đề xuất
        console.log("Proposal created successfully!");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h1>Bonsai DAO DApp</h1>
      <p>Connected Account: {accounts[0]}</p>
      <button onClick={handleCreateProposal}>Create Proposal</button>
    </div>
  );
}

