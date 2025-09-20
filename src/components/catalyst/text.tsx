import clsx from 'clsx'
import { Link } from './link'

type HeadingProps = { level?: 1 | 2 | 3 | 4 | 5 | 6 } & React.ComponentPropsWithoutRef<
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
>

export function HeroText({ className, level = 1, ...props }: HeadingProps) {
  let Element: `h${typeof level}` = `h${level}`

  return (
    <Element
      {...props}
      className={clsx(
        className,
        'text-4xl font-extrabold leading-normal text-black sm:text-6xl sm:leading-tight sm:tracking-tight dark:text-white'
      )}
    />
  )
}

export function Heading({ className, level = 1, ...props }: HeadingProps) {
  let Element: `h${typeof level}` = `h${level}`

  return (
    <Element {...props} className={clsx(className, 'text-2xl/8 font-bold text-black sm:text-5xl/8 dark:text-white')} />
  )
}

export function Subheading({ className, level = 2, ...props }: HeadingProps) {
  let Element: `h${typeof level}` = `h${level}`

  return (
    <Element
      {...props}
      className={clsx(className, 'text-lg/7 font-semibold text-black sm:text-xl/7 dark:text-white')}
    />
  )
}

const baseTextClasses = 'text-sm tracking-normal sm:text-base sm:tracking-wide'

export function Text({ className, ...props }: React.ComponentPropsWithoutRef<'p'>) {
  return <p data-slot="text" {...props} className={clsx(className, baseTextClasses, 'text-black dark:text-white')} />
}

export function TextSecondary({ className, ...props }: React.ComponentPropsWithoutRef<'p'>) {
  return (
    <p data-slot="text" {...props} className={clsx(className, baseTextClasses, 'text-gray-500 dark:text-gray-400')} />
  )
}

export function TextSuccess({ className, ...props }: React.ComponentPropsWithoutRef<'p'>) {
  return (
    <p data-slot="text" {...props} className={clsx(className, baseTextClasses, 'text-green-500 dark:text-green-400')} />
  )
}

export function TextFailure({ className, ...props }: React.ComponentPropsWithoutRef<'p'>) {
  return (
    <p data-slot="text" {...props} className={clsx(className, baseTextClasses, 'text-rose-500 dark:text-rose-400')} />
  )
}

export function TextWarning({ className, ...props }: React.ComponentPropsWithoutRef<'p'>) {
  return (
    <p data-slot="text" {...props} className={clsx(className, baseTextClasses, 'text-amber-500 dark:text-amber-400')} />
  )
}

export function TextAccent({ className, ...props }: React.ComponentPropsWithoutRef<'p'>) {
  return (
    <p data-slot="text" {...props} className={clsx(className, baseTextClasses, 'text-teal-500 dark:text-teal-400')} />
  )
}

export function TextLink({ className, ...props }: React.ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      {...props}
      className={clsx(
        className,
        'text-black underline decoration-black/50 data-[hover]:decoration-black dark:text-white dark:decoration-white/50 dark:data-[hover]:decoration-white'
      )}
    />
  )
}

export function Strong({ className, ...props }: React.ComponentPropsWithoutRef<'strong'>) {
  return <strong {...props} className={clsx(className, 'font-medium text-black dark:text-white')} />
}

export function Code({ className, ...props }: React.ComponentPropsWithoutRef<'code'>) {
  return (
    <code
      {...props}
      className={clsx(
        className,
        'rounded border border-zinc-950/10 bg-zinc-950/[2.5%] px-0.5 text-sm font-medium text-zinc-950 sm:text-[0.8125rem] dark:border-white/20 dark:bg-white/5 dark:text-white'
      )}
    />
  )
}
