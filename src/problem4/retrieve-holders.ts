import { ethers } from "ethers";

const SWTH_TOKEN_ADDRESS = "0xc0ecb8499d8da2771abcbf4091db7f65158f1468";

const provider = new ethers.providers.JsonRpcProvider(
    "https://bsc-dataseed.binance.org/"
);

const abi = [
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
]

const swthToken = new ethers.Contract(SWTH_TOKEN_ADDRESS, abi, provider);

const addressesToLookup = [
    "0xb5d4f343412dc8efb6ff599d790074d0f1e8d430",
    "0x0020c5222a24e4a96b720c06b803fb8d34adc0af",
    "0xd1d8b2aae2ebb2acf013b803bc3c24ca1303a392",
];

async function getBalances(): Promise<void> {
    const decimals = await swthToken.decimals();
    for (const address of addressesToLookup) {
        const balance = await swthToken.balanceOf(address);
        const formattedBalance = ethers.utils.commify(ethers.utils.formatUnits(balance, decimals));
        console.log(`${address} ${formattedBalance}`);
    }
}

getBalances();