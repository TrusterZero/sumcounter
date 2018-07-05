const request = require("request");
const fs = require("fs")
const apiKey = "RGAPI-95a841eb-8e0a-4df6-bfb6-4a10b2e5f35c";
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

updateChampions = ex.updateChampions = () => {
  request.get("http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json", (err, res) => {
    newChampions = JSON.parse(res["body"])

    localChamps = []

    for (championName in newChampions["data"]) {
      champion = newChampions["data"][championName]
      localChamps.push(new Champion(champion.key, champion.name, champion.image.full))
    }
    localChamps.sort((a, b) => {
      return a.key - b.key
    })
    fs.writeFile("./champions.json", JSON.stringify(localChamps), (err) => {
      if (err) {
        console.log(err)
      }
    });
  })
}

getChampion = (key) => {
  champions = JSON.parse(fs.readFileSync("./champions.json"))
  return binarySearch(key, champions)
}

binarySearch = (key, array) => {
  mid = Math.floor(array.length / 2)
  midObject = array[mid]
  midKey = midObject.key

  switch (true) {
    case midKey == key:
      return midObject;
    case key < midkey:
      return binarySearch(key, array.slice(0, mid))
    case key > midkey:
      return binarySearch(key, array.slice(mid, array.length))
  }
}


let getMatch = ex.getMatch = (userName) => {
  return new Promise((resolve, reject) => {
    //liever meerdere keren loopen door hetzelfde object
    //of meer reqs uitvoeren
    //andere optie is om een eigen geordende data set te creeren 
    //daar doorheen zoeken met de binary search methode
    //die met een Cronjob te laten vernieuwen


    getUser(userName).then((user) => {
      request.get({
        url: `https://euw1.api.riotgames.com/lol/spectator/v3/active-games/by-summoner/${user.id}`,
        headers: headers
      }, (err, res, body) => {
        let match = JSON.parse(body)

        let champions = JSON.parse(body.data)
        match.participants.array.forEach(participant => {
          //participant.champion = getChampion(participant.championId)
        });


        resolve(match)
      })
    })
  })
}
console.log(getChampion(43))