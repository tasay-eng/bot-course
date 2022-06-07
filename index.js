const nodeTelegramBotApi = require("node-telegram-bot-api");

const token = "5364377683:AAF3wjVjUvMosHk9lSpaRzmXb9OOEomHyDw"

const bot = new nodeTelegramBotApi (token, {polling: true})

const chats = {}

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '1', callback_data: '1'}],
            [{text: '2', callback_data: '2'}],
            [{text: '3', callback_data: '3'}],
            [{text: '4', callback_data: '4'}]
        ]
    })
}

bot.setMyCommands([
    {command: '/start', description: 'Helloness'},
    {command: '/info', description: 'UserName'},
    {command: '/game', description: 'Lets play'}
])


function start() {

    bot.on('message', async msg => {
    const text = msg.text
    const chatid = msg.chat.id
    const name = msg.chat.first_name
    console.log(msg)

    if (text === '/start'){
        await bot.sendMessage(chatid, 'https://tgram.ru/wiki/stickers/img/Witchstick/png/3.png')
        return bot.sendMessage(chatid, 'Hello to hell boy')
    }

    if (text === '/info'){
        return bot.sendMessage(chatid, 'Your name is '+ name)
    }

    if (text === '/game'){
        await bot.sendMessage(chatid, 'I will make up the namber from 0 to 9 and you guess it')
        const randomNumber = Math.floor(Math.random()*10)
        chats[chatid] = randomNumber
        return bot.sendMessage(chatid, 'Отгадывай', gameOptions)
    }
    return bot.sendMessage(chatid, 'A little misunderstanding happend')

    bot.on('callback_query', async msg => {
        const data = msg.data
        const chatid = msg.chat.id

        console.log(msg)
        
    })

})}

start();