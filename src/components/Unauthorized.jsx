export default function Unauthorized() {
  return (
    <div className="h-screen flex items-center justify-center text-center text-red-600 text-5xl">
      <p>
        You are not authorized to access dashboard without verifying your
        identity
      </p>
    </div>
  );
}
