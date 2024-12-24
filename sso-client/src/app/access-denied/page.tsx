export default function AccessDenied() {
  return (
    <div className="p-8 rounded-lg shadow-lg text-center">
      <img alt="A lock icon representing access denied" className="mx-auto mb-4" height="150" src="https://storage.googleapis.com/a1aa/image/epehzgDLiRsf4oz7VpOJaUgJiTYEUU3tt4IXIojPwsnyd57nA.jpg" width="150" />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Access Denied
      </h1>
      <p className="text-gray-600 mb-4">
        You do not have permission to view this page.
      </p>
      <a className="inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition" href="/">
        Go to Homepage
      </a>
    </div>
  );
}
