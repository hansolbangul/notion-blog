const queryKeys = {
  all: ["page"] as const,
  detail: (slug: string) => [...queryKeys.all, "detail", slug] as const,
};

const pageQueryOptions = {
  all: () => ({
    queryKey: queryKeys.all,
  }),
  detail: (slug: string) => ({
    queryKey: queryKeys.detail(slug),
  }),
};

export default pageQueryOptions;
