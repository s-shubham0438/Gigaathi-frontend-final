export const toBackendRole = (role) => (role === 'WORKER' ? 'professional' : 'customer');

export const toFrontendRole = (role) => (role === 'professional' ? 'WORKER' : 'CUSTOMER');