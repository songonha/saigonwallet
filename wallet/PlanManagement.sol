// Specify the Solidity version
pragma solidity ^0.8.0;

// Declare the smart contract
contract PlantManagement {
    // Structure to store plant information
    struct Plant {
        string plantType;      // Type of the plant
        uint256 plantingDate;  // Date the plant was planted (timestamp)
        uint256 healthStatus;  // Health status of the plant
        address owner;         // Address of the owner of the plant
    }

    // Array to store plant information
    Plant[] public plantList;

    // Event to notify when a new plant is planted
    event PlantPlanted(address indexed planter, uint256 indexed plantId, string plantType);

    // Function to plant a new plant
    function plant(string memory _plantType) public {
        uint256 plantId = plantList.length;
        uint256 currentDate = block.timestamp; // Get the current timestamp
        address planter = msg.sender; // Address of the transaction sender

        // Create a new plant and add it to the list
        plantList.push(Plant(_plantType, currentDate, 0, planter));

        // Emit an event to announce the planting of a new plant
        emit PlantPlanted(planter, plantId, _plantType);
    }

    // Function to update the health status of a plant
    function updateHealthStatus(uint256 _plantId, uint256 _newStatus) public {
        require(_plantId < plantList.length, "Plant does not exist");
        require(plantList[_plantId].owner == msg.sender, "You are not authorized to update this plant");

        // Update the health status of the plant
        plantList[_plantId].healthStatus = _newStatus;
    }

    // Function to get information about a plant
    function getPlantInfo(uint256 _plantId) public view returns (string memory, uint256, uint256, address) {
        require(_plantId < plantList.length, "Plant does not exist");

        Plant memory plant = plantList[_plantId];
        return (plant.plantType, plant.plantingDate, plant.healthStatus, plant.owner);
    }

    // Function to get the number of plants in the list
    function getPlantCount() public view returns (uint256) {
        return plantList.length;
    }
}
