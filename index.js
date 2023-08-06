// EXTERNAL LIBRARIES
const qrcode = require('qrcode-terminal')

const {Client, LocalAuth, MessageMedia} = require('whatsapp-web.js')
const client = new Client({
	authStrategy: new LocalAuth()
})

client.on('qr', qr => {
	qrcode.generate(qr, {small: true})
})

client.on('ready', () =>{
	console.log('Client is ready!')
})

client.on('message', async message => {
	let content = message.body
	if (content === '!help'){
		message.reply('\"!help\" command is unavaible for now.')
	}else if (content === '!ping'){
		message.reply('Your message will be spamed into Billy\'s device, please wait for the next reply from Billy.')
	}else if(message.body === '!everyone') {
        	const chat = await message.getChat();
        
        	let text = "";
        	let mentions = [];

        	for(let participant of chat.participants) {
            		const contact = await client.getContactById(participant.id._serialized);
            
            		mentions.push(contact);
            	text += `@${participant.id.user} `;
        	}

        	await chat.sendMessage(text, { mentions });
    	}else if (content.startsWith('!spam')){
		let chat = await message.getChat()
		let spam = content.split(' ')
		if(spam.length !== 3){
			message.reply('Seems like you are trying to use !spam command but failed. Here\'s a quick example \"!spam Billy 10\".')
		}else{
			spam[2] = Number(spam[2])
			if(spam[2] > 0){
				for(let i = 0; i < spam[2]; i++){
					await chat.sendMessage(spam[1])
				}
			}else{
				message.reply('The number of the spam must be bigger than 0!')
			}
		}
	}
})
client.initialize()