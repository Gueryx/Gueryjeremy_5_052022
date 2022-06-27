// Récup l'id via l'url
const id = new URL(window.location.href).searchParams.get("id");
console.log(id);

// Affichage de l'id --> numéro de commande
const toDisplayId = document.getElementById('orderId');
toDisplayId.innerHTML = id;

localStorage.clear();