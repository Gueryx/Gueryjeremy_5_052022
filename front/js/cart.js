// renvoyer les données de l'ajout d'un produit sur cette page
let finalProduct = JSON.parse(localStorage.getItem("product"));

if (!finalProduct) {
    //ajout d'un h1 si le panier est vide ("Votre panier est vide !!!")
    const titleCart = document.querySelector("h1");
    const sectionCart = document.querySelector(".cart");

    titleCart.innerHTML = "Votre panier est vide !!!";
    //on affiche pas la sectionCart si il y a pas de produit dans le panier
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
        //Aller chercher les quantitées dans le panier
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
        //Aller chercher les quantitées dans le panier
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

            // enregistrer l'id et la couleur séléctionnés par le bouton supprimer
            let deleteId = finalProduct[i]._id;
            let deleteColor = finalProduct[i].colorChoice;

            // filtrer l'élément cliqué par le bouton supprimer
            finalProduct = finalProduct.filter(elt => elt._id !== deleteId || elt.colorChoice !== deleteColor);

            // envoyer les nouvelles données dans le localStorage
            localStorage.setItem('product', JSON.stringify(finalProduct));

            // avertir de la suppression et recharger la page
            alert('Votre article a bien été supprimé.');

            //Si pas de produits dans le local storage on affiche que le panier est vide
            if (finalProduct.length === 0) {
                localStorage.clear();
            }
            // actualisation rapide de la page
            location.reload();
        });
    }
}