document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("firstNameCon").textContent = localStorage.getItem('first-name');
  document.getElementById("lastNameCon").textContent = localStorage.getItem('last-name');
  document.getElementById("emailCon").textContent = localStorage.getItem('email');
  document.getElementById("phoneCon").textContent = localStorage.getItem('phone');
  document.getElementById("addressCon").textContent = localStorage.getItem('address');
  document.getElementById("zipCon").textContent = localStorage.getItem('zip');
  document.getElementById("cityCon").textContent = localStorage.getItem('city');

  localStorage.clear();
});