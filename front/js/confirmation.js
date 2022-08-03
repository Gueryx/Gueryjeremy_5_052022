// Récupération de id via l'URL
const id = new URL(window.location.href).searchParams.get("id");
console.log(id);

// Pour l'affichage de l'id --> affichage de l'id via un inner.HTML 
const toDisplayId = document.getElementById('orderId');
toDisplayId.innerHTML = id;

localStorage.clear();