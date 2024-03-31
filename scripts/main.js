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

const addCartToMemory = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
}

let cart = [];
    if(localStorage.getItem("cart")){
      cart = JSON.parse(localStorage.getItem('cart'));
    }

document.addEventListener("DOMContentLoaded", function() {
  if (document.body.classList.contains('standard')) {

    const productsDOM = document.querySelector(".products-layout");
    let category = "product";

    class UI {
      displayProducts(products) {
        this.clear();
        const items = products.map((item) => {
          const col = document.createElement("div");
          col.className = "col-lg-3 col-sm-6 p-3 best";

          const card = document.createElement("div");
          card.className = "card h-100 mb-4";

          card.setAttribute("data-id", item.id); // Set the product ID as a data attribute
          card.setAttribute("data-bs-toggle", "modal");
          card.setAttribute("data-bs-target", "#productModal");
          card.onclick = () => addContentToModal(item);

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
        container.className = "container-xl p-5";

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

    const addContentToModal = (item) => {
      const modal = document.getElementById("productModal");
      if (modal) {
        localStorage.setItem("selectedProductId", item.id);
        document.querySelector(".modal-title").innerHTML = item.title;
        document.querySelector(".rounded").src = item.image;
        document.querySelector(".description").innerHTML = item.description;
        document.querySelector(".rating-count").innerHTML =
          item.rating.count + " (reviews)";
        document.querySelector(".modal-price").innerHTML = "$" + item.price;

        const stars = document.querySelector(".stars");
        stars.setAttribute("title", item.rating.rate);

        const rate = Math.round(item.rating.rate);

        const arr = Object.keys(stars.children).map((key, i) =>
          i < rate ? filledStar() : emptyStar()
        );
        stars.replaceChildren(...arr);
        var tooltip = new bootstrap.Tooltip(stars);
      }
    };

    const filledStar = () => {
      const starSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      const starPath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );

      starSvg.setAttribute("fill", "currentColor");
      starSvg.setAttribute("class", "bi bi-star-fill");
      starSvg.setAttribute("viewBox", "0 0 16 16");

      starPath.setAttribute(
        "d",
        "M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
      );

      starSvg.appendChild(starPath);

      return starSvg;
    };

    const emptyStar = () => {
      const starSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      const starPath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );

      starSvg.setAttribute("fill", "currentColor");
      starSvg.setAttribute("class", "bi bi-star");
      starSvg.setAttribute("viewBox", "0 0 16 16");

      starPath.setAttribute(
        "d",
        "M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"
      );

      starSvg.appendChild(starPath);

      return starSvg;
    };

    document.addEventListener("DOMContentLoaded", () => {
      const ui = new UI();
      const products = new Products();
      const categories = new Map([
        ["Women's Clothing", "women"],
        ["Men's Clothing", "men"],
        ["Jewellery", "jewelery"],
        ["Electronics", "electronics"],
      ]);
      let category = "product";

      products
        .getProducts(category)
        .then((products) => ui.displayProducts(products));

      let collection = document.getElementsByClassName("nav-link-secondary");
      Array.from(collection).forEach((element) => {
        element.addEventListener("click", (event) => {
          let current = document.getElementsByClassName("active");
          if (current) {
            current[0].classList.remove("active");
          }
          event.currentTarget.classList.add("active");
          category = categories.get(element.innerHTML);
          products.getProducts(category).then((products) => {
            ui.displayProducts(products);
          });
        });
      });

      document.getElementById("navbarLinks").addEventListener("click", (e) => {
        const toggle = document.getElementById("navbar-secondary");
        const collapse = new bootstrap.Collapse(toggle, {
          toggle: false,
        });
        collapse.hide();
      });
    });

    const collapseNavs = () => {
      const links = document.getElementById("navbar-collapse");
      if (links) {
        const collapseLinks = new bootstrap.Collapse(links, {
          toggle: false,
        });
        collapseLinks.hide();
      }

      const categories = document.getElementById("navbar-secondary");
      if (categories) {
        const collapseCategories = new bootstrap.Collapse(categories, {
          toggle: false,
        });
        collapseCategories.hide();
      }
    };

    document
        .getElementById("purchase-button")
        .addEventListener("click", function (event) {
          const product_Id = localStorage.getItem("selectedProductId");
          addToCart(product_Id);
        });

    const addToCart = (product_id) => {
        let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
        if(cart.length <= 0){
            cart = [{
                product_id: product_id,
                quantity: 1
            }];
        }else if(positionThisProductInCart < 0){
            cart.push({
                product_id: product_id,
                quantity: 1
            });
        }else{
            cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
        }
        addCartToMemory();
    }

    iconCart.addEventListener('click', () => {
      console.log("Cart clicked");
      window.location.href = "purchaseformBS.html";
    })

  }

  if (document.body.classList.contains('cart-and-form')) {
    const allProducts = products.getProducts();
    displayCart();

    function displayCart() {
      let cartItems = document.getElementsByClassName('cart-items')[0]
      let totalQuantity = 0;
      if(cart.length > 0){
          cart.forEach(item => {
              totalQuantity = totalQuantity + item.quantity;

              let cartRow = document.createElement('div');
              cartRow.classList.add('cart-row');
              cartRow.dataset.id = item.product_id; // ???
  
              let positionProduct = allProducts.findIndex((value) => value.id == item.product_id);
              let info = allProducts[positionProduct];
              listCartHTML.appendChild(cartRow);
              var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${info.image}" width="100" height="100">
            <span class="cart-item-title">${info.name}</span>
        </div>
        <span class="cart-price cart-column">${info.price * item.quantity}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="${item.quantity}">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
        cartRow.innerHTML = cartRowContents
        cartItems.add(cartRow);
        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
        cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
          })
      }
      iconCartSpan.innerText = totalQuantity;
  }

  function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()

    // ?????????
  
    addCartToMemory();
    updateCartTotal()
  }

    function tryPurchase() {
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
  }

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
  }

  // Och så vidare för andra sidor...
  });
