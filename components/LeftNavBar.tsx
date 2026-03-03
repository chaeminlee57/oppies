'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from './LeftNavBar.module.scss';
import { playfairDisplay } from '../app/fonts';
import { House, Newspaper, PenLine, User, Mail } from 'lucide-react';

const navItems = [
  { href: '/', icon: House, label: 'Home' },
  { href: '/feed', icon: Newspaper, label: 'Feed' },
  { href: '/write', icon: PenLine, label: 'Write' },
  { href: '/about', icon: User, label: 'About' },
  { href: '/contact', icon: Mail, label: 'Contact' },
];

export default function LeftNavBar() {
  const pathname = usePathname();

  return (
    <nav className={`${styles.navWrapper} ${playfairDisplay.variable}`}>
      {navItems.map(({ href, icon: Icon, label }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className={`${styles.navLink} ${isActive ? styles.active : ''}`}
            aria-label={label}
          >
            {isActive && (
              <motion.span
                layoutId="activeNavIndicator"
                className={styles.activeBackground}
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
            <Icon className={styles.navItem} strokeWidth={1.8} />
          </Link>
        );
      })}
    </nav>
  );
}