function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}

function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos));
}

function displayCategories(categories) {
  console.log(categories);
  const categoryContainer = document.getElementById("category-container");

  for (let category of categories) {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
          <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${category.category}</button>
        `;
    categoryContainer.appendChild(categoryDiv);
  }
}

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");
  videos.forEach((video) => {
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
<div class="card bg-base-100 shadow-sm">
        <figure class="relative">
          <img class ="w-full h-[150px] object-cover" src="${video.thumbnail}" alt="Shoes" />
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
              ${video.authors[0].profile_name
              }
              <img class="w-5 h-5"
                src="https://img.icons8.com/?size=100&id=6xO3fnY41hu2&format=png&color=000000"
                alt=""
              />
            </p>
            <p class="text-gray-400 text-sm font-semibold">91K views</p>
          </div>
          
        </div>
      </div>
        `;
    videoContainer.append(videoCard);
  });
};

loadCategories();
loadVideos();
