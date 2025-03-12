function deleteActiveClass() {
  const activeBtns = document.getElementsByClassName('active')
  for (btn of activeBtns) {
    btn.classList.remove('active')
  }
}


function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}

function loadVideos(searchText="") {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json())
    .then((data) => {
      deleteActiveClass()
      document.getElementById('btn-all').classList.add('active')
      displayVideos(data.videos)
    });
}

function loadCategoryVideos(id) {
  const url = ` https://openapi.programming-hero.com/api/phero-tube/category/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      deleteActiveClass();

      const clickedBtn = document.getElementById(`btn-${id}`)
      clickedBtn.classList.add("active");
      
      displayVideos(data.category);
    });
}

function loadVideoDetails(videoId) {
  let url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
  //console.log(url)
  fetch(url).then((res)=>res.json()).then((data)=>displayVideoDetails(data.video))
}

function displayVideoDetails(video) {
  document.getElementById("video_details").showModal();
  const detailContainer = document.getElementById("details-container");
  detailContainer.innerHTML = `
  <h2>${video.description}</h2>
  `;

}

function displayCategories(categories) {
  console.log(categories);
  const categoryContainer = document.getElementById("category-container");
  
  for (let category of categories) {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
          <button id='btn-${category.category_id}' onclick="loadCategoryVideos(${category.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${category.category}</button>
        `;
    categoryContainer.appendChild(categoryDiv);
  }
}

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";

  if (videos.length === 0) {
    videoContainer.innerHTML = `    <div class="col-span-full flex flex-col justify-center items-center py-20 text-center">
      <img src="Icon.png" alt="" class="w-[120px]" >
      <h2 class="text-2xl font-bold ">Opps Sorry</h2>
    </div>`;
  }

  videos.forEach((video) => {
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
<div class="card bg-base-100 ">
        <figure class="relative">
          <img class ="w-full h-[150px] object-cover" src="${
            video.thumbnail
          }" alt="Shoes" />
          <span
            class="absolute bottom-2 bg-black text-white rounded text-sm px-2 right-2"
            >3hrs 56 min ago</span
          >
        </figure>
        <div class="py-5 flex gap-3 px-0">
          <div class="profil">
            <div class="avatar">
              <div
                class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2"
              >
                <img  
                  src="${video.authors[0].profile_picture}"
                />
              </div>
            </div>
          </div>
          <div class="intro">
            <h2 class="text-sm font-semibold">${video.title}</h2>
            <p class="text-gray-400 flex gap-2">
              ${video.authors[0].profile_name}
               ${
                 video.authors[0].verified == true
                   ? `<img class="w-5 h-5"
                src="https://img.icons8.com/?size=100&id=6xO3fnY41hu2&format=png&color=000000"
                alt=""
              />`
                   : ``
               }
              
            </p>
            <p class="text-gray-400 text-sm font-semibold">${
              video.others.views
            } views</p>
          </div>
          
        </div>
        <button onclick="loadVideoDetails('${
          video.video_id
        }')" class="btn btn-block">Show Details</button>
      </div>
        `;
    videoContainer.append(videoCard);
  });
};

document.getElementById("search-input").addEventListener('keyup', e => {
  let input = e.target.value
  loadVideos(input)
});

loadCategories();
