import { SafeAreaView } from "react-native-safe-area-context"
import { Box } from "@/components/ui/box"

type ContainerProps = {
  children: React.ReactNode
}

export const Container = ({ children }: ContainerProps) => {
  return (
    <SafeAreaView>
      <Box className="h-full bg-background-50">
        {children}
      </Box>
    </SafeAreaView>
  )
}
