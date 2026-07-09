import { useState, useEffect, useRef, useCallback } from 'react'
import { ExternalLink, Github, X } from 'lucide-react'
import { projects, categories, Project } from '../data/projects'

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>('全部')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  /* ── IntersectionObserver 入场 ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  /* ── ESC 关闭模态框 ── */
  const closeModal = useCallback(() => setSelectedProject(null), [])
  useEffect(() => {
    if (!selectedProject) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [selectedProject, closeModal])

  const filtered = activeCategory === '全部'
    ? projects
    : projects.filter((p) => p.category === activeCategory)

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 sm:py-32 px-6 sm:px-10 md:px-16 lg:px-24 bg-black"
    >
      <div className="max-w-6xl mx-auto">
        {/* ── 标题 ── */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p
            className="text-white/60 text-sm mb-3 tracking-wider uppercase"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            项目作品
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl text-white mb-4"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            精选作品集
          </h2>
          <p
            className="text-white/60 text-sm sm:text-base max-w-lg mx-auto"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            这些项目记录了我的学习与成长，涵盖前端、云计算和全栈开发
          </p>
        </div>

        {/* ── 分类筛选 ── */}
        <div
          className={`flex flex-wrap justify-center gap-2 mb-10 transition-all duration-700 delay-100 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`liquid-glass rounded-full px-5 py-2 text-sm transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-white text-black border-white'
                  : 'text-white/70 hover:text-white'
              }`}
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── 卡片网格 ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className={`liquid-glass rounded-2xl overflow-hidden group cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-white/5 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: visible ? `${200 + i * 80}ms` : '0ms' }}
              onClick={() => setSelectedProject(project)}
            >
              {/* 封面图 */}
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* 悬停遮罩 */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>

              {/* 内容 */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-white/50 text-xs px-2 py-0.5 rounded-full bg-white/10"
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  >
                    {project.category}
                  </span>
                  {project.featured && (
                    <span
                      className="text-amber-400/80 text-xs px-2 py-0.5 rounded-full bg-amber-400/10"
                      style={{ fontFamily: 'system-ui, sans-serif' }}
                    >
                      精选
                    </span>
                  )}
                </div>
                <h3
                  className="text-white text-lg mb-1"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {project.title}
                </h3>
                <p
                  className="text-white/60 text-sm line-clamp-2 mb-3"
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-white/50 text-xs px-2 py-0.5 rounded bg-white/5"
                      style={{ fontFamily: 'system-ui, sans-serif' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 详情模态框 ── */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-fade-in"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
          onClick={closeModal}
        >
          <div
            className="liquid-glass rounded-2xl max-w-lg w-full p-6 relative animate-scale-in max-h-[90vh] overflow-y-auto scrollbar-hide"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 关闭按钮 */}
            <button
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
              onClick={closeModal}
              aria-label="关闭"
            >
              <X size={16} />
            </button>

            {/* 封面 */}
            <div className="rounded-xl overflow-hidden aspect-video mb-5">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* 标签 */}
            <div className="flex items-center gap-2 mb-3">
              <span
                className="text-white/50 text-xs px-2 py-0.5 rounded-full bg-white/10"
                style={{ fontFamily: 'system-ui, sans-serif' }}
              >
                {selectedProject.category}
              </span>
              {selectedProject.featured && (
                <span
                  className="text-amber-400/80 text-xs px-2 py-0.5 rounded-full bg-amber-400/10"
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  精选项目
                </span>
              )}
            </div>

            {/* 标题 & 描述 */}
            <h3
              className="text-white text-2xl mb-2"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              {selectedProject.title}
            </h3>
            <p
              className="text-white/70 text-sm leading-relaxed mb-4"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              {selectedProject.description}
            </p>

            {/* 技术栈 */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {selectedProject.tech.map((t) => (
                <span
                  key={t}
                  className="text-white/60 text-xs px-2.5 py-1 rounded-full bg-white/10"
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-3">
              {selectedProject.github && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-glass rounded-full px-5 py-2 text-white text-sm flex items-center gap-2 hover:bg-white/10 transition-colors"
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  <Github size={16} /> 源码
                </a>
              )}
              {selectedProject.demo && (
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-black rounded-full px-5 py-2 text-sm flex items-center gap-2 hover:bg-white/90 transition-colors"
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  <ExternalLink size={16} /> 在线预览
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
