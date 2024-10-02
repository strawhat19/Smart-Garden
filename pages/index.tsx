import Page from "../components/page";
import Main from "../components/main";
import Section from "../components/section";

export default function Home() {
  return (
    <Page id={`home`} title={`Home`}>
      <Main>
        <Section className={`homeSection`} fontColor={`white`} background={`var(--secondaryVariant)`}>
          <h2>Home</h2>
        </Section>
      </Main>
    </Page>
  );
}
