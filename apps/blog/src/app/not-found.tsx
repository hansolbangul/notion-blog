import ErrorButtonWrap from "@app/ErrorButtonWrap";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="p-6 max-w-md text-center bg-white shadow-lg rounded-lg">
        <ErrorButtonWrap />
      </div>
    </div>
  );
}
