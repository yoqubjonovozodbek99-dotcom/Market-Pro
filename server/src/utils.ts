import jwt from 'jsonwebtoken'
import type { User } from '@prisma/client'

export function signToken(payload: object, secret: string, expiresIn: string) {
  return jwt.sign(payload, secret, { expiresIn })
}

export function verifyToken<T = object>(token: string, secret: string): T {
  return jwt.verify(token, secret) as T
}

export function getAuthHeaderValue(authHeader?: string) {
  if (!authHeader) return null
  const [type, token] = authHeader.split(' ')
  return type === 'Bearer' && token ? token : null
}

export function sanitizeUser(user: User) {
  const { passwordHash, ...safeUser } = user
  return safeUser
}
