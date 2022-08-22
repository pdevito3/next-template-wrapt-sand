import Header from "./header";
import { PrivateHeader } from "./PrivateHeader";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <PrivateHeader />
      <main>{children}</main>
    </>
  );
}
