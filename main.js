const connect= document.getElementById('connectButton')
const registerProperty_btn= document.getElementById('registerProperty')
const buyProperty_btn= document.getElementById('buyProperty')
const getPropertyDetails_btn= document.getElementById('getPropertyDetails')


const show=()=>{
    const val1=parseInt(document.getElementById('input_val1').value);
const val2=document.getElementById('input_val2').value;
    console.log(typeof val1);
    console.log(typeof val2);
}

let web3; // Declare a variable for the web3 instance
let contract; 
let accountName;
connect.addEventListener("click", async () => {
  console.log(window);
  if (window.ethereum) { // Check for Metamask
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
      web3 = new Web3(window.ethereum);
      connect.textContent = "Connected";
      connect.disabled = true;
      accountName = prompt('Please enter a name for your Account:');
      console.log('Account name:', accountName);
    

      // Create a contract instance using the ABI and contract address
      const contractAddress = "0xeb78481adE052f676D7c5bb9597A3AF19024AD1D"; // Replace with the actual address 0x936a0788d061a001Ba4Ee975207C89644429F740
      const ABI =[
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "location",
                    "type": "string"
                }
            ],
            "name": "PropertyBought",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "location",
                    "type": "string"
                }
            ],
            "name": "PropertyRegistered",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_propertyId",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "mame",
                    "type": "string"
                }
            ],
            "name": "buyProperty",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "fetchData",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "price",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "internalType": "string",
                            "name": "location",
                            "type": "string"
                        }
                    ],
                    "internalType": "struct RealEstate.Property[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "properties",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "location",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_price",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_location",
                    "type": "string"
                }
            ],
            "name": "registerProperty",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
      contract = new web3.eth.Contract(ABI, contractAddress);
    
    } catch (error) {
      console.error(error);
      alert("Error connecting to Metamask!");
    }
  } else {
    alert("Please install Metamask!");
  }
});
async function registerProperty(){
    const price=parseInt(document.getElementById('input_val1').value);
    const location=document.getElementById('input_val2').value;
    contract.methods.registerProperty(accountName, price, location)
    .estimateGas({ from: ethereum.selectedAddress })
    .then((gasAmount) => {
        contract.methods.registerProperty(accountName, price, location)
            .send({ from: ethereum.selectedAddress, gas: gasAmount })
            .then((receipt) => {
                console.log('Property registered:', receipt);
                getPropertyDetails();
            })
            .catch((error) => {
                console.error('Error registering property:', error);
            });
    })
    .catch((error) => {
        console.error('Error estimating gas:', error);
    });
}

async function buyProperty(val){
        const pId=parseInt(document.getElementById('input_val3').value) || parseInt(val);
        console.log(pId)
        await contract.methods.buyProperty(pId,accountName).send({ from: ethereum.selectedAddress })
        .then(alert('transaction successful!'))
        .catch(alert('Error buying the property!!'));
}

async function getPropertyDetails(){
    const pId=parseInt(document.getElementById('input_val4').value);
    try{
        const res=await contract.methods.fetchData().call();
        let l = res.length;
        for(let i=0;i<l;i++)
        {
            console.log('name: ',res[i]['name'],' id : ',res[i]['id'],' location : ' ,res[i]['location'],' price : ',res[i]['price'],' owner : ',res[i]['owner']);
            create(res[i]['price'],res[i]['name'],res[i]['location'],res[i]['id']);
        }
    }
    catch(err){
        console.log(err);
    alert('Error')}
}
