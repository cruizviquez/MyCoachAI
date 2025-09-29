import { ScreenContainer } from '../../components/ScreenContainer';
import { Button } from '../../components/Button';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import { useOnboarding } from '../../state/OnboardingContext';

type OnboardingScheduleNavigationProp = StackNavigationProp<RootStackParamList, 'OnboardingSchedule'>;

export default function OnboardingSchedule() {
  const navigation = useNavigation<OnboardingScheduleNavigationProp>();
  const { data, setData } = useOnboarding();
  
  // Initialize with data from context
  const [daysPerWeek, setDaysPerWeek] = useState(data.schedule?.daysPerWeek || 3);
  const [preferredTime, setPreferredTime] = useState(data.schedule?.preferredTime || 'morning');

  const dayOptions = [2, 3, 4, 5, 6, 7];
  const timeOptions = [
    { id: 'morning', label: 'Morning', icon: '🌅', description: '6 AM - 12 PM' },
    { id: 'afternoon', label: 'Afternoon', icon: '☀️', description: '12 PM - 5 PM' },
    { id: 'evening', label: 'Evening', icon: '🌆', description: '5 PM - 9 PM' },
    { id: 'night', label: 'Night', icon: '🌙', description: 'After 9 PM' },
  ];

  const handleFinish = () => {
    // Save to context before navigating
    setData({
      schedule: {
        daysPerWeek,
        preferredTime,
      }
    });
    navigation.navigate('WorkoutPlan', {
      level: 'beginner',
      equipment: Array.isArray(data.equipment) ? (data.equipment[0] || '') : (data.equipment || ''),
      time: preferredTime,
      goal: data.goals ? data.goals[0] : undefined,
      limitations: data.limitations || [],
      profile: {
        weight: data.weight,
        height: data.height,
        age: data.age,
        gender: data.gender,
      },
      schedule: {
        daysPerWeek,
        preferredTime,
      }
    });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '100%' }]} />
          </View>
          <Text style={styles.step}>Step 5 of 5</Text>
          <Text style={styles.title}>Your Schedule</Text>
          <Text style={styles.subtitle}>When can you work out?</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Days per week</Text>
          <Text style={styles.sectionSubtitle}>How many days can you commit?</Text>
          <View style={styles.daysContainer}>
            {dayOptions.map((day) => (
              <TouchableOpacity
                key={day}
                style={[styles.dayButton, daysPerWeek === day && styles.selectedDay]}
                onPress={() => setDaysPerWeek(day)}
              >
                <Text style={[styles.dayNumber, daysPerWeek === day && styles.selectedDayText]}>
                  {day}
                </Text>
                <Text style={[styles.dayLabel, daysPerWeek === day && styles.selectedDayText]}>
                  {day === 7 ? 'days' : 'days'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferred time</Text>
          <Text style={styles.sectionSubtitle}>When do you feel most energized?</Text>
          <View style={styles.timeContainer}>
            {timeOptions.map((time) => (
              <TouchableOpacity
                key={time.id}
                style={[styles.timeCard, preferredTime === time.id && styles.selectedTime]}
                onPress={() => setPreferredTime(time.id)}
              >
                <Text style={styles.timeIcon}>{time.icon}</Text>
                <View style={styles.timeTextContainer}>
                  <Text style={[styles.timeLabel, preferredTime === time.id && styles.selectedTimeText]}>
                    {time.label}
                  </Text>
                  <Text style={[styles.timeDescription, preferredTime === time.id && styles.selectedTimeDescription]}>
                    {time.description}
                  </Text>
                </View>
                {preferredTime === time.id && (
                  <View style={styles.checkmark}>
                    <Text style={styles.checkmarkText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Your commitment:</Text>
          <Text style={styles.summaryText}>
            {daysPerWeek} workouts per week, preferably in the {preferredTime}
          </Text>
        </View>

        <View style={styles.navigationContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
            <Text style={styles.finishButtonText}>Get My Plan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  innerContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 10,
  },
  header: {
    marginBottom: 30,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
    marginBottom: 20,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00D4FF',
    borderRadius: 2,
  },
  step: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  dayButton: {
    width: 65,
    height: 65,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  selectedDay: {
    backgroundColor: '#00D4FF',
    borderColor: '#00D4FF',
  },
  dayNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  dayLabel: {
    fontSize: 12,
    color: '#666',
  },
  selectedDayText: {
    color: 'white',
  },
  timeContainer: {
    gap: 12,
  },
  timeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedTime: {
    borderColor: '#00D4FF',
    backgroundColor: '#fff8f5',
  },
  timeIcon: {
    fontSize: 28,
    marginRight: 16,
  },
  timeTextContainer: {
    flex: 1,
  },
  timeLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  timeDescription: {
    fontSize: 13,
    color: '#666',
  },
  selectedTimeText: {
    color: '#00D4FF',
  },
  selectedTimeDescription: {
    color: '#FF8C60',
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#00D4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  summaryContainer: {
    backgroundColor: '#FFF8E5',
    borderRadius: 10,
    padding: 16,
    marginTop: 8,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7B6F39',
    marginBottom: 4,
  },
  summaryText: {
    fontSize: 16,
    color: '#7B6F39',
    lineHeight: 22,
  },
  navigationContainer: {
    flexDirection: 'row',
    gap: 12,
    padding: 20,
    backgroundColor: '#0a0a0a',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  backButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#00D4FF',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00D4FF',
  },
  finishButton: {
    flex: 1,
    backgroundColor: '#00D4FF',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  finishButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});