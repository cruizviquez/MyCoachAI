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

type OnboardingLimitationsNavigationProp = StackNavigationProp<RootStackParamList, 'OnboardingLimitations'>;

export default function OnboardingLimitations() {
  const navigation = useNavigation<OnboardingLimitationsNavigationProp>();
  const { data, setData } = useOnboarding();
  
  // Initialize with data from context
  const [selectedLimitations, setSelectedLimitations] = useState<string[]>(data.limitations || []);

  const limitations = [
    { id: 'none', label: 'No limitations', icon: '💪' },
    { id: 'knee', label: 'Knee problems', icon: '🦵' },
    { id: 'back', label: 'Back issues', icon: '🔙' },
    { id: 'shoulder', label: 'Shoulder injury', icon: '🤷' },
    { id: 'ankle', label: 'Ankle problems', icon: '🦶' },
    { id: 'wrist', label: 'Wrist issues', icon: '✋' },
    { id: 'hip', label: 'Hip problems', icon: '🚶' },
    { id: 'other', label: 'Other limitations', icon: '⚠️' },
  ];

  const toggleLimitation = (limitationId: string) => {
    if (limitationId === 'none') {
      // If "No limitations" is selected, clear all others
      setSelectedLimitations(['none']);
    } else {
      // Remove "none" if other limitations are selected
      const filtered = selectedLimitations.filter(id => id !== 'none');
      
      if (selectedLimitations.includes(limitationId)) {
        setSelectedLimitations(filtered.filter(id => id !== limitationId));
      } else {
        setSelectedLimitations([...filtered, limitationId]);
      }
    }
  };

  const handleNext = () => {
    // Save to context before navigating
    setData({ limitations: selectedLimitations });
    navigation.navigate('OnboardingEquipment');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSkip = () => {
    // Save empty limitations and navigate
    setData({ limitations: ['none'] });
    navigation.navigate('OnboardingEquipment');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '60%' }]} />
            </View>
            <Text style={styles.step}>Step 3 of 5</Text>
            <Text style={styles.title}>Any limitations?</Text>
            <Text style={styles.subtitle}>We'll adapt your workouts accordingly</Text>
          </View>

          <View style={styles.limitationsContainer}>
            {limitations.map((limitation) => {
              const isSelected = selectedLimitations.includes(limitation.id);
              
              return (
                <TouchableOpacity
                  key={limitation.id}
                  style={[styles.limitationCard, isSelected && styles.selectedLimitation]}
                  onPress={() => toggleLimitation(limitation.id)}
                >
                  <Text style={styles.limitationIcon}>{limitation.icon}</Text>
                  <Text style={[styles.limitationText, isSelected && styles.selectedText]}>
                    {limitation.label}
                  </Text>
                  {isSelected && (
                    <View style={styles.checkmark}>
                      <Text style={styles.checkmarkText}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipText}>Skip this step</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.navigationContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.nextButton, selectedLimitations.length === 0 && styles.nextButtonDisabled]}
            onPress={handleNext}
            disabled={selectedLimitations.length === 0}
          >
            <Text style={[styles.nextButtonText, selectedLimitations.length === 0 && styles.nextButtonTextDisabled]}>
              Continue
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
    backgroundColor: '#FF6B35',
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
  limitationsContainer: {
    gap: 12,
  },
  limitationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedLimitation: {
    borderColor: '#FF6B35',
    backgroundColor: '#fff8f5',
  },
  limitationIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  limitationText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  selectedText: {
    color: '#FF6B35',
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  skipButton: {
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 12,
  },
  skipText: {
    fontSize: 16,
    color: '#FF6B35',
    textDecorationLine: 'underline',
  },
  navigationContainer: {
    flexDirection: 'row',
    gap: 12,
    padding: 20,
    backgroundColor: '#fff5f0',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  backButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF6B35',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B35',
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#FF6B35',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#ccc',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  nextButtonTextDisabled: {
    color: '#999',
  },
});