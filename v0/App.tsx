// ============================================
// ROBOQOACH MVP - COMPLETE APP STRUCTURE
// ============================================

// 1. APP.TSX - MAIN NAVIGATION
// ============================================
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { VisionCoachScreen } from './screens/VisionCoachScreen';
import { ResultsScreen } from './screens/ResultsScreen';
import { SocialFeedScreen } from './screens/SocialFeedScreen';



const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(false);

  useEffect(() => {
    checkOnboarding();
  }, []);

  const checkOnboarding = async () => {
    try {
      const onboarded = await AsyncStorage.getItem('onboarded');
      setIsOnboarded(onboarded === 'true');
    } catch (error) {
      console.error('Error checking onboarding:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    // You can show a splash screen here
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isOnboarded ? 'Dashboard' : 'Onboarding'}
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#0A0A0A' },
        }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="VisionCoach" component={VisionCoachScreen} />
        {/* Add other screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// ============================================
// 2. ONBOARDING SCREEN - SUPER SIMPLE
// ============================================
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const OnboardingScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({
    name: '',
    goal: 'strength', // strength, weight_loss, endurance
    level: 'beginner' // beginner, intermediate, advanced
  });

  const completeOnboarding = async () => {
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
    await AsyncStorage.setItem('onboarded', 'true');
    navigation.replace('Dashboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🤖</Text>
          <Text style={styles.logoText}>
            Robo<Text style={styles.logoAccent}>Qoach</Text>
          </Text>
        </View>

        {/* Quick Setup */}
        <Text style={styles.title}>Let's Get Started!</Text>
        
        <TextInput
          style={styles.input}
          placeholder="What's your name?"
          placeholderTextColor="#666"
          value={userData.name}
          onChangeText={(text) => setUserData({...userData, name: text})}
        />

        {/* Goal Selection */}
        <Text style={styles.label}>Primary Goal:</Text>
        <View style={styles.buttonGroup}>
          {['strength', 'weight_loss', 'endurance'].map((goal) => (
            <TouchableOpacity
              key={goal}
              style={[
                styles.optionButton,
                userData.goal === goal && styles.optionButtonActive
              ]}
              onPress={() => setUserData({...userData, goal})}
            >
              <Text style={[
                styles.optionText,
                userData.goal === goal && styles.optionTextActive
              ]}>
                {goal.replace('_', ' ').toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Level Selection */}
        <Text style={styles.label}>Fitness Level:</Text>
        <View style={styles.buttonGroup}>
          {['beginner', 'intermediate', 'advanced'].map((level) => (
            <TouchableOpacity
              key={level}
              style={[
                styles.optionButton,
                userData.level === level && styles.optionButtonActive
              ]}
              onPress={() => setUserData({...userData, level})}
            >
              <Text style={[
                styles.optionText,
                userData.level === level && styles.optionTextActive
              ]}>
                {level.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Start Button */}
        <TouchableOpacity
          style={styles.startButton}
          onPress={completeOnboarding}
          disabled={!userData.name}
        >
          <Text style={styles.startButtonText}>
            START MY JOURNEY →
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// ============================================
// 3. DASHBOARD SCREEN - HUB
// ============================================
export const DashboardScreen = ({ navigation }) => {
  const [todayWorkout, setTodayWorkout] = useState({
    exercise: 'Squats',
    sets: 3,
    reps: 12,
    completed: false
  });

  const [stats, setStats] = useState({
    streak: 7,
    totalWorkouts: 23,
    perfectForm: 89
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back! 👋</Text>
        <Text style={styles.headerTitle}>Today's Mission</Text>
      </View>

      {/* Today's Workout Card */}
      <TouchableOpacity 
        style={styles.workoutCard}
        onPress={() => navigation.navigate('VisionCoach', { workout: todayWorkout })}
      >
        <View style={styles.workoutCardHeader}>
          <Text style={styles.workoutExercise}>{todayWorkout.exercise}</Text>
          <View style={styles.workoutBadge}>
            <Text style={styles.badgeText}>AI COACHED</Text>
          </View>
        </View>
        
        <View style={styles.workoutDetails}>
          <View style={styles.workoutStat}>
            <Text style={styles.statNumber}>{todayWorkout.sets}</Text>
            <Text style={styles.statLabel}>SETS</Text>
          </View>
          <View style={styles.workoutStat}>
            <Text style={styles.statNumber}>{todayWorkout.reps}</Text>
            <Text style={styles.statLabel}>REPS</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.startWorkoutButton}>
          <Text style={styles.startWorkoutText}>START WITH VISION COACH →</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>🔥</Text>
          <Text style={styles.statValue}>{stats.streak}</Text>
          <Text style={styles.statTitle}>Day Streak</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>💪</Text>
          <Text style={styles.statValue}>{stats.totalWorkouts}</Text>
          <Text style={styles.statTitle}>Workouts</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>⭐</Text>
          <Text style={styles.statValue}>{stats.perfectForm}%</Text>
          <Text style={styles.statTitle}>Form Score</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('SocialFeed')}
        >
          <Text style={styles.actionIcon}>👥</Text>
          <Text style={styles.actionText}>Community</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>🏆</Text>
          <Text style={styles.actionText}>Challenges</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>📊</Text>
          <Text style={styles.actionText}>Progress</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// ============================================
// 4. VISION COACH SCREEN - CORE FEATURE
// ============================================
import { Camera } from 'expo-camera';
import * as tf from '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection';

export const VisionCoachScreen = ({ navigation, route }) => {
  const { workout } = route.params;
  const [currentSet, setCurrentSet] = useState(1);
  const [currentReps, setCurrentReps] = useState(0);
  const [formScore, setFormScore] = useState(100);
  const [isTracking, setIsTracking] = useState(false);
  const [coachFeedback, setCoachFeedback] = useState("Position yourself in frame");

  // Coach voice lines
  const coachLines = {
    start: ["Let's go!", "Show me what you got!", "Time to work!"],
    goodForm: ["Perfect form!", "That's it!", "Beautiful!", "Keep it up!"],
    badForm: ["Watch your form!", "Stay controlled!", "Focus on technique!"],
    encourage: ["You got this!", "Push through!", "Almost there!", "Stay strong!"],
    complete: ["Set complete!", "Great job!", "Crushed it!", "Well done!"]
  };

  const startTracking = async () => {
    setIsTracking(true);
    // Initialize TensorFlow and pose detection
    // ... (integrate the vision tracking component here)
  };

  const onRepDetected = (score) => {
    setCurrentReps(prev => {
      const newReps = prev + 1;
      
      // Voice feedback
      if (score > 0.8) {
        speakCoachLine(coachLines.goodForm);
      } else if (score < 0.6) {
        speakCoachLine(coachLines.badForm);
      }
      
      // Check if set is complete
      if (newReps >= workout.reps) {
        completeSet();
        return 0;
      }
      
      return newReps;
    });
    
    setFormScore(Math.round(score * 100));
  };

  const completeSet = () => {
    if (currentSet >= workout.sets) {
      // Workout complete
      navigation.navigate('Results', {
        workout,
        performance: {
          averageForm: formScore,
          totalReps: workout.sets * workout.reps
        }
      });
    } else {
      setCurrentSet(prev => prev + 1);
      setCurrentReps(0);
      speakCoachLine(coachLines.complete);
    }
  };

  const speakCoachLine = (lines) => {
    const randomLine = lines[Math.floor(Math.random() * lines.length)];
    setCoachFeedback(randomLine);
    // Use expo-speech or react-native-tts for actual voice
  };

  return (
    <View style={styles.visionContainer}>
      {/* Camera View */}
      <Camera style={styles.camera} type={Camera.Constants.Type.front}>
        {/* Overlay UI */}
        <View style={styles.cameraOverlay}>
          {/* Top Stats */}
          <View style={styles.topStats}>
            <View style={styles.statBubble}>
              <Text style={styles.statLabel}>SET</Text>
              <Text style={styles.statBig}>{currentSet}/{workout.sets}</Text>
            </View>
            
            <View style={[styles.statBubble, styles.formBubble]}>
              <Text style={styles.statLabel}>FORM</Text>
              <Text style={[
                styles.statBig,
                formScore > 80 ? styles.goodForm : styles.badForm
              ]}>
                {formScore}%
              </Text>
            </View>
          </View>

          {/* Center Rep Counter */}
          <View style={styles.repCounter}>
            <Text style={styles.repNumber}>{currentReps}</Text>
            <Text style={styles.repLabel}>/{workout.reps} REPS</Text>
          </View>

          {/* Coach Feedback */}
          <View style={styles.coachBubble}>
            <Text style={styles.coachIcon}>🤖</Text>
            <Text style={styles.coachText}>{coachFeedback}</Text>
          </View>

          {/* Control Button */}
          <TouchableOpacity
            style={[styles.controlButton, isTracking && styles.stopButton]}
            onPress={() => isTracking ? setIsTracking(false) : startTracking()}
          >
            <Text style={styles.controlButtonText}>
              {isTracking ? 'STOP' : 'START TRACKING'}
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

// ============================================
// 5. RESULTS SCREEN - MOTIVATION
// ============================================
export const ResultsScreen = ({ navigation, route }) => {
  const { workout, performance } = route.params;
  const [reward, setReward] = useState(null);

  useEffect(() => {
    calculateReward();
  }, []);

  const calculateReward = () => {
    if (performance.averageForm > 90) {
      setReward({
        title: "Form Master! 🏆",
        points: 100,
        badge: "perfect_form"
      });
    } else if (performance.averageForm > 75) {
      setReward({
        title: "Great Work! ⭐",
        points: 50,
        badge: "good_form"
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.resultsContent}>
        {/* Celebration Header */}
        <View style={styles.celebrationHeader}>
          <Text style={styles.celebrationEmoji}>🎉</Text>
          <Text style={styles.celebrationTitle}>Workout Complete!</Text>
        </View>

        {/* Performance Stats */}
        <View style={styles.performanceCard}>
          <Text style={styles.exerciseName}>{workout.exercise}</Text>
          
          <View style={styles.performanceStats}>
            <View style={styles.perfStat}>
              <Text style={styles.perfValue}>{workout.sets * workout.reps}</Text>
              <Text style={styles.perfLabel}>Total Reps</Text>
            </View>
            
            <View style={styles.perfStat}>
              <Text style={[
                styles.perfValue,
                performance.averageForm > 80 ? styles.goodScore : styles.avgScore
              ]}>
                {performance.averageForm}%
              </Text>
              <Text style={styles.perfLabel}>Avg Form</Text>
            </View>
          </View>

          {/* Reward */}
          {reward && (
            <View style={styles.rewardCard}>
              <Text style={styles.rewardTitle}>{reward.title}</Text>
              <Text style={styles.rewardPoints}>+{reward.points} XP</Text>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.resultActions}>
          <TouchableOpacity 
            style={styles.shareButton}
            onPress={() => navigation.navigate('SocialFeed', { 
              shareWorkout: { workout, performance } 
            })}
          >
            <Text style={styles.shareButtonText}>SHARE WITH COMMUNITY</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={() => navigation.navigate('Dashboard')}
          >
            <Text style={styles.continueButtonText}>BACK TO DASHBOARD</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

// ============================================
// 6. SOCIAL FEED - COMMUNITY
// ============================================
export const SocialFeedScreen = ({ navigation }) => {
  const [feedItems, setFeedItems] = useState([
    {
      id: 1,
      user: 'Sarah K.',
      avatar: '💪',
      exercise: 'Squats',
      reps: 45,
      formScore: 92,
      timestamp: '2 min ago',
      isLive: true
    },
    {
      id: 2,
      user: 'Mike R.',
      avatar: '🔥',
      exercise: 'Push-ups',
      reps: 30,
      formScore: 88,
      timestamp: '5 min ago',
      isLive: false
    }
  ]);

  const sendHighFive = (userId) => {
    // Animate and send high five
    console.log(`High five sent to user ${userId}!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.feedHeader}>
        <Text style={styles.feedTitle}>Community Feed</Text>
        <TouchableOpacity style={styles.liveButton}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>23 LIVE NOW</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.feedScroll}>
        {feedItems.map(item => (
          <View key={item.id} style={styles.feedCard}>
            <View style={styles.feedCardHeader}>
              <View style={styles.userInfo}>
                <Text style={styles.userAvatar}>{item.avatar}</Text>
                <View>
                  <Text style={styles.userName}>{item.user}</Text>
                  <Text style={styles.timestamp}>{item.timestamp}</Text>
                </View>
              </View>
              {item.isLive && (
                <View style={styles.liveBadge}>
                  <Text style={styles.liveBadgeText}>LIVE</Text>
                </View>
              )}
            </View>

            <View style={styles.workoutInfo}>
              <Text style={styles.workoutTitle}>
                {item.exercise} - {item.reps} reps
              </Text>
              <View style={styles.formScoreBar}>
                <View 
                  style={[
                    styles.formScoreFill,
                    { width: `${item.formScore}%` }
                  ]}
                />
                <Text style={styles.formScoreText}>{item.formScore}% Form</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.highFiveButton}
              onPress={() => sendHighFive(item.id)}
            >
              <Text style={styles.highFiveEmoji}>🙏</Text>
              <Text style={styles.highFiveText}>HIGH FIVE!</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// ============================================
// STYLES
// ============================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  
  // Logo Styles
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 60,
    marginBottom: 10,
  },
  logoText: {
    fontSize: 36,
    fontWeight: '900',
    color: '#fff',
  },
  logoAccent: {
    color: '#00D4FF',
  },
  
  // Input Styles
  input: {
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  
  // Button Styles
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 30,
  },
  optionButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  optionButtonActive: {
    backgroundColor: '#00D4FF',
    borderColor: '#00D4FF',
  },
  optionText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    fontWeight: '600',
  },
  optionTextActive: {
    color: '#000',
  },
  
  // Start Button
  startButton: {
    backgroundColor: '#00D4FF',
    padding: 18,
    borderRadius: 30,
    marginTop: 20,
  },
  startButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },
  
  // Dashboard Styles
  header: {
    padding: 20,
    paddingTop: 40,
  },
  greeting: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
  },
  
  // Workout Card
  workoutCard: {
    backgroundColor: 'linear-gradient(135deg, #00D4FF, #00FF88)',
    margin: 20,
    padding: 25,
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#00D4FF',
  },
  workoutCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  workoutExercise: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
  },
  workoutBadge: {
    backgroundColor: '#00D4FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#000',
  },
  workoutDetails: {
    flexDirection: 'row',
    gap: 30,
    marginBottom: 20,
  },
  workoutStat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 36,
    fontWeight: '900',
    color: '#00D4FF',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  startWorkoutButton: {
    backgroundColor: '#00D4FF',
    padding: 15,
    borderRadius: 15,
  },
  startWorkoutText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  
  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 15,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  statEmoji: {
    fontSize: 24,
    marginBottom: 10,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 5,
  },
  statTitle: {
    fontSize: 12,
    color: '#666',
  },
  
  // Quick Actions
  quickActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 15,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: '#666',
  },
  
  // Vision Coach Styles
  visionContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    padding: 20,
  },
  topStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 40,
  },
  statBubble: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  statBig: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
  },
  formBubble: {
    minWidth: 100,
  },
  goodForm: {
    color: '#00FF88',
  },
  badForm: {
    color: '#FF4B4B',
  },
  
  // Rep Counter
  repCounter: {
    alignItems: 'center',
  },
  repNumber: {
    fontSize: 120,
    fontWeight: '900',
    color: '#00D4FF',
    textShadowColor: 'rgba(0, 212, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  repLabel: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
  },
  
  // Coach Bubble
  coachBubble: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 30,
    alignSelf: 'center',
    gap: 10,
  },
  coachIcon: {
    fontSize: 24,
  },
  coachText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Control Button
  controlButton: {
    backgroundColor: '#00D4FF',
    paddingVertical: 20,
    borderRadius: 30,
    marginBottom: 40,
  },
  stopButton: {
    backgroundColor: '#FF4B4B',
  },
  controlButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },
  
  // Results Styles
  resultsContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  celebrationHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  celebrationEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  celebrationTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: '#fff',
  },
  performanceCard: {
    backgroundColor: '#1a1a1a',
    padding: 30,
    borderRadius: 20,
    marginBottom: 30,
  },
  exerciseName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  performanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  perfStat: {
    alignItems: 'center',
  },
  perfValue: {
    fontSize: 36,
    fontWeight: '900',
    color: '#00D4FF',
    marginBottom: 5,
  },
  perfLabel: {
    fontSize: 14,
    color: '#666',
  },
  goodScore: {
    color: '#00FF88',
  },
  avgScore: {
    color: '#FFD700',
  },
  rewardCard: {
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00D4FF',
  },
  rewardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#00D4FF',
    marginBottom: 5,
  },
  rewardPoints: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFD700',
  },
  resultActions: {
    gap: 15,
  },
  shareButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#00D4FF',
    padding: 18,
    borderRadius: 30,
  },
  shareButtonText: {
    color: '#00D4FF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#00D4FF',
    padding: 18,
    borderRadius: 30,
  },
  continueButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  
  // Social Feed Styles
  feedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  feedTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
  },
  liveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  liveDot: {
    width: 8,
    height: 8,
    backgroundColor: '#FF4B4B',
    borderRadius: 4,
    animation: 'pulse 2s infinite',
  },
  liveText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  feedScroll: {
    flex: 1,
    padding: 20,
  },
  feedCard: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  feedCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  userAvatar: {
    fontSize: 32,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  liveBadge: {
    backgroundColor: '#FF4B4B',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  liveBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  workoutInfo: {
    marginBottom: 15,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  formScoreBar: {
    height: 30,
    backgroundColor: '#0a0a0a',
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  formScoreFill: {
    height: '100%',
    backgroundColor: '#00D4FF',
    borderRadius: 15,
  },
  formScoreText: {
    position: 'absolute',
    top: 7,
    left: 15,
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  highFiveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    padding: 12,
    borderRadius: 15,
    gap: 8,
  },
  highFiveEmoji: {
    fontSize: 20,
  },
  highFiveText: {
    color: '#00D4FF',
    fontSize: 14,
    fontWeight: '700',
  },
  
  // Additional utility styles
  label: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
});

// ============================================
// 7. NOTIFICATION SERVICE
// ============================================
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class NotificationService {
  static async setupNotifications() {
    // Request permissions
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      return false;
    }

    // Configure notification handler
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    return true;
  }

  static async scheduleWorkoutReminder(time: Date) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Time to Train! 💪",
        body: "Your AI coach is ready. Let's crush today's workout!",
        data: { type: 'workout_reminder' },
      },
      trigger: {
        hour: time.getHours(),
        minute: time.getMinutes(),
        repeats: true,
      },
    });
  }

  static async sendMotivationalNotification() {
    const messages = [
      "You're 3 workouts away from a new streak record! 🔥",
      "Sarah just completed squats with 95% form. Can you beat it? 💪",
      "Your muscles have recovered. Time for leg day! 🦵",
      "5 friends are working out right now. Join them! 👥",
    ];

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "RoboQoach",
        body: messages[Math.floor(Math.random() * messages.length)],
        data: { type: 'motivation' },
      },
      trigger: null, // Send immediately
    });
  }
}

// ============================================
// 8. WORKOUT GENERATOR SERVICE
// ============================================
export class WorkoutGenerator {
  static exercises = {
    beginner: {
      strength: ['Bodyweight Squats', 'Push-ups', 'Plank', 'Lunges'],
      weight_loss: ['Jumping Jacks', 'Mountain Climbers', 'Burpees', 'High Knees'],
      endurance: ['Jump Rope', 'Running in Place', 'Step-ups', 'Wall Sits'],
    },
    intermediate: {
      strength: ['Goblet Squats', 'Diamond Push-ups', 'Bulgarian Split Squats', 'Pike Push-ups'],
      weight_loss: ['Box Jumps', 'Battle Ropes', 'Kettlebell Swings', 'Thrusters'],
      endurance: ['Interval Sprints', 'Bear Crawls', 'Jump Squats', 'Bicycle Crunches'],
    },
    advanced: {
      strength: ['Pistol Squats', 'Handstand Push-ups', 'Muscle-ups', 'Front Lever'],
      weight_loss: ['Double Unders', 'Box Jump Overs', 'Devil Press', 'Man Makers'],
      endurance: ['Assault Bike Intervals', 'Rowing Sprints', 'Sled Pushes', 'Prowler Walks'],
    },
  };

  static generateDailyWorkout(userData: any) {
    const { level, goal } = userData;
    const exercisePool = this.exercises[level][goal];
    
    // Pick 3-4 exercises for the day
    const shuffled = [...exercisePool].sort(() => 0.5 - Math.random());
    const selectedExercises = shuffled.slice(0, 3);

    return selectedExercises.map(exercise => ({
      exercise,
      sets: level === 'beginner' ? 3 : level === 'intermediate' ? 4 : 5,
      reps: this.getOptimalReps(exercise, level),
      rest: level === 'beginner' ? 60 : level === 'intermediate' ? 45 : 30,
    }));
  }

  static getOptimalReps(exercise: string, level: string) {
    const repRanges = {
      beginner: { min: 8, max: 12 },
      intermediate: { min: 10, max: 15 },
      advanced: { min: 12, max: 20 },
    };

    const range = repRanges[level];
    return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
  }

  static adjustBasedOnPerformance(lastWorkout: any, formScore: number) {
    // If form was great, increase difficulty
    if (formScore > 90) {
      return {
        ...lastWorkout,
        reps: lastWorkout.reps + 2,
      };
    }
    // If form was poor, decrease difficulty
    else if (formScore < 70) {
      return {
        ...lastWorkout,
        reps: Math.max(5, lastWorkout.reps - 2),
      };
    }
    
    return lastWorkout;
  }
}

// ============================================
// 9. GAMIFICATION SERVICE
// ============================================
export class GamificationService {
  static achievements = [
    { id: 'first_workout', title: 'First Steps', icon: '👟', xp: 50 },
    { id: 'week_streak', title: '7 Day Warrior', icon: '🔥', xp: 100 },
    { id: 'perfect_form', title: 'Form Master', icon: '⭐', xp: 150 },
    { id: 'early_bird', title: 'Early Bird', icon: '🌅', xp: 75 },
    { id: 'night_owl', title: 'Night Owl', icon: '🦉', xp: 75 },
    { id: '100_reps', title: 'Century Club', icon: '💯', xp: 200 },
    { id: 'social_butterfly', title: 'Team Player', icon: '🦋', xp: 100 },
  ];

  static async checkAchievements(workout: any, userData: any) {
    const unlockedAchievements = [];

    // Check various achievement conditions
    if (!userData.hasFirstWorkout) {
      unlockedAchievements.push(this.achievements[0]);
    }

    if (userData.currentStreak >= 7) {
      unlockedAchievements.push(this.achievements[1]);
    }

    if (workout.formScore >= 95) {
      unlockedAchievements.push(this.achievements[2]);
    }

    return unlockedAchievements;
  }

  static calculateLevel(totalXP: number) {
    const xpPerLevel = 500;
    return Math.floor(totalXP / xpPerLevel) + 1;
  }

  static getNextLevelProgress(totalXP: number) {
    const xpPerLevel = 500;
    const currentLevelXP = totalXP % xpPerLevel;
    return (currentLevelXP / xpPerLevel) * 100;
  }
}

// ============================================
// 10. PACKAGE.JSON DEPENDENCIES
// ============================================
const packageJson = {
  "dependencies": {
    "expo": "~49.0.0",
    "expo-camera": "~13.4.4",
    "expo-notifications": "~0.20.1",
    "expo-speech": "~11.3.0",
    "expo-secure-store": "~12.3.1",
    "@react-navigation/native": "^6.1.7",
    "@react-navigation/stack": "^6.3.17",
    "react-native-screens": "~3.22.0",
    "react-native-safe-area-context": "4.6.3",
    "@tensorflow/tfjs": "^4.10.0",
    "@tensorflow-models/pose-detection": "^2.1.0",
    "@mediapipe/pose": "^0.5.1",
    "@react-native-async-storage/async-storage": "1.18.2",
    "react-native-reanimated": "~3.3.0",
    "react-native-gesture-handler": "~2.12.0"
  }
}