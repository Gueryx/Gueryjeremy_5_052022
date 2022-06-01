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

        // Création de la balise "article" et insertion dans la section
        let productArticle = document.createElement("article");
        document.querySelector("#cart__items").appendChild(productArticle);
        productArticle.className = "cart__item";
        productArticle.setAttribute("data-id", finalProduct[i]._id);

        // Insertion de l'élément "div" pour l'image produit
        let productDivImg = document.createElement("div");
        productArticle.appendChild(productDivImg);
        productDivImg.className = "cart__item__img";

        // Insertion de l'image
        let productImg = document.createElement("img");
        productDivImg.appendChild(productImg);
        productImg.src = finalProduct[i].imageUrl;
        // productImg.alt = productLocalStorage.altImgProduit;

        // Insertion de l'élément "div" pour la description produit
        let productItemContent = document.createElement("div");
        productArticle.appendChild(productItemContent);
        productItemContent.className = "cart__item__content";

        // Insertion de l'élément "div"
        let productItemContentTitlePrice = document.createElement("div");
        productItemContent.appendChild(productItemContentTitlePrice);
        productItemContentTitlePrice.className = "cart__item__content__titlePrice";

        // Insertion du titre h2
        let productTitle = document.createElement("h2");
        productItemContentTitlePrice.appendChild(productTitle);
        productTitle.innerHTML = finalProduct[i].name;

        // Insertion de la couleur
        let productColor = document.createElement("p");
        productTitle.appendChild(productColor);
        productColor.innerHTML = finalProduct[i].colorChoice;

        // Insertion du prix
        let productPrice = document.createElement("p");
        productItemContentTitlePrice.appendChild(productPrice);
        productPrice.innerHTML = finalProduct[i].price * finalProduct[i].quantityChoice + " €";

        // Insertion de l'élément "div"
        let productItemContentSettings = document.createElement("div");
        productItemContent.appendChild(productItemContentSettings);
        productItemContentSettings.className = "cart__item__content__settings";

        // Insertion de l'élément "div"
        let productItemContentSettingsQuantity = document.createElement("div");
        productItemContentSettings.appendChild(productItemContentSettingsQuantity);
        productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

        // Insertion de "Qté : "
        let productQty = document.createElement("p");
        productItemContentSettingsQuantity.appendChild(productQty);
        productQty.innerHTML = "Qté : ";

        // Insertion de la quantité
        let productQuantity = document.createElement("input");
        productItemContentSettingsQuantity.appendChild(productQuantity);
        productQuantity.value = finalProduct[i].quantityChoice;
        productQuantity.className = "itemQuantity";
        productQuantity.setAttribute("type", "number");
        productQuantity.setAttribute("min", "1");
        productQuantity.setAttribute("max", "100");
        productQuantity.setAttribute("name", "itemQuantity");

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

        // Insertion de l'élément "div"
        let productItemContentSettingsDelete = document.createElement("div");
        productItemContentSettings.appendChild(productItemContentSettingsDelete);
        productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

        // Insertion de "p" supprimer
        let productSupprimer = document.createElement("p");
        productItemContentSettingsDelete.appendChild(productSupprimer);
        productSupprimer.className = "deleteItem";
        productSupprimer.innerHTML = "Supprimer";
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