import React from "react"

//TODO: Get information about summoner
export default class Summoner extends React.Component {

  sumUsed(summonerId,SummonerSpell,SummonerSpellCooldown){
    socket.emit("sumUsed")
  }
  render() {
    console.log(this.props.player)
    let summonerId = null
    return(
      <li>
        {/* <img src=""/> //Champion portrait */}
        {/* <img src=""/> //Summonerspell 1  onClick=sumUsed()*/}
        {/* <img src=""/> //Summonerspell 2 */}
      </li>
    
    )
  }
}