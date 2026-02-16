// ---------------- SECTIONS ----------------
const sections = document.querySelectorAll(".section");
let current = 0;

sections.forEach((s,i)=>s.classList.toggle("active",i===0));


// ---------------- AUDIO ----------------
const welcomeAudio=new Audio("assets/audio/welcome.mp3");
welcomeAudio.volume=0.35;

const herWorldAudio=new Audio("assets/audio/her-world.mp3");
herWorldAudio.loop=true;
herWorldAudio.volume=0.35;

const letterAudio=new Audio("assets/audio/letter-song.mp3");
letterAudio.volume=0.22;

const finalAudio=new Audio("assets/audio/final-birthday.mp3");
finalAudio.volume=0.28;


// ---------------- AUDIO UNLOCK ----------------
let audioUnlocked=false;

function unlockAudio(){
if(audioUnlocked) return;

[welcomeAudio,herWorldAudio,letterAudio,finalAudio].forEach(a=>{
a.play().then(()=>{a.pause();a.currentTime=0}).catch(()=>{});
});

audioUnlocked=true;
document.removeEventListener("click",unlockAudio);
document.removeEventListener("touchstart",unlockAudio);
}

document.addEventListener("click",unlockAudio);
document.addEventListener("touchstart",unlockAudio);


// ---------------- COUNTDOWN (UNCHANGED) ----------------
const timerEl=document.getElementById("timer");
const targetDate=new Date("2026-02-17T00:00:00").getTime();

const countdown=setInterval(()=>{
const diff=targetDate-Date.now();

if(diff<=0){
clearInterval(countdown);
nextSection();
welcomeAudio.play().catch(()=>{});
if(typeof celebrateWelcome==="function") celebrateWelcome();
return;
}

const d=Math.floor(diff/(1000*60*60*24));
const h=Math.floor((diff/(1000*60*60))%24);
const m=Math.floor((diff/(1000*60))%60);
const s=Math.floor((diff/1000)%60);

timerEl.textContent=`${d} : ${h} : ${m} : ${s}`;

},1000);


// ---------------- NAVIGATION ----------------
function nextSection(){

if(current<sections.length-1){

sections[current].classList.remove("active");
current++;
sections[current].classList.add("active");

handleAudioForSection();

if(sections[current].id==="world"){
setTimeout(createBalloons,300);
}

}
}


// ---------------- AUDIO CONTROL ----------------
function handleAudioForSection(){

[welcomeAudio,herWorldAudio,letterAudio,finalAudio]
.forEach(a=>{a.pause();a.currentTime=0});

const activeId=sections[current].id;

if(activeId==="world") herWorldAudio.play().catch(()=>{});
if(activeId==="letter") letterAudio.play().catch(()=>{});
if(activeId==="final") finalAudio.play().catch(()=>{});
}


// ---------------- CARD FLIP ----------------
function flip(card){

const video=card.querySelector("video");
const allCards=document.querySelectorAll(".card");

[welcomeAudio,herWorldAudio,letterAudio,finalAudio]
.forEach(a=>a.pause());

allCards.forEach(c=>{
if(c!==card){
c.classList.remove("flipped");
const v=c.querySelector("video");
if(v){v.pause();v.currentTime=0;}
}
});

const flipped=card.classList.toggle("flipped");

if(flipped){
video.play().catch(()=>{});
}else{
video.pause();
video.currentTime=0;
}
}


// ================================
// BALLOON EXPERIENCE
// ================================

const balloonWords=[
"You","are","most","precious","Creation","of","God,",
"and","He","is","Special","because","He","sent",
"you","in","this","world","18","years","ago",
"to","make","this","World","a","special","place"
];

let balloonsCreated=false;
let revealedWords=new Array(balloonWords.length).fill("");

function createBalloons(){

if(balloonsCreated) return;
balloonsCreated=true;

const area=document.getElementById("balloon-area");
const reveal=document.getElementById("sentenceReveal");

if(!area||!reveal) return;

updateSentence();

balloonWords.forEach((word,i)=>{

const balloon=document.createElement("div");
balloon.className="balloon";

balloon.style.left=Math.random()*85+"%";
balloon.style.background=
`hsl(${Math.random()*360},70%,75%)`;

balloon.style.animationDelay=i*0.4+"s";

area.appendChild(balloon);

balloon.onclick=()=>{
balloon.classList.add("pop");
revealedWords[i]=word;
updateSentence();
};

});
}

function updateSentence(){

const container=document.getElementById("sentenceReveal");

container.innerHTML=revealedWords
.map(w=>w ? w : "<span style='opacity:.25'>_____</span>")
.join(" ");

}