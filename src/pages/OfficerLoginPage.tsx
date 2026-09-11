import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Shield, ArrowRight, Lock, User } from 'lucide-react';

export function OfficerLoginPage() {
  const { navigate, t } = useApp();
  const [email, setEmail] = useState('officer.ravi@up.gov.in');
  const [password, setPassword] = useState('demo1234');

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-primary-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">{t('officer.login')}</h1>
          <p className="text-sm text-neutral-400">Government / Department Access</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="space-y-4">
            <div>
              <label className="label">Officer ID / Email</label>
              <div className="relative">
                <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  className="input pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="officer@up.gov.in"
                />
              </div>
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  className="input pl-10"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button onClick={() => navigate('officerDashboard')} className="btn-primary btn-lg w-full">
              Sign In to Dashboard
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-neutral-200">
            <p className="text-xs text-neutral-400 text-center">
              Demo credentials pre-filled. Click Sign In to explore the officer dashboard.
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <button onClick={() => navigate('home')} className="text-sm text-neutral-400 hover:text-white transition-colors">
            Back to Citizen View
          </button>
        </div>
      </div>
    </div>
  );
}
