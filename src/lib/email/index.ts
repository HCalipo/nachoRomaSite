import type { EmailAdapter } from './types';
import { hostingerAdapter } from './adapters/hostinger';
// import { resendAdapter } from './adapters/resend';
import { etherealAdapter } from './adapters/ethereal';

export const emailAdapter: EmailAdapter =
  import.meta.env.DEV ? etherealAdapter : hostingerAdapter;