bot.command('24hrvol', (ctx) => {



var hr;

const query = ctx.update.message.text.split('').slice(8).join('');

 if(query === ''){

 	ctx.telegram.sendMessage(ctx.chat.id,"Invalid format") 	ctx.telegram.sendMessage(ctx.chat.id,`Use  [ /getprice {crypto_name} ] to get price of crypto-coin.`)

 	

 }

 else{

hr = config.filter(function(value) {

    			return value.name === query

    			})

 if(_.isEmpty(hr)){

 	bot.telegram.sendMessage(ctx.chat.id,'Please ensure the name of coin/token is correct.')

 	bot.telegram.sendMessage(ctx.chat.id,'Send /tutorial command to get help!')

 }

 else{

 axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${hr[0].id}&vs_currencies=usd`).then(res =>{

 	bot.telegram.sendMessage(ctx.chat.id,

`The 24hr volume of ${query} is ${Object.values(res.data)[0].usd}$ according to coingecko!`

 	)

 }).catch(e=>{

 	bot.telegram.sendMessage(ctx.chat.id,

"Sorry some error occured in our server,please try again!⚡"

 	)

 })

 }

 }

}) 
