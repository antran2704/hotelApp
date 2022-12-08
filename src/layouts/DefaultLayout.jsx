import NavbarFooter from "../component/Navbar/NavbarFooter/NavbarFooter";
import "./layout.scss";

function DefaultLayout({ children }) {
  return (
    <main className="container">
      <div className="content">
        <section className="default">
          {children}
          <NavbarFooter />
        </section>
      </div>
    </main>
  );
}

export default DefaultLayout;
