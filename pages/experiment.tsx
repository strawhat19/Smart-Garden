import Page from '../components/page';
import Main from '../components/main';
import { Swapy, createSwapy } from 'swapy';
import Section from '../components/section';
import { useContext, useState } from 'react';
import { ROLES } from '../shared/types/users';
import { Plant } from '../shared/types/plants';
import React, { useEffect, useRef } from 'react';
import CustomImage from '../components/customImage';
import { devEnv, guest, logoURL, sharedDatabase } from '../shared/shared';

export default function Experiments() {
  let swapyRef = useRef<Swapy | null>(null);
  let [swapping, setSwapping] = useState(false);
  let { user } = useContext<any>(sharedDatabase);
  let containerRef = useRef<HTMLDivElement>(null);

  return <>
    <Page id={`experiments`} title={`Experiments`}>
      <Main className={`experiments`} desc={`Testing Things`}>
        <Section className={`experimentsSection`} fontColor={`white`} background={`var(--secondaryVariant)`}>
          <h2>Experiments</h2>
        </Section>
      </Main>
    </Page>
  </>
}