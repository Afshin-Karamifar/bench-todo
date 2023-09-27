'use client'
import { usePathname } from "next/navigation";
import Link from 'next/link'
import React from 'react'

export default function ManuItem({ href, text }: { href: string, text: string }) {
  const pathname = usePathname();


  return <li className={`govuk-header__navigation-item ${pathname === href ? 'govuk-header__navigation-item--active' : ''}`}>
    <Link className="govuk-header__link" href={href}>
      {text}
    </Link>
  </li>
}
