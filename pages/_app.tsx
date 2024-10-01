import '../globals.scss';
import * as React from "react";
import type { AppProps } from 'next/app';
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
const MyApp: React.FC<any> = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />;
export default MyApp
