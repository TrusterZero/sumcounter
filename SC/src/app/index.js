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
      //summonerName : "DaWhiteHammer"
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
        <SummonerList match={{ gameId: 3690643613,
  mapId: 11,
  gameMode: 'CLASSIC',
  gameType: 'MATCHED_GAME',
  gameQueueConfigId: 420,
  participants:
   [ { teamId: 100,
       spell1Id: 14,
       spell2Id: 4,
       championId: 90,
       profileIconId: 3501,
       summonerName: 'The Legend Ish',
       bot: false,
       summonerId: 23312601,
       gameCustomizationObjects: [],
       perks: [Object] },
     { teamId: 100,
       spell1Id: 4,
       spell2Id: 3,
       championId: 117,
       profileIconId: 661,
       summonerName: 'Gallia972',
       bot: false,
       summonerId: 34919106,
       gameCustomizationObjects: [],
       perks: [Object] },
     { teamId: 100,
       spell1Id: 4,
       spell2Id: 11,
       championId: 19,
       profileIconId: 3502,
       summonerName: 'OG xWilly',
       bot: false,
       summonerId: 85561155,
       gameCustomizationObjects: [],
       perks: [Object] },
     { teamId: 100,
       spell1Id: 4,
       spell2Id: 7,
       championId: 18,
       profileIconId: 3502,
       summonerName: 'Ya39oubi',
       bot: false,
       summonerId: 97389972,
       gameCustomizationObjects: [],
       perks: [Object] },
     { teamId: 100,
       spell1Id: 12,
       spell2Id: 4,
       championId: 122,
       profileIconId: 3500,
       summonerName: 'darknigt53',
       bot: false,
       summonerId: 102207694,
       gameCustomizationObjects: [],
       perks: [Object] },
     { teamId: 200,
       spell1Id: 7,
       spell2Id: 4,
       championId: 236,
       profileIconId: 1450,
       summonerName: 'DaWhiteHammer',
       bot: false,
       summonerId: 60671625,
       gameCustomizationObjects: [],
       perks: [Object] },
     { teamId: 200,
       spell1Id: 14,
       spell2Id: 4,
       championId: 105,
       profileIconId: 3015,
       summonerName: 'jejoueleblanc',
       bot: false,
       summonerId: 75549030,
       gameCustomizationObjects: [],
       perks: [Object] },
     { teamId: 200,
       spell1Id: 4,
       spell2Id: 14,
       championId: 133,
       profileIconId: 3376,
       summonerName: 'alphatx256',
       bot: false,
       summonerId: 62972241,
       gameCustomizationObjects: [],
       perks: [Object] },
     { teamId: 200,
       spell1Id: 4,
       spell2Id: 14,
       championId: 53,
       profileIconId: 3501,
       summonerName: 'Mikelo82',
       bot: false,
       summonerId: 109997909,
       gameCustomizationObjects: [],
       perks: [Object] },
     { teamId: 200,
       spell1Id: 11,
       spell2Id: 4,
       championId: 154,
       profileIconId: 3534,
       summonerName: 'NettexAshe',
       bot: false,
       summonerId: 104559685,
       gameCustomizationObjects: [],
       perks: [Object] } ],
  observers: { encryptionKey: '6fNCUkG/OtMlqH1QZCEnUuYs7kunTXwc' },
  platformId: 'EUW1',
  bannedChampions:
   [ { championId: 157, teamId: 100, pickTurn: 1 },
     { championId: 164, teamId: 100, pickTurn: 2 },
     { championId: 245, teamId: 100, pickTurn: 3 },
     { championId: 119, teamId: 100, pickTurn: 4 },
     { championId: 266, teamId: 100, pickTurn: 5 },
     { championId: 11, teamId: 200, pickTurn: 6 },
     { championId: 238, teamId: 200, pickTurn: 7 },
     { championId: 143, teamId: 200, pickTurn: 8 },
     { championId: 86, teamId: 200, pickTurn: 9 },
     { championId: 24, teamId: 200, pickTurn: 10 } ],
  gameStartTime: 1530618828582,
  gameLength: 1883 }
  } />
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
