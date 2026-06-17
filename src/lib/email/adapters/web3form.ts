import type { EmailAdapter } from '../types';

const API_KEY = import.meta.env.WEB3FORMS_API_KEY;

export const web3formsAdapter: EmailAdapter = {
  async send({ nombre, email, mensaje }) {
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "API_KEY",
          name: nombre,
          email: email,
          message: mensaje,
        }),
      });

      //texto en lugar de json, prueba.
      const textResponse = await res.text();
      
      let json;
      try {
        json = JSON.parse(textResponse);
      } catch (e) {
        console.error('La respuesta no es JSON. Contenido:', textResponse.substring(0, 250));
        return { ok: false, error: 'Fallo inesperado del servidor de correo.' };
      }

      if (res.ok && json.success) {
        return { ok: true };
      } else {
        return { ok: false, error: json.message || 'Error en el envío.' };
      }
    } catch (err) {
      console.error('[web3formsAdapter]', err);
      return { ok: false, error: 'Error de conexión.' };
    }
  }
};