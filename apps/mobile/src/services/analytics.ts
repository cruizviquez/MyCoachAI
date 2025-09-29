// ============================================
// 1. ANALYTICS SERVICE - Core Tracking Module
// Create this file: /apps/mobile/src/services/analytics.ts
// ============================================

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
import * as Application from 'expo-application';

interface AnalyticsEvent {
  event: string;
  properties?: any;
  timestamp: number;
  sessionId: string;
  userId?: string;
  deviceInfo?: any;
}

class AnalyticsService {
  private sessionId: string;
  private userId: string | null = null;
  private eventQueue: AnalyticsEvent[] = [];
  private isOnline: boolean = true;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeUser();
    this.flushQueue();
  }

  // Generate unique session ID
  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Initialize user from storage
  private async initializeUser() {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const parsed = JSON.parse(userData);
        this.userId = parsed.id || parsed.email || 'anonymous';
      }
    } catch (error) {
      console.error('Failed to initialize user:', error);
    }
  }

  // Get device information
  private getDeviceInfo() {
    return {
      brand: Device.brand,
      model: Device.modelName,
      os: Device.osName,
      osVersion: Device.osVersion,
      appVersion: Application.nativeApplicationVersion,
      buildVersion: Application.nativeBuildVersion,
    };
  }

  // Main tracking method
  public track(event: string, properties?: any) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId,
      deviceInfo: this.getDeviceInfo(),
    };

    // Add to queue
    this.eventQueue.push(analyticsEvent);

    // Store locally for offline support
    this.storeEventLocally(analyticsEvent);

    // Send immediately if online
    if (this.isOnline) {
      this.sendEvent(analyticsEvent);
    }

    // Log in development
    if (__DEV__) {
      console.log('📊 Analytics Event:', event, properties);
    }
  }

  // Send event to backend
  private async sendEvent(event: AnalyticsEvent) {
    try {
      await fetch('https://api.roboqoach.com/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
    } catch (error) {
      // If failed, keep in queue for retry
      console.error('Failed to send analytics:', error);
    }
  }

  // Store events locally for offline support
  private async storeEventLocally(event: AnalyticsEvent) {
    try {
      const stored = await AsyncStorage.getItem('analytics_queue');
      const queue = stored ? JSON.parse(stored) : [];
      queue.push(event);
      
      // Keep only last 100 events
      if (queue.length > 100) {
        queue.shift();
      }
      
      await AsyncStorage.setItem('analytics_queue', JSON.stringify(queue));
    } catch (error) {
      console.error('Failed to store event locally:', error);
    }
  }

  // Flush queued events when online
  private async flushQueue() {
    try {
      const stored = await AsyncStorage.getItem('analytics_queue');
      if (stored) {
        const queue = JSON.parse(stored);
        
        // Send all queued events
        for (const event of queue) {
          await this.sendEvent(event);
        }
        
        // Clear queue after sending
        await AsyncStorage.removeItem('analytics_queue');
      }
    } catch (error) {
      console.error('Failed to flush queue:', error);
    }
  }

  // Track screen views
  public screen(screenName: string, properties?: any) {
    this.track('screen_view', {
      screen_name: screenName,
      ...properties,
    });
  }

  // Track user properties
  public identify(userId: string, traits?: any) {
    this.userId = userId;
    this.track('identify', traits);
  }

  // Track timing events
  public timing(category: string, variable: string, time: number) {
    this.track('timing', {
      category,
      variable,
      time,
    });
  }
}

// Export singleton instance
export const Analytics = new AnalyticsService();

// ============================================
// 2. TRACK IN ONBOARDING SCREEN
// Update: /apps/mobile/src/screens/onboarding/OnboardingScreen.tsx
// ============================================

import { Analytics } from '../../services/analytics';

export const OnboardingScreen = ({ navigation }) => {
  // Track screen view
  useEffect(() => {
    Analytics.screen('Onboarding');
  }, []);

  const completeOnboarding = async () => {
    // Track onboarding completion
    Analytics.track('onboarding_completed', {
      name: userData.name,
      goal: userData.goal,
      fitness_level: userData.level,
      time_spent: Date.now() - startTime, // Track time to complete
    });

    // Identify user
    Analytics.identify(userData.name, {
      goal: userData.goal,
      fitness_level: userData.level,
      created_at: Date.now(),
    });

    await AsyncStorage.setItem('userData', JSON.stringify(userData));
    navigation.replace('Dashboard');
  };

  // Track goal selection
  const selectGoal = (goal: string) => {
    Analytics.track('goal_selected', { goal });
    setUserData({...userData, goal});
  };

  // Track fitness level selection
  const selectLevel = (level: string) => {
    Analytics.track('fitness_level_selected', { level });
    setUserData({...userData, level});
  };
};

// ============================================
// 3. TRACK IN VISION COACH SCREEN (MOST IMPORTANT!)
// Update: /apps/mobile/src/screens/VisionCoachScreen.tsx
// ============================================

export const VisionCoachScreen = ({ navigation, route }) => {
  const startTime = useRef(Date.now());
  const repTimings = useRef<number[]>([]);

  useEffect(() => {
    Analytics.screen('Vision_Coach', {
      exercise: workout.exercise,
      sets: workout.sets,
      reps: workout.reps,
    });

    // Track workout started
    Analytics.track('workout_started', {
      exercise: workout.exercise,
      planned_sets: workout.sets,
      planned_reps: workout.reps,
      timestamp: Date.now(),
    });

    return () => {
      // Track session end when leaving screen
      const duration = Date.now() - startTime.current;
      Analytics.timing('workout', 'session_duration', duration);
    };
  }, []);

  const startTracking = async () => {
    setIsTracking(true);
    
    // Track vision tracking started
    Analytics.track('vision_tracking_started', {
      exercise: workout.exercise,
      camera_permission: true,
    });
  };

  const onRepDetected = (score: number) => {
    const repTime = Date.now();
    repTimings.current.push(repTime);

    // Track each rep
    Analytics.track('rep_completed', {
      exercise: workout.exercise,
      rep_number: currentReps + 1,
      form_score: score,
      set_number: currentSet,
      rep_duration: repTimings.current.length > 1 
        ? repTime - repTimings.current[repTimings.current.length - 2]
        : 0,
    });

    // Track form quality
    if (score < 0.6) {
      Analytics.track('poor_form_detected', {
        exercise: workout.exercise,
        form_score: score,
        rep_number: currentReps + 1,
      });
    } else if (score > 0.9) {
      Analytics.track('perfect_form_achieved', {
        exercise: workout.exercise,
        form_score: score,
        rep_number: currentReps + 1,
      });
    }

    setCurrentReps(prev => prev + 1);
  };

  const completeSet = () => {
    // Track set completion
    Analytics.track('set_completed', {
      exercise: workout.exercise,
      set_number: currentSet,
      total_reps: workout.reps,
      average_form: formScore,
      set_duration: Date.now() - startTime.current,
    });

    if (currentSet >= workout.sets) {
      // Track workout completion
      Analytics.track('workout_completed', {
        exercise: workout.exercise,
        total_sets: workout.sets,
        total_reps: workout.sets * workout.reps,
        average_form_score: formScore,
        total_duration: Date.now() - startTime.current,
        calories_burned_estimate: calculateCalories(workout, Date.now() - startTime.current),
      });

      navigation.navigate('Results', { workout, performance });
    }
  };

  // Track if user quits early
  const handleQuitWorkout = () => {
    Analytics.track('workout_abandoned', {
      exercise: workout.exercise,
      completed_sets: currentSet - 1,
      completed_reps: currentReps,
      reason: 'user_quit',
      duration: Date.now() - startTime.current,
    });
    
    navigation.goBack();
  };
};

// ============================================
// 4. TRACK IN SOCIAL FEED
// Update: /apps/mobile/src/screens/SocialFeedScreen.tsx
// ============================================

export const SocialFeedScreen = ({ navigation }) => {
  useEffect(() => {
    Analytics.screen('Social_Feed');
    
    // Track feed engagement
    Analytics.track('social_feed_viewed', {
      live_users_count: liveUsersCount,
      timestamp: Date.now(),
    });
  }, []);

  const sendHighFive = (userId: string, userName: string) => {
    // Track social interaction
    Analytics.track('high_five_sent', {
      recipient_id: userId,
      recipient_name: userName,
      from_screen: 'social_feed',
      timestamp: Date.now(),
    });

    // Update UI
    animateHighFive(userId);
  };

  const viewUserProfile = (userId: string) => {
    Analytics.track('profile_viewed', {
      profile_id: userId,
      from_screen: 'social_feed',
    });
  };

  const joinLiveWorkout = (workoutId: string) => {
    Analytics.track('live_workout_joined', {
      workout_id: workoutId,
      from_screen: 'social_feed',
    });
  };
};

// ============================================
// 5. TRACK IN RESULTS SCREEN
// Update: /apps/mobile/src/screens/ResultsScreen.tsx
// ============================================

export const ResultsScreen = ({ navigation, route }) => {
  const { workout, performance } = route.params;

  useEffect(() => {
    Analytics.screen('Results', {
      exercise: workout.exercise,
      form_score: performance.averageForm,
    });

    // Track achievement unlocks
    if (reward) {
      Analytics.track('achievement_unlocked', {
        achievement_id: reward.badge,
        achievement_title: reward.title,
        xp_earned: reward.points,
        trigger: 'workout_completion',
      });
    }
  }, []);

  const shareResults = () => {
    Analytics.track('results_shared', {
      exercise: workout.exercise,
      form_score: performance.averageForm,
      total_reps: workout.sets * workout.reps,
      share_destination: 'community_feed',
    });

    navigation.navigate('SocialFeed', { shareWorkout: { workout, performance }});
  };

  const continueToNext = () => {
    Analytics.track('results_continue', {
      action: 'back_to_dashboard',
      time_on_results: Date.now() - screenLoadTime,
    });

    navigation.navigate('Dashboard');
  };
};

// ============================================
// 6. TRACK IN DASHBOARD
// Update: /apps/mobile/src/screens/DashboardScreen.tsx
// ============================================

export const DashboardScreen = ({ navigation }) => {
  useEffect(() => {
    Analytics.screen('Dashboard');
    
    // Track daily active user
    Analytics.track('daily_active_user', {
      streak: stats.streak,
      total_workouts: stats.totalWorkouts,
      timestamp: Date.now(),
    });

    // Check if returning user
    checkReturningUser();
  }, []);

  const checkReturningUser = async () => {
    const lastVisit = await AsyncStorage.getItem('last_visit');
    if (lastVisit) {
      const daysSinceLastVisit = (Date.now() - parseInt(lastVisit)) / (1000 * 60 * 60 * 24);
      
      if (daysSinceLastVisit > 1) {
        Analytics.track('user_returned', {
          days_away: Math.floor(daysSinceLastVisit),
          current_streak: stats.streak,
        });
      }
    }
    
    await AsyncStorage.setItem('last_visit', Date.now().toString());
  };

  const startWorkout = (workout: any) => {
    Analytics.track('workout_selected', {
      exercise: workout.exercise,
      from_screen: 'dashboard',
      user_streak: stats.streak,
    });

    navigation.navigate('VisionCoach', { workout });
  };

  const viewProgress = () => {
    Analytics.track('progress_viewed', {
      from_screen: 'dashboard',
      total_workouts: stats.totalWorkouts,
    });
  };
};

// ============================================
// 7. TRACK APP LIFECYCLE
// Update: /apps/mobile/App.tsx
// ============================================

import { AppState, AppStateStatus } from 'react-native';
import { Analytics } from './src/services/analytics';

export default function App() {
  const appState = useRef(AppState.currentState);
  const sessionStartTime = useRef(Date.now());

  useEffect(() => {
    // Track app launch
    Analytics.track('app_launched', {
      launch_time: Date.now(),
      app_state: AppState.currentState,
    });

    // Track app state changes
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    
    return () => {
      subscription.remove();
      
      // Track session end
      const sessionDuration = Date.now() - sessionStartTime.current;
      Analytics.track('session_ended', {
        duration: sessionDuration,
        screens_viewed: screenCount,
      });
    };
  }, []);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      // App came to foreground
      Analytics.track('app_foreground', {
        timestamp: Date.now(),
      });
      sessionStartTime.current = Date.now();
    } else if (appState.current === 'active' && nextAppState.match(/inactive|background/)) {
      // App went to background
      const sessionDuration = Date.now() - sessionStartTime.current;
      Analytics.track('app_background', {
        session_duration: sessionDuration,
        timestamp: Date.now(),
      });
    }
    
    appState.current = nextAppState;
  };
};

// ============================================
// 8. TRACK NOTIFICATIONS
// Update: /apps/mobile/src/services/NotificationService.ts
// ============================================

import { Analytics } from './analytics';

export class NotificationService {
  static async scheduleWorkoutReminder(time: Date) {
    // Track notification scheduled
    Analytics.track('notification_scheduled', {
      type: 'workout_reminder',
      scheduled_time: time.toISOString(),
    });

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Time to Train! 💪",
        body: "Your AI coach is ready. Let's crush today's workout!",
      },
      trigger: { hour: time.getHours(), minute: time.getMinutes(), repeats: true },
    });
  }

  static setupNotificationHandlers() {
    // Track notification received
    Notifications.addNotificationReceivedListener((notification) => {
      Analytics.track('notification_received', {
        type: notification.request.content.data?.type,
        title: notification.request.content.title,
      });
    });

    // Track notification clicked
    Notifications.addNotificationResponseReceivedListener((response) => {
      Analytics.track('notification_clicked', {
        type: response.notification.request.content.data?.type,
        action: response.actionIdentifier,
      });
    });
  }
}

// ============================================
// 9. CUSTOM HOOKS FOR TRACKING
// Create: /apps/mobile/src/hooks/useTrackScreen.ts
// ============================================

import { useEffect } from 'react';
import { Analytics } from '../services/analytics';

export const useTrackScreen = (screenName: string, properties?: any) => {
  useEffect(() => {
    Analytics.screen(screenName, properties);
  }, [screenName]);
};

// Usage in any screen:
// useTrackScreen('Dashboard', { user_id: userId });

// ============================================
// 10. GOOGLE ANALYTICS INTEGRATION
// For your landing page: /docs/index.html
// ============================================

const GoogleAnalyticsScript = `
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_ID_HERE"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-YOUR_ID_HERE');

  // Custom event tracking for landing page
  function trackLandingEvent(action, category, label, value) {
    gtag('event', action, {
      'event_category': category,
      'event_label': label,
      'value': value
    });
  }

  // Track CTA clicks
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
      trackLandingEvent('click', 'CTA', btn.textContent, 1);
    });
  });

  // Track scroll depth
  let scrollDepths = [25, 50, 75, 100];
  let achievedDepths = [];
  
  window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
    
    scrollDepths.forEach(depth => {
      if (scrollPercent >= depth && !achievedDepths.includes(depth)) {
        achievedDepths.push(depth);
        trackLandingEvent('scroll', 'Engagement', \`\${depth}%\`, depth);
      }
    });
  });

  // Track time on page
  let startTime = Date.now();
  window.addEventListener('beforeunload', () => {
    const timeOnPage = Math.round((Date.now() - startTime) / 1000);
    trackLandingEvent('timing', 'Engagement', 'Time on Page', timeOnPage);
  });
</script>
`;

// ============================================
// 11. KEY METRICS DASHBOARD
// What to measure and why
// ============================================

const KeyMetrics = {
  // User Acquisition
  acquisition: {
    daily_active_users: 'Track growth',
    new_users: 'Conversion from landing',
    app_launches: 'Engagement frequency',
    referral_source: 'Where users come from',
  },

  // Activation
  activation: {
    onboarding_completion_rate: 'First experience success',
    first_workout_completion: 'Core value delivery',
    vision_tracking_activation: 'Feature adoption',
    time_to_first_workout: 'Friction measurement',
  },

  // Retention
  retention: {
    day_1_retention: 'Immediate value',
    day_7_retention: 'Habit formation',
    day_30_retention: 'Long-term engagement',
    workout_streak: 'Consistency metric',
  },

  // Engagement
  engagement: {
    workouts_per_week: 'Usage frequency',
    average_form_score: 'Quality metric',
    social_interactions: 'Community health',
    high_fives_sent: 'Social engagement',
  },

  // Revenue (Future)
  revenue: {
    trial_to_paid_conversion: 'Monetization',
    lifetime_value: 'User worth',
    churn_rate: 'Subscription health',
    revenue_per_user: 'Business health',
  },

  // Performance
  performance: {
    crash_rate: 'App stability',
    camera_initialization_time: 'Technical performance',
    pose_detection_accuracy: 'AI quality',
    api_response_time: 'Backend health',
  },
};