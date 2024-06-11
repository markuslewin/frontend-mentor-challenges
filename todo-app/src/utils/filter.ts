import { useSearchParams } from "react-router-dom";
import { z } from "zod";

const filterKey = "filter";
const filterSchema = z.enum(["active", "completed"]);

export type Filter = z.infer<typeof filterSchema>;

type FilterInput = Filter | null;

export function useFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const result = filterSchema.safeParse(searchParams.get(filterKey));
  const filter = result.success ? result.data : null;

  return {
    filter,
    setFilter(filter: FilterInput) {
      setSearchParams(
        filter === null
          ? {}
          : {
              [filterKey]: filter,
            }
      );
    },
  };
}
