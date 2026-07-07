// netlify/functions/submission-created.js
// Déclenchée automatiquement à chaque soumission du formulaire "commande".
// Envoie au client un e-mail de confirmation soigné (logo + charte DolmeD) via Resend.

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const payload = body.payload || {};
    const form = payload.form_name || "";
    const d = payload.data || {};

    if (form !== "commande") {
      return { statusCode: 200, body: "Ignoré (autre formulaire)." };
    }

    const email = (d.email || "").trim();
    if (!email) {
      return { statusCode: 200, body: "Pas d'e-mail client, aucun envoi." };
    }

    const numero   = d.numero || "—";
    const nom      = d.nom || "cher client";
    const total    = d.total || "";
    const paiement = d.mode_paiement || "";
    const sousTotal= d.sous_total || "";
    const remise   = d.remise || "";
    const livraison= d.frais_livraison || "";
    const recap    = (d.recapitulatif || "").split("\n\n")[0].replace(/\n/g, "<br>");

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return { statusCode: 500, body: "RESEND_API_KEY manquante." };

    const LOGO = "https://dolmed-site.netlify.app/logo.png";

    // Ligne de remise affichée seulement si > 0
    const remiseRow = (remise && remise.replace(/[^0-9]/g,"") !== "" && remise.trim() !== "0,000 DT")
      ? `<tr><td style="padding:4px 0;color:#6FA84B">Remise première commande</td>
             <td align="right" style="padding:4px 0;color:#6FA84B;font-weight:600">− ${remise}</td></tr>`
      : "";

    const html = `
<!doctype html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1ece3;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1ece3;padding:28px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;box-shadow:0 6px 24px rgba(27,53,109,.10);">

        <!-- En-tête crème + logo -->
        <tr>
          <td align="center" style="background:#f7f2ea;padding:38px 24px 30px;">
            <img src="${LOGO}" alt="DolmeD distribution" width="230" style="display:block;width:230px;max-width:66%;height:auto;margin:0 auto;">
          </td>
        </tr>

        <!-- Bandeau turquoise -->
        <tr><td style="height:6px;background:#54BCB8;"></td></tr>

        <!-- Corps -->
        <tr>
          <td style="padding:32px 34px 8px;">
            <h1 style="margin:0 0 6px;color:#1b356d;font-size:23px;font-weight:700;">Merci pour votre commande, ${nom} !</h1>
            <p style="margin:0 0 18px;color:#55607a;font-size:15px;line-height:1.6;">
              Nous sommes ravis de vous compter parmi nos clients. Votre commande est bien enregistrée —
              nous vous appelons très vite au numéro indiqué pour la confirmer et organiser la livraison.
            </p>

            <!-- N° de commande -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:6px 0 22px;">
              <tr><td align="center" style="background:#f4f9f8;border:1px dashed #54BCB8;border-radius:12px;padding:14px;">
                <div style="color:#7c8598;font-size:12px;letter-spacing:.06em;text-transform:uppercase;">Votre numéro de commande</div>
                <div style="color:#1b356d;font-size:20px;font-weight:700;letter-spacing:1px;margin-top:3px;">${numero}</div>
              </td></tr>
            </table>

            <!-- Récap articles -->
            <div style="color:#1b356d;font-weight:700;font-size:15px;margin:0 0 8px;">Détail de votre commande</div>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8f5f0;border-radius:10px;">
              <tr><td style="padding:16px 18px;color:#2b3a52;font-size:14px;line-height:1.7;">
                ${recap}
              </td></tr>
            </table>

            <!-- Totaux -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:14px 2px 6px;font-size:14px;color:#55607a;">
              <tr><td style="padding:4px 0;">Sous-total</td><td align="right" style="padding:4px 0;">${sousTotal}</td></tr>
              ${remiseRow}
              <tr><td style="padding:4px 0;">Livraison</td><td align="right" style="padding:4px 0;">${livraison}</td></tr>
              <tr><td style="padding:12px 0 0;border-top:1px solid #e6ddd0;color:#1b356d;font-weight:700;font-size:17px;">Total</td>
                  <td align="right" style="padding:12px 0 0;border-top:1px solid #e6ddd0;color:#1b356d;font-weight:700;font-size:17px;">${total}</td></tr>
            </table>

            <p style="margin:16px 0 0;color:#55607a;font-size:14px;">
              <strong style="color:#1b356d;">Règlement :</strong> ${paiement}<br>
              <strong style="color:#1b356d;">Livraison :</strong> partout en Tunisie sous 48 h.
            </p>
          </td>
        </tr>

        <!-- Rappel / réassurance -->
        <tr>
          <td style="padding:18px 34px 30px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef7f6;border-radius:12px;">
              <tr><td style="padding:16px 18px;color:#1b356d;font-size:13.5px;line-height:1.6;">
                Conservez votre numéro de commande pour le suivi. Une question ? Répondez simplement à cet e-mail,
                nous sommes là pour vous aider.
              </td></tr>
            </table>
          </td>
        </tr>

        <!-- Pied de page -->
        <tr>
          <td style="background:#1b356d;padding:22px 34px;">
            <div style="color:#ffffff;font-size:14px;font-weight:700;margin-bottom:4px;">DolmeD Distribution</div>
            <div style="color:#b9c6de;font-size:12px;line-height:1.6;">
              Hygiène et soin aux actifs naturels — pour toute la famille.<br>
              Le Kram 2015, Tunisie · La qualité au quotidien.
            </div>
          </td>
        </tr>

      </table>
      <div style="color:#9aa2b1;font-size:11px;margin-top:14px;font-family:Arial,Helvetica,sans-serif;">
        Cet e-mail vous a été envoyé suite à votre commande sur dolmed-site.netlify.app
      </div>
    </td></tr>
  </table>
</body>
</html>`;

    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "DolmeD Distribution <onboarding@resend.dev>",
        to: [email],
        subject: `Votre commande ${numero} est confirmée — DolmeD`,
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
