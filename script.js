const inputSlider=document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector("[data-lengthNumber]");
const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copyBtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copyMsg]");
const uppercaseCheck=document.querySelector("#c1");
const lowercaseCheck=document.querySelector("#c2");
const numberCheck=document.querySelector("#c3");
const symbolCheck=document.querySelector("#c4");
const indicator=document.querySelector("[data-indicator]");
const generateBtn=document.querySelector(".generateBtn"); 
const allcheckbox = document.querySelectorAll("input[type=checkbox]");

let passowrd="";
let passowrdLength=10;
let checkCount=0;
const symbols="!@#$%^&*()_+-={}|:>?<()";
handleSlider();

function handleSlider()
{
    inputSlider.value=passowrdLength;
    lengthDisplay.innerText=passowrdLength;
}

function setIndicator(color)
{
    indicator.style.backgroundColor=color;
    console.log("indicator color");
    
}

function getRandomInteger(min,max)
{
  return Math.floor( ( Math.random()*(max-min))+min);
}

function getRandomNumber()
{
    return getRandomInteger(0,9);

}
function getRandomLowerCase()
{
    return String.fromCharCode(getRandomInteger(97,123));


}
function getRandomUpperCase()
{
    return String.fromCharCode(getRandomInteger(65,91));
}

function generateSymbol()
{
    //special char ki string bana li and then random index se 
    //spwacial char le lia
    return symbols.charAt(getRandomInteger(0,symbols.length));

}

function clacStrength()
{
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;
    if(uppercaseCheck.checked)
    hasUpper=true;
    if(lowercaseCheck.checked)
    hasLower=true;
    if(numberCheck.checked)
    hasNum=true;
    if(symbolCheck.checked)
    hasSym=true;

if(hasUpper && hasLower && hasNum && hasSym && passowrdLength>=8)
setIndicator("green");
else if((hasLower || hasUpper) && (hasNum || hasSym) && passowrdLength>=6)
setIndicator("yellow");
else
setIndicator("red");

    
}

async function copyContent()
{
    //clipboard pr copy krne ke lie.
    //write text ke liye method hota. jo promise return krega
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="copied";
    }
    catch(e)
    {
        copyMsg.innerText="Failed";
    }

     copyMsg.classList.add("active");

     
    setTimeout(()=>
    {
        console.log("remove active  class");
        copyMsg.classList.remove("active");
    },2000);
    

}

inputSlider.addEventListener('input', (e )=>
{
    passowrdLength=e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click',()=>
{
    if(passwordDisplay.value)
    copyContent();
     
})

//single single checkbox se bhi kr skte the
allcheckbox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})

function handleCheckBoxChange()
{
    checkCount=0;
    allcheckbox.forEach((checkbox)=>
    {
        if(checkbox.checked)
        checkCount++;
    });

    //special condition
    //agr passowrd ki length less than check count hai to
    if(passowrdLength<checkCount)
    {
        passowrdLength=checkCount;
        handleSlider();

    }

}

generateBtn.addEventListener('click',()=>
{
    if(checkCount<=0)
    return ;
    if(passowrdLength<checkCount)
    {
        passowrdLength=checkCount;
        handleSlider();
    }


    //start generate new password
    //remove old one
    passowrd=""; 


    //put stuff which are checked in checkbox
    // if(uppercaseCheck.checked)
    // {
    //     passowrd+=getRandomUpperCase();

    // }
    // if(lowercaseCheck.checked)
    // {
    //     passowrd+=getRandomLowerCase();
    // }
    // if(numberCheck.checked)
    // {
    //     passowrd+=getRandomNumber();
    // }
    // if(symbolCheck.checked)
    // {
    //     passowrd+=generateSymbol();
    // }

    let funar=[];
    if(uppercaseCheck.checked)
    {
        funar.push(getRandomUpperCase); 
    }
    if(lowercaseCheck.checked)
        funar.push(getRandomLowerCase);
    if(numberCheck.checked)
        funar.push(getRandomNumber);
    if(symbolCheck.checked)
        funar.push(generateSymbol);

    
    for(let i=0;i<funar.length;i++)
    {
        passowrd+=funar[i]();
    }

    console.log(passowrd);

    //remaining length ke liye add kr so
    for(let i=0;i<passowrdLength-funar.length;i++)
    {
        let randIndex=getRandomInteger(0,funar.length);
        passowrd+=funar[randIndex]();
    }

    //ab shuffle bhi to krna padega
    console.log(passowrd.length);
    console.log(passowrd);

    passowrd=shufflePassword(Array.from(passowrd));



    //diplay value of password.
    passwordDisplay.value=passowrd;

    clacStrength();


     





})

function shufflePassword(sp)
{
    //fisher yates method
    console.log(sp);
    for(let i=sp.length-1;i>0;i--)
    {
        const j=Math.floor(Math.random()*(i+1));
        const temp=sp[i];
        sp[i]=sp[j];
        sp[j]=temp;
    }

    let str="";
    console.log(sp);
    sp.forEach((el) => (str += el));
    return str;
}







