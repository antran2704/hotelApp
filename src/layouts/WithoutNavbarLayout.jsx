import "./layout.scss";

function WithoutNavbarLayout({ children }) {
  return (
    <main className="container">
      <div className="content">
        <div className="default">
          {children}
        </div>
      </div>
    </main>
  );
}

export default WithoutNavbarLayout;
