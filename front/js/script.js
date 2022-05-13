let kanapData = [];

const fetchKanap = async() => {
    /*async va chercher la reponse avant de passer à la suite */
    await fetch("http://localhost:3000/api/products")
        .then((res) => res.json()) /*reponse en .json*/
        .then((promise) => {
            kanapData = promise; /*stockage du tableau kanapData dans la promise */
            console.log(kanapData);
        });
    /*récuper les données sous un tableau - méthode fetch*/
};

const kanapDisplay = async() => {
    await fetchKanap(); /*attente de cette reponse pour passer à la suite*/

    /*reprendre via les données du tableau - fetchKanap*/
    /*id de la banniere section des produits = items sur index.html*/
    /*aller chercher les documents dans le DOM ci-dessous */
    /*utilisation d'une boucle mothode map, en allant chercher l'index kanap */
    document.getElementById("items").innerHTML = kanapData.map(
        (kanap) => `

    <a href="./product.html?id=${kanap._id}"> 
    <article>

    <img  src="${kanap.imageUrl}" alt"image d'un canapé ${kanap.colors}" />
    
    <h3 class="productName">${kanap.name}</h3>
    <p class="productDescription">${kanap.description}</p>  

    </article>
    </a>
    `).join("");
    /*
    <p>${kanap.price.toString().replace(/0$/,"")} €</p> prix!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    <h3 toUpperCase pour les majuscules
    <p .toString()replace(remplacer les 0 à la fin par "rien")
    .join("") = enlever les ' qui apparaissent
    */

};

kanapDisplay();