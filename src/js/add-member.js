const form = document.querySelector('form');
const emailInput = document.querySelector('#email');
const nameInput = document.querySelector('#name');

form.addEventListener('submit', (e) => {
   e.preventDefault();
   let data = {
      email: emailInput.value,
      name: nameInput.value
   }
   console.table(data);
})