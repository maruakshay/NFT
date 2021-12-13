import styled from "styled-components";

export const Container = styled.div
`
display : grid;
place-items : center;
height : 100vh;
`

export const Form = styled.div
`
width: 70%;
min-height : 300px;
border-radius : 18px;
box-shadow : 0px 0px 14px grey;
display : flex;
justify-content : center;
flex-direction : column ; 

`
export const Input = styled.input
`
width : 90%;
padding : 10px;
border-radius : 20px;
outline : none;
&[type=file]{
    color : transparent;
}
`
export const Image = styled.img
`
width : 100px;
height : 100px;
margin : 0 auto;
`
export const Button = styled.button
`
border : none;
outline : none;
width : 100px;
height : 50px;
margin : 10px auto;
cursor : pointer;
transition : opacity linear 0.5s;

&:hover {
    opacity : 0.8;
}
`
export const InputContainer = styled.div
`
width : 90%;
margin : 10px auto;
display : flex;
flex-direction : column;

label {
    font-size : 24px;
    padding : 10px 0;
}
`