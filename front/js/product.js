// Récupération de l'URL du produit ciblé
const product = new URL(window.location.href).searchParams.get("id");

// Array 
let productData = [];
console.log(productData);

// On dialogue depuis l'API avec la méthode fetch, pour récuperer les caractéristiques du produit en question
const fetchProduct = async() => {
    await fetch(`http://localhost:3000/api/products/${product}`)
        .then((res) => res.json()) //Reponse en .json
        .then((promise) => {
            console.log(promise);

            productData = promise;

        });
};

// Affichage dynamiquement des détails du produits en question 
const productDisplay = async() => {
    await fetchProduct();

    // Appel au parent pour l'insertions des éléments ci-dessous

    let item = document.querySelector(".item");

    // Ajout image dynamique 
    item.querySelector(".item__img").insertAdjacentHTML("afterbegin", `<img src="${productData.imageUrl}" alt="${productData.altTxt}">`);

    // Ajout nom du produit dynamique - en majuscule
    item.querySelector("#title").insertAdjacentHTML("afterbegin", `${productData.name.toUpperCase()}`);

    // Ajout du prix dynamique
    item.querySelector("#price").insertAdjacentHTML("afterbegin", `<span>${productData.price.toString().replace(/0$/,"")} </span>`);

    // Ajout description produit dynamique
    item.querySelector("#description").insertAdjacentHTML("afterbegin", `${productData.description}`);

    // Ajout des options des couleurs dynamique
    item.querySelector("#colors").insertAdjacentHTML("beforeend", productData.colors.map(color => `<option value="${color}">${color}</option>`).join());

    addBasket(productData);

}

productDisplay();


const addBasket = () => {

    // Fonction au "click" pour l'ajout au panier du produit
    document.querySelector("#addToCart").addEventListener("click", function() {

        // Ajouts variables pour avoir dans le local storage des données du produit selectionnées
        let productBoard = JSON.parse(localStorage.getItem("product"));
        let selectColor = document.getElementById("colors");
        let selectQuantity = document.getElementById("quantity");


        // Assigner des options à un objet ci-dessous 
        const finalProduct = {
            _id: productData._id,
            colorChoice: selectColor.value,
            quantityChoice: Number(selectQuantity.value),
        };

        // Si le resultat du productBoard est "null" alors... On vient l'ajouter dans le localStorage
        if (productBoard == null && selectQuantity.value > 0 && selectQuantity.value <= 100 && selectQuantity.value != 0 && selectColor.value != 0) {
            // Sous forme de tableau ci-dessous
            productBoard = [];
            productBoard.push(finalProduct);
            console.log(productBoard);
            // Tableau MAJ dans le localStorage
            localStorage.setItem("product", JSON.stringify(productBoard));
            productBoard.quantityChoice = Number(selectQuantity.value)
            return;
        }

        // Si le resultat du productBoard n'est pas égale à null alors... (qui à déjà un produit dedans) 
        // On vient alors l'ajouter ou augmanter sa qté selon le produit séléctionné et on le push dans le localStorage et on met ce dernier à jour
        if (productBoard != null && selectQuantity.value > 0 && selectQuantity.value <= 100 && selectQuantity.value != 0 && selectColor.value != 0) {
            for (i = 0; i < productBoard.length; i++) {
                // Si le même produit et la même teinte sont ajouté alors il se cumule et non dubliqué 
                if (productBoard[i]._id == productData._id && productBoard[i].colorChoice == selectColor.value) {
                    productBoard[i].quantityChoice = Number(selectQuantity.value) + productBoard[i].quantityChoice;
                    console.log("ajout de", Number(selectQuantity.value), "produit(s) similaire");
                    localStorage.setItem("product", JSON.stringify(productBoard));
                    // Tableau MAJ dans le localStorage
                    productBoard = JSON.parse(localStorage.getItem("product"))
                    return;
                }
            }
            console.log("nouveau produit");
            productBoard.push(finalProduct);
            localStorage.setItem("product", JSON.stringify(productBoard));
            (productBoard = JSON.parse(localStorage.getItem("product")));
            return;
        }
    });
    productBoard = JSON.parse(localStorage.getItem("product"));
};