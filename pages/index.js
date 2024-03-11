import Layout from "@/layout";
import { useEffect } from "react";
import Image from "next/image";

export default function Home() {
  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((res) => console.log("response =>", res))
      .catch((err) => console.log("error =>", err));
  }, []);
  return (
    <>
      <Layout metaTitle="Home" metaDescription="halaman home">
        <p>Home</p>
        <Image src="/next.png" width={300} height={300} alt="next-image" />
        <img src="/next.png" width={300} height={300} alt="html-img" />
      </Layout>
    </>
  );
}
