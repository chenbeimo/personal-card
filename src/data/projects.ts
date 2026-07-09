export interface Project {
  id: number
  title: string
  description: string
  category: '前端' | '云计算' | '全栈' | 'AI' | '设计'
  tech: string[]
  image: string
  github?: string
  demo?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 1,
    title: '短视频提取平台',
    description: '全栈短视频内容提取工具，支持无水印下载、封面提取、音频分离、语音转文字，覆盖抖音/B站/YouTube 等平台',
    category: '全栈',
    tech: ['React', 'TypeScript', 'NestJS', 'FFmpeg', 'Whisper', 'BullMQ'],
    image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&h=400&fit=crop',
    featured: true,
  },
  {
    id: 2,
    title: '拼豆图纸生成器',
    description: '将任意图片转换为拼豆图纸，支持 CIELAB 颜色精确匹配、像素编辑、用量统计、导出 PNG/PDF',
    category: '前端',
    tech: ['Vite', 'Tailwind CSS', 'Canvas API', 'CIELAB'],
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop',
    github: 'https://github.com/chenbeimo/bead-pattern-designer',
    featured: true,
  },
  {
    id: 3,
    title: 'OpenCV 音乐交互',
    description: '基于 OpenCV 和 MediaPipe 的体感音乐交互项目，手势识别触发音符演奏',
    category: 'AI',
    tech: ['Python', 'OpenCV', 'MediaPipe', 'Pygame'],
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=400&fit=crop',
    github: 'https://github.com/YanfLIZi56/OpenCV-Play-Music',
    featured: true,
  },
  {
    id: 4,
    title: 'MBTI 性格测试',
    description: '交互式 MBTI 性格测试应用，支持答题、结果分析、分享海报生成',
    category: '前端',
    tech: ['Vue 3', 'TypeScript', 'Pinia', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
    github: 'https://github.com/chenbeimo/mbti',
  },
  {
    id: 5,
    title: '无道词典',
    description: '轻量级英语词典 PWA，支持离线查词、生词本、主题切换，适合日常学习使用',
    category: '前端',
    tech: ['HTML', 'CSS', 'JavaScript', 'PWA', 'Service Worker'],
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop',
    github: 'https://github.com/chenbeimo/English-exam',
  },
  {
    id: 6,
    title: '学校管理系统',
    description: '前后端分离的学校管理平台，支持 Docker 容器化部署和 Kubernetes 编排',
    category: '云计算',
    tech: ['Vue 3', 'Docker', 'Kubernetes', 'Nginx'],
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop',
  },
]

export const categories = ['全部', '前端', '全栈', 'AI', '云计算'] as const
