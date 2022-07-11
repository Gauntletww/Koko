const { Telegraf } = require('telegraf')
const axios = require('axios')
var _ = require('lodash');
const config = require('./coin.json');

const bot = new Telegraf('5444942394:AAGY_q24ufraump2EAlm2Ml8fXgiEE1Lsxo')
bot.start((ctx) => ctx.reply('Welcome to our coingecko price bot'))
bot.command('getprice', (ctx) => {
console.log(ctx)
var arr;
const doc = ctx.update.message.text.split('').slice(10).join('');

 if(doc === ''){
 	ctx.telegram.sendMessage(ctx.chat.id,"Invalid format")
 	ctx.telegram.sendMessage(ctx.chat.id,`Use  [ /getprice {crypto_name} ] to get price of crypto-coin.`)
 	
 }
 else{
arr = config.filter(function(value) {
    			return value.name === doc
    			})
 if(_.isEmpty(arr)){
 	bot.telegram.sendMessage(ctx.chat.id,'Please ensure the name of coin/token is correct.')
 	bot.telegram.sendMessage(ctx.chat.id,'Send /tutorial command to get help!')
 }
 else{
 axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${arr[0].id}&vs_currencies=usd`).then(res =>{
 	bot.telegram.sendMessage(ctx.chat.id,
`The price of ${doc} is ${Object.values(res.data)[0].usd}$ according to coingecko!`
 	)
 }).catch(e=>{
 	bot.telegram.sendMessage(ctx.chat.id,
"Sorry some error occured in our server,please try again!⚡"
 	)
 })

 }
 }
})
bot.command('gettrending',(ctx) => {
bot.telegram.sendMessage(ctx.chat.id,"<i>⚡The 7 trending search today in coingecko are:-</i>",{parse_mode: 'HTML'})
	var data = []
axios.get('https://api.coingecko.com/api/v3/search/trending').then(r => {
for(var i=0;i<r.data.coins.length;i++){
data.push(`${i+1}). ${r.data.coins[i].item.name}`)
}

bot.telegram.sendMessage(ctx.chat.id, `<pre>${data.join('\r\n')}</pre>`,{parse_mode: 'HTML'})
}).catch(e => {
	bot.telegram.sendMessage(ctx.chat.id,
	"Sorry some error occured in our server,please try again!⚡"
	     )
	
})
})

bot.launch()
 

