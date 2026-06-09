import Link from "next/link";

import { navItems } from "@/lib/site-data";

export function RootPageNav() {
  return (
    <nav className="nav rootPageNav">
      <Link className="brand" href="/">
        <img src="/images/logo.png" alt="H&Y duple" />
      </Link>
      <input className="navToggle" id="root-nav-toggle" type="checkbox" />
      <label className="navMenuButton" htmlFor="root-nav-toggle" aria-label="メニューを開く">
        <span />
        <span />
        <span />
      </label>
      <div className="navLinks">
        {navItems.map((item) => (
          <Link href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function RootPageFooter() {
  return (
    <footer className="footer footerA">
      <img src="/images/footer-logo.png" alt="H&Y duple" />
      <p>copyright H&Y duple All Rights Reserved.</p>
    </footer>
  );
}
