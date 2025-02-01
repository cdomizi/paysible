import { GeneratorForm } from "@components/GeneratorForm/GeneratorForm";
import { QRCode } from "@components/QRCode/QRCode";

export function Home() {
  return (
    <div
      id="home"
      className="container mx-auto flex flex-col flex-nowrap items-center justify-center md:flex-row md:items-stretch md:gap-20"
    >
      <GeneratorForm />
      <QRCode />
    </div>
  );
}
