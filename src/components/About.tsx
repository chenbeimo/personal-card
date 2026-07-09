import { useEffect, useRef, useState } from 'react'
import { Code, Cloud, Layers, Sparkles } from 'lucide-react'

const aboutStats = [
  { value: '6+', label: '上线项目', icon: Layers },
  { value: '3月', label: '开发实践', icon: Code },
  { value: '云计算', label: '专业方向', icon: Cloud },
  { value: '全栈', label: '开发能力', icon: Sparkles },
]

export default function About() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 sm:py-32 px-6 sm:px-10 md:px-16 lg:px-24 bg-black"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* ── 左：头像 ── */}
          <div
            className={`transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="liquid-glass rounded-2xl p-3 max-w-sm mx-auto md:mx-0">
              <div className="rounded-xl overflow-hidden aspect-[4/5] bg-gradient-to-br from-white/10 to-white/5">
                <img
                  src="/奶龙.jpg"
                  alt="陈浩明"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    // 占位图：如果奶龙.jpg 未放入 public 目录则显示
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=625&fit=crop&auto=format'
                  }}
                />
              </div>
            </div>
          </div>

          {/* ── 右：内容 ── */}
          <div
            className={`transition-all duration-700 delay-200 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p
              className="text-white/60 text-sm mb-3 tracking-wider uppercase"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              关于我
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl text-white mb-6 leading-tight"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              用技术探索
              <br />
              无限可能
            </h2>

            <div
              className="space-y-4 text-white/70 text-sm sm:text-base leading-relaxed"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              <p>
                大家好，我是陈浩明，网名陈北默，云计算专业大三在读。
              </p>
              <p>
                目前主打「云 + AI + 产品」的交叉路线：技术上靠云计算底子做 AI 工程化落地，
                同时在补产品思维拆解用户需求，想走技术向产品的复合路径。
              </p>
              <p>
                很高兴和大家认识交流，欢迎随时联系我。
              </p>
            </div>

            {/* 统计卡片 */}
            <div className="grid grid-cols-2 gap-3 mt-8">
              {aboutStats.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <div
                    key={stat.label}
                    className="liquid-glass rounded-xl p-4 text-center group hover:bg-white/10 transition-all duration-300"
                    style={{ transitionDelay: `${300 + i * 80}ms` }}
                  >
                    <Icon
                      size={18}
                      className="text-white/40 mx-auto mb-2 group-hover:text-white/70 transition-colors"
                    />
                    <div
                      className="text-2xl font-bold text-white mb-1"
                      style={{ fontFamily: "'Instrument Serif', serif" }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="text-white/60 text-xs"
                      style={{ fontFamily: 'system-ui, sans-serif' }}
                    >
                      {stat.label}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
