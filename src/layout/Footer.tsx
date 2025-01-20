const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="footer footer-center text-base-content/50 p-4 mt-auto">
      <aside>
        <p>Copyright © {currentYear} - All right reserved</p>
      </aside>
    </footer>
  );
}
