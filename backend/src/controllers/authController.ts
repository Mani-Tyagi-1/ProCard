import type { Request, Response } from 'express';
import { User, UserRole } from '../models/User';
import generateToken from '../utils/generateToken';

// Mock OTP storage (In production, use Redis or DB with TTL)
const otpStore = new Map<string, string>();

/**
 * @desc    Send OTP to phone
 * @route   POST /api/auth/send-otp
 * @access  Public
 */
export const sendOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone } = req.body;
    
    if (!phone) {
      res.status(400).json({ message: 'Phone number is required' });
      return;
    }

    // Mock OTP generation
    const otp = '123456'; // Static for development
    otpStore.set(phone, otp);

    console.log(`[MOCK OTP] Sent ${otp} to ${phone}`);

    res.status(200).json({ message: 'OTP sent successfully', mockOtp: otp });
  } catch (error) {
    res.status(500).json({ message: 'Error sending OTP', error });
  }
};

/**
 * @desc    Verify OTP and Login/Register
 * @route   POST /api/auth/verify-otp
 * @access  Public
 */
export const verifyOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone, otp, role = UserRole.BUYER } = req.body;

    if (!phone || !otp) {
      res.status(400).json({ message: 'Phone and OTP are required' });
      return;
    }

    const validOtp = otpStore.get(phone);

    if (validOtp !== otp) {
      res.status(401).json({ message: 'Invalid or expired OTP' });
      return;
    }

    // OTP is valid, clear it
    otpStore.delete(phone);

    // Check if user exists, else create
    let user = await User.findOne({ phone });

    if (!user) {
      user = await User.create({
        phone,
        role,
        isVerified: true
      });
    }
    const token = generateToken(user._id.toString(), user.role);
    res.status(200).json({
      message: 'Authentication successful',
      token,
      user: {
        id: user._id,
        phone: user.phone,
        role: user.role,
        fullName: user.fullName
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying OTP', error });
  }
};
