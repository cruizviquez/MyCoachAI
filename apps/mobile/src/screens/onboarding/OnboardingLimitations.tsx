import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';

const { width: screenWidth } = Dimensions.get('window');
const isWeb = screenWidth > 768;

type OnboardingLimitationsNavigationProp = StackNavigationProp<RootStackParamList, 'OnboardingLimitations'>;

export default function OnboardingLimitations() {
  const navigation = useNavigation<OnboardingLimitationsNavigationProp>();
  const [selectedLimitations, setSelectedLimitations] = useState<string[]>([]);

  const limitations = [
    { id: 'none', title: 'No limitations', icon: '💪', description: 'I\'m injury-free' },
    { id: 'back', title: 'Back issues', icon: '🔴', description: 'Lower or upper back pain' },
    { id: 'knee', title: 'Knee problems', icon: '🦵', description: 'Knee pain or injury' },
    { id: 'shoulder', title: 'Shoulder issues', icon: '🤕', description: 'Shoulder pain or limited mobility' },
    { id: 'wrist', title: 'Wrist problems', icon: '✋', description: 'Wrist pain or weakness' },
    { id: 'pregnancy', title: 'Pregnancy', icon: '🤰', description: 'Currently pregnant' },
  ];

  const handleToggleLimitation = (id: string) => {
    if (id === 'none') {
      setSelectedLimitations(['none']);
    } else {
      if (selectedLimitations.includes('none')) {
        setSelectedLimitations([id]);
      } else {
        setSelectedLimitations(prev =>
          prev.includes(id) 
            ? prev.filter(item => item !== id)
            : [...prev, id]
        );
      }
    }
  };

  const handleNext = () => {
    navigation.navigate('OnboardingEquipment');
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
              <View style={[styles.progressFill, { width: '60%' }]} />
            </View>
            <Text style={styles.step}>Step 3 of 5</Text>
            <Text style={styles.title}>Any limitations?</Text>
            <Text style={styles.subtitle}>We'll adjust exercises for your safety</Text>
          </View>

          <View style={styles.limitationsContainer}>
            {limitations.map((limitation) => (
              <TouchableOpacity
                key={limitation.id}
                style={[
                  styles.limitationCard,
                  selectedLimitations.includes(limitation.id) && styles.selectedLimitation
                ]}
                onPress={() => handleToggleLimitation(limitation.id)}
              >
                <Text style={styles.limitationIcon}>{limitation.icon}</Text>
                <View style={styles.limitationTextContainer}>
                  <Text style={[
                    styles.limitationTitle,
                    selectedLimitations.includes(limitation.id) && styles.selectedText
                  ]}>
                    {limitation.title}
                  </Text>
                  <Text style={[
                    styles.limitationDescription,
                    selectedLimitations.includes(limitation.id) && styles.selectedSubtext
                  ]}>
                    {limitation.description}
                  </Text>
                </View>
                {selectedLimitations.includes(limitation.id) && (
                  <View style={styles.checkmark}>
                    <Text style={styles.checkmarkText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>
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
  limitationsContainer: {
    marginTop: 10,
  },
  limitationCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    minHeight: isWeb ? 60 : 70,
  },
  selectedLimitation: {
    borderColor: '#FF6B35',
    backgroundColor: '#fff8f5',
  },
  limitationIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  limitationTextContainer: {
    flex: 1,
  },
  limitationTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  limitationDescription: {
    fontSize: 12,
    color: '#666',
  },
  selectedText: {
    color: '#FF6B35',
  },
  selectedSubtext: {
    color: '#FF8C60',
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
  nextButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});