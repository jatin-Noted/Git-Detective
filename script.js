const modeBttn = document.querySelector("[data-modeBttn]");
const modeName = document.querySelector("[data-modeName]");
const modeIcon = document.querySelector("[data-modeIcon]");

const searchInput = document.querySelector("[data-searchInput]");
const noResult = document.querySelector("[data-noResult]");
const searchBttn = document.querySelector("[data-searchBttn]");

const profileImg = document.querySelector("[data-profileImg]");
const profileName = document.querySelector("[data-name]");
const link = document.querySelector("[data-link]");
const dateJoined = document.querySelector("[data-dateJoined]");
const profileBio = document.querySelector("[data-bio]");

const reposCount = document.querySelector("[data-reposCount]");
const followersCount = document.querySelector("[data-followersCount]");
const followingCount = document.querySelector("[data-followingCount]");

const profileLocation = document.querySelector("[data-location]");
const profileWeblink = document.querySelector("[data-weblink]");
const profileTwitterHandle = document.querySelector("[data-twitterHandle]");
const profileCompany = document.querySelector("[data-company]");

const searchbar = document.querySelector(".search-container");

const profilecontainer = document.querySelector(".git-profile-container");

const API_URL = "https://api.github.com/users/";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const root = document.documentElement.style;

// initially...
let darkMode = false;

function initially(){
    darkMode = false;
    // const preferdarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    // if (localStorage.getItem("dark-mode")){
    //     darkMode = localStorage.getItem("dark-mode");
    //     darkModeActive();
    // } 
    // else{
    //     localStorage.setItem("dark-mode", preferdarkMode);
    //     darkMode = preferdarkMode;
    //     lightModeActive();
    // }

    getUserData(API_URL + "jatin-noted");
}

initially();

function darkModeActive(){
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    // root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    modeName.innerText = "LIGHT";
    modeIcon.src = "./Assets/sun-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(100%)");
    darkMode = true;
    localStorage.setItem("dark-mode", true);
}
  function lightModeActive(){
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    // root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    modeName.innerText = "DARK";
    modeIcon.src = "./Assets/moon-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(100%)");
    darkMode = false;
    localStorage.setItem("dark-mode", false);
}

async function getUserData(url){
    try {
        const response = await fetch(url);
        const data = await response.json();

        renderProfile(data);

    } catch (error) {
        console.log("ERROR");
    }    
}

function renderProfile(data){
    if(data.message !== "Not Found"){
        noResult.style.display = "none";


        function checkNull(parameter1, parameter2){
            if(parameter1 === "" || parameter1 === null){
                // parameter2.style.opacity = 0.5;
                // parameter2.previousElementSibling.style.opacity = 0.5;
                return false;
            } 
            else{
                return true;
            }
        }


        profileImg.src = `${data.avatar_url}`;

        profileName.innerText = data.name === null ? data.login : data.name;

        link.innerText = `@${data.login}`;


        link.href = `${data.html_url}`;

        datesegments = data.created_at.split("T").shift().split("-");

        dateJoined.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;

        profileBio.innerText = data.bio == null ? "This profile has no bio" : `${data.bio}`;

        reposCount.innerText = `${data.public_repos}`;

        followersCount.innerText = `${data.followers}`;

        followingCount.innerText = `${data.following}`;

        profileLocation.innerText = checkNull(data.location, profileLocation) ? data.location : "Not Available";

        profileWeblink.innerText = checkNull(data.blog, profileWeblink) ? data.blog : "Not Available";

        profileWeblink.href = checkNull(data.blog, profileWeblink) ? data.blog : "#";

        profileTwitterHandle.innerText = checkNull(data.twitter_username, profileTwitterHandle) ? data.twitter_username : "Not Available";

        profileTwitterHandle.href = checkNull(data.twitter_username, profileTwitterHandle) ? `https://twitter.com/${data.twitter_username}` : "#";

        profileCompany.innerText = checkNull(data.company, profileCompany) ? profileCompany.company : "Not Available";

        // searchbar.classList.toggle("active");

        // profilecontainer.classList.toggle("active");

    }

    else{
        noResult.style.display = "block";
    }
}

modeBttn.addEventListener('click', function () {
    if(darkMode == false){
        darkModeActive();
    }
    else{
        lightModeActive();
    }
});

searchInput.addEventListener("click", function(){
    noResult.style.display = "none";
});

searchInput.addEventListener("keydown", function (e) {
    if (e.key == "Enter"){
        if (searchInput.value !== "") {
            getUserData(API_URL + searchInput.value);
        }
    }
});

searchBttn.addEventListener("click", function () {
    if(searchInput.value !== ""){
        getUserData(API_URL + input.value);
    }
});
