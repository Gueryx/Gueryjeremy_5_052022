// Renvoyer les données de l'ajout d'un produit sur cette page
let finalProduct = JSON.parse(localStorage.getItem("product"));

// L'opérateur logique NON (!...), amène le vrai au faux
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

        //------------------------------------------------------------------------------------------ Supprimer un article
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

            // Si pas de produits dans le localStorage, on affiche que le panier est vide
            if (finalProduct.length === 0) {
                localStorage.clear();
            }
            // Actualisation rapide de la page
            location.reload();
        });

        // ------------------------------------------------------------------------------------- Modification de la quantité d'un produit
        let productModif = parent.querySelector(".itemQuantity");

        productModif.addEventListener("change", (m) => {
            m.preventDefault;

            // Enregistrer l'id et la couleur séléctionnés pour les modifs
            let modifId = finalProduct[i]._id;
            let modifColor = finalProduct[i].colorChoice;

            // Filtrer l'élément modifié Qty
            finalProduct = finalProduct.find(mlt => mlt._id !== modifId || mlt.colorChoice !== modifColor);

            // Envoyer les nouvelles données dans le localStorage 
            localStorage.setItem('product', JSON.stringify(finalProduct));

            // Avertir de la modification et recharger la page
            alert('La quantité à bien été modifiée, veuillez appuyer sur ok pour continuer.');

            //Actualisation de la page 
            location.reload();
        });

        // -------------------------------------------------------------------------------- Insertion quantitée finaux
        let quantityTotalCalcul = [];
        // Aller chercher les quantitées dans le panier
        for (let q = 0; q < finalProduct.length; q++) {
            let quantityTotalCart = finalProduct[q].quantityChoice;
            quantityTotalCalcul.push(quantityTotalCart);
        }
        const reducerQuantity = (accumulator, currentValue) => accumulator + currentValue;
        const quantityTotal = quantityTotalCalcul.reduce(reducerQuantity);
        let finalQuantityChoice = document.querySelector("#totalQuantity");
        finalQuantityChoice.innerHTML = quantityTotal;

        // -------------------------------------------------------------------------------------- Insertion prix finaux 
        let priceTotalCalcul = [];
        // Aller chercher les quantitées dans le panier
        for (let p = 0; p < finalProduct.length; p++) {
            let priceTotalCart = finalProduct[p].price * finalProduct[p].quantityChoice;
            priceTotalCalcul.push(priceTotalCart);
        }
        const reducerPrice = (accumulator, currentValue) => accumulator + currentValue;
        const priceTotal = priceTotalCalcul.reduce(reducerPrice);
        let finalPriceChoice = document.querySelector("#totalPrice");
        finalPriceChoice.innerHTML = priceTotal;

    }
}

//------------------------------------------------------------------------------------------ Formulaire avec regex

function getForm() {
    // Ajout des Regex
    let form = document.querySelector(".cart__order__form");

    // Création des expressions régulières
    let emailRegExp = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
    let charRegExp = new RegExp("^[A-Z][A-Za-z\é\è\ê\-]+$");
    let addressRegExp = new RegExp("((^[0-9]*).?((rue)|(bis)|(quartier))?)(([a-z\é\è\ê\]+.)*)(([a-z\è\é\ê\'']+.)*)$");

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

function postForm() {
    const order = document.getElementsByClassName('cart__order__form')[0];
    order.addEventListener('submit', (event) => {
        event.preventDefault();

        // Récuperer les données du formulaire dans un objet
        const contact = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            email: document.getElementById('email').value
        }

        //-----------------------------------------Confirmation Regex
        /*
                function validForm() {
                    if (contact.firstName.value != "" && contact.lastName.value != "" && contact.address.value != "" &&
                        contact.city.value != "" && contact.email.value != "") {
                        // Les données sont ok, on peut envoyer le formulaire    
                        return true;
                    } else {
                        // Sinon on affiche un message d'erreur
                        alert("Saisissez correctement le formulaire.");
                        //Actualisation de la page 
                        location.reload();
                        return false;
                    }
                }
                validForm();
        */

        // Construction d'un array d'id depuis le local storage
        let products = [];
        for (let i = 0; i < finalProduct.length; i++) {
            products.push(finalProduct[i]._id);
        }
        console.log(products);

        // Mettre les valeurs du formulaire et les produits sélectionnés
        // Dans un objet...
        const sendFormData = {
            contact,
            products,
        }

        // Envoie le formulaire + localStorage (sendFormData) 
        // Envoie au server
        const options = {
            method: 'POST',
            body: JSON.stringify(sendFormData),
            headers: {
                'Content-Type': 'application/json',
            }
        };

        fetch("http://localhost:3000/api/products/order", options)
            .then(res => res.json())
            .then(promise => {
                localStorage.setItem('orderId', promise.orderId);
                document.location.href = 'confirmation.html?id=' + promise.orderId;
            });

    });
}
postForm();