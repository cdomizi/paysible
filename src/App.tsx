import { Footer } from "@layout/Footer";
import { Navbar } from "@layout/Navbar";
import { Home } from "@pages/Home/Home";
import { QRCodeProvider } from "./contexts/QRCodeContext";

function App() {
  return (
    <QRCodeProvider>
      <Navbar />
      <main>
        <Home />
      </main>
      <Footer />
    </QRCodeProvider>
  );
}

export default App;
