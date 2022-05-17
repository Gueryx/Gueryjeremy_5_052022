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

    /*appel au parent pour l'insertions des éléments*/

    let item = document.querySelector(".item");
    item.querySelector(".item__img").insertAdjacentHTML("afterbegin", `<img src="${productData.imageUrl}" alt="Photographie d'un canapé ${product.name}">`);

};

productDisplay();