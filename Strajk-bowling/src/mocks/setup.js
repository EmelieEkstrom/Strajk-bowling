import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Konfigurera MSW server med definierade handlers
export const server = setupServer(...handlers);
