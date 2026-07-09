import { Heart } from 'lucide-react'

export default function Footer() {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault()
    document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-white/10 py-8 px-6 sm:px-10 md:px-16 lg:px-24 bg-black">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p
          className="text-white/40 text-sm flex items-center gap-1"
          style={{ fontFamily: 'system-ui, sans-serif' }}
        >
          © 2026 陈北默 · 用
          <Heart size={12} className="text-red-400/60 fill-red-400/60 inline" />
          和代码构建
        </p>

        <button
          onClick={scrollToTop}
          className="text-white/40 text-sm hover:text-white/70 transition-colors cursor-pointer"
          style={{ fontFamily: 'system-ui, sans-serif' }}
        >
          回到顶部 ↑
        </button>
      </div>
    </footer>
  )
}
