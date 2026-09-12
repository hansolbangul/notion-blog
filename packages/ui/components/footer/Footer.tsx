export default function Footer() {
  return (
    <footer className="journal-footer">
      <div className="journal-shell footer-inner">
        <div>
          <strong>데굴데굴.</strong>
          <p>배우고, 만들고, 기록하며 앞으로.</p>
        </div>
        <div>
          <a href="https://github.com/hansolbangul">GitHub ↗</a>
          <a href="https://www.linkedin.com/in/hansolbangul/">LinkedIn ↗</a>
          <span>© {new Date().getFullYear()} HANSOL JI</span>
        </div>
      </div>
    </footer>
  );
}
