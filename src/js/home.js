const featuredContainer = document.querySelector("#featured-container");
const favContainer = document.querySelector("#fav-container");
console.log(favContainer);

let coffees = [];

window.addEventListener("DOMContentLoaded", () => {
  featuredContainer.innerHTML = `<div class="flex w-52 flex-col gap-4">
  <div class="skeleton h-32 w-full"></div>
  <div class="skeleton h-4 w-28"></div>
  <div class="skeleton h-4 w-full"></div>
  <div class="skeleton h-4 w-full"></div>
</div>`;
  getHotCoffees(5, 3);
});

// get data from api
async function getHotCoffees(sliceCount, sliceCount2) {
  const res = await fetch("https://api.sampleapis.com/coffee/hot");
  const data = await res.json();
  featuredContainer.innerHTML = "";
  coffees = data;
  coffees.slice(0, sliceCount).forEach((coffee) => {
    addCard(coffee,featuredContainer);
  });
  coffees.reverse().slice(0, sliceCount2).forEach((coffee) => {
    addCard(coffee,favContainer);
  });
}

async function addCard(item, cardContaier) {
  let articleElement = document.createElement("article");
  articleElement.classList.add("featured-card");
  articleElement.innerHTML = `
                 <figure
                   class="w-full h-[280px] overflow-hidden flex justify-center items-center">
                   <img
                     class="object-contain"
                     src=${item.image}
                     alt="Shoes" />
                 </figure>
                 <div class="card-body">
                   <h2 class="card-title">
                     ${item.title}
                     ${cardContaier == featuredContainer? '<div class="badge badge-secondary">NEW</div>': ''}       
                   </h2>
                   <p class="overflow-hidden text-ellipsis text-nowrap">
                     ${item.description}
                   </p>
                   
                   <div class="card-actions justify-start">
                     <div class="badge badge-outline">${item.ingredients[0]}</div>
                   </div>

                   <div class="rating rating-sm">
                    <input type="radio" name="rating-6" class="mask mask-star-2 bg-orange-400" />
                    <input
                      type="radio"
                      name="rating-6"
                      class="mask mask-star-2 bg-orange-400"
                      checked="checked" />
                    <input type="radio" name="rating-6" class="mask mask-star-2 bg-orange-400" />
                    <input type="radio" name="rating-6" class="mask mask-star-2 bg-orange-400" />
                    <input type="radio" name="rating-6" class="mask mask-star-2 bg-orange-400" />
                  </div>
                 </div>`;
  cardContaier.appendChild(articleElement);
}
