import { GeneratorForm } from "@/components/GeneratorForm/GeneratorForm";
import { QRCode } from "@/components/QRCode/QRCode";

export function Home() {
  return (
    <div
      id="home"
      className="container mx-auto flex flex-col flex-nowrap md:flex-row lg:max-w-48"
    >
      <GeneratorForm />
      <QRCode />
    </div>
  );
}
