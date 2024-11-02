import CrossView from "@blog/ui/components/layouts/CrossView";
import ViewToggle from "@app/ViewToggle";

export default function BodyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CrossView>
      {children}
      <ViewToggle />
    </CrossView>
  );
}
