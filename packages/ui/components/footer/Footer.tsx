import Character from "../brand/Character";
export default function Footer() {
  return (
    <footer className="journal-footer">
      <div className="journal-shell footer-inner">
        <div className="footer-brand">
          <img src="/api/og?kind=icon" alt="" width="34" height="34" />
          <strong>istp.builders</strong>
          <span>계속 만드는 중.</span>
        </div>
        <div>
          <a href="https://github.com/hansolbangul">GitHub ↗</a>
          <span>© {new Date().getFullYear()} HANSOL JI</span>
        </div>
        <Character pose="back" className="footer-character" />
      </div>
    </footer>
  );
}
