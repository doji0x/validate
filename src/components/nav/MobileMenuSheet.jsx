import React, { useState } from 'react';
import { Github, MessageSquare, Menu, Plus, Rocket, Sparkles, User, Home, Image as ImageIcon, ListOrdered } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { usePhantomWallet } from '@/contexts/PhantomWalletContext';
import FlyIcon from '@/components/icons/FlyIcon';
import WalletButton from '@/components/wallet/WalletButton';

export default function MobileMenuSheet({ triggerClassName = 'flex h-full w-full flex-col items-center justify-center gap-1 text-muted-foreground transition hover:text-primary', showLabel = true }) {
  const [open, setOpen] = useState(false);
  const { address } = usePhantomWallet();
  const main = [
    { to: '/', label: 'Punks', icon: Home },
    { to: '/inscribe', label: 'Inscribe', icon: Plus },
    { to: '/launch', label: 'Launch', icon: Rocket },
    { to: '/proof-of-fart', label: 'Proof of Fart', icon: FlyIcon },
    { to: '/feed', label: 'Feed', icon: MessageSquare },
    { to: address ? `/profile/${address}` : '/feed', label: 'Profile', icon: User }
  ];
  const admin = [
    { to: '/admin/mint', label: 'Mint console', icon: ImageIcon },
    { to: '/admin/mints', label: 'Mint records', icon: ListOrdered },
    { to: '/admin/astra', label: 'Astra', icon: Sparkles }
  ];
  const row = 'flex items-center gap-3 rounded-lg border border-border/60 bg-card px-3 py-3 text-sm font-medium text-foreground transition hover:border-primary/50';
  return <Sheet open={open} onOpenChange={setOpen}>
    <SheetTrigger aria-label="Open menu" className={triggerClassName}>
      <Menu className="h-5 w-5" />{showLabel && <span className="text-[9px] font-medium">Menu</span>}
    </SheetTrigger>
    <SheetContent side="right" className="w-[82vw] max-w-xs overflow-y-auto">
      <SheetHeader><SheetTitle className="gold-text font-display tracking-[0.14em]">MENU</SheetTitle></SheetHeader>
      <nav className="mt-6 flex flex-col gap-2">
        {main.map(item => { const Icon = item.icon; return <Link key={item.label} to={item.to} onClick={() => setOpen(false)} className={row}><Icon className="h-4 w-4 text-primary" />{item.label}</Link>; })}
        <div className="flex items-center justify-between rounded-lg border border-border/60 bg-card px-3 py-2"><span className="text-sm font-medium text-foreground">Wallet</span><WalletButton /></div>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Admin</p>
        {admin.map(item => { const Icon = item.icon; return <Link key={item.label} to={item.to} onClick={() => setOpen(false)} className={row}><Icon className="h-4 w-4 text-primary" />{item.label}</Link>; })}
        <a href="https://github.com/doji0x/validate" target="_blank" rel="noreferrer" className={`mt-4 ${row}`}><Github className="h-4 w-4 text-primary" />GitHub</a>
      </nav>
    </SheetContent>
  </Sheet>;
}