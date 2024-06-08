document.addEventListener("DOMContentLoaded", function () {
  const bubbleContainer = document.getElementById("bubbleContainer");
  const containerWidth = bubbleContainer.offsetWidth;
  const containerHeight = bubbleContainer.offsetHeight;
  const numberOfBubbles = 24; // Change this to the desired number of bubbles
  const maxAnimationDelay = 20; // Change this to control the maximum delay in seconds

  const colorOptions = ["#EAC444", "#345894", "#5CCFA5", "#CB3353", "#EC4B3A"];
  const bubbleNames = [
    { name: "Angular", size: "large" },
    { name: "Spring Boot", size: "large" },
    { name: "GraphQL", size: "large" },
    { name: "MySQL", size: "large" },
    { name: "Single-SPA", size: "medium" },
    { name: "PHP", size: "medium" },
    { name: "C", size: "small" },
    { name: "Java", size: "medium" },
    { name: "REST", size: "small" },
    { name: "JS", size: "small" },
    { name: "NodeJS", size: "medium" },
    { name: "React", size: "medium" }
  ];

  const bubbleSizes = {
    small: 70,
    medium: 100,
    large: 120
  };

  // Function to generate a random position within the specified areas
  function getRandomPositionInAreas() {
    const area1Range = { min: containerWidth * 0.005, max: containerWidth * 0.1 };
    const area2Range = { min: containerWidth * 0.75, max: containerWidth * 0.95 };
    const randomArea = Math.random() < 0.5 ? area1Range : area2Range;
    const randomXPosition = randomArea.min + Math.random() * (randomArea.max - randomArea.min);
    const randomYPosition = containerHeight;
    return { x: randomXPosition, y: randomYPosition };
}


  for (let i = 0; i < numberOfBubbles; i++) {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    // Randomly select a color from the colorOptions array
    const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    bubble.style.backgroundColor = randomColor;
    
    // Select a bubble size and corresponding name
    const nameIndex = i % bubbleNames.length;
    const bubbleName = bubbleNames[nameIndex].name;
    const bubbleSize = bubbleSizes[bubbleNames[nameIndex].size];
    bubble.style.width = `${bubbleSize}px`;
    bubble.style.height = `${bubbleSize}px`;

    // Set bubble position
    const position = getRandomPositionInAreas();
    bubble.style.left = `${(position.x / containerWidth) * 100}%`;
    bubble.style.bottom = `-${bubbleSize}px`; // Start from the bottom of the container

    bubble.style.animationDirection = 'normal'; // Always move upwards
    bubble.style.animationDelay = `${Math.random() * maxAnimationDelay}s`; // Random animation delay up to the specified maximum
    bubble.innerText = bubbleName; // This line adds the name inside the bubble

    bubbleContainer.appendChild(bubble);
  }
});



const button = document.querySelector(".button");

button.addEventListener("click", function () {
  button.classList.add("clicked");
  button.addEventListener("transitionend", function () {
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
function openPopup_chat() {
  document.getElementById('popup_chat').style.display = 'block';
}

function closePopup_chat() {
  document.getElementById('popup_chat').style.display = 'none';
}

function openPopup_sm() {
  document.getElementById('popup_sm').style.display = 'block';
}

function closePopup_sm() {
  document.getElementById('popup_sm').style.display = 'none';
}

let isOldContent = true;
let oldContent = null;
const toggleButton = document.getElementById('toggleButton');
const container = document.getElementById('default-theme-container');

toggleButton.addEventListener('click', () => {
  if (isOldContent) {
    // Save the old content
    oldContent = container.innerHTML;

    // Load new content
    fetch('spidey-index-body.html')
      .then(response => response.text())
      .then(data => {
        container.innerHTML = data; // Replace the old content with the new content
        toggleButton.textContent = 'Load Old Content';
        isOldContent = false;
      })
      .catch(error => console.error('Error loading content:', error));
  } else {
    // Restore the old content
    container.innerHTML = oldContent;
    toggleButton.textContent = 'Load New Content';
    isOldContent = true;
  }
});