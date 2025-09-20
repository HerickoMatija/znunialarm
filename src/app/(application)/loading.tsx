export default async function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="flex min-h-[250px] flex-col items-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-teal-600" />
          <div className="text-gray-600">Wird geladen...</div>
        </div>
      </div>
    </div>
  )
}
