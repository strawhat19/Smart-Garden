import 'react-toastify/dist/ReactToastify.css';

import Head from 'next/head';
import Header from './header';
import Footer from './footer';
import TopButton from './topButton';
import { ToastContainer } from 'react-toastify';
import { brandName, description, logoURL } from '../shared/shared';

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
      <link rel={`icon`} href={logoURL} />
      <title>{`${title} | ${brandName}`}</title>
      <meta name={`description`} content={description} />
    </Head>

    <Header />

    <ToastContainer
      draggable
      rtl={false}
      closeOnClick
      theme={`dark`}
      autoClose={3500}
      pauseOnFocusLoss
      newestOnTop={false}
      pauseOnHover={false}
      hideProgressBar={false}
      position={`bottom-left`}
    />

    <div id={id} className={`page ${title}`}>
      {children}
    </div>

    <TopButton />

    <Footer />
  </>
}