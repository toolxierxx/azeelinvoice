'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import {
  Menu, X, Moon, Sun, FileText, LayoutDashboard,
  Home, Layers, HelpCircle, Mail, LogIn, UserPlus
} from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const navLinks = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Features', href: '/#features', icon: Layers },
  { label: 'Templates', href: '/#templates', icon: FileText },
 // { label: 'Pricing', href: '/#pricing', icon: FileText },
  { label: 'FAQ', href: '/#faq', icon: HelpCircle },
  { label: 'Contact', href: 'https://azeeltechnologies.com/contact.html', icon: Mail },
 // { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('azeel-theme');
    if (saved === 'dark') { setDark(true); document.documentElement?.classList?.add('dark'); }
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    if (next) { document.documentElement?.classList?.add('dark'); localStorage.setItem('azeel-theme', 'dark'); }
    else { document.documentElement?.classList?.remove('dark'); localStorage.setItem('azeel-theme', 'light'); }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-card/90 backdrop-blur-xl border-b border-border shadow-card'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <AppLogo size={36} />
            <div className="flex flex-col leading-none">
              <span className="font-extrabold text-base text-foreground tracking-tight">Azeel</span>
              <span className="text-xs font-medium text-muted-foreground -mt-0.5">Invoice Easil</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks?.map((link) => (
              <Link key={`nav-${link?.label}`} href={link?.href} className="nav-link">
                {link?.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleDark}
              className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link href="/invoice-generator" className="btn-secondary text-sm px-4 py-2 flex items-center gap-1.5">
              <LogIn size={15} />
              Login
            </Link>
            <Link href="/invoice-generator" className="btn-primary text-sm px-4 py-2 flex items-center gap-1.5">
              <UserPlus size={15} />
              Sign Up Free
            </Link>
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden items-center gap-2">
            <button onClick={toggleDark} className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg hover:bg-muted transition-colors text-foreground"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } bg-card/95 backdrop-blur-xl border-b border-border`}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          {navLinks?.map((link) => {
            const Icon = link?.icon;
            return (
              <Link
                key={`mobile-nav-${link?.label}`}
                href={link?.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/8 transition-colors"
              >
                <Icon size={16} />
                {link?.label}
              </Link>
            );
          })}
          <div className="flex gap-2 mt-3 pt-3 border-t border-border">
            <Link href="/invoice-generator" className="btn-secondary flex-1 text-center text-sm py-2">Login</Link>
            <Link href="/invoice-generator" className="btn-primary flex-1 text-center text-sm py-2">Sign Up Free</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
