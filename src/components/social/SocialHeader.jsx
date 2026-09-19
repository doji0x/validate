import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import MobileMenuSheet from '@/components/nav/MobileMenuSheet';

export default function SocialHeader() {
  return <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-xl">
    <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4">
      <Link to="/" aria-label="Punks home" className="flex items-center gap-2.5"><Image src="https://media.base44.com/images/public/6aa8d3c82020abebe308c467/8d0945030_solana_pixel_avatar_under_1mb.png" alt="Punks logo" className="h-8 w-8 rounded-lg ring-1 ring-primary/30" /><span className="leading-none"><span className="gold-text block font-display font-semibold tracking-[0.14em]">PUNKS</span><span className="mt-1 hidden font-mono text-[7px] tracking-[0.12em] text-muted-foreground sm:block">SOLANA CYPHER PUNKS</span></span></Link>
      <MobileMenuSheet showLabel={false} triggerClassName="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition hover:border-primary/50 hover:text-primary" />
    </div>
  </header>;
}