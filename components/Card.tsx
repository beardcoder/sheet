import { cx } from 'classix'
import { ReactNode, HTMLAttributes } from 'react'

export type CardProps = {
  children: ReactNode
} & HTMLAttributes<HTMLElement>

export type CardHeaderProps = {
  children: ReactNode
} & HTMLAttributes<HTMLElement>

export const Card = ({ children, className, ...props }: CardProps) => (
  <div
    className={cx(
      'block rounded-lg border border-stone-200 bg-white shadow-md dark:border-stone-700 dark:bg-stone-800',
      className
    )}
    {...props}
  >
    <div className="p-5">{children}</div>
  </div>
)

export const CardHeader = ({ children }: CardHeaderProps) => (
  <h5 className="mb-2 text-2xl font-bold tracking-tight text-stone-900 dark:text-white">
    {children}
  </h5>
)
