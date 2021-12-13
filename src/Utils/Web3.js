import Web3 from "web3";
import ABI from './nft.json'
export const web3 = new Web3(Web3.givenProvider);
const contractAddress = '0x03BDA11e3ada61602DFc2a17958A46573cc5Ddc3'
export const Contract = new web3.eth.Contract(ABI , contractAddress);

