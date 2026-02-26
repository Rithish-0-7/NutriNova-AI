import bcrypt from 'bcrypt';
import { z } from 'zod';
import { User } from '../models/User.js';
import { signAccessToken, signRefreshToken } from '../services/token.service.js';

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  goal: z.string().optional()
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export async function register(req, res, next) {
  try {
    const payload = registerSchema.parse(req.body);
    const existing = await User.findOne({ email: payload.email });
    if (existing) return res.status(409).json({ message: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const user = await User.create({ ...payload, password: hashedPassword });

    const tokenPayload = { sub: user._id.toString(), email: user.email };
    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email, goal: user.goal },
      accessToken: signAccessToken(tokenPayload),
      refreshToken: signRefreshToken(tokenPayload)
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const payload = loginSchema.parse(req.body);
    const user = await User.findOne({ email: payload.email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(payload.password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const tokenPayload = { sub: user._id.toString(), email: user.email };
    res.status(200).json({
      user: { id: user._id, name: user.name, email: user.email, goal: user.goal },
      accessToken: signAccessToken(tokenPayload),
      refreshToken: signRefreshToken(tokenPayload)
    });
  } catch (error) {
    next(error);
  }
}
