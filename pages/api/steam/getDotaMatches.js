//https://api.steampowered.com/IDOTA2Match_205790/GetMatchHistory/v1?key=DDF8B2AB02710503502F441177B04F60&format=json&input_json={steamid: 76561198070299357}
const valveSteamApi = require('valve-steam-web-api')
const dotaSteamApi = new valveSteamApi.dotaSteamApi('DDF8B2AB02710503502F441177B04F60')


export default async function getDotaMatches(req, res) {
    const {steam_id} = req.body
   (steam_id)
    let data;
    const heroId = 1 // Anti-Mage
    const matchesRequested = 25
    dotaSteamApi.getMatchDetails('6411473184')
.then(data => (data.result.players))
    dotaSteamApi.getMatchHistory(null, null, null, null, '76561198070299357', null, null, matchesRequested)
    .then(data => {res.status(200).json(data.result); data = data.result}).catch(e=>{(e)})

  }