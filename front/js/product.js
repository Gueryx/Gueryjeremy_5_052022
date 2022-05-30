const product = window.location.search.split("?id=").join("");
/*
il fallait supprimer ?id= pour qu'il puisse récuper id propre au produit
visualiser l'id du produit en question 
*/
console.log(product);

let productData = [];

const fetchProduct = async() => {
    //async va chercher la reponse avant de passer à la suite
    await fetch(`http://localhost:3000/api/products/${product}`)
        .then((res) => res.json()) /*reponse en .json*/
        .then((promise) => {
            console.log(promise);

            productData = promise;

        });
    //récuper les données sous un tableau - méthode fetch
};

const productDisplay = async() => {
    await fetchProduct();

    //appel au parent pour l'insertions des éléments ci-dessous

    let item = document.querySelector(".item");

    //ajout image dynamique 
    item.querySelector(".item__img").insertAdjacentHTML("afterbegin", `<img src="${productData.imageUrl}" alt="Photographie d'un canapé ${productData.name}">`);

    //ajout nom du produit dynamique - en majuscule
    item.querySelector("#title").insertAdjacentHTML("afterbegin", `${productData.name.toUpperCase()}`);

    //ajout du prix dynamique
    item.querySelector("#price").insertAdjacentHTML("afterbegin", `<span>${productData.price.toString().replace(/0$/,"")} </span>`);

    //ajout description produit dynamique
    item.querySelector("#description").insertAdjacentHTML("afterbegin", `${productData.description}`);

    //ajout des options des couleurs dynamique
    item.querySelector("#colors").insertAdjacentHTML("beforeend", productData.colors.map(color => `<option value="${color}">${color}</option>`).join());

    addBasket(productData);

}

productDisplay();


const addBasket = () => {
    /*si on click sur "Ajouter au panier alors .... */
    document.querySelector("#addToCart").addEventListener("click", function() {

        /*ajouts variables pour avoir dans le local storage des données du produit selectionnées*/
        let productBoard = JSON.parse(localStorage.getItem("product"));
        let selectColor = document.getElementById("colors");
        let selectQuantity = document.getElementById("quantity");


        /*assigner des options à un objet ci-dessous */
        const finalProduct = {
            _id: productData._id,
            imageUrl: productData.imageUrl,
            name: productData.name,
            price: productData.price,
            colorChoice: selectColor.value,
            quantityChoice: Number(selectQuantity.value),
        };

        //récap du produit choisi ci-dessous
        console.log(finalProduct);


        //si le resultat est "null" alors.... 
        if (productBoard == null) {
            //sous forme de tableau ci-dessous
            productBoard = [];
            productBoard.push(finalProduct);
            console.log(productBoard);
            //stockage des infos dans le localStorage ci-dessous
            localStorage.setItem("product", JSON.stringify(productBoard));

            //si le tableau n'est pas égale alors 
        } else if (productBoard != null) {
            for (i = 0; i < productBoard.length; i++) {
                console.log("test boucle pas égal à null");

                //si le même produit et la même teinte sont ajouté alors il se cumule et non dubliqué
                if (
                    productBoard[i]._id == productData._id &&
                    productBoard[i].colorChoice == selectColor.value
                ) {
                    return (
                        productBoard[i].quantityChoice += finalProduct.quantityChoice,
                        console.log("quantityChoice++"),
                        localStorage.setItem("product", JSON.stringify(productBoard)),
                        /*nouveau tableau dans le local storage à jour*/
                        (productBoard = JSON.parse(localStorage.getItem("product")))
                    );
                }
            }
            //Si il on le même id mais pas la même couleur alors c'est un autre produit
            for (i = 0; i < productBoard.length; i++) {
                if (
                    (productBoard[i]._id == productData._id &&
                        productBoard[i].colorChoice != selectColor.value) ||
                    productBoard[i]._id != productData._id
                ) {
                    return (
                        console.log("nouveau produit"),
                        productBoard.push(finalProduct),
                        localStorage.setItem("product", JSON.stringify(productBoard)),
                        (productBoard = JSON.parse(localStorage.getItem("product")))
                    );
                }
            }
        }
    });

    //récupérer les valeurs ajouté dans le produit tableau, dans le localStorage/product
    return (productBoard = JSON.parse(localStorage.getItem("product")));
};