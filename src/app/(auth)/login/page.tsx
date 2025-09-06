"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, LogIn, RefreshCw, Check, Fingerprint, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from '@/context/app-context';
import { loginAction } from './actions';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { setUser } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mfaStep, setMfaStep] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mfaCode, setMfaCode] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const result = await loginAction(formData);

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: result.error,
      });
      setIsLoading(false);
    } else if (result.user) {
      if (result.mfaRequired) {
        setMfaStep(true);
      } else {
        setUser(result.user);
        toast({
          title: 'Login Successful',
          description: `Welcome back, ${result.user.name}!`,
        });
        router.push('/dashboard');
      }
    }
    setIsLoading(false);
  };
  
  const handleMfaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // In a real app, you'd verify the MFA code. Here we simulate success.
    setTimeout(() => {
       const formData = new FormData();
        formData.append('email', email);
        loginAction(formData).then(result => {
             if (result.user) {
                setUser(result.user);
                toast({
                    title: 'Login Successful',
                    description: `Welcome back, ${result.user.name}!`,
                });
                router.push('/dashboard');
             } else {
                 toast({ variant: 'destructive', title: 'MFA Failed', description: 'Could not complete login.' });
                 setMfaStep(false);
             }
        });
        setIsLoading(false);
    }, 1000);
  };


  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-lg">
        <CardHeader className="text-center">
          <div className="mx-auto rounded-xl p-3 w-16 h-16 flex items-center justify-center mb-4 bg-gradient-to-r from-pink-100 to-blue-100">
             <Scale className="w-8 h-8 text-pink-500" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
            LEXISEARCH AI
          </CardTitle>
          <CardDescription>Smarter Access to Court Records</CardDescription>
        </CardHeader>
        <CardContent>
          {!mfaStep ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1" htmlFor="email">Email</label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@global-legal.com"
                  required
                  autoComplete="email"
                  className="bg-white/50 dark:bg-zinc-800/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1" htmlFor="password">Password</label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                    className="bg-white/50 dark:bg-zinc-800/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <Button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:opacity-90 transition-opacity">
                {isLoading ? <RefreshCw className="w-5 h-5 mr-2 animate-spin" /> : <LogIn className="w-5 h-5 mr-2" />}
                Sign In
              </Button>
            </form>
          ) : (
             <form onSubmit={handleMfaSubmit} className="space-y-4 text-center">
                <div className="mx-auto bg-primary/10 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                    <Fingerprint className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Two-Factor Authentication</h2>
                <p className="text-muted-foreground">Enter the code from your authenticator app</p>
                <div>
                   <label className="sr-only" htmlFor="mfa">Authentication Code</label>
                    <Input
                        id="mfa"
                        type="text"
                        value={mfaCode}
                        onChange={(e) => setMfaCode(e.target.value)}
                        className="text-center text-2xl tracking-widest bg-white/50 dark:bg-zinc-800/50"
                        placeholder="000000"
                        maxLength={6}
                        required
                    />
                </div>
                <Button type="submit" disabled={isLoading || mfaCode.length !== 6} className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:opacity-90 transition-opacity">
                    {isLoading ? <RefreshCw className="w-5 h-5 mr-2 animate-spin" /> : <Check className="w-5 h-5 mr-2" />}
                    Verify
                </Button>
                 <Button variant="outline" onClick={() => setMfaStep(false)} className="w-full">Back to Login</Button>
            </form>
          )}
           <div className="mt-6 text-center text-xs text-muted-foreground">
             <p className="font-bold">Test Credentials:</p>
             <p>admin@global-legal.com / password123</p>
             <p>superadmin@global-legal.com / superpass123</p>
             <p>user@global-legal.com / userpass123</p>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
