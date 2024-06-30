const form = document.querySelector("form");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#job");
const submitButton = document.querySelector("#submit");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  submitButton.style.cursor = "wait";
  submitButton.innerHTML = "loading";
  let data = {
    name: nameInput.value,
    job: jobInput.value,
  };
  let res = await fetch("https://reqres.in/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  console.table(res);
  if (res.ok) {
    submitButton.style.cursor = "pointer";
    submitButton.innerHTML = "Add Member";
    alert("Success");
  } else {
    submitButton.style.cursor = "pointer";
    submitButton.innerHTML = "Add Member";
    alert("Error");
  }
});
