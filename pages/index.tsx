import Page from "../components/page";
import Main from "../components/main";
import Section from "../components/section";
import { brandName } from "../shared/shared";

export default function Home() {
  return (
    <Page id={`home`} title={brandName}>
      <Main>
        <Section className={`homeSection`} fontColor={`white`} background={`var(--secondaryVariant)`}>
          <h2>Home</h2>
        </Section>
      </Main>
    </Page>
  );
}
