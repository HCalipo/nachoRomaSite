import nodemailer from 'nodemailer';
import type { EmailAdapter, EmailPayload } from '../types';

export const hostingerAdapter: EmailAdapter = {
  async send({ nombre, email, mensaje }) {
    const transporter = nodemailer.createTransport({
      host: import.meta.env.SMTP_HOST,       // mail.nachoromadj.com
      port: Number(import.meta.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: import.meta.env.SMTP_USER,     // info@nachoromadj.com
        pass: import.meta.env.SMTP_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: `"Web NachoRoma" <${import.meta.env.SMTP_USER}>`,
        to:   'nachoromadj@gmail.com',
        replyTo: email,
        subject: `Nuevo mensaje de ${nombre}`,
        html: `
          <p><strong>Nombre:</strong> ${nombre}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mensaje:</strong><br/>${mensaje.replace(/\n/g, '<br/>')}</p>
        `,
      });
      return { ok: true };
    } catch (err) {
      console.error('[hostingerAdapter]', err);
      return { ok: false, error: 'Error al enviar el correo' };
    }
  }
};