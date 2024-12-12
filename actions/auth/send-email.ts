"use server";

import nodemailer from "nodemailer";

export async function sendEmailAction(
  { to, subject, text, companyName }: 
  { to: string; subject: string; text: string, companyName: string }
) {
  if (!to || !subject || !text) {
    throw new Error("Todos los parámetros son obligatorios");
  }

  try {
    // Configuración del transporte
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587", 10),
      secure: process.env.SMTP_SECURE === "true", // true para puerto 465, false para otros
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Enviar correo
    const info = await transporter.sendMail({
      from: `${companyName} - FacturaFlow <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
    });

    console.log("Correo enviado:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error al enviar correo:", error);
    throw new Error("Error al enviar correo");
  }
}
