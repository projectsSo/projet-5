const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get("orderId"); //l'order Id c'est le back-end qui nous l'envoi
const totalPrice = urlParams.get("totalprice");

let orderNumber = document.querySelector(".order-commande");
let totalP = document.querySelector(".prix-total");

orderNumber.innerHTML += `<strong id="style"> ${orderId}</strong>`;
totalP.innerHTML += `<strong> ${totalPrice} €</strong>`;
