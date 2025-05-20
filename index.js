const typingText=document.querySelector(".typing-text p"),
inputField=document.querySelector(".wrapper .input-field"),
timeTag=document.querySelector(".time span b"),
wpmTag=document.querySelector(".wpm span"),
cpmTag=document.querySelector(".cpm span"),
tryAgainbtn=document.querySelector("button"),
mistakeTag=document.querySelector(".mistakes span");


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
            }
            charIndex++;
        }   
        characters.forEach(span=>span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm=Math.round((((charIndex-mistakes)/5)/(maxTime-timeLeft))*90);
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
    }
}

function showPopup(wpm, cpm, mistakes) {
    document.getElementById("final-wpm").textContent = wpm;
    document.getElementById("final-cpm").textContent = cpm;
    document.getElementById("final-mistakes").textContent = mistakes;
    document.getElementById("result-popup").classList.remove("hidden");
}

function closePopup() {
    document.getElementById("result-popup").classList.add("hidden");
}

function initTimer(){
    if(timeLeft > 0){
        timeLeft--;
        timeTag.innerText = timeLeft;
    } else {
        clearInterval(timer);

        // Calculate final WPM and CPM
        let wpm = Math.round((((charIndex - mistakes) / 5) / maxTime) * 90);
        let cpm = charIndex - mistakes;

        if (wpm < 0 || !wpm || wpm === Infinity) wpm = 0;
        if (cpm < 0 || !cpm || cpm === Infinity) cpm = 0;

        showPopup(wpm, cpm, mistakes);
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
