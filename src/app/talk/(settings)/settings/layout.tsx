import { Metadata } from 'next'

import { SidebarNav } from '@/app/(settings)/settings/components/sidebar-nav'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Smol Talk settings page.'
}

const sidebarNavItems = [
  {
    title: 'Profile',
    href: '/settings'
  },
  {
    title: 'Personas',
    href: '/settings/personas'
  },
  {
    title: 'My Plan',
    href: '/settings/plan'
  }
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="md:block flex-1 space-y-6 p-10 pb-16">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and unique personas.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="lg:flex-row lg:space-x-12 lg:space-y-0 flex flex-col space-y-8">
          <aside className="lg:w-1/5 -mx-4">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="lg:max-w-2xl flex-1">{children}</div>
        </div>
      </div>
    </>
  )
}
