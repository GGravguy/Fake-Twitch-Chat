javascript:(function(){
if (document.getElementById('fakeTwitchChatBox')) return;

/* ---------- CREATE CHAT BOX UI ---------- */
const box = document.createElement('div');
box.id = 'fakeTwitchChatBox';
box.style.cssText = `
position:fixed;
bottom:10px;
right:10px;
width:340px;
height:480px;
background:#18181b;
color:white;
border:2px solid #9146FF;
border-radius:6px;
display:flex;
flex-direction:column;
font-family:"Inter", Arial, sans-serif;
font-size:14px;
z-index:999999999;
`;
document.body.appendChild(box);

const header = document.createElement('div');
header.style.cssText = `
background:#9146FF;
padding:6px;
display:flex;
align-items:center;
`;
header.innerHTML = `<strong style="font-size:15px;">chat</strong>`;
box.appendChild(header);

const closeBtn = document.createElement('span');
closeBtn.textContent = '✕';
closeBtn.style.cssText = "cursor:pointer;margin-left:auto;font-weight:bold;";
closeBtn.onclick = () => box.remove();
header.appendChild(closeBtn);

const chat = document.createElement('div');
chat.style.cssText = `
flex:1;
padding:8px;
overflow-y:auto;
line-height:1.25;
`;
box.appendChild(chat);

/* INPUT BAR */
const inputBar = document.createElement('div');
inputBar.style.cssText = `
padding:6px;
background:#0e0e10;
display:flex;
gap:4px;
`;
inputBar.innerHTML = `
<input id="fakeMsgInput" style="
    flex:1;
    background:#18181b;
    border:1px solid #3b3b44;
    padding:6px;
    border-radius:4px;
    color:white;
" placeholder="Send a message..." />
<button id="fakeSendBtn" style="
    padding:6px 10px;
    background:#9146FF;
    border:none;
    border-radius:4px;
    color:white;
    cursor:pointer;
">Send</button>
`;
box.appendChild(inputBar);

/* ---------- DATA ---------- */
const badges = { prime:"💠", tier1:"⭐", tier2:"🌟", tier3:"🔥", none:"" };

const users = ["GamerGirl","SweatyTryHard","ClipThat","ZoomerLord","CrackedOut","KeyboardSamurai","UltraChad","PogMaster","KEKWFactory","MonkaDrive","AnimeProfilePic","SnaccDealer","LateNightAndy","BoomerTechMoments","ViralClipper","WKeyWizard","StreamerFan89","OmegaViewer","BuffWizard","PrimeEnjoyer","GiftSubGoblin","T3WalletWarrior","SpamMachine","CopiumInhaler","SkillIssueDetector","NPCNumber44","BackseatBandit","LoreMaster9000","FrogChamp","PepePriest","HopiumHolder","TiltedTim","SweatLord420","FailsEveryQuest","EZFarmBot","CringePolice","ChaosEnjoyer"];

const emotes = ["Kappa","Pog","PogChamp","LUL","KEKW","OMEGALUL","HYPERS","Clap","Sadge","FeelsStrongMan","FeelsWeirdMan","monkaW","monkaS","PepeLaugh","PepeJAM","WidePeepoHappy","PepoG","PepeRun"];

const dialog = [
"bro that timing was unreal","no way he hits that","actual movie moment","WHAT AM I WATCHING","peak gaming","my brain can’t compute that","this chat wildin fr","that was scripted 100%","someone clip this NOW","i am crying LMAO","bro is DIFFERENT","nahhh he cheating","IS ANYONE SEEING THIS","mods asleep post cats","ok that was clean","i spat out my drink","actual W moment","i refuse to believe this","core memories unlocked","game sense MAXED","my jaw DROPPED","peak twitch moment","this is why i watch","HELLO????","zero skill issue detected","bro folded like laundry","this lobby full of NPCs","HOW????","i can't breathe KEKW","chat we are NOT surviving this","nah man","im losing brain cells","WHO LET HIM COOK","he cooked THE WHOLE MEAL","nah bro microwaved it","perfectly cut scream","someone call NASA","human aimbot","he's literally goated","actual menace to society","uninstall pls","that’s a reportable offense","i can't even lie that was smooth","bro thinks he in an anime","DELETING THIS GAME RN","my eyes can’t keep up","this is cinema","HOLY SKILL ISSUE","bro typing with his toes fr","NPC behavior","ggez","this chat faster than my wifi","NOTHING MAKES SENSE ANYMORE","AHHHHHHHH","I LOVE THIS STREAM","bro hitting shots IRL too?","i want a refund LUL","we partying tonight","that dodge was ILLEGAL","im convinced he's psychic","bro teleported","THAT WAS ILLEGAL","ok chat calm down","WHAT IS HE COOKING","we eating good tonight","my spine is tingling","im terrified rn","he DOING THINGS","NO PAUSE BUTTON","bro on demon time","why he built like that","nah mods ban him","SKILL GAP VISIBLE","this chat too fast","I BLINKED AND MISSED IT","BRO CHILL","someone check his PC","bro unlocked ultra instinct"
];

/* ---------- MESSAGE SENDING ---------- */
function sendMessage(username, text, badge="none") {
    const line = document.createElement('div');
    line.style.marginBottom = "4px";

    const badgeIcon = badges[badge] ? badges[badge] : "";

    line.innerHTML = `<span style="color:#a970ff;font-weight:bold;">${badgeIcon}${username}:</span> ${text}`;
    chat.appendChild(line);
    chat.scrollTop = chat.scrollHeight;
}

/* ---------- USER INPUT ---------- */
document.getElementById("fakeSendBtn").onclick = () => {
    const inp = document.getElementById("fakeMsgInput");
    if (inp.value.trim() !== "") {
        sendMessage("You", inp.value, "tier1");
        inp.value = "";
    }
};

/* ---------- RANDOM CHAT GENERATION ---------- */
function randomChat() {
    const user = users[Math.floor(Math.random()*users.length)];
    const badge = ["none","prime","tier1","tier2","tier3"][Math.floor(Math.random()*5)];
    const text = (Math.random() < 0.3)
        ? Array(Math.floor(Math.random()*4)+2).fill(emotes[Math.floor(Math.random()*emotes.length)]).join(" ")
        : dialog[Math.floor(Math.random()*dialog.length)];
    sendMessage(user, text, badge);
}

function constantActivity() {
    randomChat();
    setTimeout(constantActivity, 200 + Math.random()*800);
}

function chatBurst() {
    const amount = 10 + Math.floor(Math.random()*20);
    for (let i = 0; i < amount; i++) {
        setTimeout(randomChat, i * (30 + Math.random()*60));
    }
    setTimeout(chatBurst, 8000 + Math.random()*12000);
}

function raidEvent() {
    const count = Math.floor(Math.random()*800)+100;
    for (let i = 0; i < 20; i++) {
        setTimeout(() => sendMessage("RAID_BOT", `🚨 RAID INCOMING! ${count} VIEWERS 🚨`, "tier3"), i * 80);
    }
    setTimeout(raidEvent, 60000 + Math.random()*60000);
}

constantActivity();
chatBurst();
raidEvent();

})();