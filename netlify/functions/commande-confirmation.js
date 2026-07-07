// netlify/functions/commande-confirmation.js
// Déclenchée automatiquement à chaque soumission du formulaire "commande".
// Envoie un e-mail de confirmation au client via Resend.

exports.handler = async (event) => {
  try {
    // Netlify envoie la soumission dans event.body -> { payload: { data, form_name, ... } }
    const body = JSON.parse(event.body || "{}");
    const payload = body.payload || {};
    const form = payload.form_name || "";
    const d = payload.data || {};

    // On ne traite que le formulaire "commande"
    if (form !== "commande") {
      return { statusCode: 200, body: "Ignoré (autre formulaire)." };
    }

    const email = (d.email || "").trim();
    if (!email) {
      return { statusCode: 200, body: "Pas d'e-mail client, aucun envoi." };
    }

    const numero   = d.numero || "—";
    const nom      = d.nom || "client";
    const total    = d.total || "";
    const paiement = d.mode_paiement || "";
    const recap    = (d.recapitulatif || "").replace(/\n/g, "<br>");

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return { statusCode: 500, body: "RESEND_API_KEY manquante." };
    }

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#2b3a52;max-width:560px;margin:auto">
        <h2 style="color:#1b356d">Merci pour votre commande, ${nom} !</h2>
        <p>Nous avons bien reçu votre commande. Nous vous appelons très vite au numéro indiqué pour la confirmer.</p>
        <p style="font-size:16px">
          <strong>N° de commande :</strong>
          <span style="color:#54BCB8;font-weight:700">${numero}</span>
        </p>
        <div style="background:#f6f2ec;border-radius:10px;padding:16px;margin:16px 0">
          <div style="font-weight:700;color:#1b356d;margin-bottom:8px">Votre commande</div>
          <div style="font-size:14px;line-height:1.6">${recap}</div>
        </div>
        <p><strong>Total :</strong> ${total} &nbsp;·&nbsp; <strong>Paiement :</strong> ${paiement}</p>
        <p style="font-size:13px;color:#7c8598">Conservez ce numéro pour le suivi de votre commande.</p>
        <hr style="border:none;border-top:1px solid #e6ddd0;margin:20px 0">
        <p style="font-size:13px;color:#7c8598">DolmeD Distribution — hygiène naturelle · Livraison partout en Tunisie</p>
      </div>`;

    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "DolmeD <onboarding@resend.dev>",
        to: [email],
        subject: `Votre commande ${numero} — DolmeD`,
        html
      })
    });

    if (!resp.ok) {
      const t = await resp.text();
      return { statusCode: 502, body: "Erreur Resend: " + t };
    }

    return { statusCode: 200, body: "E-mail de confirmation envoyé." };
  } catch (e) {
    return { statusCode: 500, body: "Erreur fonction: " + e.message };
  }
};
