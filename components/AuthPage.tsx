import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Check, X, ArrowRight, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import StrideBear, { BearState } from './StrideBear';
import { auth, googleProvider } from '../services/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, updateProfile, onAuthStateChanged } from 'firebase/auth';

interface AuthPageProps {
    onNavigate: (view: string) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onNavigate }) => {
    const [view, setView] = useState<'login' | 'signup'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [authError, setAuthError] = useState('');
    const [bearState, setBearState] = useState<BearState>('idle');
    const [lookPercent, setLookPercent] = useState(50);
    const [speechText, setSpeechText] = useState("Hey there! Ready to get productive? 👋");

    // Check if user is already logged in
    useEffect(() => {
        if (auth) {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    onNavigate('home');
                }
            });
            return () => unsubscribe();
        }
    }, [onNavigate]);

    // --- BEAR LOGIC ---

    const handleFocusEmail = () => {
        setBearState('reading');
        setSpeechText("What's your email? 📧");
    };

    const handleFocusPassword = () => {
        if (showPassword) {
            setBearState('cover-eyes');
            setSpeechText("I'm not looking! 🙈");
        } else {
            setBearState('password-typing');
            setSpeechText("Shh... it's a secret! 🔐");
        }
    };

    const handleTogglePassword = () => {
        const nextState = !showPassword;
        setShowPassword(nextState);
        if (nextState) {
            setBearState('cover-eyes');
            setSpeechText("AHH! Cover your eyes! 🙈");
        } else {
            setBearState('idle');
            setSpeechText("Phew! Safe again. 😌");
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        // Map string length to 0-100 range for eye tracking
        const len = e.target.value.length;
        setLookPercent(Math.min(100, Math.max(0, len * 2)));
        if (len > 0 && bearState !== 'reading') setBearState('reading');
    };

    const handleSignupNameFocus = () => {
        setBearState('focus');
        setSpeechText("Nice to meet you! 🤝");
    }

    const handleAuthError = (error: any) => {
        let message = "Something went wrong.";
        setBearState('idle'); 

        switch(error.code) {
            case 'auth/invalid-email':
                message = "Invalid email address.";
                setSpeechText("I can't read that email... 😵‍💫");
                setBearState('reading');
                break;
            case 'auth/user-disabled':
                message = "User account disabled.";
                setSpeechText("Oh no, account blocked 🚫");
                break;
            case 'auth/user-not-found':
            case 'auth/wrong-password':
            case 'auth/invalid-credential':
            case 'auth/invalid-login-credentials':
                message = "Invalid email or password.";
                setSpeechText("Oops! Wrong keys? 🔑");
                setBearState('cover-eyes');
                break;
            case 'auth/email-already-in-use':
                message = "Email already in use.";
                setSpeechText("I know you! Try logging in? 👋");
                setBearState('focus');
                break;
            case 'auth/weak-password':
                message = "Password is too weak (min 6 chars).";
                setSpeechText("Stronger password please! 💪");
                break;
            default:
                message = error.message;
                setSpeechText("Uh oh! System hiccup. 🤒");
                break;
        }
        setAuthError(message);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!auth) {
            setAuthError("Authentication service is unavailable.");
            return;
        }

        setLoading(true);
        setAuthError('');
        setBearState('focus');
        setSpeechText("Checking credentials... 🧐");

        try {
            if (view === 'login') {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                if (password !== confirmPassword) {
                    throw { code: 'custom/password-mismatch', message: "Passwords do not match" };
                }
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                if (name) {
                    await updateProfile(userCredential.user, { displayName: name });
                }
            }

            setLoading(false);
            setBearState('success');
            setSpeechText(view === 'login' ? "Welcome back! 🎉" : "Welcome aboard! 🚀");
            
            // Redirect after celebration
            setTimeout(() => {
                onNavigate('home');
            }, 1500);

        } catch (error: any) {
            setLoading(false);
            if (error.code === 'custom/password-mismatch') {
                setAuthError(error.message);
                setSpeechText("Hmm, those don't match 🤔");
                setBearState('focus');
            } else {
                handleAuthError(error);
            }
        }
    };

    const handleGoogleSignIn = async () => {
        if (!auth || !googleProvider) {
            setAuthError("Google Sign-In unavailable.");
            return;
        }
        try {
            setAuthError('');
            setBearState('success');
            setSpeechText("Connecting to Google... 🌐");
            await signInWithPopup(auth, googleProvider);
            
            setBearState('success');
            setSpeechText("Success! 🎉");
            setTimeout(() => onNavigate('home'), 1500);
        } catch (error: any) {
            console.error(error);
            setBearState('idle');
            setSpeechText("Google sign-in cancelled.");
            // handleAuthError(error); // Optional: show error if it wasn't just a popup closure
        }
    };

    // Reset when switching views
    useEffect(() => {
        setBearState('idle');
        setSpeechText(view === 'login' ? "Welcome back! 👋" : "Ooh, a new friend! 🎉");
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setName('');
        setShowPassword(false);
        setAuthError('');
    }, [view]);

    if (!auth) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                    <AlertCircle size={32} className="text-red-500" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Service Unavailable</h1>
                <p className="text-gray-500 mb-8 max-w-sm">We couldn't connect to the authentication service. This is likely a temporary connection issue.</p>
                <div className="flex gap-4">
                    <button 
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-black text-white hover:bg-gray-800 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2"
                    >
                        <RefreshCw size={18} /> Retry Connection
                    </button>
                    <button 
                        onClick={() => onNavigate('home')}
                        className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-bold text-gray-800 transition-colors"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col md:flex-row font-sans">
            {/* LEFT: CHARACTER ZONE */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-full md:w-1/2 bg-gray-50 flex flex-col items-center justify-center p-8 relative overflow-hidden min-h-[300px] md:min-h-screen"
            >
                {/* Background Decor */}
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                
                {/* Speech Bubble */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={speechText}
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.9 }}
                        className="bg-white border border-gray-200 px-6 py-3 rounded-2xl rounded-bl-none shadow-lg mb-8 max-w-xs text-center z-10"
                    >
                        <p className="text-gray-800 font-medium text-sm md:text-base">{speechText}</p>
                    </motion.div>
                </AnimatePresence>

                <StrideBear state={bearState} lookPercent={lookPercent} />
                
                <div className="mt-8 text-center opacity-0 md:opacity-100 transition-opacity">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Smart Productivity</h2>
                    <p className="text-gray-500 text-sm">Your intelligent workspace companion.</p>
                </div>
            </motion.div>

            {/* RIGHT: FORM ZONE */}
            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-white"
            >
                <div className="w-full max-w-md space-y-8">
                    {/* Header */}
                    <div className="text-center md:text-left">
                        <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center font-bold text-xl mb-6 mx-auto md:mx-0">S</div>
                        <h1 className="text-3xl font-black text-gray-900 mb-2">
                            {view === 'login' ? 'Welcome Back' : 'Create Account'}
                        </h1>
                        <p className="text-gray-500">
                            {view === 'login' ? 'Enter your details to access your workspace.' : 'Start your productivity journey today.'}
                        </p>
                    </div>

                    {/* Tab Switcher */}
                    <div className="flex p-1 bg-gray-100 rounded-xl">
                        <button 
                            onClick={() => setView('login')}
                            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${view === 'login' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Log In
                        </button>
                        <button 
                            onClick={() => setView('signup')}
                            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${view === 'signup' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <AnimatePresence mode="popLayout">
                            {view === 'signup' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-1"
                                >
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Full Name</label>
                                    <input 
                                        type="text" 
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        onFocus={handleSignupNameFocus}
                                        onBlur={() => setBearState('idle')}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                        placeholder="John Doe"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Email Address</label>
                            <input 
                                type="email" 
                                value={email}
                                onChange={handleEmailChange}
                                onFocus={handleFocusEmail}
                                onBlur={() => setBearState('idle')}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Password</label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={handleFocusPassword}
                                    onBlur={() => !showPassword && setBearState('idle')}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all pr-12"
                                    placeholder="••••••••"
                                />
                                <button 
                                    type="button"
                                    onClick={handleTogglePassword}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {view === 'signup' && (
                             <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-1"
                             >
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Confirm Password</label>
                                <input 
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    onFocus={handleFocusPassword}
                                    onBlur={() => setBearState('idle')}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                />
                            </motion.div>
                        )}

                        <div className="flex items-center justify-between pt-2">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" />
                                <span className="text-sm text-gray-500 group-hover:text-black transition-colors">Remember me</span>
                            </label>
                            {view === 'login' && (
                                <button type="button" className="text-sm font-bold text-gray-900 hover:underline">
                                    Forgot password?
                                </button>
                            )}
                        </div>

                        {authError && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center gap-2"
                            >
                                <AlertCircle size={16} />
                                {authError}
                            </motion.div>
                        )}

                        <button 
                            type="submit"
                            disabled={loading}
                            onMouseEnter={() => setBearState('success')} // Excitement preview
                            onMouseLeave={() => setBearState('idle')}
                            className="w-full bg-black text-white font-bold text-lg py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : (
                                <>
                                    {view === 'login' ? 'Log In' : 'Create Account'} 
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Social Auth */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <button 
                        onClick={handleGoogleSignIn}
                        onMouseEnter={() => { setBearState('success'); setSpeechText("Google is fast! ⚡️"); }}
                        onMouseLeave={() => { setBearState('idle'); setSpeechText(view === 'login' ? "Welcome back! 👋" : "Join us! 🎉"); }}
                        className="w-full bg-white border border-gray-200 text-gray-700 font-bold py-3.5 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-3"
                    >
                       <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)"><path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/><path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/><path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/><path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/></g></svg>
                        Google
                    </button>

                    <div className="text-center pt-8">
                        <button onClick={() => onNavigate('home')} className="text-sm font-bold text-gray-400 hover:text-black transition-colors">
                            ← Back to Home
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthPage;