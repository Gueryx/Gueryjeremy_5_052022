/*renvoyer les données de l'ajout d'un produit sur cette page */
let addProduct = JSON.parse(localStorage.getItem("product"));

const cartDisplay = async() => {
    if (addProduct) {
        await addProduct;
        console.log(addProduct);

        cart__items.innerHTML = addProduct.map((product) => `
        
        <article class="cart__item" data-id="${product.id}" data-color="${product.colorChoice}">
        <div class="cart__item__img">
          <img src="${product.imageUrl}" alt="Photographie d'un canapé" />
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${product.name}</h2>
            <p>${product.colorChoice}</p>
            <p>${product.price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantityChoice}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem data-id="${product.id}">Supprimer</p>
            </div>
          </div>
        </div>
      </article>
    
         `);

        // let qty = document.querySelector(".cart__price");

        // qty.querySelector("#totalQuantity").insertAdjacentHTML("afterbegin", `${product.quantityChoice}`);

    } else {
        order.addEventListener("click", () => {
            alert("Ajoutez des articles dans le panier");
        });
    };

};

cartDisplay();