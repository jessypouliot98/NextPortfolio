import { useCallback } from "react";
import { useRouter } from "next/router";

export const useFilterQuery = () => {
  const router = useRouter();
  const query = router.query;
  const filter = query.filter;

  const parsedFilter = typeof filter === 'string' ? filter.split(',') : [];

  const handleClearFilter = useCallback(async () => {
    await router.replace(router.route, { query: undefined });
  }, [router]);

  return {
    hasFilter: parsedFilter.length > 0,
    filter: parsedFilter,
    clearFilter: handleClearFilter,
  };
};
