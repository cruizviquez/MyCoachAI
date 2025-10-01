import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Linking,
} from 'react-native';
import { CameraView } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenContainer, Button } from 'components';
import { theme } from 'styles/theme';
import { responsive } from 'utils/responsive';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

type VisionCoachScreenNavigationProp = StackNavigationProp<RootStackParamList, 'VisionCoachScreen'>;
type VisionCoachScreenRouteProp = RouteProp<RootStackParamList, 'VisionCoachScreen'>;

interface VisionCoachScreenProps {
  navigation: VisionCoachScreenNavigationProp;
  route: VisionCoachScreenRouteProp;
}


export const VisionCoachScreen: React.FC<VisionCoachScreenProps> = ({ navigation, route }) => {
  const { workout } = route.params;
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [currentSet, setCurrentSet] = useState(1);
  const [currentReps, setCurrentReps] = useState(0);
  const [formScore, setFormScore] = useState(0);
  const [feedback, setFeedback] = useState('Position yourself in frame');

  useEffect(() => {
    (async () => {
      // expo-camera v17: use Camera.requestCameraPermissionsAsync
      const { status } = await import('expo-camera').then(mod => mod.Camera.requestCameraPermissionsAsync());
      setHasPermission(status === 'granted');
    })();
  }, []);


  if (hasPermission === null) {
    return (
      <View style={visionStyles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <ScreenContainer scrollable={false}>
        <View style={visionStyles.errorContainer}>
          <Text style={visionStyles.errorTitle}>Camera Access Required</Text>
          <Text style={visionStyles.errorMessage}>
            Please enable camera access in your device settings to use AI coaching.
          </Text>
          <Button
            title="Go to Settings"
            onPress={() => Linking.openSettings()}
          />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <View style={visionStyles.container}>
      <CameraView style={visionStyles.camera} facing="front">
        {/* Top Overlay - Stats */}
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'transparent']}
          style={visionStyles.topOverlay}
        >
          
            <View style={visionStyles.topBar}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={visionStyles.backButton}
              >
                <Text style={visionStyles.backIcon}>←</Text>
              </TouchableOpacity>
              
              <View style={visionStyles.exerciseInfo}>
                <Text style={visionStyles.exerciseName}>{workout.name}</Text>
                <Text style={visionStyles.exerciseDetails}>
                  Set {currentSet}/{workout.sets}
                </Text>
              </View>
              
              <TouchableOpacity style={visionStyles.menuButton}>
                <Text style={visionStyles.menuIcon}>⋮</Text>
              </TouchableOpacity>
            </View>
          
        </LinearGradient>

        {/* Center Content */}
        <View style={visionStyles.centerContent}>
          {/* Rep Counter */}
          <View style={visionStyles.repCounterContainer}>
            <Text style={visionStyles.repNumber}>{currentReps}</Text>
            <Text style={visionStyles.repLabel}>REPS</Text>
            <View style={visionStyles.targetReps}>
              <Text style={visionStyles.targetText}>Target: {workout.reps}</Text>
            </View>
          </View>

          {/* Form Score Indicator */}
          <View style={visionStyles.formIndicator}>
            <View style={visionStyles.formBar}>
              <LinearGradient
                colors={
                  formScore > 80 ? [theme.colors.success, '#00CC66'] :
                  formScore > 60 ? [theme.colors.warning, '#FFA500'] :
                  [theme.colors.error, '#CC0000']
                }
                style={[visionStyles.formFill, { width: `${formScore}%` }]}
              />
            </View>
            <Text style={visionStyles.formText}>Form Quality: {formScore}%</Text>
          </View>
        </View>

        {/* Bottom Overlay - Controls */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.9)']}
          style={visionStyles.bottomOverlay}
        >
          {/* Feedback Section */}
          <View style={visionStyles.feedbackContainer}>
            <View style={visionStyles.feedbackBubble}>
              <Text style={visionStyles.feedbackText}>{feedback}</Text>
            </View>
          </View>

          {/* Control Buttons */}
          <View style={visionStyles.controls}>
            {!isTracking ? (
              <TouchableOpacity
                style={visionStyles.startButton}
                onPress={() => setIsTracking(true)}
              >
                <LinearGradient
                  colors={[...theme.colors.gradient] as [string, string]}
                  style={visionStyles.startButtonGradient}
                >
                  <Text style={visionStyles.startButtonText}>START TRACKING</Text>
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <View style={visionStyles.trackingControls}>
                <TouchableOpacity
                  style={visionStyles.pauseButton}
                  onPress={() => setIsTracking(false)}
                >
                  <Text style={visionStyles.pauseIcon}>⏸</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={visionStyles.stopButton}
                  onPress={() => {
                    navigation.navigate('Results', { workout, performance: {
                      totalReps: currentReps,
                      avgForm: formScore
                    }});
                  }}
                >
                  <Text style={visionStyles.stopText}>FINISH SET</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Quick Stats */}
          <View style={visionStyles.quickStats}>
            <View style={visionStyles.quickStatItem}>
              <Text style={visionStyles.quickStatValue}>{workout.sets * workout.reps}</Text>
              <Text style={visionStyles.quickStatLabel}>Total Target</Text>
            </View>
            <View style={visionStyles.quickStatItem}>
              <Text style={visionStyles.quickStatValue}>
                {Math.floor((currentReps / (workout.sets * workout.reps)) * 100)}%
              </Text>
              <Text style={visionStyles.quickStatLabel}>Complete</Text>
            </View>
            <View style={visionStyles.quickStatItem}>
              <Text style={visionStyles.quickStatValue}>2:45</Text>
              <Text style={visionStyles.quickStatLabel}>Duration</Text>
            </View>
          </View>
        </LinearGradient>
      </CameraView>
    </View>
  );
};

const visionStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  
  camera: {
    flex: 1,
  },
  
  loadingContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: responsive.scale(40),
  },
  
  errorTitle: {
    fontSize: responsive.fontSize(24),
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: responsive.vScale(16),
    textAlign: 'center',
  },
  
  errorMessage: {
    fontSize: responsive.fontSize(16),
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: responsive.vScale(32),
    lineHeight: 24,
  },
  
  // Top Overlay
  topOverlay: {
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    paddingBottom: responsive.vScale(20),
  },
  
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsive.scale(20),
    paddingTop: responsive.vScale(10),
  },
  
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  backIcon: {
    fontSize: 24,
    color: '#fff',
  },
  
  exerciseInfo: {
    alignItems: 'center',
  },
  
  exerciseName: {
    fontSize: responsive.fontSize(18),
    fontWeight: '700',
    color: '#fff',
  },
  
  exerciseDetails: {
    fontSize: responsive.fontSize(14),
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  menuIcon: {
    fontSize: 24,
    color: '#fff',
  },
  
  // Center Content
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  repCounterContainer: {
    alignItems: 'center',
  },
  
  repNumber: {
    fontSize: responsive.fontSize(120),
    fontWeight: '900',
    color: theme.colors.primary,
    textShadowColor: 'rgba(0, 212, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 30,
    lineHeight: 140,
  },
  
  repLabel: {
    fontSize: responsive.fontSize(18),
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 2,
  },
  
  targetReps: {
    marginTop: responsive.vScale(8),
    backgroundColor: 'rgba(0, 212, 255, 0.2)',
    paddingHorizontal: responsive.scale(16),
    paddingVertical: responsive.vScale(6),
    borderRadius: theme.borderRadius.round,
  },
  
  targetText: {
    fontSize: responsive.fontSize(14),
    color: theme.colors.primary,
    fontWeight: '600',
  },
  
  formIndicator: {
    position: "relative",
    top: responsive.vScale(200),
    left: responsive.scale(40),
    right: responsive.scale(40),
  },
  
  formBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  
  formFill: {
    height: '100%',
    borderRadius: 3,
  },
  
  formText: {
    fontSize: responsive.fontSize(12),
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginTop: responsive.vScale(8),
  },
  
  // Bottom Overlay
  bottomOverlay: {
    position: "relative",
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: responsive.vScale(40),
  },
  
  feedbackContainer: {
    alignItems: 'center',
    marginBottom: responsive.vScale(24),
  },
  
  feedbackBubble: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: responsive.scale(24),
    paddingVertical: responsive.vScale(12),
    borderRadius: theme.borderRadius.round,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  
  feedbackText: {
    fontSize: responsive.fontSize(16),
    color: '#fff',
    fontWeight: '600',
  },
  
  controls: {
    paddingHorizontal: responsive.scale(40),
    marginBottom: responsive.vScale(24),
  },
  
  startButton: {
    width: '100%',
  },
  
  startButtonGradient: {
    paddingVertical: responsive.vScale(18),
    borderRadius: theme.borderRadius.round,
    alignItems: 'center',
  },
  
  startButtonText: {
    fontSize: responsive.fontSize(18),
    fontWeight: '800',
    color: '#000',
    letterSpacing: 1,
  },
  
  trackingControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: responsive.scale(16),
  },
  
  pauseButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  pauseIcon: {
    fontSize: 24,
    color: '#fff',
  },
  
  stopButton: {
    flex: 1,
    backgroundColor: theme.colors.error,
    paddingVertical: responsive.vScale(18),
    borderRadius: theme.borderRadius.round,
    alignItems: 'center',
  },
  
  stopText: {
    fontSize: responsive.fontSize(16),
    fontWeight: '700',
    color: '#fff',
  },
  
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: responsive.vScale(30),
    paddingHorizontal: responsive.scale(20),
  },
  
  quickStatItem: {
    alignItems: 'center',
  },
  
  quickStatValue: {
    fontSize: responsive.fontSize(20),
    fontWeight: '700',
    color: '#fff',
  },
  
  quickStatLabel: {
    fontSize: responsive.fontSize(12),
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
  },
});