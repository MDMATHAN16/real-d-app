// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RealEstate {
    // Struct to represent a property
    struct Property {
        uint id;
        string name;
        uint price;
        address owner;
        string location;
    }

    // Array to store all properties
    Property[] public properties;

    // Event emitted when a property is registered
    event PropertyRegistered(uint indexed id, string name, uint price, address indexed owner, string location);

    // Event emitted when a property is bought
    event PropertyBought(uint indexed id, string name, uint price, address indexed newOwner, string location);

    // Function to register a property
    function registerProperty(string memory _name, uint _price, string memory _location) public returns (uint) {
        uint propertyId = properties.length;
        properties.push(Property(propertyId, _name, _price, msg.sender, _location));
        emit PropertyRegistered(propertyId, _name, _price, msg.sender, _location);
        return propertyId;
    }

    // Function to buy a property
    function buyProperty(uint _propertyId,string memory mame) public payable {
        require(_propertyId < properties.length, "Invalid property ID");
        Property storage property = properties[_propertyId];
        require(msg.sender != property.owner, "You are already the owner of this property");
        require(msg.value >= property.price, "Insufficient funds to buy this property");

        // Transfer the ownership of the property
        address payable previousOwner = payable(property.owner);
        previousOwner.transfer(property.price);

        property.owner = msg.sender;
        property.name = mame;
        // Emit an event indicating the property has been bought
        emit PropertyBought(_propertyId, property.name, property.price, msg.sender, property.location);
    }

    // Function to fetch data of all properties
    function fetchData() public view returns (Property[] memory) {
        return properties;
    }
}
