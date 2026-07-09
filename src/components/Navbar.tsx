import { useState, useEffect, useCallback } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: '首页', href: '#hero' },
  { label: '关于我', href: '#about' },
  { label: '项目作品', href: '#projects' },
  { label: '技能栈', href: '#skills' },
  { label: '联系我', href: '#contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('#hero')

  /* ── 滚动监听：毛玻璃 + 高亮当前板块 ── */
  useEffect(() => {
    const sections = navLinks.map((l) => l.href.slice(1))

    const onScroll = () => {
      setScrolled(window.scrollY > 50)

      // 找到当前视口中的板块
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120) {
            setActiveSection(`#${sections[i]}`)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── 移动端菜单开/关时锁定 body 滚动 ── */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNavClick = useCallback((href: string) => {
    setMobileOpen(false)
    // 延迟一小段时间等菜单动画开始再滚动
    setTimeout(() => {
      const el = document.querySelector(href)
      el?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 transition-all duration-300 ${
          scrolled ? 'navbar-scrolled' : ''
        }`}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleNavClick('#hero') }}
          className="text-white italic text-xl sm:text-2xl cursor-pointer select-none"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          陈北默
        </a>

        {/* Desktop Nav Pill */}
        <div className="hidden md:flex items-center gap-1 liquid-glass rounded-full px-2 py-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
              className={`text-sm px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                activeSection === link.href
                  ? 'text-white bg-white/10'
                  : 'text-white/70 hover:text-white'
              }`}
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
            className="bg-white text-black text-sm font-medium px-5 py-1.5 rounded-full hover:bg-white/90 transition-colors duration-200 cursor-pointer"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            联系我
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden liquid-glass rounded-full w-10 h-10 flex items-center justify-center relative"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? '关闭菜单' : '打开菜单'}
        >
          <Menu
            size={20}
            className="text-white absolute transition-all duration-300"
            style={{
              opacity: mobileOpen ? 0 : 1,
              transform: mobileOpen ? 'rotate(90deg) scale(0.75)' : 'rotate(0) scale(1)',
            }}
          />
          <X
            size={20}
            className="text-white absolute transition-all duration-300"
            style={{
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'rotate(0) scale(1)' : 'rotate(-90deg) scale(0.75)',
            }}
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-500"
        style={{
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: mobileOpen ? 'blur(8px)' : 'blur(0)',
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
        }}
      >
        {/* Close Button */}
        <button
          className="absolute top-5 right-6 liquid-glass rounded-full w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileOpen(false)}
          aria-label="关闭菜单"
        >
          <X size={20} className="text-white" />
        </button>

        {/* Links */}
        <div className="flex flex-col items-center gap-6">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
              className={`text-3xl cursor-pointer transition-all duration-500 ${
                mobileOpen
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              } ${activeSection === link.href ? 'text-white' : 'text-white/70'}`}
              style={{
                transitionDelay: mobileOpen ? `${100 + i * 50}ms` : '0ms',
                fontFamily: "'Instrument Serif', serif",
              }}
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
            className={`bg-white text-black font-medium px-8 py-3 rounded-full mt-4 cursor-pointer hover:bg-white/90 transition-all duration-500 ${
              mobileOpen
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-90'
            }`}
            style={{
              transitionDelay: mobileOpen ? '350ms' : '0ms',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            联系我
          </a>
        </div>
      </div>
    </>
  )
}
