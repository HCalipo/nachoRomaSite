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

      const json = await res.json();

      if (res.ok && json.success) {
        return { ok: true };
      } else {
        return { ok: false, error: json.message || 'Error en Web3Forms' };
      }
    } catch (err) {
      console.error('[web3formsAdapter]', err);
      return { ok: false, error: 'Error de conexión con Web3Forms' };
    }
  }
};