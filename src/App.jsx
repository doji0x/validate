import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
// Add page imports here
import Home from '@/pages/Home';
import AdminMint from '@/pages/AdminMint';
import AdminMints from '@/pages/AdminMints';
import AdminAstra from '@/pages/AdminAstra';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import ProtectedRoute from '@/components/ProtectedRoute';
import PublicLaunch from '@/pages/PublicLaunch';
import PublicInscribe from '@/pages/PublicInscribe';
import Feed from '@/pages/Feed';
import SocialProfile from '@/pages/SocialProfile';
import ProofOfFart from '@/pages/ProofOfFart';
import PhantomWalletProvider from '@/contexts/PhantomWalletContext';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/launch" element={<PublicLaunch />} />
      <Route path="/inscribe" element={<PublicInscribe />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/profile/:wallet" element={<SocialProfile />} />
      <Route path="/proof-of-fart" element={<ProofOfFart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login?returnTo=%2Fadmin%2Fmint" replace />} />}>
        <Route path="/admin/mint" element={<AdminMint />} />
      </Route>
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login?returnTo=%2Fadmin%2Fmints" replace />} />}>
        <Route path="/admin/mints" element={<AdminMints />} />
      </Route>
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login?returnTo=%2Fadmin%2Fastra" replace />} />}>
        <Route path="/admin/astra" element={<AdminAstra />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <PhantomWalletProvider>
            <ScrollToTop />
            <AuthenticatedApp />
          </PhantomWalletProvider>
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
