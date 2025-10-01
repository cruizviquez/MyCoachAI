import React from 'react';
import { ScreenContainer } from '../../components/ScreenContainer';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RoboQoachLogo } from '../../components/RoboQoachLogo';
import { Video, ResizeMode } from 'expo-av';
import { introVideos } from '../../assets/introVideos';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import { theme } from 'styles/theme';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen() {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  const handleQuickSetup = () => {
    navigation.navigate({ name: 'QuickStart', params: undefined });
  };

  const handlePersonalizedSetup = () => {
    navigation.navigate('OnboardingSingle', undefined);
  };

  return (
  <ScreenContainer scrollable={true}>
  <View style={styles.content}>
        {/* Video or animated background placeholder */}
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: introVideos[0].uri }}
            style={styles.video}
            resizeMode={ResizeMode.COVER}
            isLooping
            isMuted
            shouldPlay
          />
        </View>
        <View style={styles.logoHeader}>
          <RoboQoachLogo size={40} />
          <Text style={styles.title}>RoboQoach</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handlePersonalizedSetup}>
            <Text style={styles.primaryButtonText}>Personalized Setup</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={handleQuickSetup}>
            <Text style={styles.secondaryButtonText}>Quick Start</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  videoContainer: {
    width: '100%',
    height: 220,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 32,
    backgroundColor: '#111',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  logoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  logoIcon: {
    marginRight: 12,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: theme.colors.primary,
    letterSpacing: 1.2,
    textShadowColor: '#0a0a0a',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  secondaryButtonText: {
    color: theme.colors.primary,
    fontSize: 17,
    fontWeight: '600',
  },
});