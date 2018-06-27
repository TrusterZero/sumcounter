const request = require("request");
const apiKey = "RGAPI-8d6d7443-3399-424b-bdb6-43427c4b2d30";
let ex = module.exports;

headers  = {
  "Origin": "https://developer.riotgames.com",
  "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
  "X-Riot-Token": "RGAPI-29c03ae6-3811-4136-be06-76685aacbc29",
  "Accept-Language": "nl-NL,nl;q=0.9,en-US;q=0.8,en;q=0.7",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
}

let getUser = ex.getUser = (userName) => {
  return new Promise((resolve, reject) => {
    request.get({
      url : `https://euw1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${userName}`,
      headers:headers
      },(err, res, body) => {
      resolve(JSON.parse(body))
    })
  })
}

let getMatch = ex.getMatch = (userName) => {
  return new Promise((resolve, reject) => {
    getUser(userName).then((user) => {
      request.get({
        url : `https://euw1.api.riotgames.com/lol/spectator/v3/active-games/by-summoner/${user.id}`,
        headers:headers
        },(err, res, body) => {
        resolve(JSON.parse(body))
      })
    })
  })
}