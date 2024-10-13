import dynamic from "next/dynamic";

const ErrorButtonWrap = dynamic(() => import("@app/ErrorButtonWrap"), {
  ssr: false,
});

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen p-4 relative">
      <div className="p-6 max-w-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <ErrorButtonWrap />
      </div>
    </div>
  );
}
