import { useState, useRef, useCallback } from 'react'
import { ArrowRight } from 'lucide-react'

/* ── 视频数据 ── */
const videos = [
  {
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4',
    label: '开发',
  },
  {
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4',
    label: '设计',
  },
  {
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081042_df7202bf-bd80-4b2b-bbc6-1f09ba2870e9.mp4',
    label: '学习',
  },
  {
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_080959_4cac5234-3573-464e-a5b7-76b94b8a7d61.mp4',
    label: '生活',
  },
]

const stats = [
  '6+ 上线项目',
  '3 个月开发实践',
  '云计算方向',
  '全栈开发能力',
]

export default function Hero() {
  const [activeVideo, setActiveVideo] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const handleVideoSwitch = useCallback((index: number) => {
    if (index === activeVideo || isTransitioning) return
    setIsTransitioning(true)
    setActiveVideo(index)
    videoRefs.current[index]?.play().catch(() => {})
    setTimeout(() => setIsTransitioning(false), 1000)
  }, [activeVideo, isTransitioning])

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  /* Deep Woods (第3个视频, index=2) 触发深色内容模式 */
  const isDark = activeVideo === 2
  const c = isDark ? '#182C41' : '#fff'
  const cDim = isDark ? 'rgba(24,44,65,0.7)' : 'rgba(255,255,255,0.8)'
  const cFaint = isDark ? 'rgba(24,44,65,0.45)' : 'rgba(255,255,255,0.5)'

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden bg-black">
      {/* ── 视频层 ── */}
      {videos.map((video, i) => (
        <video
          key={video.url}
          ref={(el) => { videoRefs.current[i] = el }}
          src={video.url}
          className="video-layer"
          style={{ opacity: i === activeVideo ? 1 : 0 }}
          autoPlay={i === 0}
          muted
          loop
          playsInline
          preload={i === 0 ? 'auto' : 'metadata'}
          crossOrigin="anonymous"
          onError={(e) => {
            // 视频加载失败时隐藏该层，避免黑屏闪烁
            e.currentTarget.style.opacity = '0'
          }}
        />
      ))}

      {/* ── PNG 浮动叠加层 ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none train-bob">
        {/* 替换为你的透明 PNG 路径，如 /overlay.png */}
        <img
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&h=1080&fit=crop&auto=format&q=30"
          alt=""
          className="w-full h-full object-cover opacity-30 mix-blend-overlay"
        />
      </div>

      {/* ── 内容层 ── */}
      <div className="relative z-[2] flex flex-col h-full px-6 sm:px-10 md:px-16 lg:px-24">
        {/* 导航占位 */}
        <div className="h-20" />

        {/* 主内容 - 垂直居中 */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          {/* 徽章 */}
          <div
            className="liquid-glass rounded-full px-5 py-2 mb-8 inline-flex items-center transition-colors duration-700"
            style={{ color: c }}
          >
            <span className="text-xs sm:text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
              云 + AI + 产品 · 技术向产品的复合路径
            </span>
          </div>

          {/* 标题 */}
          <h1
            className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] max-w-4xl mb-6 transition-colors duration-700"
            style={{ fontFamily: "'Instrument Serif', serif", color: c }}
          >
            技术为底 复合成长
            <br />
            多岗适配 落地为王
          </h1>

          {/* 副标题 */}
          <p
            className="max-w-xl leading-relaxed mb-10 text-sm sm:text-base transition-colors duration-700"
            style={{ fontFamily: 'system-ui, sans-serif', color: cDim }}
          >
            大家好，我是陈浩明，云计算专业大三在读。靠云计算底子做 AI 工程化落地，
            同时在补产品思维拆解用户需求，想走技术向产品的复合路径。
          </p>

          {/* CTA 按钮 */}
          <button
            onClick={scrollToProjects}
            className="rounded-full px-8 py-3.5 flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer group font-medium"
            style={{
              fontFamily: 'system-ui, sans-serif',
              background: isDark ? '#182C41' : '#fff',
              color: isDark ? '#fff' : '#000',
            }}
          >
            <span>查看作品集</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* ── 视频切换器 ── */}
        <div className="flex justify-center gap-6 sm:gap-8 mb-6">
          {videos.map((video, i) => (
            <button
              key={video.label}
              onClick={() => handleVideoSwitch(i)}
              className="relative pb-2 text-sm cursor-pointer transition-all duration-300"
              style={{
                fontFamily: 'system-ui, sans-serif',
                color: i === activeVideo ? c : cFaint,
                borderBottom: i === activeVideo
                  ? `2px solid ${c}`
                  : '2px solid transparent',
              }}
              onMouseEnter={(e) => {
                if (i !== activeVideo) e.currentTarget.style.color = cDim
              }}
              onMouseLeave={(e) => {
                if (i !== activeVideo) e.currentTarget.style.color = cFaint
              }}
            >
              {video.label}
            </button>
          ))}
        </div>

        {/* ── 底部统计 (始终白色) ── */}
        {/* 桌面端：横排带分隔线 */}
        <div className="hidden sm:flex justify-center items-center gap-4 pb-8">
          {stats.map((label, i) => (
            <div key={label} className="flex items-center gap-4">
              <span
                className="text-white/70 text-sm whitespace-nowrap"
                style={{ fontFamily: 'system-ui, sans-serif' }}
              >
                {label}
              </span>
              {i < stats.length - 1 && (
                <span className="text-white/25">|</span>
              )}
            </div>
          ))}
        </div>
        {/* 移动端：两行两列紧凑排列 */}
        <div className="sm:hidden grid grid-cols-2 gap-x-4 gap-y-1 pb-8 px-4">
          {stats.map((label) => (
            <span
              key={label}
              className="text-white/60 text-xs text-center"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
