export interface Skill {
  name: string
  icon: string
  category: string
  level: number
}

export const skills: Skill[] = [
  // 前端开发
  { name: 'React', icon: '⚛️', category: '前端开发', level: 35 },
  { name: 'Vue 3', icon: '💚', category: '前端开发', level: 50 },
  { name: 'TypeScript', icon: '📘', category: '前端开发', level: 20 },
  { name: 'Tailwind CSS', icon: '🎨', category: '前端开发', level: 50 },
  { name: 'HTML/CSS', icon: '🌐', category: '前端开发', level: 80 },
  { name: '小程序', icon: '📱', category: '前端开发', level: 20 },

  // 后端与云原生
  { name: 'Node.js', icon: '🟢', category: '后端与云原生', level: 20 },
  { name: 'NestJS', icon: '🔴', category: '后端与云原生', level: 10 },
  { name: 'Python', icon: '🐍', category: '后端与云原生', level: 70 },
  { name: 'Docker', icon: '🐳', category: '后端与云原生', level: 60 },
  { name: 'Kubernetes', icon: '☸️', category: '后端与云原生', level: 30 },
  { name: 'Linux', icon: '🐧', category: '后端与云原生', level: 60 },

  // AI 与数据
  { name: 'OpenCV', icon: '👁️', category: 'AI 与数据', level: 20 },
  { name: 'MediaPipe', icon: '🖐️', category: 'AI 与数据', level: 10 },
  { name: 'Whisper', icon: '🎤', category: 'AI 与数据', level: 20 },
  { name: 'FFmpeg', icon: '🎬', category: 'AI 与数据', level: 60 },

  // 工具与协作
  { name: 'Git', icon: '📦', category: '工具与协作', level: 90 },
  { name: 'Vite', icon: '⚡', category: '工具与协作', level: 60 },
  { name: 'Figma', icon: '🎯', category: '工具与协作', level: 50 },
  { name: 'AI 工具', icon: '🤖', category: '工具与协作', level: 85 },
]

export const skillCategories = ['前端开发', '后端与云原生', 'AI 与数据', '工具与协作']
