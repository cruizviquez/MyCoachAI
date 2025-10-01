
import { View, StyleSheet, Platform, Dimensions } from 'react-native';
import { theme } from '../styles/theme';

const { height } = Dimensions.get('window');

interface BottomButtonContainerProps {
  children: React.ReactNode;
}

export default function BottomButtonContainer({ children }: BottomButtonContainerProps) {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: Platform.OS === 'web' ? 30 : 50,
    borderTopWidth: 1,
    borderTopColor: theme.colors.surfaceLight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    zIndex: 100,
    elevation: 10,
  },
});