import { ListBulletIcon, PlusIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import type { FunctionComponent, ReactNode } from 'react'

export type LayoutProps = {
  children: ReactNode
}

export const Layout: FunctionComponent<LayoutProps> = (props) => {
  const links = [
    {
      href: '/list',
      title: 'Charactere',
      icon: <ListBulletIcon className="h-4 w-4" />,
    },
    {
      href: '/create',
      title: 'Neuer Character',
      icon: <PlusIcon className="h-4 w-4" />,
    },
  ]
  return (
    <div className="flex h-full flex-row">
      <div className="h-full w-60 bg-white px-1 shadow-md dark:bg-black">
        <ul>
          {links.map((link, index) => (
            <li className="relative" key={index}>
              <Link
                className="flex h-12 items-center overflow-hidden text-ellipsis whitespace-nowrap rounded py-4 px-6 text-sm transition duration-300 ease-in-out hover:text-emerald-500"
                href={link.href}
                data-mdb-ripple="true"
                data-mdb-ripple-color="dark"
              >
                <span className="mr-2">{link.icon}</span>
                <span>{link.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-full w-full">{props.children}</div>
    </div>
  )
}
