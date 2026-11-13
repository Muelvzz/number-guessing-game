type TokenData = {
  value: string,
  expiry: number
}

export function setTokenWithExpiry(tokenKey: string, tokenValue: string, ttlInMs: number = 3600000): void {
  const now = new Date()
  const tokenData = {
    value: tokenValue,
    expiry: now.getTime() + ttlInMs
  }

  localStorage.setItem(tokenKey, JSON.stringify(tokenData))
  console.log("[CLIENT] Created Token")
}

export function clearToken(tokenKey: string): void {
  localStorage.removeItem(tokenKey)
}

export function getToken(tokenKey: string): string {
  const now = new Date()
  const jwtToken: string | null = localStorage.getItem(tokenKey)
  if (!jwtToken) {
    throw new Error("[CLIENT] client token does not exist, please login first before entering protected routes.")
  }

  const parsedJwt: TokenData = JSON.parse(jwtToken)
  if (now.getTime() < parsedJwt.expiry) {
    return parsedJwt.value
  }

  throw new Error("[CLIENT] client token expired, please login again")
}