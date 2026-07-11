export interface Skill {
  name: string
  icon: string
  category: string
  level: number
}

export const skills: Skill[] = [
  // 云计算运维技能
  { name: 'Linux 命令', icon: '🐧', category: '云计算运维', level: 60 },
  { name: 'Shell 脚本', icon: '📜', category: '云计算运维', level: 50 },
  { name: 'Docker', icon: '🐳', category: '云计算运维', level: 60 },
  { name: 'K8s 基础', icon: '☸️', category: '云计算运维', level: 30 },
  { name: '路由交换', icon: '🔀', category: '云计算运维', level: 50 },
  { name: 'TCP/IP', icon: '🌐', category: '云计算运维', level: 55 },
  { name: '阿里云/华为云', icon: '☁️', category: '云计算运维', level: 45 },
  { name: 'Git', icon: '📦', category: '云计算运维', level: 90 },
  { name: 'Nginx', icon: '🌍', category: '云计算运维', level: 50 },
  { name: '监控告警', icon: '📡', category: '云计算运维', level: 40 },

  // AI 工具与能力
  { name: 'Claude Code', icon: '🤖', category: 'AI 工具与能力', level: 85 },
  { name: 'Codex', icon: '🧠', category: 'AI 工具与能力', level: 70 },
  { name: 'Mimo Code', icon: '💬', category: 'AI 工具与能力', level: 75 },
  { name: 'Python', icon: '🐍', category: 'AI 工具与能力', level: 70 },
  { name: 'C 语言', icon: '⚙️', category: 'AI 工具与能力', level: 55 },
  { name: 'C++', icon: '🔧', category: 'AI 工具与能力', level: 45 },
  { name: 'Excel', icon: '📊', category: 'AI 工具与能力', level: 90 },
  { name: 'SQL', icon: '🗄️', category: 'AI 工具与能力', level: 60 },

  // 运营能力
  { name: '文案撰写', icon: '✍️', category: '运营能力', level: 75 },
  { name: '脚本策划', icon: '🎬', category: '运营能力', level: 70 },
  { name: '排版设计', icon: '🎨', category: '运营能力', level: 65 },
  { name: '抖音运营', icon: '📱', category: '运营能力', level: 60 },
  { name: '数据处理', icon: '📈', category: '运营能力', level: 70 },
  { name: '指标复盘', icon: '🔍', category: '运营能力', level: 60 },
  { name: '活动策划', icon: '🎯', category: '运营能力', level: 65 },
  { name: '跨部门沟通', icon: '🤝', category: '运营能力', level: 70 },
]

export const skillCategories = ['云计算运维', 'AI 工具与能力', '运营能力']
