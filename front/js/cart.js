// Renvoyer les données de l'ajout d'un produit sur cette page
let finalProduct = JSON.parse(localStorage.getItem("product"));

if (!finalProduct) {
    // Ajout d'un h1 si le panier est vide ("Votre panier est vide !!!")
    const titleCart = document.querySelector("h1");
    const sectionCart = document.querySelector(".cart");

    titleCart.innerHTML = "Votre panier est vide !!!";
    // On affiche pas la sectionCart si il y a pas de produit dans le panier
    sectionCart.style.display = "none";

} else {

    for (let i = 0; i < finalProduct.length; i++) {

        const parent = document.createElement('article');

        parent.innerHTML = `
        <article class="cart__item" data-id="${finalProduct[i]._id}" data-color="${finalProduct[i].colorChoice}">
                <div class="cart__item__img">
                  <img src="${finalProduct[i].imageUrl}" alt="${finalProduct[i].altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${finalProduct[i].name}</h2>
                    <p>${finalProduct[i].colorChoice}</p>
                    <p>${finalProduct[i].price * finalProduct[i].quantityChoice + " €"}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${finalProduct[i].quantityChoice}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
        `;

        document.getElementById('cart__items').appendChild(parent);

        // Supprimer un article
        let productSupprimer = parent.querySelector(".deleteItem");

        productSupprimer.addEventListener("click", (e) => {
            e.preventDefault;

            // Enregistrer l'id et la couleur séléctionnés par le bouton supprimer
            let deleteId = finalProduct[i]._id;
            let deleteColor = finalProduct[i].colorChoice;

            // Filtrer l'élément cliqué par le bouton supprimer
            finalProduct = finalProduct.filter(elt => elt._id !== deleteId || elt.colorChoice !== deleteColor);

            // Envoyer les nouvelles données dans le localStorage
            localStorage.setItem('product', JSON.stringify(finalProduct));

            // Avertir de la suppression et recharger la page
            alert('Le produit à bien été supprimé, veuillez appuyer sur ok pour continuer.');

            // Si pas de produits dans le local storage on affiche que le panier est vide
            if (finalProduct.length === 0) {
                localStorage.clear();
            }
            // Actualisation rapide de la page
            location.reload();
        });
    }




    // Insertion quantitée finaux
    let quantityTotalCalcul = [];
    // Aller chercher les quantitées dans le panier
    for (let q = 0; q < finalProduct.length; q++) {
        let quantityTotalCart = finalProduct[q].quantityChoice;
        quantityTotalCalcul.push(quantityTotalCart);
    }
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const quantityTotal = quantityTotalCalcul.reduce(reducer);
    console.log(quantityTotal);
    let finalQuantityChoice = document.querySelector("#totalQuantity");
    finalQuantityChoice.innerHTML = quantityTotal;

    // Insertion prix finaux 
    let priceTotalCalcul = [];
    // Aller chercher les quantitées dans le panier
    for (let p = 0; p < finalProduct.length; p++) {
        let priceTotalCart = finalProduct[p].price * finalProduct[p].quantityChoice;
        priceTotalCalcul.push(priceTotalCart);
    }
    const priceTotal = priceTotalCalcul.reduce(reducer);
    console.log(priceTotal);
    let finalPriceChoice = document.querySelector("#totalPrice");
    finalPriceChoice.innerHTML = priceTotal;
}

//-----------------------------------------------------------------------Formulaire avec regex

function getForm() {
    // Ajout des Regex
    let form = document.querySelector(".cart__order__form");

    // Création des expressions régulières
    let emailRegExp = new RegExp('^[\w.-_]+[@]{1}[\w.-_]+[.]{1}[a-z]{2,5}$');
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("\b\d{1,8}(-)?[a-z]?\W[a-z|\W|\.]{1,}\W(route|rue|bis|drive|avenue|rdc|boulevard|circle|street|lane|way|rd\.|st\.|dr\.|ave\.|blvd\.|cir\.|ln\.|rd|dr|ave|blvd|cir|ln)");

    // Prénom
    form.firstName.addEventListener('change', function() {
        validFirstName(this);
    });

    // Nom
    form.lastName.addEventListener('change', function() {
        validLastName(this);
    });

    // Adresse
    form.address.addEventListener('change', function() {
        validAddress(this);
    });

    // Ville
    form.city.addEventListener('change', function() {
        validCity(this);
    });

    // Mail
    form.email.addEventListener('change', function() {
        validEmail(this);
    });

    // Validation du prénom
    const validFirstName = function(inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (charRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    // Validation du nom
    const validLastName = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    // Validation de l'adresse
    const validAddress = function(inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    // Validation de la ville
    const validCity = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    // Validation de l'email
    const validEmail = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
        }
    };
}
getForm();