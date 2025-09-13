import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';

type OnboardingScheduleNavigationProp = StackNavigationProp<RootStackParamList, 'OnboardingSchedule'>;

export default function OnboardingSchedule() {
  const navigation = useNavigation<OnboardingScheduleNavigationProp>();
  const [daysPerWeek, setDaysPerWeek] = useState('');
  const [sessionLength, setSessionLength] = useState('');
  const [preferredTime, setPreferredTime] = useState('');

  const canContinue = daysPerWeek && sessionLength && preferredTime;

  const handleComplete = () => {
    if (canContinue) {
      // Navigate directly to WorkoutPlan with the session length
      navigation.navigate('WorkoutPlan', { 
        level: 'intermediate', 
        equipment: 'mixed', 
        time: sessionLength 
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
          bounces={false}
        >
          <View style={styles.content}>
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
                    { value: '15', label: '15 minutes - Quick' },
                    { value: '30', label: '30 minutes - Standard' },
                    { value: '45', label: '45 minutes - Extended' },
                    { value: '60', label: '60 minutes - Full' },
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff5f0',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
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
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
  },
  form: {
    marginTop: 10,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  optionsColumn: {
    gap: 10,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  dayButton: {
    flex: 1,
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e2e8f0',
    minWidth: 50,
  },
  selectedButton: {
    borderColor: '#FF6B35',
    backgroundColor: '#fff8f5',
  },
  dayText: {
    fontSize: 16,
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
    padding: 14,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  selectedTimeButton: {
    borderColor: '#FF6B35',
    backgroundColor: '#fff8f5',
  },
  timeText: {
    fontSize: 15,
    color: '#666',
  },
  periodButton: {
    flex: 1,
    minWidth: '45%',
    padding: 14,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  selectedPeriodButton: {
    borderColor: '#FF6B35',
    backgroundColor: '#fff8f5',
  },
  periodIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  periodText: {
    fontSize: 14,
    color: '#666',
  },
  selectedText: {
    color: '#FF6B35',
    fontWeight: '600',
  },
  checkmark: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  completeButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  completeButtonDisabled: {
    backgroundColor: '#ccc',
  },
  completeButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: 'white',
  },
  completeButtonTextDisabled: {
    color: '#999',
  },
});