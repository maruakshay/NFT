
import React, { useState } from "react";
import { client } from "../API/ipfs";
import { web3, Contract } from "../Utils/Web3";
import {
  Form,
  Input,
  Container,
  Image,
  Button,
  InputContainer,
} from "./styles";
const fs = require('fs'); 
const App = () => {
  const [_name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [_description, setDescription] = useState("");
  const [check, setCheck] = useState(false);
  const [url, setURL] = useState("");
  const [tokenURI , setTokenURI] = useState('')

  async function testData(file) {
   const imageFile = await client.add(file)
   const _imageURL = `https://ipfs.infura.io/ipfs/${imageFile.path}`
   const metadata = {
    name : `${_name}`,
    description : `${_description}`,
    image : `${_imageURL}`
   }
   const data = await client.add(JSON.stringify(metadata))
   setTokenURI(`https://ipfs.infura.io/ipfs/${data.path}`)   
  }
  function handleFiles(e) {
    const reader = new FileReader();
    reader.onload = (e) => {
      setURL(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
    testData(e.target.files[0]);
  }
  async function handleSubmit() {
    setName("");
    setCheck(false);
    setDescription("");
    setPrice(0);
    setURL("");
    const priceToWei = web3.utils.toWei(price, "ether");
    const Accounts = await web3.eth.getAccounts();
    const mint = await Contract.methods
      .mintToken(Accounts[0], tokenURI, _name, _description, priceToWei, check)
      .send({
        from: Accounts[0],
        value: web3.utils.toWei(String(0.4), "ether"),
      });
      console.log(mint)
  }
  return (
    <Container>
      <Form>
        <InputContainer>
          <label htmlFor="name">Token Name</label>
          <Input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={_name}
          />
        </InputContainer>

        <InputContainer>
          <label htmlFor="description">Token Description </label>
          <Input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={_description}
          />
        </InputContainer>

        <InputContainer>
          <label htmlFor="price">Token Price </label>
          <Input
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </InputContainer>
        <InputContainer>
          <Input
            type="file"
            onChange={handleFiles}
            accept="image/gif, image/jpeg, image/png"
          />
        </InputContainer>
        <Image src={url} alt="the image" />
        <InputContainer>
          <label htmlFor="shared">can be Shared ? </label>
          <input
            type="checkbox"
            checked={check}
            id="shared"
            onChange={(e) => setCheck(e.target.checked)}
          />
        </InputContainer>
        <Button onClick={handleSubmit}>Click here </Button>
      </Form>
    </Container>
  );
};
export default App;
