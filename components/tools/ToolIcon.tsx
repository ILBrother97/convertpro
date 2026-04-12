import { 
  Image as ImageIcon,
  RefreshCw,
  Maximize as Scaling,
  Zap,
  FileImage,
  Files,
  Scissors,
  FileArchive,
  FileOutput,
  FileInput,
  Scan,
  Type,
  Music,
  Video,
  Hash,
  File
} from 'lucide-react'
import { LucideProps } from 'lucide-react'

interface ToolIconProps extends LucideProps {
  name: string
}

const iconMap: Record<string, any> = {
  ImageIcon,
  RefreshCw,
  Scaling,
  Zap,
  FileImage,
  Files,
  Scissors,
  FileArchive,
  FileOutput,
  FileInput,
  Image: ImageIcon,
  Scan,
  Type,
  Music,
  Video,
  Hash,
  File
}

export const ToolIcon = ({ name, ...props }: ToolIconProps) => {
  const Icon = iconMap[name] || File
  return <Icon {...props} />
}
