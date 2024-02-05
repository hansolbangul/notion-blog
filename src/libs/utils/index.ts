export function formatDate(date: any, local: any) {
  const d = new Date(date);
  const options: any = { year: "numeric", month: "short", day: "numeric" };
  const res = d.toLocaleDateString(local, options);
  return res;
}

export function escapeRegExp(param: string) {
  return param.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}
