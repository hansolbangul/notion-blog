const queryKeys = {
  all: ["post"] as const,
  detail: (slug: string) => [...queryKeys.all, "detail", slug] as const,
  category: () => [...queryKeys.all, "category"] as const,
  tags: () => [...queryKeys.all, "tag"] as const,
};

const postQueryOptions = {
  all: () => ({
    queryKey: queryKeys.all,
  }),
  detail: (slug: string) => ({
    queryKey: queryKeys.detail(slug),
  }),
  category: () => ({
    queryKey: queryKeys.category(),
  }),
  tags: () => ({
    queryKey: queryKeys.tags(),
  }),
};

export default postQueryOptions;
