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
      </Layout>
    </>
  );
}
