const TelegramBot = require('node-telegram-bot-api');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// التوكن الجديد الذي تم تغييره
const token = '8791301875:AAF-LllhSRRM0SArbnWiZYGgYFn5INhodus';
const apiKey = "AIzaSyBBTsG3n75BxQOwT-EL3WVwXeqradpjkUw";
const adminNumber = '+96597805334'; // المصمم والملك

const genAI = new GoogleGenerativeAI(apiKey);
const bot = new TelegramBot(token, {polling: true});

// لوحة التحكم المنسقة (Dashboard) مستوحاة من تصميمك
const dashboardMsg = `
╬═══ ⏣ نـقـابـة اكـلـيـبـس ⏣ ═══╬
✧ حـالـة الـنـظـام: Active & Stable 🛡️
✧ الـسـرعـة (Ping): 18ms ⚡
✧ الـمـعـالـج: Shadow Core v3 ⚔️
✧ رابـط الـمـوقـع: https://song-system.github.io
✧ الـمـصـمـم: الملك جين وو 👑
╬════════════════════╬
`;

const mainKeyboard = {
    reply_markup: {
        keyboard: [
            ['📊 Dashboard', '🛡️ النقابات'],
            ['⚔️ نظام الولاء', '👑 هوية الملك'],
            ['🌐 الموقع الرسمي']
        ],
        resize_keyboard: true
    }
};

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {
        bot.sendMessage(chatId, "مرحباً بك في نظام سيادة سونغ جين وو. إغريس جاهز لتنفيذ الأوامر.", mainKeyboard);
    } 
    else if (text === '📊 Dashboard') {
        bot.sendMessage(chatId, dashboardMsg);
    }
    else if (text === '👑 هوية الملك') {
        bot.sendMessage(chatId, `الملك والمصمم المعتمد هو: ${adminNumber} 👑\nرابط القناة: https://whatsapp.com/channel/0029VbCMlkj2ER6nzLnwpO3G`);
    }
    else if (text === '🌐 الموقع الرسمي') {
        bot.sendMessage(chatId, "تفضل بزيارة بوابة الظلال الرسمية:\nhttps://github.com/SongJinwoo1/songalone/tree/main");
    }
    else {
        // نظام رد الذكاء الاصطناعي الفخم
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent("أنت إغريس، مخلص جداً للملك سونغ جين وو، رد بفخامة واختصار على: " + text);
            bot.sendMessage(chatId, result.response.text());
        } catch (e) {
            bot.sendMessage(chatId, "عذراً مولاي، بوابة الظلال مشوشة حالياً.");
        }
    }
});

console.log("تم تفعيل نظام إغريس بالتوكن الجديد.. السيادة بانتظارك.");
