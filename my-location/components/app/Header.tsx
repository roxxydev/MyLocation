import { HStack } from "@/components/ui/hstack"
import { Text } from "@/components/ui/text"
import { Icon } from '@/components/ui/icon'
import { ArrowLeftIcon } from "../ui/icon"
import { Divider } from "@/components/ui/divider"
import { VStack } from "../ui/vstack"
import { Pressable } from "react-native"

export type HeaderProps = {
  title: string
  onBack?: () => void
}

export const Header = ({ title, onBack }: HeaderProps) => {
  return (
    <VStack className="w-full">
      <HStack className="w-full  m-2">
        { onBack && (
          <Pressable onPress={onBack}>
            <Icon as={ArrowLeftIcon} className="w-8 h-8" />
          </Pressable>
        )}
        <Text className="text-3xl font-bold ml-2">{title}</Text>
      </HStack>
      <Divider className="mt-2" />
    </VStack>
  )
}
