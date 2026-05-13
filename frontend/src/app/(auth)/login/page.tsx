'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1); // 1: Phone, 2: OTP
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mockOtpMsg, setMockOtpMsg] = useState('');

  const handleSendOtp = async () => {
    if (!phone || phone.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      const res = await axios.post('http://localhost:5000/api/auth/send-otp', { phone });
      
      // In development, our mock backend returns the OTP directly in the response
      if (res.data.mockOtp) {
        setMockOtpMsg(`Mock OTP is: ${res.data.mockOtp}`);
      }
      
      setStep(2);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', { 
        phone, 
        otp: otpString,
        role: 'seller' 
      });
      
      // Store token
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple chars
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6 relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors z-20">
        <ArrowLeft className="size-4" />
        <span className="text-sm font-medium">Back to Home</span>
      </Link>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white/[0.02] border border-white/5 backdrop-blur-xl p-8 rounded-3xl z-10 shadow-2xl shadow-black/50"
      >
        <div className="flex justify-center mb-8">
          <div className="size-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
            <Zap className="size-6 text-white" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-2">Welcome Back</h1>
        <p className="text-muted-foreground text-center mb-8 text-sm">
          {step === 1 ? 'Log in to manage your products and track sales.' : `We've sent a code to ${phone}`}
        </p>

        {error && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-lg text-center">
            {error}
          </div>
        )}
        
        {mockOtpMsg && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 text-green-400 text-sm rounded-lg text-center font-mono">
            {mockOtpMsg}
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.form 
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
              onSubmit={(e) => { e.preventDefault(); handleSendOtp(); }}
            >
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 9876543210"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" 
                />
              </div>
              
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground font-semibold rounded-xl px-4 py-3 mt-6 hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? 'Sending...' : 'Send OTP'}
                {!loading && <ArrowRight className="size-4" />}
              </button>
            </motion.form>
          ) : (
            <motion.form 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
              onSubmit={(e) => { e.preventDefault(); handleVerifyOtp(); }}
            >
              <div className="flex justify-between gap-2">
                {otp.map((digit, index) => (
                  <input 
                    key={index}
                    id={`otp-${index}`}
                    type="text" 
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    maxLength={1} 
                    className="w-12 h-14 text-center text-xl font-bold bg-background border border-white/20 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                  />
                ))}
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground font-semibold rounded-xl px-4 py-3 mt-6 hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? 'Verifying...' : 'Verify & Login'}
                {!loading && <CheckCircle2 className="size-4" />}
              </button>
              
              <div className="text-center">
                <button 
                  type="button" 
                  onClick={() => { setStep(1); setOtp(['','','','','','']); setMockOtpMsg(''); }}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Change phone number
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {step === 1 && (
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/signup" className="text-primary font-medium hover:underline">
              Sign up here
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
