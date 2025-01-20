import { QRform } from "@components/QRform/QRform";
import { Footer } from "@layout/Footer";
import { Navbar } from "@layout/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <QRform />
      </main>
      <Footer />
    </>
  );
}

export default App;
