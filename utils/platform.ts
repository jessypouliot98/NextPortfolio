export const isServer = () => {
  return typeof window === 'undefined';
}

export const isWeb = () => {
  return !isServer();
}

