import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = "bladesvisiontech@gmail.com";
const FROM_EMAIL = "Inmotion <info@inmotionteam.com>";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, goal, phone, comments, locale } = body;

    if (!name || !email || !goal) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const isEs = locale === "es";
    const subject = isEs
      ? `Nuevo lead — ${goal} · ${name}`
      : `New lead — ${goal} · ${name}`;

    const companyRow = company ? `
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.4);font-size:12px;text-transform:uppercase;letter-spacing:0.08em;width:120px;">${isEs ? "Empresa" : "Company"}</td>
            <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#fff;font-size:14px;">${company}</td>
          </tr>` : "";

    const html = `<div style="font-family:sans-serif;max-width:520px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:12px;">
        <div style="margin-bottom:24px;">
          <img src="https://inmotionteam.com/inmotion-logo.png" alt="Inmotion" height="32" style="height:32px;" />
        </div>
        <h2 style="font-size:18px;font-weight:700;margin:0 0 20px;color:#fff;">
          ${isEs ? "Nuevo lead desde el sitio web" : "New lead from website"}
        </h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.4);font-size:12px;text-transform:uppercase;letter-spacing:0.08em;width:120px;">${isEs ? "Nombre" : "Name"}</td>
            <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#fff;font-size:14px;">${name}</td>
          </tr>
          ${companyRow}
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.4);font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Email</td>
            <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:14px;"><a href="mailto:${email}" style="color:#97c121;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.4);font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">${isEs ? "Objetivo" : "Goal"}</td>
            <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#fff;font-size:14px;">${goal}</td>
          </tr>
          ${phone ? `<tr>
            <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.4);font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">${isEs ? "Teléfono" : "Phone"}</td>
            <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#fff;font-size:14px;"><a href="tel:${phone}" style="color:#97c121;">${phone}</a></td>
          </tr>` : ""}
          ${comments ? `<tr>
            <td style="padding:10px 0;color:rgba(255,255,255,0.4);font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">${isEs ? "Detalles" : "Details"}</td>
            <td style="padding:10px 0;color:#fff;font-size:14px;">${comments}</td>
          </tr>` : ""}
        </table>
        <div style="margin-top:28px;">
          <a href="mailto:${email}" style="display:inline-block;background:#fff;color:#000;font-weight:700;font-size:13px;padding:12px 24px;border-radius:8px;text-decoration:none;">${isEs ? "Responder" : "Reply"} →</a>
        </div>
        <p style="margin-top:32px;font-size:11px;color:rgba(255,255,255,0.2);">Inmotion · inmotionteam.com</p>
      </div>`;

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error: "Failed to send email" }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
