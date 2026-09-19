import React from 'react';
import { Rocket, User } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { Link, useLocation } from 'react-router-dom';
import { usePhantomWallet } from '@/contexts/PhantomWalletContext';
import FlyIcon from '@/components/icons/FlyIcon';

export default function ValidateBottomBar() {
  const { pathname } = useLocation();
  const { address } = usePhantomWallet();
  const tabs = [
    { to: '/', label: 'Punks', logo: true, active: pathname === '/' },
    { to: '/launch', label: 'Launch', icon: Rocket, active: pathname === '/launch' },
    { to: '/proof-of-fart', label: 'POF', icon: FlyIcon, active: pathname === '/proof-of-fart' },
    { to: address ? `/profile/${address}` : '/feed', label: 'Profile', icon: User, active: pathname.startsWith('/profile/') }
  ];
  return <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl">
    <div className="mx-auto grid h-16 max-w-md grid-cols-4">{tabs.map(tab => { const Icon = tab.icon; return <Link key={tab.label} to={tab.to} aria-label={tab.label} className={`relative flex h-full flex-col items-center justify-center gap-1 transition ${tab.active ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>{tab.active && <span className="absolute top-1.5 h-1 w-1 rounded-full bg-primary" />}{tab.logo ? <Image src="https://media.base44.com/images/public/6aa8d3c82020abebe308c467/8d0945030_solana_pixel_avatar_under_1mb.png" alt="" className={`h-5 w-5 rounded ${tab.active ? 'ring-1 ring-primary/60' : 'grayscale opacity-60'}`} /> : <Icon className="h-5 w-5" />}<span className="text-[9px] font-medium">{tab.label}</span></Link>; })}</div>
  </nav>;
}