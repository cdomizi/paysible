const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="footer footer-center mt-auto p-4 text-base-content/50">
      <aside>
        <p>Copyright © {currentYear} - All rights reserved</p>
      </aside>
    </footer>
  );
}
