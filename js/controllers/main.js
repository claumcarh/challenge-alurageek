import { servicesProducts } from "../services/product-services.js";

const cardSection = document.getElementById('card-section');

function createCard(id, nombre, precio, imagen, productsContainer) {
  const card = document.createElement('li');
  card.classList.add('card');

  card.innerHTML = `
  <img
    class="card__image"
    src="${imagen.src}"
    alt="${imagen.alt}"
  />
  <h3 class="card__title">${nombre}</h3>
  <div class="card__row">
    <p class="card__precio">${precio}</p>
    <button
      class="card__delete"
      data-id="${id}"
    >
      <img
        class="card__vector"
        src="./img/Vector.png"
        alt="vector"
      />
    </button>
  </div>
   `;

   productsContainer.appendChild(card);
   return card;
}

const render = async () => {
  try {
    const listProducts = await servicesProducts.productList();

    let productsContainer;
    listProducts.forEach((product, index) => {
      if (index === 0 || index % 3 === 0) {
        productsContainer = document.createElement('ul');
        productsContainer.classList.add('ul__cards');
        cardSection.appendChild(productsContainer);
      }

      productsContainer.appendChild(
          createCard(product.id, product.nombre, product.precio, product.imagen, productsContainer)
      );
    });

  } catch (error) {
    console.log("error");
  }
};

render();
