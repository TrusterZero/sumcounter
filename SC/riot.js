const request = require("request");
const fs = require("fs")
const TEMP_API_KEY = "RGAPI-0fe2f7fc-d55e-4e89-ad8e-42c33babc977";
const COSMIC_INSIGHT_ID = 8347 //the cosmic insight rune reduces the cooldown of summonerspells
const MS_IN_DAY = 86400000
let ex = module.exports;


class Champion {
  constructor(key, name, image) {
    this.key = key
    this.name = name
    this.image = image
  }
}
class Spell {
  constructor(key, name, image, cooldown) {
    this.key = key
    this.name = name
    this.image = image
    this.cooldown = cooldown
  }
}

headers = {
  "Origin": "https://developer.riotgames.com",
  "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
  "X-Riot-Token": `${TEMP_API_KEY}`,
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

updateLocalFile = (type) => {
  let endpoint;
  let path;
  if (type == "spells") {
    endpoint = "summoners.json"
    path = "./spells.json"
  } else if (type == "champions") {
    endpoint = "champions.json"
    path = "./champions.json"
  }

  if (canBeUpdated(path)) {
    request.get({
      url: `http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/${endpoint}`,
      headers: headers
    }, (err, res) => {
      newData = JSON.parse(res["body"])

      let localData = []

      if (type == "spells") {
        for (spellName in newData["data"]) {
          spell = newData["data"][spellName]
          localData.push(new Spell(spell.key, spell.name, spell.image, spell.cooldown))
        }
      } else if (type == "champions") {
        for (championName in newData["data"]) {
          champion = newData["data"][championName]
          localData.push(new Champion(champion.key, champion.name, champion.image.full))
        }
      }
      //sorteren voor de binary search
      localData.sort((a, b) => {
        return a.key - b.key
      })
      fs.writeFile(path, JSON.stringify(localData), (err) => {
        if (err) {
          console.log(err)
        }
      })
      return true
    })
  }else {
    return false
  }
}


let canBeUpdated = (path) => {


  fs.stat(path, (error, stats) => {
    return Date.now() - stats.mtime > MS_IN_DAY
  })
}

getLocalData = (type, key) => {
  let path;
  if (type == "champions") {
    path = "./champions.json"
  } else if (type == "spells") {
    path = "./spells.json"
  }
  console.log(path)
  array = JSON.parse(fs.readFileSync(path))
  return binarySearch(type, key, array)
}

binarySearch = (type, key, array) => {
  let mid = Math.floor(array.length / 2)
  let midObject = array[mid]
  let midKey = midObject.key
  
  if(array.length == 1 && key != array[0].key){
    if(updateLocalFile(type)){
      getLocalData(type, key)
    }else {
      return null
    }
  }
  switch (true) {
    case midKey == key:
      return midObject;
    case key < midKey:
      return binarySearch(type, key, array.slice(0, mid))
    case key > midKey:
      return binarySearch(type, key, array.slice(mid, array.length))
    default:
  }
}

let getMatch = ex.getMatch = (userName) => {
  return new Promise((resolve, reject) => {
    getUser(userName).then((user) => {
      request.get({
        url: `https://euw1.api.riotgames.com/lol/spectator/v3/active-games/by-summoner/${user.id}`,
        headers: headers
      }, (err, res, body) => {
        let match = AddSummonerData(JSON.parse(body))
        resolve(match)
      })
    })
  })
}

let AddSummonerData = (match, position) => {
  for (position in match.participants) {
    let summoner = match.participants[position]
    match.participants[position].champion = getLocalData("champions", summoner.championId)
    match.participants[position].sum1 = getLocalData("spells", summoner.spell1Id)
    match.participants[position].sum2 = getLocalData("spells", summoner.spell2Id)
    if (hasCDR(summoner)) {
      match.participants[position].sum1.cooldown[0] *= 0.95
      match.participants[position].sum2.cooldown[0] *= 0.95
    }
  }
  return match
}

let hasCDR = (user) => {
  return user.perks.perkIds.includes(COSMIC_INSIGHT_ID)
}

getMatch("Ryone").then((match) => {
  console.log(JSON.stringify(match, undefined, 2));
})

updateLocalFile("champions")