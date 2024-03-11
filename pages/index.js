import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <head>
        <title>Create Next App</title>
        <meta name="description" />
        <meta name="viewport" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <Header />
      <p>content</p>
      <Footer />
    </>
  );
}
