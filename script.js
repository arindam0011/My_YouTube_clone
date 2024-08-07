const containtContainer = document.querySelector("#containt-container");
let api_key = "AIzaSyDhDqHV4S-ZGyWHruTwpmCcOuPUBzPE07g";
let video_HTTP = "https://www.googleapis.com/youtube/v3/videos"
let chanels_HTTP = "https://www.googleapis.com/youtube/v3/channels"
let Params = new URLSearchParams({
    part: "snippet, contentDetails, statistics, player",
    chart: 'mostPopular',
    key: api_key,
    maxResults: '100',
    regionCode: 'IN'
})


async function GetVideoData() {
    try {
        let response = await fetch(`${video_HTTP}?${Params}`);;
        let data = await response.json();
        return data;
    }
    catch (error) {
        console.log(error);
    }
}


GetVideoData()
    .then(data => {
        data.items.forEach(item => {
            getChannelData(item);
        })
    })
    .catch(error => console.log(error));


function getChannelData(item) {
    let viwes = item.statistics.viewCount;
    let timeAgoUpload = item.snippet.publishedAt;

    let date = new Date(timeAgoUpload);
    let uploadYear = date.getFullYear();
    let uploadMonth = date.getMonth();
    let UploadDay = date.getDay();
    let uploadHour = date.getHours();
    let uploadMinutes = date.getMinutes();
    let uploadSeconds = date.getSeconds();

    let currentDay = new Date();
    let presentYear = currentDay.getFullYear();
    let presentMonth = currentDay.getMonth();
    let presentDay = currentDay.getDay();
    let presentHour = currentDay.getHours();
    let presentMinutes = currentDay.getMinutes();
    let presentSeconds = currentDay.getSeconds();



    if (uploadYear == presentYear &&
        uploadMonth == presentMonth &&
        UploadDay == presentDay) {

        if (uploadHour != presentHour) {
            timeAgoUpload = presentHour - uploadHour + "hours ago";
        }
        else if (uploadMinutes != presentMinutes) {
            timeAgoUpload = presentMinutes - uploadMinutes + "minutes ago";
        }
        else if (uploadSeconds != presentSeconds) {
            timeAgoUpload = presentSeconds - uploadSeconds + "seconds ago";
        }
    }
    else if (uploadYear != presentYear) {

        let time = Math.max(presentDay, UploadDay) - Math.min(presentDay, UploadDay);
        timeAgoUpload = time + "Years ago";
    }
    else if (uploadMonth != presentMonth) {
        let time = Math.max(presentDay, UploadDay) - Math.min(presentDay, UploadDay);
        timeAgoUpload = time + "Months ago";
    }
    else if (UploadDay != presentDay) {
        let time = Math.max(presentDay, UploadDay) - Math.min(presentDay, UploadDay);
        timeAgoUpload = time + "Days ago";
    }


    if (viwes > 1000000000) {
        viwes = (viwes / 1000000000).toFixed(1) + "B";
    }
    else if (viwes > 1000000) {
        viwes = (viwes / 1000000).toFixed(1) + "M";
    }
    else if (viwes > 1000 && viwes < 1000000) {
        viwes = (viwes / 1000).toFixed(2) + "K";
    }
    else if (viwes > 1000) {
        viwes = (viwes / 1000).toFixed(1) + "K";
    }




    let params2 = new URLSearchParams({
        part: "snippet",
        key: api_key,
        id: item.snippet.channelId
    })


    fetch(`${chanels_HTTP}?${params2}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            item.channelThubnail = data.items[0].snippet.thumbnails.default.url;
            let videoCard = document.createElement("div");

            videoCard.classList.add("video-card");
            videoCard.innerHTML =
                `
                            <div class="video-img-container">
                                <img src="${item.snippet.thumbnails.high.url}" alt="video" class="video-img">
                            </div>
                            <div class="icon-details">
                                <div class="ch-icon-container">
                                <img src="${item.channelThubnail}" alt="channel" class="ch-icon">
                                </div>
                                <div class="v-title">
                                <p class="video-name">${item.snippet.title}</p>
                                </div>
                                <i class="video-option fa-solid fa-ellipsis-vertical"></i>
                            </div>
                            <div class="video-chname-view-time">
                                <div class="ch-name">
                                <p class="ch-name-text">${item.snippet.channelTitle}</p>
                                </div>
                                <div class="views">
                                <span class="views-text">${viwes}</span>
                                <span class="dot">•</span>
                                <span class="time">${timeAgoUpload}</span></span>
                                </div>
                            </div>
                            `
            videoCard.addEventListener("click", () => {
                let embededVideo = item.player.embedHtml;
                sessionStorage.setItem("video", embededVideo);
                window.location = "video.html";

            })
            containtContainer.append(videoCard)
        })
        .catch(error => console.log(error));
}

let manue = document.getElementById("manue");
let nav = document.getElementById("nav");
manue.addEventListener("click", () => {
    if(window.innerWidth <=600){
         if (nav.style.display == "none") {
        nav.style.display = "block";
    }
    else {
        nav.style.display = "none";
    }
    }
   
})