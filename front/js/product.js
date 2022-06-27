// Récup l'id via l'url
const product = new URL(window.location.href).searchParams.get("id");

let productData = [];
console.log(productData);

const fetchProduct = async() => {
    // Async va chercher la reponse avant de passer à la suite
    await fetch(`http://localhost:3000/api/products/${product}`)
        .then((res) => res.json()) //Reponse en .json
        .then((promise) => {
            console.log(promise);

            productData = promise;

        });
    // Récuper les données sous un tableau - méthode fetch
};

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
    // Si on click sur "Ajouter au panier alors .... 
    document.querySelector("#addToCart").addEventListener("click", function() {

        // Ajouts variables pour avoir dans le local storage des données du produit selectionnées
        let productBoard = JSON.parse(localStorage.getItem("product"));
        let selectColor = document.getElementById("colors");
        let selectQuantity = document.getElementById("quantity");


        // Assigner des options à un objet ci-dessous 
        const finalProduct = {
            _id: productData._id,
            imageUrl: productData.imageUrl,
            name: productData.name,
            price: productData.price,
            colorChoice: selectColor.value,
            quantityChoice: Number(selectQuantity.value),
        };

        // Si le resultat est "null" alors....
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

        // Si le tableau n'est pas égale alors....
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