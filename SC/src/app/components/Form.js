import React from "react";
import Center from 'react-center';


export default class Form extends React.Component {

  
  saveSummonerName = (event) => {

    console.log(this.refs.summonerNameTextBox.value)
    localStorage.setItem("summonerName",this.refs.summonerNameTextBox.value)
  }

  render(){

    let formStyle = {
      
    }
    let textBoxStyle = {
      border: 0,
      borderRadius:"0 5px 5px 0 ",
      padding: "5px",
      backgroundColor:"#222",
      color: "white"
    }
    let selectStyle = {
      border:0,
      borderRadius:"5px 0 0 5px ",
      padding: "5px",
      backgroundColor:"#222",
      color:"white"
    }
    let buttonStyle = {
      border:0,
      borderRadius:"5px 0 0 5px ",
      padding: "10px 30px",
      backgroundColor:"#222",
      color:"white"
    }
    return(
      <div style={formStyle} >
        <form onSubmit={this.saveSummonerName.bind(this)}>
          <select style={selectStyle}>
            <option>EUW</option>
            <option>EUW</option>
            <option>EUW</option>
          </select>
          <input ref="summonerNameTextBox" placeholder="Summoner name"  style={textBoxStyle} type="text"/><br/>
          <br/>
          <Center>
            <input style={buttonStyle} value="Log in" type="submit"/>
          </Center>
          </form>
      </div>
    )
  }
}