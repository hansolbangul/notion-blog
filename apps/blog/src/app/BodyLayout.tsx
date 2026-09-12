import CrossView from "@blog/ui/components/layouts/CrossView";

export default function BodyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CrossView>{children}</CrossView>;
}
