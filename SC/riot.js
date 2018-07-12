const request = require("request");
const fs = require("fs")
const apiKey = "RGAPI-f4d015ea-2728-43b2-8a80-c69e0c8f0d93";
let ex = module.exports;

class Champion {
  constructor(key, name, image) {
    this.key = key
    this.name = name
    this.image = image
  }
}

headers = {
  "Origin": "https://developer.riotgames.com",
  "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
  "X-Riot-Token": `${apiKey}`,
  "Accept-Language": "nl-NL,nl;q=0.9,en-US;q=0.8,en;q=0.7",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
}

let getUser = ex.getUser = (userName) => {
  return new Promise((resolve, reject) => {
    request.get({
      url: `https://euw1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${userName}`,
      headers: headers
    }, (err, res, body) => {
      resolve(JSON.parse(body))
    })
  })
}

//Gets the latest championlist and saves is it ./champions.json
updateChampions = ex.updateChampions = () => {
  request.get({
              url:"http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json",
              headers: headers
            }, (err, res) => {
    newChampions = JSON.parse(res["body"])

    localChamps = []

    for (championName in newChampions["data"]) {
      champion = newChampions["data"][championName]
      localChamps.push(new Champion(champion.key, champion.name, champion.image.full))
    }
    //sorteren voor de binary search
    localChamps.sort((a, b) => {
      return a.key - b.key
    })
    fs.stat("./champions.json", (error, stats) => {
      //TODO: stats birthdate is x aantal dagen geleden dan update en anders return false
      if (true) {
        fs.writeFile("./champions.json", JSON.stringify(localChamps), (err) => {
          if (err) {
            console.log(err)
          }
        })
      }
    })
  })
}

getLocalData = (type,key) => {
  array = JSON.parse(fs.readFileSync(type = "champion" ? "./champions.json": type = "spell" ? "./spells.json": ()=>{throw Error}))  
  return binarySearch(type, key, array)
}

binarySearch = (type, key, array) => {
  let mid = Math.floor(array.length / 2)
  let midObject = array[mid]
  let midKey = midObject.key
  
  switch (true) {
    case midKey == key:
      return midObject;
    case key < midKey:
      return binarySearch(type, key, array.slice(0, mid))
    case key > midKey:
      return binarySearch(type, key, array.slice(mid, array.length))
    default:
      updateChampions() //TODO: check wanneer champions.json voor het laatst geupdate is 
      // al is dat minder dan een dag geleden throw error
      getLocalData(type,key)
  }
}


let getMatch = ex.getMatch = (userName) => {
  return new Promise((resolve, reject) => {
    getUser(userName).then((user) => {
      request.get({
        url: `https://euw1.api.riotgames.com/lol/spectator/v3/active-games/by-summoner/${user.id}`,
        headers: headers
      }, (err, res, body) => {
        let match = JSON.parse(body)
        for(p in match.participants) {
          match.participants[p].champion = getLocalData("champion",match.participants[p].championId)
          //match.participants[p].CDR = hasCDR(user.id)
          //match.participants[p].sum1 = getLocalData("spell",match.participants[p].spell1Id)
          //match.participants[p].sum2 = getLocalData("spell",match.participants[p].spell2Id)
        };
        resolve(match)
      })
    })
  })
}
getMatch("Ryone").then((match)=>{
  console.log(match)
})