const { ethers } = require("ethers");

const ADDR = "0x319C3dbC84C5E5129736023BB08E9e337d9A81CF";   // your contract address
const ABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "wallet",
                "type": "address"
            },
            {
                "internalType": "address[]",
                "name": "tokens",
                "type": "address[]"
            }
        ],
        "name": "getBalances",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "token",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "balance",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct TokenBalanceReader.Balance[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];    // your contract ABI

const ADDRESS = "0x88c925fE149321b2EA77D669f70fBA4B6A2F4735"; // some wallet address with token balance
const TOKENS = [    // token contract addresses
    "0x779877A7B0D9E8603169DdbD7836e478b4624789",
    "0xb52ef277f6a92226b2B3742074B056c31C228137",
];

// you can use your own RPC provider url (no need to deploy to mainnet)
const provider = new ethers.providers.JsonRpcProvider("https://rpc.sepolia.org/");

const test = async () => {
    const contract = new ethers.Contract(ADDR, ABI, provider);

    const balances = await contract.getBalances(ADDRESS, TOKENS);

    return balances;
};

test().then(console.log);