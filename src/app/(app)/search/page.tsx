
import { PageHeader } from '@/components/shared/page-header';
import { getCases } from '@/lib/data';
import { SearchClientPage } from './client-page';

export default async function SearchPage() {
  const cases = getCases();
  const states = [...new Set(cases.map(c => c.State).filter(Boolean))];
  const districts = [...new Set(cases.map(c => c.District).filter(Boolean))];
  const establishments = [...new Set(cases.map(c => c.Establishment).filter(Boolean))];
  const disposalNatures = [...new Set(cases.map(c => c.Disposal_Nature).filter(Boolean))];

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
