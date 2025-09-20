'use client' // Error boundaries must be Client Components

import { Button } from '@/components/catalyst/button';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  /*
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
  */

  return (
    <div className="flex-1">
      <div className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">Etwas ist schiefgelaufen!</h1>
          <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">Etwas ist schiefgelaufen, bitte laden Sie die Seite neu und versuchen Sie es erneut!</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button onClick={() => reset()}>Erneut versuchen</Button>
            <Button href="mailto:support@yumalarm.com" className="text-sm font-semibold" plain>
              Support kontaktieren
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
