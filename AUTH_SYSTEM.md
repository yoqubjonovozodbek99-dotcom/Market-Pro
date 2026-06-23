# Auth System Documentation

## Overview

This document describes the complete authentication system for MarketPro Academy, including JWT-based authentication, email notifications, password reset, and subscription management.

## Architecture

### JWT Tokens

- **Access Token**: 15 minutes expiry, used for API requests
- **Refresh Token**: 30 days expiry, used to obtain new access tokens
- **Algorithm**: HS256 (HMAC-SHA256)

### Secrets

- `JWT_SECRET`: Used to sign and verify access tokens
- `JWT_REFRESH_SECRET`: Used to sign and verify refresh tokens

## API Endpoints

### Authentication

#### POST /api/auth/register
Register a new user account.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+998901234567",
  "password": "securePassword123",
  "language": "uz"
}
```

**Response:**
```json
{
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "language": "UZ",
    "isVerified": false
  },
  "token": "eyJhbGc...",
  "refreshToken": "eyJhbGc..."
}
```

**Behavior:**
- Hashes password with bcrypt (salt rounds: 12)
- Sends welcome email to new user
- Returns JWT tokens for immediate login

#### POST /api/auth/login
Authenticate and obtain tokens.

**Request:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123",
  "deviceId": "device-unique-id"
}
```

**Response:**
```json
{
  "user": { ... },
  "token": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "deviceId": "device-unique-id"
}
```

**Behavior:**
- Validates credentials against database
- Checks if user account is blocked (isBlocked flag)
- Creates/updates UserSession record with IP and device info
- Returns tokens and device ID for session tracking

#### POST /api/auth/logout
Terminate user session.

**Request:**
```json
{
  "deviceId": "device-unique-id"
}
```

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

**Behavior:**
- Sets UserSession.isActive = false for the device
- Clears authentication state

#### POST /api/auth/refresh
Get new access token using refresh token.

**Request:**
```json
{
  "refreshToken": "eyJhbGc..."
}
```

**Response:**
```json
{
  "token": "eyJhbGc..."
}
```

**Behavior:**
- Verifies refresh token signature
- Checks if user exists and is not deleted
- Issues new access token

#### POST /api/auth/forgot-password
Request password reset email.

**Request:**
```json
{
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "message": "Password reset email sent"
}
```

**Behavior:**
- Generates 32-byte random reset token
- Sends email with reset link (expires in 1 hour)
- User receives reset URL: `${CLIENT_URL}/reset-password?token=...&email=...`

#### POST /api/auth/reset-password
Update password with reset token.

**Request:**
```json
{
  "email": "john@example.com",
  "token": "reset-token-from-email",
  "newPassword": "newSecurePassword123"
}
```

**Response:**
```json
{
  "message": "Password reset successfully"
}
```

**Behavior:**
- Validates email exists
- Updates user password with bcrypt hashing (salt: 12)
- Invalidates all existing refresh tokens (user must login again)

### User

#### GET /api/me
Get authenticated user profile with subscription info.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "user": { ... },
  "subscription": {
    "id": "sub-id",
    "plan": "MONTHLY",
    "startDate": "2024-01-01T00:00:00Z",
    "endDate": "2024-02-01T00:00:00Z",
    "isActive": true
  },
  "isSubscribed": true
}
```

#### GET /api/check-subscription
Check if user has active subscription.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "hasSubscription": true,
  "isSubscriptionActive": true,
  "subscription": { ... }
}
```

## Frontend API Client

Located in `src/api.ts`:

```typescript
// Authentication
export async function register(data: RegisterData): Promise<AuthResponse>
export async function login(data: LoginData): Promise<AuthResponse>
export async function logout(deviceId?: string): Promise<void>
export async function forgotPassword(email: string): Promise<void>
export async function resetPassword(email: string, token: string, newPassword: string): Promise<void>

// User
export async function getMe(): Promise<UserResponse>
export async function checkSubscription(): Promise<SubscriptionCheckResponse>

// Utilities
export function getAccessToken(): string | null
export function setTokens(token: string, refreshToken: string): void
export function clearTokens(): void
```

## Frontend Components

### AuthContext (src/contexts/AuthContext.tsx)

Global authentication state management using React Context API.

**Provides:**
- `user`: Current authenticated user or null
- `isLoading`: Loading state during auth initialization
- `isAuthenticated`: Boolean indicating if user is logged in
- `login(email, password)`: Authenticate user
- `register(data)`: Create new account
- `logout()`: Terminate session

**Usage:**
```typescript
const { user, isAuthenticated, login, logout } = useAuth()
```

### ProtectedRoute (src/components/ProtectedRoute.tsx)

Route wrapper that enforces authentication.

**Features:**
- Redirects unauthenticated users to login page
- Shows loading spinner during auth check
- Protects lesson pages, video lessons, and profile

**Usage:**
```typescript
<Route path="/darslar" element={<ProtectedRoute><LessonsPage /></ProtectedRoute>} />
```

### SubscriptionRoute (src/components/ProtectedRoute.tsx)

Route wrapper that enforces active subscription (future use).

**Planned Features:**
- Checks subscription validity
- Redirects non-subscribers to payment page
- Shows subscription expiry warnings

## Session Management

### UserSession Model

Tracks user devices and login locations:

```prisma
model UserSession {
  id        String   @id @default(cuid())
  userId    String
  ipAddress String
  userAgent String
  deviceId  String
  city      String?
  country   String?
  isActive  Boolean  @default(true)
  isSuspicious Boolean @default(false)
  
  createdAt DateTime @default(now())
  lastSeenAt DateTime @updatedAt
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([userId, deviceId])
}
```

### Session Tracking

On login:
1. Extract IP address from `X-Forwarded-For` header or socket
2. Extract user agent from `User-Agent` header
3. Generate or retrieve device ID
4. Upsert UserSession record with latest login time

## Email Notifications

### Welcome Email

Sent immediately after registration.

**Template**: [server/src/email.ts](server/src/email.ts#L10)

**Subject**: "Xush kelibsiz! 🎉 MarketPro Academyga"

**Content**: 
- Greeting with user's name
- Account confirmation message
- Login link
- Platform overview

### Password Reset Email

Sent when user requests password reset.

**Template**: [server/src/email.ts](server/src/email.ts#L25)

**Subject**: "Parolingizni tiklash — MarketPro Academy"

**Content**:
- Reset link with token (valid 1 hour)
- Instructions for password reset
- Security warning

## Subscription System

### Plans

- **MONTHLY**: 1 month of course access
- **THREE_MONTHS**: 3 months of course access

### Subscription Check

Users must have active subscription to access:
- `/darslar` (Lessons)
- `/video-darslar` (Video Lessons)
- `/profil` (Profile) - partial (view stats but limited)

### Non-Subscribers

Can access:
- `/` (Home page)
- `/kirish` (Login)
- `/royxat` (Register)
- View free lessons only

## Security Considerations

### Password Security
- Minimum requirements: 8+ characters (enforce in frontend)
- Stored as bcrypt hash with 12 salt rounds
- Never transmitted or logged

### Token Security
- Access tokens: Short-lived (15 min), used for API requests
- Refresh tokens: Longer-lived (30 days), only used to get new access tokens
- Stored in localStorage (consider secure HttpOnly cookies for production)
- Transmitted via `Authorization: Bearer <token>` header

### Session Security
- Track device and IP for anomaly detection
- Flag suspicious logins (different country, unknown device)
- Can revoke sessions per device
- Rate limiting recommended (future)

### Rate Limiting

Not yet implemented. Recommended:
- Login attempts: 5 attempts per 15 minutes
- Password reset requests: 3 per hour
- API requests: Vary by endpoint

## Error Handling

### Common Errors

| Status | Message | Cause |
|--------|---------|-------|
| 400 | Missing required fields | Incomplete request body |
| 401 | Invalid email or password | Wrong credentials |
| 403 | User account is blocked | Account suspended |
| 404 | User not found | Email not registered |
| 409 | Email already registered | Duplicate account |
| 500 | Registration/Login failed | Server error |

## Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/marketpro

# JWT
JWT_SECRET=your-secret-key-min-32-chars
JWT_REFRESH_SECRET=your-refresh-secret-min-32-chars
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=30d

# Server
PORT=5000
CLIENT_URL=http://localhost:3000

# Email (Gmail)
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password

# Optional
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

## Testing

### Register & Login Flow
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "language": "uz"
  }'
```

### Refresh Token
```bash
curl -X POST http://localhost:5000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "your-refresh-token"}'
```

### Protected Endpoint
```bash
curl -H "Authorization: Bearer your-access-token" \
  http://localhost:5000/api/me
```

## Future Enhancements

1. **Two-Factor Authentication (2FA)**
   - SMS or email OTP verification
   - TOTP support

2. **OAuth Integration**
   - Google login
   - GitHub login
   - GitHub OAuth

3. **Social Login**
   - Account linking
   - Social profile data

4. **Advanced Session Management**
   - Device trust/approval flow
   - Session expiry warnings
   - Device revocation from settings

5. **Security Audit**
   - Login activity logs
   - Failed login alerts
   - Geographic anomaly detection

6. **Account Recovery**
   - Account deletion with grace period
   - Backup codes
   - Emergency contacts

## References

- [JWT.io](https://jwt.io) - JWT standards and tools
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) - Password hashing
- [Prisma Auth](https://www.prisma.io/docs/guides/other/password-hashing) - Best practices
- [OWASP Auth Cheatsheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
