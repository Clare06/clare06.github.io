document.addEventListener("DOMContentLoaded", function () {
  // Load Content from JSON
  fetch('data/content.json')
    .then(response => response.json())
    .then(data => {
        const bioText = document.getElementById('bio-text');
        if (bioText) {
            bioText.innerText = data.bio;
        }
    })
    .catch(error => console.error('Error loading content:', error));

  const bubbleContainer = document.getElementById("bubbleContainer");
  const containerWidth = bubbleContainer.offsetWidth;
  const containerHeight = bubbleContainer.offsetHeight;
  const numberOfBubbles = 24;
  const maxAnimationDelay = 30;

  const colorOptions = ["#EAC444", "#345894", "#5CCFA5", "#CB3353", "#EC4B3A"];
  const bubbleNames = [
    { name: "Angular", size: "large" },
    { name: "Spring Boot", size: "large" },
    { name: "GraphQL", size: "medium" },
    { name: "MySQL", size: "medium" },
    { name: "Ionic", size: "medium" },
    { name: "React", size: "large" },
    { name: "NodeJS", size: "large" },
    { name: "PostgreSQL", size: "medium" },
    { name: "Single-SPA", size: "medium" },
    { name: "AWS", size: "medium" },
    { name: "Docker", size: "small" },
    { name: "Jenkins", size: "small" },
    { name: "PHP", size: "small" },
    { name: "C", size: "small" },
    { name: "Java", size: "medium" },
    { name: "REST", size: "small" },
    { name: "JS", size: "small" },
    { name: "Prisma", size: "small" },
    { name: "Serenity", size: "small" }
  ];

  const bubbleSizes = {
    small: 70,
    medium: 100,
    large: 120
  };

  function getRandomPositionInAreas() {
    const area1Range = { min: containerWidth * 0.005, max: containerWidth * 0.1 };
    const area2Range = { min: containerWidth * 0.8, max: containerWidth * 0.95 };
    const randomArea = Math.random() < 0.5 ? area1Range : area2Range;
    const randomXPosition = randomArea.min + Math.random() * (randomArea.max - randomArea.min);
    const randomYPosition = containerHeight;
    return { x: randomXPosition, y: randomYPosition };
}


  for (let i = 0; i < numberOfBubbles; i++) {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    bubble.style.backgroundColor = randomColor;
    
    const nameIndex = i % bubbleNames.length;
    const bubbleName = bubbleNames[nameIndex].name;
    const bubbleSize = bubbleSizes[bubbleNames[nameIndex].size];
    bubble.style.width = `${bubbleSize}px`;
    bubble.style.height = `${bubbleSize}px`;

    const position = getRandomPositionInAreas();
    bubble.style.left = `${(position.x / containerWidth) * 100}%`;
    bubble.style.bottom = `-${bubbleSize}px`;

    bubble.style.animationDirection = 'normal';
    bubble.style.animationDelay = `${Math.random() * maxAnimationDelay}s`;
    bubble.innerText = bubbleName;

    bubbleContainer.appendChild(bubble);
  }
});

// Mobile Menu Toggle
function toggleMenu() {
  const menu = document.querySelector('.dropdown-content');
  menu.classList.toggle('active');
}

// Ensure button click triggers it
const dropBtn = document.querySelector('.dropbtn');
if(dropBtn) {
    dropBtn.addEventListener('click', toggleMenu);
}


const button = document.querySelector(".button");

button.addEventListener("click", function () {
  button.classList.add("clicked");
  button.addEventListener("transitionend", function () {
    button.classList.remove("clicked");
  }, { once: true });
});

// Presentation Toggle Function
function togglePresentations(element) {
    const list = element.nextElementSibling;
    const icon = element.querySelector('i');

    element.classList.toggle('active');

    if (list.style.display === "none") {
        list.style.display = "block";
        list.style.animation = "fadeIn 0.3s ease";
    } else {
        list.style.display = "none";
    }
}


// Popup Functions
function openPopup() { document.getElementById('popup').style.display = 'block'; }
function closePopup() { document.getElementById('popup').style.display = 'none'; }
function openPopup_rbro() { document.getElementById('popup_rbro').style.display = 'block'; }
function closePopup_rbro() { document.getElementById('popup_rbro').style.display = 'none'; }
function openPopup_esp() { document.getElementById('popup_esp').style.display = 'block'; }
function closePopup_esp() { document.getElementById('popup_esp').style.display = 'none'; }
function openPopup_chat() { document.getElementById('popup_chat').style.display = 'block'; }
function closePopup_chat() { document.getElementById('popup_chat').style.display = 'none'; }
function openPopup_sm() { document.getElementById('popup_sm').style.display = 'block'; }
function closePopup_sm() { document.getElementById('popup_sm').style.display = 'none'; }
function openPopup_park() { document.getElementById('popup_park').style.display = 'block'; }
function closePopup_park() { document.getElementById('popup_park').style.display = 'none'; }
function openPopup_travel() { document.getElementById('popup_travel').style.display = 'block'; }
function closePopup_travel() { document.getElementById('popup_travel').style.display = 'none'; }
function openPopup_test() { document.getElementById('popup_test').style.display = 'block'; }
function closePopup_test() { document.getElementById('popup_test').style.display = 'none'; }

// Legacy Toggle (if still used)
let isOldContent = true;
let oldContent = null;
const toggleButton = document.getElementById('toggleButton');
const container = document.getElementById('default-theme-container');
const spiderWebButton = document.querySelector('.spider-web-button');

if(toggleButton) {
  toggleButton.addEventListener('click', () => {
      container.classList.add('hidden');
      setTimeout(() => {
          if (isOldContent) {
              oldContent = container.innerHTML;
              fetch('spidey-index-body.html')
                  .then(response => response.text())
                  .then(data => {
                      container.innerHTML = data;
                      spiderWebButton.style.backgroundImage = 'url("/images/back.png")';
                      spiderWebButton.style.backgroundColor = '#F6E0E9';
                      isOldContent = false;
                      container.classList.remove('hidden');
                  })
                  .catch(error => console.error('Error loading content:', error));
          } else {
              container.innerHTML = oldContent;
              spiderWebButton.style.backgroundImage = 'url("/images/1337090.jpeg")';
              isOldContent = true;
              container.classList.remove('hidden');
          }
      }, 250);
  });
}
