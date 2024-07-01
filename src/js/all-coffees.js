const featuredContainer = document.querySelector("#featured-container");
const filter_buttons = document.querySelectorAll("#filter li");

let AllCoffees = [];

window.addEventListener("DOMContentLoaded", () => {
  featuredContainer.innerHTML = `<div class="flex w-52 flex-col gap-4">
  <div class="skeleton h-32 w-full"></div>
  <div class="skeleton h-4 w-28"></div>
  <div class="skeleton h-4 w-full"></div>
  <div class="skeleton h-4 w-full"></div>
</div>`;
  getAllCoffees();
});


// get data from api
async function getAllCoffees() {
  const hotRes = await fetch("https://api.sampleapis.com/coffee/hot");
  const icedRes = await fetch("https://api.sampleapis.com/coffee/iced");

  const data1 = await hotRes.json();
  const data2 = await icedRes.json();
  const HotCoffees = data1.map((coffee) => {
    return { ...coffee, type: "hot" };
  });
  const IcedCoffees = data2.map((coffee) => {
    return { ...coffee, type: "iced" };
  });

  featuredContainer.innerHTML = "";
  AllCoffees = [...IcedCoffees, ...HotCoffees];
  AllCoffees.forEach((coffee) => {
    addCard(coffee);
  });

  // filter coffee cards
  filter_buttons.forEach((element) => {
    element.addEventListener("click", (e) => {
      console.log(e.target.innerText)

      let filterCoffee = AllCoffees.filter((element) => {
        if(e.target.innerText.toLowerCase() === 'all') {
          return true;
        }
        return element.type == e.target.innerText.toLowerCase();
      });
      featuredContainer.innerHTML = "";

      filterCoffee.forEach((element) => {
        console.log(element.type);
        
        addCard(element);
      });
    });
  });
}

// Add cards to the container
async function addCard(item) {
  let articleElement = document.createElement("article");
  articleElement.classList.add("featured-card");
  articleElement.innerHTML = `
                 <figure
                   class="w-full h-[280px] overflow-hidden flex justify-center items-center">
                   <img
                     class="object-contain"
                     src=${item.image}
                     alt="${item.title}"
                     loading="lazy" />
                 </figure>
                 <div class="card-body">
                   <h2 class="card-title">
                     ${item.title}
                     <div class="badge ${
                       item.type == "hot" ? "badge-secondary" : "badge-primary"
                     }">${item.type}</div>
                   </h2>
                   <p class="overflow-hidden text-ellipsis text-nowrap">
                     ${item.description}
                   </p>
                   <div class="card-actions justify-start">
                     <div class="badge badge-outline">${
                       item.ingredients[0]
                     }</div>
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
  featuredContainer.appendChild(articleElement);
}
