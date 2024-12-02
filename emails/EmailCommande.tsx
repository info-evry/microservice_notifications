import React from "react";
import { Html } from "@react-email/html";
import { Tailwind } from "@react-email/tailwind";
import { Img } from "@react-email/img";
import {CSS} from "template";

// Mail example 
const Email = ({ firstname }: { name: string },{  noCommande }: { name: string } ) => {
  return (
    <Html lang="fr">
      <Tailwind>
        {/* Header */}
        <div style={footer}>
          <h1 style={titre}>Infos Info Evry</h1>
        </div>

        {/* Image */}
        <img
          src="http://localhost:3000/images/logo.png"
          alt="Logo de l'entreprise"
          width="50"
          height="50"
          style={{ margin: "20px auto", display: "block" }}
        />

        {/* Main Content*/}
        <div style={zoneText}>

          <h2 style={titre}>Salut {firstname} !</h2>


          {/* Main Content commande*/}
          <p style={text}>
            Nous sommes ravis de te compter parmi nos membres ! Bienvenue {firstname} !!!
            Pour toutes questions, n'hésite pas à nous contacter !
          </p>



          {/* mail prévoyance */}
          <p style={text}>
            Tu n&apos;es pas à l&apos;origine de ce mail ?  Tu peux ignorer ce mail en toute sécurité.
          </p>

          <br/><br/>
          <p style={text}>
           L'équipe Asso Info Evry
          </p>

        </div>




        {/* Footer */}
        <div style={footer}>

          <div style={container}>
            <figure style={figure}>
              <img
                src="https://pngbuy.com/wp-content/uploads/2023/06/splash-instagram-logo-pnginstagram-png-logo.png"
                alt="Logo 1"
                style={logo}
              />
              &nbsp;&nbsp;
              <figcaption style={caption}>info_evry</figcaption>
            </figure>

            &nbsp;&nbsp;&nbsp;&nbsp;

            <figure style={figure}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/6244/6244710.png" // Chemin relatif vers une image dans le dossier public
                alt="Logo 2"
                style={logo}
              />
              &nbsp;&nbsp;
              <figcaption style={caption}>asso@info-evry.fr</figcaption>

            </figure>

          </div>
          <p style={textFooter}>
            Informations Légale : <br/> L&apos;Association INFO EVRY, située au 23
            Boulevard de France, 91037 Evry-Courcouronnes, France, est une entité
            légale qui opère dans le cadre de ses activités déclarées.
          </p><br />
          <p style={textFooter}>
            © 2024 Asso Info Evry. Tous droits réservés.
          </p>
          <br />  <br />  <br />  
          <p style={textFooterCommande}>
            Extrait des Conditions générales de vente :
            Droit de rétractation : vous pouvez vous rétracter en contactant notre Service après vente en lui adressant le formulaire de rétractation type, communiqué ci-dessous, dans un délai de quatorze jours à compter de la réception du produit. Vous devrez ensuite restituer le produit sans retard excessif et au plus tard quatorze jours suivant la date de communication de votre décision, en parfait état de revente.
            Les coûts de renvoi seront à votre charge. Vous devrez vous présenter dans le Drive où vous avez retiré votre commande avec le ou les produit(s) concerné(s) et la facture d'achat.
            En cas d'exercice de votre droit de rétractation, nous vous remboursons, en utilisant le même moyen de paiement que celui utilisé pour la transaction initiale, la totalité des sommes versées au plus tard dans les quatorze (14) jours à compter de la date à laquelle nous sommes informés de votre décision de vous rétracter. Néanmoins, nous pouvons différer le remboursement jusqu'à récupération des produits.
          </p>
        </div>


      </Tailwind>
    </Html>
  );
};



// Styles 

const zoneText = {
  padding: "20px",
  textAlign: "center"
};

const text = {
  fontSize: "14px", color: "#666"

};

const titre = {
  fontSize: "25px",
  color: "#444"
};

const footer = {
  backgroundColor: "#f3f4f6",
  padding: "10px 20px",
  textAlign: "center",
};

const textFooter = {
  fontSize: "12px",
  margin: 0,
  color: "#666"
}

const textFooterCommande = {
  fontSize: "12px",
  margin: 0,
  textAlign: "justify",
  color: "#666"
}

const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
  padding: "10px",
};
const caption = {
  marginTop: "8px",
  fontSize: "14px",
  color: "#555",
};
const figure = {
  textAlign: "center",
};

const logo = {
  width: "25px",
  height: "25px",
};

export default Email;