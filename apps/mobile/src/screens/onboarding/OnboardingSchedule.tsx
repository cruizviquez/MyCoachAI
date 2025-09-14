import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';

const { width: screenWidth } = Dimensions.get('window');
const isWeb = screenWidth > 768;

type OnboardingScheduleNavigationProp = StackNavigationProp<RootStackParamList, 'OnboardingSchedule'>;

export default function OnboardingSchedule() {
  const navigation = useNavigation<OnboardingScheduleNavigationProp>();
  const [daysPerWeek, setDaysPerWeek] = useState('');
  const [sessionLength, setSessionLength] = useState('');
  const [preferredTime, setPreferredTime] = useState('');

  const canContinue = daysPerWeek && sessionLength && preferredTime;

  const handleComplete = () => {
    if (canContinue) {
      navigation.navigate('WorkoutPlan', { 
        level: 'intermediate', 
        equipment: 'mixed', 
        time: sessionLength 
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
        >
          <View style={styles.header}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '100%' }]} />
            </View>
            <Text style={styles.step}>Step 5 of 5</Text>
            <Text style={styles.title}>Your schedule</Text>
            <Text style={styles.subtitle}>When can you workout?</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Days per week</Text>
              <View style={styles.optionsRow}>
                {['2', '3', '4', '5', '6'].map((days) => (
                  <TouchableOpacity
                    key={days}
                    style={[styles.dayButton, daysPerWeek === days && styles.selectedButton]}
                    onPress={() => setDaysPerWeek(days)}
                  >
                    <Text style={[styles.dayText, daysPerWeek === days && styles.selectedButtonText]}>
                      {days}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Session length</Text>
              <View style={styles.optionsColumn}>
                {[
                  { value: '15', label: '15 min - Quick' },
                  { value: '30', label: '30 min - Standard' },
                  { value: '45', label: '45 min - Extended' },
                  { value: '60', label: '60 min - Full' },
                ].map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[styles.timeButton, sessionLength === option.value && styles.selectedTimeButton]}
                    onPress={() => setSessionLength(option.value)}
                  >
                    <Text style={[styles.timeText, sessionLength === option.value && styles.selectedText]}>
                      {option.label}
                    </Text>
                    {sessionLength === option.value && (
                      <View style={styles.checkmark}>
                        <Text style={styles.checkmarkText}>✓</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Preferred time</Text>
              <View style={styles.optionsGrid}>
                {[
                  { value: 'morning', label: 'Morning', icon: '🌅' },
                  { value: 'afternoon', label: 'Afternoon', icon: '☀️' },
                  { value: 'evening', label: 'Evening', icon: '🌆' },
                  { value: 'flexible', label: 'Flexible', icon: '🔄' },
                ].map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[styles.periodButton, preferredTime === option.value && styles.selectedPeriodButton]}
                    onPress={() => setPreferredTime(option.value)}
                  >
                    <Text style={styles.periodIcon}>{option.icon}</Text>
                    <Text style={[styles.periodText, preferredTime === option.value && styles.selectedText]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.completeButton, !canContinue && styles.completeButtonDisabled]}
            onPress={handleComplete}
            disabled={!canContinue}
          >
            <Text style={[styles.completeButtonText, !canContinue && styles.completeButtonTextDisabled]}>
              Complete Setup 🎉
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff5f0',
    maxWidth: isWeb ? 800 : '100%',
    alignSelf: 'center',
    width: '100%',
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
    marginBottom: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
    marginBottom: 15,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B35',
    borderRadius: 2,
  },
  step: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  title: {
    fontSize: isWeb ? 22 : 26,
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  form: {
    marginTop: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  optionsColumn: {
    gap: 8,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dayButton: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e2e8f0',
    minWidth: 40,
  },
  selectedButton: {
    borderColor: '#FF6B35',
    backgroundColor: '#fff8f5',
  },
  dayText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  selectedButtonText: {
    color: '#FF6B35',
  },
  timeButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  selectedTimeButton: {
    borderColor: '#FF6B35',
    backgroundColor: '#fff8f5',
  },
  timeText: {
    fontSize: 14,
    color: '#666',
  },
  periodButton: {
    flex: 1,
    minWidth: isWeb ? '48%' : '45%',
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  selectedPeriodButton: {
    borderColor: '#FF6B35',
    backgroundColor: '#fff8f5',
  },
  periodIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  periodText: {
    fontSize: 13,
    color: '#666',
  },
  selectedText: {
    color: '#FF6B35',
    fontWeight: '600',
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: '#fff5f0',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  completeButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  completeButtonDisabled: {
    backgroundColor: '#ccc',
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  completeButtonTextDisabled: {
    color: '#999',
  },
});