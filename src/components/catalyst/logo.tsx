import clsx from 'clsx'
import React from 'react'

type LogoProps = {
  src?: string | null
  square?: boolean
  initials?: string
  alt?: string
  className?: string
}

export function Logo({
  src = null,
  initials,
  alt = '',
  className,
  ...props
}: LogoProps & React.ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      data-slot="logo"
      {...props}
      className={clsx(
        className,
        // Basic layout
        'inline-grid shrink-0 align-middle [--logo-radius:20%] [--ring-opacity:20%] *:col-start-1 *:row-start-1',
        // Add the correct border radius
        'rounded-[--logo-radius] *:rounded-[--logo-radius]'
      )}
    >
      {src && <img className="size-full" src={src} alt={alt} />}
    </span>
  )
}
