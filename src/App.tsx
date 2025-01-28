import { Footer } from "@layout/Footer";
import { Navbar } from "@layout/Navbar";
import { QRCodeProvider } from "./contexts/QRCodeContext";
import { Home } from "./pages/Home/Home";

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
