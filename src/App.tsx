import { Footer } from "@layout/Footer";
import { Navbar } from "@layout/Navbar";
import { Home } from "./pages/Home/Home";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Home />
      </main>
      <Footer />
    </>
  );
}

export default App;
