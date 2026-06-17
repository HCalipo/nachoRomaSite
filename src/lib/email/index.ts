import type { EmailAdapter } from './types';
import { web3formsAdapter } from './adapters/web3form';

export const emailAdapter: EmailAdapter = web3formsAdapter;