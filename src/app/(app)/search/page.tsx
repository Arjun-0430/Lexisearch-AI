import { PageHeader } from '@/components/shared/page-header';
import { getCases } from '@/lib/data';
import { SearchClientPage } from './client-page';

export default async function SearchPage() {
  const cases = getCases();
  const states = [...new Set(cases.map(c => c.State))];
  const districts = [...new Set(cases.map(c => c.District))];
  const establishments = [...new Set(cases.map(c => c.Establishment))];
  const disposalNatures = [...new Set(cases.map(c => c.Disposal_Nature))];

  return (
    <>
      <PageHeader
        title="Global Search"
        description="Search across legal databases with AI-powered filtering and ranking."
      />
      <SearchClientPage
        states={states}
        districts={districts}
        establishments={establishments}
        disposalNatures={disposalNatures}
      />
    </>
  );
}
