import jwt from 'jsonwebtoken';


const SECRET = process.env.JWT_SECRET || 'change_this_secret';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;


export function signAdminToken(payload: object) {
return jwt.sign(payload, SECRET, { expiresIn: '7d' });
}


export function verifyToken(token: string) {
try {
return jwt.verify(token, SECRET);
} catch (e) {
return null;
}
}


export function validateAdminCredentials(email: string, password: string) {
// Simple credential check — replace with DB lookup in production
if (!ADMIN_EMAIL || !ADMIN_PASSWORD) return false;
return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}