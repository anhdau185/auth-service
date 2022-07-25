function getTokenSignature(token: string): string {
  const tokenParts = token.split('.');

  if (tokenParts.length !== 3) {
    throw new Error('Invalid token structure');
  }
  return tokenParts[2];
}

export default getTokenSignature;
