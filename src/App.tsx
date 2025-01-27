import { QRForm } from "@/components/QRForm/QRForm";
import { Footer } from "@layout/Footer";
import { Navbar } from "@layout/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <QRForm />
      </main>
      <Footer />
    </>
  );
}

export default App;
