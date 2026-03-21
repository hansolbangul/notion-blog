import ErrorButtonWrap from "@app/ErrorButtonWrap";

export default function NotFound() {
  return (
    <section className="flex min-h-[calc(100vh-18rem)] items-center justify-center py-10">
      <div className="w-full max-w-[880px] border border-line bg-paper-strong p-6 shadow-editorial sm:p-8">
        <ErrorButtonWrap />
      </div>
    </section>
  );
}
