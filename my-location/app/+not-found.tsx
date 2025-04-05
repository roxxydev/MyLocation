import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';

export default function NotFoundScreen() {
  return (
    <View>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Text>Seems like you're lost</Text>
      <Link href="/" style={styles.link}>
          <Text>Go to home screen!</Text>
        </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
