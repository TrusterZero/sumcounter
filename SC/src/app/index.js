import React from "react";
import {render} from "react-dom";
import SummonerList from "./components/SummonerList";
import Form from "./components/Form";
import Center from 'react-center';

class App extends React.Component {

  constructor(props) {   
    
    super(props);
    this.state = {
      summonerName : localStorage.getItem("summonerName")
    }
  }


  render() {
    let appStyle = {
      backgroundColor: "gray",
      width: "800px",
      height:"600px",
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
    if(this.state.summonerName != null){
      socket.emit("startMatch", {
        summonerName: this.state.summonerName
      })
      return( <div style={appStyle} className = "app">
        <SummonerList />
        </div>  
      );
    } else {
      return(
        <div style={appStyle} className = "app">
        <hr/>
          <Center style={{marginTop : "250px"}}>
            <Form />
          </Center>
        </div>)
    }
    
    
  }
}

render( <App /> , window.document.getElementById("app"))