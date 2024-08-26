let typingTimer;
let doneTypingInterval = 5000;
let isTyping = false;

function startTyping() {
  if (!isTyping) {
      isTyping = true;
      sendTypingStatus('started');
      clearInterval(countdownInterval);
            }
      clearTimeout(typingTimer);
        }

function stopTyping() {

  clearTimeout(typingTimer);
  typingTimer = setTimeout(() => {
  if (isTyping) {
     isTyping = false;
     timeLeft = 6;
     sendTypingStatus('stopped');

     startCountdown()
                }
  }, 0);
        }

function deleteText() {
    textbox.value = ""
}

function startCountdown() {
  
  countdownInterval = setInterval(() => {
      if (timeLeft > 0 ) {
          timeLeft--;
          document.getElementById("timer").textContent = timeLeft;
      } else {
          clearInterval(countdownInterval);
          deleteText();
      }
  }, 1000);
}

function sendTypingStatus(status) {
  fetch('/typing', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
                },
    body: JSON.stringify({ status: status }),
            })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
        }

window.onload = function () {
   const textbox = document.getElementById("textbox");
   textbox.addEventListener('input', startTyping);
   textbox.addEventListener('keydown', startTyping);
   textbox.addEventListener('keyup', stopTyping);
        }