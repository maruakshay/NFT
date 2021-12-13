import React, { useState, useEffect } from "react";
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

const App = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [check, setCheck] = useState(false);
  const [url, setURL] = useState("");
  useEffect(async () => {
    const Address = await web3.eth.getAccounts();
    console.log(Address);
   
  }, []);
  async function testData(file) {
    const addedData = await client.add(file);
    const URL = `https://ipfs.infura.io/ipfs/${addedData.path}`;
    setURL(URL);
  }
  function handleFiles(e) {
    testData(e.target.files[0]);
  }
  async function handleSubmit() {
    console.log(name, description, price, check);
    setName("");
    setCheck(false);
    setDescription('')
    setPrice(0)
    setURL('')
    const priceToWei = web3.utils.toWei(price, "ether");
    const Accounts = await web3.eth.getAccounts();
    const mint = await Contract.methods
      .mintToken(Accounts[0], url, name, description, priceToWei, check)
      .send({ from: Accounts[0], value : web3.utils.toWei(String(0.4) , 'ether')});
    
  }
  return (
    <Container>
      <Form>
        <InputContainer>
          <label htmlFor="name">Token Name</label>
          <Input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </InputContainer>

        <InputContainer>
          <label htmlFor="description">Token Description </label>
          <Input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
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
