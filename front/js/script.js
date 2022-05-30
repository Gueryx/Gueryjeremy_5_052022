kanapData();

async function kanapData() {
    let productList = await fetch("http://localhost:3000/api/products");
    return productList.json();
}

async function products() {
    let article = await kanapData()
        .then((productList) => {
            for (let i = 0; i < productList.length; i++) {

                // Insertion de l'élément dynamique "a"
                let productLink = document.createElement("a");
                document.querySelector(".items").appendChild(productLink);
                productLink.href = `product.html?id=${productList[i]._id}`;

                // Insertion de l'élément dynamique "article"
                let productArticle = document.createElement("article");
                productLink.appendChild(productArticle);

                // Insertion de l'image dynamique
                let productImg = document.createElement("img");
                productArticle.appendChild(productImg);
                productImg.src = productList[i].imageUrl;
                productImg.alt = productList[i].altTxt;

                // Insertion du titre dynamique "h3"
                let productName = document.createElement("h3");
                productArticle.appendChild(productName);
                productName.classList.add("productName");
                productName.innerHTML = productList[i].name;

                // Insertion de la description dynamique "p"
                let productDescription = document.createElement("p");
                productArticle.appendChild(productDescription);
                productDescription.classList.add("productName");
                productDescription.innerHTML = productList[i].description;
            }
        });
    console.log("ajout des produits dynamiquement");
}

products();