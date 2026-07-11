import { Github, Mail, MessageCircle, Video } from 'lucide-react'

const base = import.meta.env.BASE_URL

export interface SocialLink {
  name: string
  icon: typeof Github
  url: string
  color: string
  /** 点击后弹出图片预览（微信/抖音二维码） */
  previewImage?: string
}

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/chenbeimo',
    color: 'hover:text-gray-200',
  },
  {
    name: '邮箱',
    icon: Mail,
    url: 'mailto:chenbeimo12138@163.com',
    color: 'hover:text-blue-300',
  },
  {
    name: '微信',
    icon: MessageCircle,
    url: '#',
    color: 'hover:text-green-300',
    previewImage: `${base}微信.jpg`,
  },
  {
    name: '抖音',
    icon: Video,
    url: '#',
    color: 'hover:text-pink-300',
    previewImage: `${base}抖音.jpg`,
  },
]

export const resumes = [
  { label: '基础简历', file: `${base}基础简历.pdf` },
  { label: '内容运营', file: `${base}内容运营.pdf` },
]
