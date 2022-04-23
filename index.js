const input = require('./util/io')
const downloadSeason = require('./trans')

const downloadSeasonInterface = async ()=>{

    const show = await input('Show: ') || '';
    const season = Number(await input('Number of season: ')) || 0;
    const episodes = Number(await input('Number of episodes: ')) || 0;
    const lang = await input('Language (or Enter for \'ar\'): ') || 'ar';
    const keywords = (await input('Keywords (separater by comma) - optional: ')).split(',') || '';
    const failed = await downloadSeason(
        {show,season,episodes,lang,keywords}
    )
    console.log( failed ? `${failed} failed`: '' );

}

const main =async ()=>{
  
    while (true){

      console.log('\nPlease enter the number of the operation:');
      console.log('1.Download a season subtitles');
      console.log('2.Exit');

      const userInput = await input('choice: ');
      
      if ( ! [1,2].includes(Number(userInput)) ){
          console.log('Invalid input, Please try again');
          continue;
      }

      switch(userInput){

          case '1' : 
            console.log();
            await downloadSeasonInterface();
            break;

          case '2' : return;
      }
    }
  }

main()