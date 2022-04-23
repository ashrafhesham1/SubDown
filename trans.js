const OS = require('opensubtitles.com');
const download = require("download");
const config = require('./config');
const sleep = require('./util/sleep')

const os = new OS({
  apikey: config.openSubApiKey
})

const auth = async () => {
    const response = await os.login({
      username: config.openSubUser,
      password: config.openSubPass
    })
    const token = response.token
    return token
}

const searchSub = async (title,lang) =>{
    const response = await os.subtitles({
        query: title,
        languages:lang
      })
    return response
}

const filterSub = (searchRes,keywords)=>{
    let i = 0

    while ( i < keywords.length ){

        const res = searchRes.data.find( elem =>{
            const name = elem.attributes.files[0].file_name.toLowerCase()
            return name.includes(keywords[i].toLowerCase())
        })
        if (res) 
            return res
        i++
    }
    return null
    
}

const _getUrl = async(id)=>{
    const url = await os.download({file_id:id})
    return url
}


const getUrl = async (title,lang,keywords) => {
    let token =await auth()
    let search = await searchSub(title,lang)
    const target = filterSub(search,keywords)
    const downloadData = await _getUrl(target.attributes.files[0].file_id)

    return downloadData.link
}

const downloadUrl = async (urls,dist) => {
  await Promise.all(
    urls.map((url) => download(url, `subs/${dist}`))
  );
};

downloadSeason = async({
    show,
    season,
    episodes,
    lang='ar',
    keywords=['']
})=>{

    console.log();
    let failed = [];

    for (let i=1 ; i<episodes+1 ; i++){
        
        try {
            const url = await getUrl(`${show}.S0${season}E0${i}`,lang,keywords)
            console.log(`ep ${i} link fetched ...`);
            await downloadUrl([url],`${show}.S${season}.${lang}.subs`)
            console.log(`ep ${i} downloaded ...`);

        } catch (error) {
            console.log(`ep ${i} download failed`);
            failed.push(i)
        }
        sleep(400);
    }

    console.log('Download finished');
    return failed

}

module.exports = downloadSeason

const test = async()=>{
  const res = await searchSub('friends.s1.e05','ar')
  console.log(res);
}
test()
/*downloadSeason(
    {
        show:'community',
        season:02,
        episodes:2,
        lang:'ar',
        keywords:['Bluray x265 HEVC','Bluray','UTR','Web-DL','Web','1080p','720p','']
    }
)*/