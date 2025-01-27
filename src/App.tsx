import { GeneratorForm } from "@/components/GeneratorForm/GeneratorForm";
import { Footer } from "@layout/Footer";
import { Navbar } from "@layout/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <GeneratorForm />
      </main>
      <Footer />
    </>
  );
}

export default App;
