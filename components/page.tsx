import "react-toastify/dist/ReactToastify.css";

import Head from "next/head";
import Header from "./header";
import Footer from "./footer";
import TopButton from "./topButton";
import { ToastContainer } from "react-toastify";
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
      <link rel="icon" href={logoURL} />
      <title>{`${title} | ${brandName}`}</title>
      <meta name="description" content={description} />
    </Head>

    <Header />

    <ToastContainer
      hideProgressBar={false}
      position={`bottom-left`}
      pauseOnHover={false}
      newestOnTop={false}
      autoClose={3500}
      pauseOnFocusLoss
      theme={`dark`}
      closeOnClick
      rtl={false}
      draggable
    />

    <div id={id} title={title} className={`page ${title}`}>
      {children}
    </div>

    <TopButton />

    <Footer />

    <script src="https://code.jquery.com/jquery-3.6.0.min.js" defer></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" defer></script>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
  </>
}