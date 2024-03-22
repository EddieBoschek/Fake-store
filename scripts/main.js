const productsDOM = document.querySelector(".products-layout");
let category = "product";

class Products {
  async getProducts(category) {
    try {
      let response;
      switch (category) {
        case "women":
          response = await fetch(
            "https://fakestoreapi.com/products/category/women's%20clothing"
          );
          break;
        case "men":
          response = await fetch(
            "https://fakestoreapi.com/products/category/men's%20clothing"
          );
          break;
        case "jewelery":
          response = await fetch(
            "https://fakestoreapi.com/products/category/jewelery"
          );
          break;
        case "electronics":
          response = await fetch(
            "https://fakestoreapi.com/products/category/electronics"
          );
          break;

        default:
          response = await fetch("https://fakestoreapi.com/products");
          break;
      }

      if (!response.ok) {
        throw new Error("Could not fetch resource");
      }

      const data = await response.json();

      let products = data.map((item) => {
        const { id, title, description, price, category, image } = item;
        const rating = { rate: item.rating.rate, count: item.rating.count };
        return { id, title, description, price, category, image, rating };
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

class UI {
  displayProducts(products) {
    this.clear();
    const items = products.map((item) => {
      const col = document.createElement("div");
      col.className = "col-md-4 col-lg-3 col-xl-3 p-3 best";

      const card = document.createElement("div");
      card.className = "card h-100 mb-4";

      const img = document.createElement("img");
      img.className = "card-img-top";
      img.src = item.image;

      const cardBody = document.createElement("div");
      cardBody.className = "card-body border-top";

      const title = document.createElement("h5");
      title.className = "card-title align-self-end";
      title.innerHTML = item.title;

      const price = document.createElement("p");
      price.className = "card-text align-self-end";
      price.innerHTML = "$" + item.price;

      cardBody.appendChild(title);
      cardBody.appendChild(price);
      card.appendChild(img);
      card.appendChild(cardBody);
      col.appendChild(card);
      return col;
    });

    const container = document.createElement("div");
    container.className = "container-xl p-5 my-5";

    const row = document.createElement("div");
    row.className = "row row-cols-1 row-cols-md-3 g-2";

    items.forEach((item) => {
      row.appendChild(item);
    });
    container.appendChild(row);
    document.querySelector(".products-layout").appendChild(container);
  }

  clear() {
    const container = document.querySelector(".products-layout");
    if (container) {
      container.innerHTML = "";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();
  let category = "product";

  products
    .getProducts(category)
    .then((products) => ui.displayProducts(products));

  document
    .getElementById("m-clothing")
    .addEventListener("click", function (event) {
      category = "men";
      products.getProducts(category).then((products) => {
        ui.displayProducts(products);
      });
    });

  document
    .getElementById("w-clothing")
    .addEventListener("click", function (event) {
      category = "women";
      products.getProducts(category).then((products) => {
        ui.displayProducts(products);
      });
    });

  document
    .getElementById("jewelery")
    .addEventListener("click", function (event) {
      category = "jewelery";
      products.getProducts(category).then((products) => {
        ui.displayProducts(products);
      });
    });

  document
    .getElementById("electronics")
    .addEventListener("click", function (event) {
      category = "electronics";
      products.getProducts(category).then((products) => {
        ui.displayProducts(products);
      });
    });
});

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  let firstName = document.getElementById("fname").value;
  let lastName = document.getElementById("lname").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;
  let zip = document.getElementById("zip").value;
  let city = document.getElementById("city").value;

  resetErrors();

  let isValid = true;
  if (!validInputSize(firstName)) {
    document.getElementById("fnameError").innerText =
      "Input must be between 2 and 50 characters long.";
    isValid = false;
  }
  if (!validInputSize(lastName)) {
    document.getElementById("lnameError").innerText =
      "Input must be between 2 and 50 characters long.";
    isValid = false;
  }
  if (!validEmail(email)) {
    document.getElementById("emailError").innerText =
      "Please enter a valid email.";
    isValid = false;
  }
  if (!validPhoneNumber(phone)) {
    document.getElementById("phoneError").innerText =
      "Please enter a valid phone number.";
    isValid = false;
  }
  if (!validInputSize(address)) {
    document.getElementById("addressError").innerText =
      "Input must be between 2 and 50 characters long.";
    isValid = false;
  }
  if (!validZip(zip)) {
    document.getElementById("zipError").innerText =
      "Please enter a valid ZIP code.";
    isValid = false;
  }
  if (!validInputSize(city)) {
    document.getElementById("cityError").innerText =
      "Input must be between 2 and 50 characters long.";
    isValid = false;
  }
  if (isValid) {
    localStorage.setItem("first-name", firstName);
    localStorage.setItem("last-name", lastName);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
    localStorage.setItem("address", address);
    localStorage.setItem("zip", zip);
    localStorage.setItem("city", city);

    window.location.href = "confirmation.html";
  }
});

function validInputSize(input) {
  return /^.{2,50}$/.test(input);
}
function validEmail(input) {
  return /^(?=.{1,50}$)[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
}
function validZip(input) {
  return /^\d{3}\s*\d{2}$/.test(input);
}
function validPhoneNumber(input) {
  return /^07[0236]-?\d{7}$/.test(input);
}

function resetErrors() {
  document.getElementById("fnameError").innerHTML = "&nbsp;";
  document.getElementById("lnameError").innerHTML = "&nbsp;";
  document.getElementById("emailError").innerHTML = "&nbsp;";
  document.getElementById("phoneError").innerHTML = "&nbsp;";
  document.getElementById("addressError").innerHTML = "&nbsp;";
  document.getElementById("zipError").innerHTML = "&nbsp;";
  document.getElementById("cityError").innerHTML = "&nbsp;";
}
