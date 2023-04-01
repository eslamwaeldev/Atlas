import Intro from "@/components/Intro";
import Landing from "@/components/Landing";
import Search from "@/components/Search";
import { IParallax, Parallax, ParallaxLayer } from "@react-spring/parallax";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

export default function Home() {
  const parallax = useRef<IParallax>(null!);
  const router = useRouter();
  useEffect(() => {
    const { search } = router.query;
    console.log(search);
    if (search) {
      parallax.current.scrollTo(2.5);
    }
  }, [router.query]);
  return (
    <>
      <Head>
        <title>Atlas</title>
        <meta name="description" content="A website that provides information about countries" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon" />
      </Head>
      <main className="w-screen h-full min-h-screen  antialiased ">
        <Parallax ref={parallax} pages={3.25}>
          <ParallaxLayer speed={-0.6}>
            <Landing parallax={parallax} />
          </ParallaxLayer>
          <ParallaxLayer offset={1.3} speed={-0.3}>
            <Intro parallax={parallax} />
          </ParallaxLayer>
          <ParallaxLayer offset={2.3} speed={0.2}>
            <Search parallax={parallax} />
          </ParallaxLayer>
        </Parallax>
      </main>
    </>
  );
}
