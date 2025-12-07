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

// Spidey Theme Toggle Logic
const spideyToggle = document.getElementById('spidey-toggle');
const transitionOverlay = document.getElementById('transition-overlay');
const glitchText = transitionOverlay.querySelector('.glitch-text');
const mainContainer = document.getElementById('default-theme-container');
let isSpideyMode = false;
let professionalContent = null;

if (spideyToggle) {
    spideyToggle.addEventListener('click', triggerSpideyTransition);
}

function triggerSpideyTransition() {
    // Show Overlay
    transitionOverlay.classList.add('active');

    // Determine text based on current state (before toggle)
    if (!isSpideyMode) {
        glitchText.innerText = "Deactivating Professional Protocol...";
        glitchText.setAttribute('data-text', "Deactivating Professional Protocol...");

        // Wait then change text to "Initiating Leap of Faith"
        setTimeout(() => {
            glitchText.innerText = "Initiating Leap of Faith...";
            glitchText.setAttribute('data-text', "Initiating Leap of Faith...");
        }, 1000);
    } else {
        glitchText.innerText = "Rebooting Professional Systems...";
        glitchText.setAttribute('data-text', "Rebooting Professional Systems...");
    }

    // After animation delay, swap content
    setTimeout(() => {
        toggleSpideyTheme();

        // Hide Overlay
        setTimeout(() => {
            transitionOverlay.classList.remove('active');
        }, 500);
    }, 2000);
}

function toggleSpideyTheme() {
    if (!isSpideyMode) {
        // Switch TO Spidey Mode
        if (!professionalContent) {
            professionalContent = mainContainer.innerHTML;
        }

        fetch('spidey-index-body.html')
            .then(response => response.text())
            .then(data => {
                mainContainer.innerHTML = data;
                document.body.classList.add('spidey-mode');
                spideyToggle.querySelector('i').className = "fas fa-user-tie"; // Change icon to tie
                isSpideyMode = true;
            })
            .catch(error => {
                console.error('Error loading Spidey content:', error);
                // Fallback if fetch fails
                transitionOverlay.classList.remove('active');
            });

    } else {
        // Switch BACK to Professional Mode
        if (professionalContent) {
            mainContainer.innerHTML = professionalContent;
            document.body.classList.remove('spidey-mode');
            spideyToggle.querySelector('i').className = "fas fa-spider"; // Change icon back to spider
            isSpideyMode = false;

            // Re-initialize scripts if needed (e.g. bubbles)
            // Ideally, we should modularize the init code, but for now a simple reload might be safer or just basic restoration
             window.location.reload(); // Reloading is cleaner to restore all listeners
        }
    }
}

// Spidey Mobile Menu Logic
function toggleSpideyMenu() {
    const menu = document.getElementById('spidey-menu');
    if (menu) {
        menu.classList.toggle('active');
    }
}
