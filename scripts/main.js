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
  displayProducts(products) {
    const items = products.map((item) => {
      const col = document.createElement('div');
      col.className = 'col-md-4 col-lg-3 col-xl-3 p-3 best';

      const card = document.createElement('div');
      card.className = 'card h-100 mb-4';

      const img = document.createElement('img');
      img.className = 'card-img-top';
      img.src = item.image;

      const cardBody = document.createElement('div');
      cardBody.className = 'card-body border-top';

      const title = document.createElement('h5');
      title.className = 'card-title align-self-end';
      title.innerHTML = item.title;

      const price = document.createElement('p');
      price.className = 'card-text align-self-end';
      price.innerHTML = '$' + item.price;

      cardBody.appendChild(title);
      cardBody.appendChild(price);
      card.appendChild(img);
      card.appendChild(cardBody);
      col.appendChild(card);
      return col;
    });

    const container = document.createElement('div');
    container.className = 'container-xl p-5 my-5';

    const row = document.createElement('div');
    row.className = 'row row-cols-1 row-cols-md-3 g-2';

    items.forEach((item) => {
      row.appendChild(item);
    });
    container.appendChild(row);
    document.querySelector('.products-layout').appendChild(container);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const products = new Products();

  products.getProducts().then((products) => ui.displayProducts(products));
});
