import { useEffect, useRef, useState } from 'react'
import { skills, skillCategories } from '../data/skills'

export default function Skills() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="skills"
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
            技能栈
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl text-white mb-4"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            能力矩阵
          </h2>
          <p
            className="text-white/60 text-sm sm:text-base max-w-lg mx-auto"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            三个方向的能力储备，对应云计算运维、AI 工具应用与内容运营岗位
          </p>
        </div>

        {/* ── 三列进度条卡片 ── */}
        <div className="grid md:grid-cols-3 gap-6">
          {skillCategories.map((category, ci) => {
            const categorySkills = skills.filter((s) => s.category === category)
            return (
              <div
                key={category}
                className={`liquid-glass rounded-2xl p-6 transition-all duration-700 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: visible ? `${200 + ci * 120}ms` : '0ms' }}
              >
                <h3
                  className="text-white text-lg mb-5"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {category}
                </h3>
                <div className="space-y-4">
                  {categorySkills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1.5">
                        <span
                          className="text-white/70 text-sm"
                          style={{ fontFamily: 'system-ui, sans-serif' }}
                        >
                          {skill.icon} {skill.name}
                        </span>
                        <span
                          className="text-white/50 text-xs"
                          style={{ fontFamily: 'system-ui, sans-serif' }}
                        >
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r from-white/40 to-white/80 transition-all duration-1000 ease-out ${
                            visible ? 'progress-bar-animated' : ''
                          }`}
                          style={{
                            width: visible ? `${skill.level}%` : '0%',
                            animationDelay: visible ? `${400 + ci * 120}ms` : '0ms',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
