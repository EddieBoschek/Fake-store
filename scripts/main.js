const productsDOM = document.querySelector('.products-layout');

class Products {
  async getProducts() {
    try {
      const response = await fetch('https://fakestoreapi.com/products');

      if (!response.ok) {
        throw new Error('Could not fetch resource');
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
  showProducts(products) {
    let page = '';
    let result = '';
    products.forEach((item) => {
      console.log(item.image);
      result += `
        <div class="col-md-4 col-lg-3 col-xl-3 p-3 best">
          <div class="card h-100 mb-4">
            <img class="card-img-top" src=${item.image}>
            <div class="card-body border-top">
              <h5 class="card-title align-self-end">
                ${item.title}
              </h5>
              <p class="card-text align-self-end">
                ${item.price}
              </p>
            </div>
          </div>
        </div>
      `;
    });
    page = `
    <div class="container-xl p-5 my-5">
      <div class="row row-cols-1 row-cols-md-3 g-2">
        ${result}
      </div>
    </div>
    `;
    productsDOM.innerHTML = page;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const products = new Products();

  products.getProducts().then((products) => ui.showProducts(products));
});
