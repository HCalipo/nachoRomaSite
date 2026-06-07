import nodemailer from 'nodemailer';
import type { EmailAdapter, EmailPayload } from '../types';

export const etherealAdapter: EmailAdapter = {
  async send({ nombre, email, mensaje }) {
    // Crea una cuenta de prueba temporal automáticamente
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const info = await transporter.sendMail({
      from: `"Web NachoRoma" <${testAccount.user}>`,
      to: 'hugop27m@gmail.com',
      replyTo: email,
      subject: `Nuevo mensaje de ${nombre}`,
      html: `
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong><br/>${mensaje.replace(/\n/g, '<br/>')}</p>
      `,
    });

    // Imprime en consola la URL donde ver el email capturado
    console.log('📧 Email de prueba:', nodemailer.getTestMessageUrl(info));

    return { ok: true };
  }
};