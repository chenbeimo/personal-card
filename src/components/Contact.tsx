import { useState, useEffect, useRef, useCallback } from 'react'
import { Send, Download, CheckCircle, X } from 'lucide-react'
import { socialLinks } from '../data/socials'

export default function Contact() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  /* ESC 关闭图片预览 */
  const closePreview = useCallback(() => setPreviewImage(null), [])
  useEffect(() => {
    if (!previewImage) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closePreview() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [previewImage, closePreview])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { name, email, message } = formData
    const subject = encodeURIComponent(`来自 ${name} 的留言`)
    const body = encodeURIComponent(`姓名: ${name}\n邮箱: ${email}\n\n${message}`)
    window.open(`mailto:chenbeimo12138@163.com?subject=${subject}&body=${body}`)
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    setFormData({ name: '', email: '', message: '' })
  }

  const handleSocialClick = (e: React.MouseEvent, social: typeof socialLinks[0]) => {
    // 有预览图的（微信/抖音）→ 弹出图片
    if (social.previewImage) {
      e.preventDefault()
      setPreviewImage(social.previewImage)
      return
    }
    // 简历 PDF → 浏览器直接打开
    if (social.url.endsWith('.pdf')) {
      e.preventDefault()
      window.open(social.url, '_blank')
      return
    }
    // 其他（GitHub/邮箱）→ 正常跳转
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24 sm:py-32 px-6 sm:px-10 md:px-16 lg:px-24 bg-black"
    >
      <div className="max-w-6xl mx-auto">
        {/* ── 标题 ── */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p
            className="text-white/60 text-sm mb-3 tracking-wider uppercase"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            联系我
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl text-white mb-4"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            一起创造价值
          </h2>
          <p
            className="text-white/60 text-sm sm:text-base max-w-lg mx-auto"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            有项目合作、技术交流或任何想法？欢迎随时联系我
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* ── 左：社交渠道 ── */}
          <div
            className={`transition-all duration-700 delay-100 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <h3
              className="text-white text-xl mb-6"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              社交渠道
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => handleSocialClick(e, social)}
                    className={`liquid-glass rounded-xl p-4 flex flex-col items-center gap-2 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 ${social.color}`}
                  >
                    <Icon size={22} />
                    <span
                      className="text-xs"
                      style={{ fontFamily: 'system-ui, sans-serif' }}
                    >
                      {social.name}
                    </span>
                  </a>
                )
              })}
            </div>

            <a
              href={`${import.meta.env.BASE_URL}最初的简历.pdf`}
              target="_blank"
              className="inline-flex items-center gap-2 bg-white text-black rounded-full px-6 py-3 text-sm font-medium hover:bg-white/90 transition-colors"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              <Download size={16} />
              下载简历
            </a>
          </div>

          {/* ── 右：留言表单 ── */}
          <div
            className={`transition-all duration-700 delay-200 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <h3
              className="text-white text-xl mb-6"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              发送留言
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="你的姓名"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="liquid-glass w-full rounded-xl px-5 py-3.5 text-white text-sm placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all"
                style={{ fontFamily: 'system-ui, sans-serif' }}
                required
              />
              <input
                type="email"
                placeholder="你的邮箱"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="liquid-glass w-full rounded-xl px-5 py-3.5 text-white text-sm placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all"
                style={{ fontFamily: 'system-ui, sans-serif' }}
                required
              />
              <textarea
                placeholder="你想说的内容..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                className="liquid-glass w-full rounded-xl px-5 py-3.5 text-white text-sm placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/30 resize-none transition-all"
                style={{ fontFamily: 'system-ui, sans-serif' }}
                required
              />
              <button
                type="submit"
                className="w-full bg-white text-black rounded-full px-6 py-3.5 text-sm font-medium flex items-center justify-center gap-2 hover:bg-white/90 transition-all cursor-pointer active:scale-[0.98]"
                style={{ fontFamily: 'system-ui, sans-serif' }}
              >
                {sent ? (
                  <>
                    <CheckCircle size={16} />
                    已打开邮件客户端
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    发送消息
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── 图片预览弹窗（微信/抖音） ── */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-fade-in"
          style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
          onClick={closePreview}
        >
          <div
            className="relative animate-scale-in max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-10 right-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
              onClick={closePreview}
              aria-label="关闭"
            >
              <X size={16} />
            </button>
            <img
              src={previewImage}
              alt="扫码添加"
              className="w-full rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  )
}
