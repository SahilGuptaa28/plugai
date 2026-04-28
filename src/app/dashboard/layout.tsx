
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import {
  LayoutDashboard,
  FileText,
  Code,
  Info,
  ChevronLeft,
  User,
  CreditCard,
  LogOut
} from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  const { data: session } = useSession()

  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Chatbots", exact: true },
  ]

  const resourceItems = [
    { href: "/dashboard/docs", icon: FileText, label: "Docs" },
    { href: "/embed", icon: Code, label: "Embed" },
    { href: "/dashboard/about", icon: Info, label: "About" },
  ]

  const accountItems = [
    { href: "/dashboard/profile", icon: User, label: "Profile" },
    { href: "/dashboard/pricing", icon: CreditCard, label: "Pricing" },
  ]

  const isActive = (href: string, exact = false) =>
    exact ? pathname === href : pathname.startsWith(href)

  const NavLink = ({ href, icon: Icon, label, exact = false }: { href: string; icon: any; label: string; exact?: boolean }) => (
    <Link href={href}>
      <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${isActive(href, exact)
          ? "bg-blue-500/20 text-white border border-blue-400/20"
          : "text-zinc-400 hover:bg-white/10 hover:text-white"
        }`}>
        <Icon size={18} className="shrink-0" />
        {!collapsed && <span className="text-sm">{label}</span>}
      </div>
    </Link>
  )

  return (
    <div className="h-screen bg-black text-white flex relative overflow-hidden">

      {/* Background */}
      <div className="pointer-events-none absolute w-[600px] h-[600px] bg-blue-500/20 blur-[120px] rounded-full top-[-200px] left-[-200px]" />
      <div className="pointer-events-none absolute w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full bottom-[-200px] right-[-200px]" />

      {/* MOBILE HEADER */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-black/60 backdrop-blur border-b border-white/10 flex items-center justify-between px-4 z-50">
        <Link href="/" className="flex items-center gap-2">
          <img src="/icon.svg" alt="PlugAI" width={26} height={26} className="shrink-0" />
          <h1 className="font-semibold">Plug<span className="text-blue-400">AI</span></h1>
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen(true)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition"
          >
            <span className="text-lg">☰</span>
          </button>
          <img
            src={session?.user?.image || `https://api.dicebear.com/7.x/initials/svg?seed=${session?.user?.email}`}
            alt="user"
            className="w-8 h-8 rounded-full border border-white/10"
          />
        </div>
      </div>

      {/* SIDEBAR */}
      <aside className={`
        fixed lg:static top-0 left-0 h-screen
        ${collapsed ? "w-20" : "w-64"}
        bg-black/40 backdrop-blur-xl border-r border-white/10 p-4 z-40
        transform transition-all duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        flex flex-col
      `}>

        {/* TOP */}
        <div className="flex-1 overflow-y-auto">

          {/* LOGO + COLLAPSE */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center gap-2">
              <img src="/icon.svg" alt="PlugAI" width={28} height={28} className="shrink-0" />

              {/* 👇 Hide text only when collapsed (not logo) */}
              {!collapsed && (
                <h1 className="text-xl font-semibold">
                  Plug<span className="text-blue-400">AI</span>
                </h1>
              )}
            </Link>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className={`p-2 rounded-xl hover:bg-white/10 transition ${collapsed ? "mx-auto" : ""}`}
            >
              <ChevronLeft size={18} className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* NAV */}
          <nav className="space-y-1">

            {navItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}

            {/* RESOURCES */}
            {!collapsed && (
              <p className="text-xs text-zinc-500 mt-6 mb-2 px-2 uppercase tracking-wider">Resources</p>
            )}
            {collapsed && <div className="mt-4 mb-1 border-t border-white/10" />}

            {resourceItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}

            {/* ACCOUNT */}
            {!collapsed && (
              <p className="text-xs text-zinc-500 mt-6 mb-2 px-2 uppercase tracking-wider">Account</p>
            )}
            {collapsed && <div className="mt-4 mb-1 border-t border-white/10" />}

            {accountItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}

          </nav>
        </div>

        {/* USER */}
        <div className="pt-4 border-t border-white/10 mt-4">
          <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : "justify-between"}`}>
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={session?.user?.image || `https://api.dicebear.com/7.x/initials/svg?seed=${session?.user?.email}`}
                alt="user"
                className="w-9 h-9 rounded-full border border-white/10 shrink-0"
              />
              {!collapsed && (
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{session?.user?.name || "User"}</p>
                  <p className="text-xs text-zinc-500">Free Plan</p>
                </div>
              )}
            </div>
            {!collapsed && (
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/10 transition shrink-0"
                title="Logout"
              >
                <LogOut size={15} />
              </button>
            )}
          </div>
        </div>

        {/* MOBILE CLOSE */}
        <button
          onClick={() => setOpen(false)}
          className="lg:hidden mt-4 text-sm text-zinc-500 hover:text-white transition"
        >
          Close menu
        </button>
      </aside>

      {/* OVERLAY */}
      {open && (
        <div onClick={() => setOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden" />
      )}

      {/* MAIN */}
      <div className="flex-1 flex flex-col relative z-20 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 w-full mt-14 lg:mt-0">
          {children}
        </main>
      </div>

    </div>
  )
}