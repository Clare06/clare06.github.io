document.addEventListener("DOMContentLoaded", function () {
    const bubbleContainer = document.getElementById("bubbleContainer");
    const numberOfBubbles = 30; // Change this to the desired number of bubbles
    const maxAnimationDelay = 10; // Change this to control the maximum delay in seconds
  
    const colorOptions = ["#EAC444", "#345894", "#5CCFA5", "#CB3353", "#EC4B3A"];
    const bubbleNames = ["Angular", "Spring Boot", "MySQL", "PHP", "C", "Java", "REST", "JS"];


  for (let i = 0; i < numberOfBubbles; i++) {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    // Randomly select a color from the colorOptions array
    const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    bubble.style.backgroundColor = randomColor;

    // Randomly select a bubble size (height and width) from the provided options
    const bubbleSizes = [100, 120, 70];
    const randomSize = bubbleSizes[Math.floor(Math.random() * bubbleSizes.length)];
    bubble.style.width = `${randomSize}px`;
    bubble.style.height = `${randomSize}px`;

    // Randomly select the horizontal position on the left or right side
    bubble.style.left = Math.random() < 0.5 ? `${Math.random() * (100 - randomSize)}%` : `calc(100% - ${Math.random() * (100 - randomSize)}%)`;
    bubble.style.animationDelay = `${Math.random() * maxAnimationDelay}s`; // Random animation delay up to the specified maximum
    bubble.innerText = bubbleNames[i % bubbleNames.length]; // This line adds the name inside the bubble

    bubbleContainer.appendChild(bubble);
  }
 
  });

const button = document.querySelector(".button");

button.addEventListener("click", function() {
  button.classList.add("clicked");
  button.addEventListener("transitionend", function() {
    button.classList.remove("clicked");
  }, { once: true });
});
function openPopup() {
  document.getElementById('popup').style.display = 'block';
}

function closePopup() {
  document.getElementById('popup').style.display = 'none';
}
function openPopup_rbro() {
  document.getElementById('popup_rbro').style.display = 'block';
}

function closePopup_rbro() {
  document.getElementById('popup_rbro').style.display = 'none';
}
function openPopup_esp() {
  document.getElementById('popup_esp').style.display = 'block';
}

function closePopup_esp() {
  document.getElementById('popup_esp').style.display = 'none';
}

  