const urlParam = new URL(document.location).searchParams;

//afficher le numéro de la commande
function orderConfirm() {
  const numeroCommande = document.getElementById("panierContainer");
  numeroCommande.innerHTML = `
<div class='row'>
<p class="card-text">Votre commande a été enrégistrée sous le numéro: ${contenu.orderId}</p>
</div>
`;
}
