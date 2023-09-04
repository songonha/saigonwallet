// Connect to a local Ethereum node using web3.js
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// Contract address and ABI (replace with your actual contract address and ABI)
var contractAddress = "YOUR_CONTRACT_ADDRESS";
var contractABI = [
    // ABI of your smart contract here
];

// Create a contract instance
var plantContract = new web3.eth.Contract(contractABI, contractAddress);

// Function to plant a new plant
function plant() {
    var plantType = document.getElementById("plantType").value;
    plantContract.methods.plant(plantType).send({ from: web3.eth.defaultAccount })
    .on("transactionHash", function(hash) {
        console.log("Transaction Hash: " + hash);
    })
    .on("receipt", function(receipt) {
        console.log("Planting Successful");
        loadPlants();
    });
}

// Function to update health status of a plant
function updateHealthStatus() {
    var plantId = document.getElementById("plantId").value;
    var newStatus = document.getElementById("newStatus").value;
    plantContract.methods.updateHealthStatus(plantId, newStatus).send({ from: web3.eth.defaultAccount })
    .on("transactionHash", function(hash) {
        console.log("Transaction Hash: " + hash);
    })
    .on("receipt", function(receipt) {
        console.log("Health Status Updated");
        loadPlants();
    });
}

// Function to get plant information
function getPlantInfo() {
    var plantId = document.getElementById("plantInfoId").value;
    plantContract.methods.getPlantInfo(plantId).call()
    .then(function(result) {
        var infoDiv = document.getElementById("plantInfo");
        infoDiv.innerHTML = "<strong>Plant Type:</strong> " + result[0] + "<br>" +
                            "<strong>Planting Date:</strong> " + new Date(result[1] * 1000).toLocaleString() + "<br>" +
                            "<strong>Health Status:</strong> " + result[2] + "<br>" +
                            "<strong>Owner:</strong> " + result[3];
    });
}

// Function to load plants
function loadPlants() {
    var infoDiv = document.getElementById("plantInfo");
    infoDiv.innerHTML = ""; // Clear previous plant information

    var plantList = plantContract.methods.getPlantCount().call()
    .then(function(result) {
        for (var i = 0; i < result; i++) {
            plantContract.methods.getPlantInfo(i).call()
            .then(function(plant) {
                var infoDiv = document.getElementById("plantInfo");
                infoDiv.innerHTML += "<strong>Plant Type:</strong> " + plant[0] + "<br>" +
                                     "<strong>Planting Date:</strong> " + new Date(plant[1] * 1000).toLocaleString() + "<br>" +
                                     "<strong>Health Status:</strong> " + plant[2] + "<br>" +
                                     "<strong>Owner:</strong> " + plant[3] + "<hr>";
            });
        }
    });
}

// Set the default Ethereum account
web3.eth.defaultAccount = web3.eth.accounts[0];

// Load plants when the page loads
window.onload = loadPlants;
