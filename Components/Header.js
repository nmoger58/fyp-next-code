'use client';

import React from 'react';
import Link from 'next/link';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/translations';

const Header = (props) => {
  const { language } = useLanguage();
  
  return (
    <div className='bg-slate-800 flex items-center justify-between p-3'>
      <h2>{props.power}</h2>
      <div className='flex gap-8 items-center'>
        <Link href='/About'>About</Link>
        <Link href='/Careers'>Careers</Link>
        <Link href='/Story'>Story</Link>
        <Link href='/Help'>Help</Link>
        <LanguageSelector />
      </div>
    </div>
  );
};

export default Header;
