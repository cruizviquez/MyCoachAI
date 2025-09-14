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

type OnboardingEquipmentNavigationProp = StackNavigationProp<RootStackParamList, 'OnboardingEquipment'>;

export default function OnboardingEquipment() {
  const navigation = useNavigation<OnboardingEquipmentNavigationProp>();
  const { data, setData } = useOnboarding();
  
  // Initialize with data from context
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>(data.equipment || []);

  const equipment = [
    { id: 'none', label: 'No equipment', icon: '🤷', description: 'Bodyweight only' },
    { id: 'dumbbells', label: 'Dumbbells', icon: '🏋️', description: 'Various weights' },
    { id: 'resistance_bands', label: 'Resistance Bands', icon: '🎯', description: 'Elastic bands' },
    { id: 'pull_up_bar', label: 'Pull-up Bar', icon: '🚪', description: 'Door or wall mounted' },
    { id: 'kettlebell', label: 'Kettlebell', icon: '🔔', description: 'Single or multiple' },
    { id: 'barbell', label: 'Barbell', icon: '🏋️‍♂️', description: 'With weight plates' },
    { id: 'bench', label: 'Exercise Bench', icon: '🪑', description: 'Flat or adjustable' },
    { id: 'mat', label: 'Yoga Mat', icon: '🧘', description: 'For floor exercises' },
  ];

  const toggleEquipment = (equipmentId: string) => {
    if (equipmentId === 'none') {
      // If "No equipment" is selected, clear all others
      setSelectedEquipment(['none']);
    } else {
      // Remove "none" if other equipment is selected
      const filtered = selectedEquipment.filter(id => id !== 'none');
      
      if (selectedEquipment.includes(equipmentId)) {
        setSelectedEquipment(filtered.filter(id => id !== equipmentId));
      } else {
        setSelectedEquipment([...filtered, equipmentId]);
      }
    }
  };

  const handleNext = () => {
    // Save to context before navigating
    setData({ equipment: selectedEquipment });
    navigation.navigate('OnboardingSchedule');
  };

  const handleBack = () => {
    navigation.goBack();
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
              <View style={[styles.progressFill, { width: '80%' }]} />
            </View>
            <Text style={styles.step}>Step 4 of 5</Text>
            <Text style={styles.title}>Available Equipment</Text>
            <Text style={styles.subtitle}>Select all that you have access to</Text>
          </View>

          <View style={styles.equipmentContainer}>
            {equipment.map((item) => {
              const isSelected = selectedEquipment.includes(item.id);
              
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.equipmentCard, isSelected && styles.selectedEquipment]}
                  onPress={() => toggleEquipment(item.id)}
                >
                  <View style={styles.equipmentContent}>
                    <Text style={styles.equipmentIcon}>{item.icon}</Text>
                    <View style={styles.equipmentTextContainer}>
                      <Text style={[styles.equipmentLabel, isSelected && styles.selectedText]}>
                        {item.label}
                      </Text>
                      <Text style={[styles.equipmentDescription, isSelected && styles.selectedDescription]}>
                        {item.description}
                      </Text>
                    </View>
                  </View>
                  {isSelected && (
                    <View style={styles.checkmark}>
                      <Text style={styles.checkmarkText}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.tipContainer}>
            <Text style={styles.tipIcon}>💡</Text>
            <Text style={styles.tipText}>
              Don't worry if you have limited equipment. We'll create effective workouts with whatever you have!
            </Text>
          </View>
        </ScrollView>

        <View style={styles.navigationContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.nextButton, selectedEquipment.length === 0 && styles.nextButtonDisabled]}
            onPress={handleNext}
            disabled={selectedEquipment.length === 0}
          >
            <Text style={[styles.nextButtonText, selectedEquipment.length === 0 && styles.nextButtonTextDisabled]}>
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
  equipmentContainer: {
    gap: 12,
  },
  equipmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedEquipment: {
    borderColor: '#FF6B35',
    backgroundColor: '#fff8f5',
  },
  equipmentContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  equipmentIcon: {
    fontSize: 28,
    marginRight: 16,
  },
  equipmentTextContainer: {
    flex: 1,
  },
  equipmentLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  equipmentDescription: {
    fontSize: 13,
    color: '#666',
  },
  selectedText: {
    color: '#FF6B35',
  },
  selectedDescription: {
    color: '#FF8C60',
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
  tipContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF8E5',
    borderRadius: 10,
    padding: 16,
    marginTop: 20,
    alignItems: 'center',
  },
  tipIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#7B6F39',
    lineHeight: 20,
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