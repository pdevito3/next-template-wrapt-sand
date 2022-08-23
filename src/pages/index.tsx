import Layout from "@/components/layout";
import Head from "next/head";

export default function Home() {
  return (
    <>
      {/* TODO head update */}
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>home</Layout>
    </>
  );
}
