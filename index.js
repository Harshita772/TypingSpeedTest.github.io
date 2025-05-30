const typingText=document.querySelector(".typing-text p"),
inputField=document.querySelector(".wrapper .input-field"),
timeTag=document.querySelector(".time span b"),
wpmTag=document.querySelector(".wpm span"),
cpmTag=document.querySelector(".cpm span"),
tryAgainbtn=document.querySelector("button"),
mistakeTag=document.querySelector(".mistakes span");

const popup = document.querySelector('.result-popup');
const finalWpm = document.getElementById('finalWpm');
const finalCpm = document.getElementById('finalCpm');
const finalMistakes = document.getElementById('finalMistakes');
const closeBtn = document.querySelector('.close-btn');
const errorSound = new Audio('error.mp3');


let timer,
maxTime=90,
timeLeft=maxTime,
charIndex=mistakes=isTyping=0;

function randomParagraph(){

    let randIndex=Math.floor(Math.random()*paragraphs.length);
    typingText.innerHTML="";
    paragraphs[randIndex].split("").forEach(span => {
        let spanTag=`<span>${span}</span>`;
        typingText.innerHTML+=spanTag;

    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", ()=>inputField.focus());
    typingText.addEventListener("click", ()=>inputField.focus());

}

function initTyping(){
    const characters=typingText.querySelectorAll("span");
    let typedChar=inputField.value.split("")[charIndex];
    if(charIndex<characters.length -1 && timeLeft>0){
        if(!isTyping){
            timer=setInterval(initTimer,1000);
            isTyping=true;
        }

        if(typedChar==null){
            charIndex--;
            if(characters[charIndex].classList.contains("incorrect"))
            {
                mistakes--;
            }
            characters[charIndex].classList.remove("correct","incorrect");
        }
        else{
            if(characters[charIndex].innerText===typedChar)
            {
                characters[charIndex].classList.add("correct");
            }
            else
            {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
                errorSound.currentTime = 0;
                errorSound.play();
            }
            charIndex++;
        }   
        characters.forEach(span=>span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm=Math.round((((charIndex-mistakes)/5)/(maxTime-timeLeft))*60);
        if (wpm < 0 || !wpm || wpm === Infinity) {
            wpm = 0;
        }
        mistakeTag.innerText=mistakes;
        cpmTag.innerText=charIndex-mistakes;
        wpmTag.innerText=wpm;
    }
    else{
        inputField.value="";
        clearInterval(timer);
        finalWpm.innerText = wpmTag.innerText;
        finalCpm.innerText = cpmTag.innerText;
        finalMistakes.innerText = mistakeTag.innerText;
        popup.classList.remove("hidden");
    }
}

function initTimer(){
    if(timeLeft>0){
        timeLeft--;
        timeTag.innerText=timeLeft;
    }
    else{
        clearInterval(timer);
    }
}

function resetGame(){
    randomParagraph();
    inputField.value="";
    clearInterval(timer);   
    timeLeft=maxTime,
    charIndex=mistakes=isTyping=0;
    timeTag.innerText=timeLeft;
    mistakeTag.innerText=mistakes;
    cpmTag.innerText=0;
    wpmTag.innerText=0;

}

randomParagraph();
inputField.addEventListener("input",initTyping);
tryAgainbtn.addEventListener("click",resetGame);
closeBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
});

