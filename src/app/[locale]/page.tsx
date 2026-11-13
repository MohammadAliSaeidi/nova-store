import { getTranslations } from 'next-intl/server';
import styled from 'styled-components';

const FoundationPage = styled.main`
  width: min(100% - 2rem, 72rem);
  margin-inline: auto;
  padding-block: 4rem;
`;

export default async function HomePage() {
  const t = await getTranslations('foundation');

  return (
    <FoundationPage>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </FoundationPage>
  );
}
