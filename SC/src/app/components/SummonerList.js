import React from "react";
import Summoner from "./Summoner"




export default class SummonerList extends React.Component {

  render() {
    console.log(this.props.match)
    
    let participants = this.props.match.participants
    
    return ( <ul> {participants.map((participant)=> {
      return <Summoner player = {participant}/>
    })} </ul>
    );

  }
}