import { Navbar, NavbarLabel, NavbarSpacer } from '@/components/catalyst/navbar'
import { Sidebar, SidebarBody, SidebarFooter, SidebarHeader } from '@/components/catalyst/sidebar'
import { StackedLayout } from '@/components/catalyst/stacked-layout'
import Footer from '@/components/yum-components/Footer'
import NavbarNavigation from '@/components/yum-components/NavbarNavigation'
import NavbarUserMenu from '@/components/yum-components/NavbarUserMenu'
import SidebarNavigation from '@/components/yum-components/SidebarNavigation'
import SidebarUserMenu from '@/components/yum-components/SIdebarUserMenu'
import Link from 'next/link'
import { ToastContainer } from 'react-toastify'

export default async function ApplicationLayout({ children }: { children: React.ReactNode }) {
  return (
    <StackedLayout navbar={<NavbarComponent />} sidebar={<SidebarComponent />} footer={<Footer />}>
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        draggable
        pauseOnHover
        theme="light"
      />
    </StackedLayout>
  )
}

function NavbarComponent() {
  return (
    <Navbar className="mx-auto max-w-7xl py-4">
      <LogoLabel />
      <NavbarNavigation />
      <NavbarSpacer />
      <NavbarUserMenu />
    </Navbar>
  )
}

function SidebarComponent() {
  return (
    <Sidebar>
      <SidebarHeader>
        <LogoLabel />
      </SidebarHeader>
      <SidebarBody>
        <SidebarNavigation />
      </SidebarBody>

      <SidebarFooter className="max-lg:hidden">
        <SidebarUserMenu />
      </SidebarFooter>
    </Sidebar>
  )
}

function LogoLabel() {
  return (
    <Link href="/" aria-label="Home">
      <NavbarLabel className="text-2xl font-extrabold text-teal-500">YumAlarm</NavbarLabel>
    </Link>
  )
}
