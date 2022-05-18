const product = window.location.search.split("?id=").join("");
/*
il fallait supprimer ?id= pour qu'il puisse récuper id propre au produit
visualiser l'id du produit en question 
*/
console.log(product);

let productData = [];

const fetchProduct = async() => {
    /*async va chercher la reponse avant de passer à la suite */
    await fetch(`http://localhost:3000/api/products/${product}`)
        .then((res) => res.json()) /*reponse en .json*/
        .then((promise) => {
            console.log(promise);

            productData = promise;

        });
    /*récuper les données sous un tableau - méthode fetch*/
};

const productDisplay = async() => {
    await fetchProduct();

    /*appel au parent pour l'insertions des éléments ci-dessous*/

    let item = document.querySelector(".item");

    /*ajout image dynamique */
    item.querySelector(".item__img").insertAdjacentHTML("afterbegin", `<img src="${productData.imageUrl}" alt="Photographie d'un canapé ${productData.name}">`);

    /*ajout nom du produit dynamique - en majuscule*/
    item.querySelector("#title").insertAdjacentHTML("afterbegin", `${productData.name.toUpperCase()}`);

    /*ajout du prix dynamique*/
    item.querySelector("#price").insertAdjacentHTML("afterbegin", `<span>${productData.price.toString().replace(/0$/,"")} </span>`);

    /*ajout description produit dynamique*/
    item.querySelector("#description").insertAdjacentHTML("afterbegin", `${productData.description}`);

    /*ajout des options des couleurs dynamique*/
    item.querySelector("#colors").insertAdjacentHTML("beforeend", productData.colors.map(color => `<option value="${color}">${color}</option>`).join());

    addBasket(productData);

}

productDisplay();


const addBasket = () => {
    console.log(productData._id); /*test pour ravoir l'id */

    /*si on click sur "Ajouter au panier alors .... */
    document.querySelector("#addToCart").addEventListener("click", function() {


        /*ajouts variables pour avoir dans le local storage des données du produit selectionnées*/
        let productBoard = JSON.parse(localStorage.getItem("product"));
        let selectColor = document.getElementById("colors");
        let selectQuantity = document.getElementById("quantity");

        /*assigner des options à un objet ci-dessous */
        const finalProduct = Object.assign({}, productData, {
            colorChoice: `${selectColor.value}`,
            quantityColorChoice: 1,
            quantityChoice: `${selectQuantity.value}`,
        });
        /*récap du produit choisi ci-dessous*/
        console.log(finalProduct);


        /*si le resultat est "null" alors.... */
        if (productBoard == null) {
            /*sous forme de tableau ci-dessous */
            productBoard = [];
            productBoard.push(finalProduct);
            console.log(productBoard);
            /*stockage des infos dans le localStorage ci-dessous */
            localStorage.setItem("product", JSON.stringify(productBoard));
        }
    });
};