export interface EmailPayload {
  nombre: string;
  email:  string;
  mensaje: string;
}

export interface EmailAdapter {
  send(payload: EmailPayload): Promise<{ ok: boolean; error?: string }>;
}