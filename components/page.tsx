import Head from "next/head";
import Header from "./header";
import Footer from "./footer";
import TopButton from "./topButton";
import { brandName, description, logoURL } from "../shared/shared";

export class PageProps {
  id: any;
  children: any;
  title: string = brandName;
  constructor(data: Partial<PageProps>) {
    Object.assign(this, data);
  }
}

export default function Page({ id, title = brandName, children }: PageProps) {
  return <>
    <Head>
      <title>{title} | {brandName}</title>
      <meta name="description" content={description} />
      <link rel="icon" href={logoURL} />
    </Head>

    <Header />

    <div id={id} title={title} className={`page ${title}`}>
      {children}
    </div>

    <TopButton />

    <Footer />
  </>
}