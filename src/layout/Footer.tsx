const currentYear = new Date().getFullYear().toString();

export function Footer() {
  return (
    <footer className="footer footer-center mt-auto p-4 text-base-content/50">
      <aside>
        <p>Copyright &copy; {currentYear} - All rights reserved</p>
        <p className="text-xs">
          &quot;QR Code&quot; is a registered trademark of DENSO WAVE
          INCORPORATED
        </p>
      </aside>
    </footer>
  );
}
