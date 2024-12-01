let msgContainer = document.querySelector(".msgContainer");
let outgoingMsg = document.querySelector(".outgoing");
const API_KEY = "AIzaSyDDj3esWeJ5djC3_4QH1lb8XSUu9fimHpk";
let userMsg;

      
  function send(){
        userMsg = document.getElementById("content").value.trim();
        if(document.getElementById("content").value.trim() === " "){
          outgoingMsg.style.display ="none";
        }
        else{
  
          //send message
        sendMsg();
        
      //incoming AI response
        setTimeout(()=>{
          //tyoing movement
          document.querySelector(".msgContainer").innerHTML += `
            <div class="left incoming anime">
           <div class="msgContent">    
           <div class="dots">
         <span class="dot" style="--i:1"></span>
         <span class="dot" style="--i:2"></span>
        <span class="dot" style="--i:3"></span>
          </div>

          </div>
           <img src="download (1).jpeg" alt="profile">
        </div>
          `;
          //get response from Gemini API
          generateReply();
        }, 1000);
        }
      }
      
      /* send message to ai*/
      function sendMsg(){
        document.querySelector(".welcome").style.display="none";
       document.querySelector(".msgContainer").innerHTML += `
       <div class="right outgoing">
           <div class="msgContent">
          <span class="outgoing-text">${content.value.trim()}</span>
           </div>
        </div>

          `;
          //make input field blank
          content.value = "";
      }
      
      //generate response to questions
  function generateReply(){
        
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=${API_KEY}`;
    
    
    //Request from API
        const requestOptions = {
          method: "POST",
          header: {
           "Content-Type": "application/json",
          },
  body: JSON.stringify({
    contents: [{
        "parts":[{"text": `${userMsg}`}]
       }]
  })
        }
        // fetch data from Gemini API
  fetch(url, requestOptions).then(res => res.json()).then(data =>{
    console.log(data.candidates[0].content.parts[0]);
    // AI response
     document.querySelector(".msgContainer").innerHTML += `
            <div class="left incoming">
           <div class="msgContent">
                    <span class="incoming-text">${data.candidates[0].content.parts[0].text}</span>
          </div>
           <img src="download (1).jpeg" alt="profile">
        </div>
          `;
          
    //remove typing element and replace with AI response
    document.querySelectorAll(".anime").forEach((e)=>{
      e.style.display = "none";
    })
  
          
  }).catch((err) =>{
    //catch error
    console.log(err);
  })
          
      }
