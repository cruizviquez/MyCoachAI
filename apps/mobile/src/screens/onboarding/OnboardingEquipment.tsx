import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';

type OnboardingEquipmentNavigationProp = StackNavigationProp<RootStackParamList, 'OnboardingEquipment'>;

export default function OnboardingEquipment() {
  const navigation = useNavigation<OnboardingEquipmentNavigationProp>();
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);

  const equipment = [
    { id: 'none', title: 'No equipment', icon: '🤸', description: 'Bodyweight only' },
    { id: 'dumbbells', title: 'Dumbbells', icon: '🏋️', description: 'Various weights' },
    { id: 'resistance', title: 'Resistance bands', icon: '🔗', description: 'Elastic bands' },
    { id: 'kettlebell', title: 'Kettlebells', icon: '🔔', description: 'Cast iron weights' },
    { id: 'pullup', title: 'Pull-up bar', icon: '🚪', description: 'Doorway or standalone' },
    { id: 'gym', title: 'Full gym', icon: '🏢', description: 'Complete gym access' },
  ];

  const handleToggleEquipment = (id: string) => {
    if (id === 'none') {
      setSelectedEquipment(['none']);
    } else if (id === 'gym') {
      setSelectedEquipment(['gym']);
    } else {
      if (selectedEquipment.includes('none') || selectedEquipment.includes('gym')) {
        setSelectedEquipment([id]);
      } else {
        setSelectedEquipment(prev =>
          prev.includes(id) 
            ? prev.filter(item => item !== id)
            : [...prev, id]
        );
      }
    }
  };

  const canContinue = selectedEquipment.length > 0;

  const handleNext = () => {
    if (canContinue) {
      navigation.navigate('OnboardingSchedule');
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
                <View style={[styles.progressFill, { width: '80%' }]} />
              </View>
              <Text style={styles.step}>Step 4 of 5</Text>
              <Text style={styles.title}>Available equipment</Text>
              <Text style={styles.subtitle}>Select all that you have access to</Text>
            </View>

            <View style={styles.equipmentContainer}>
              {equipment.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.equipmentCard,
                    selectedEquipment.includes(item.id) && styles.selectedEquipment
                  ]}
                  onPress={() => handleToggleEquipment(item.id)}
                >
                  <Text style={styles.equipmentIcon}>{item.icon}</Text>
                  <View style={styles.equipmentTextContainer}>
                    <Text style={[
                      styles.equipmentTitle,
                      selectedEquipment.includes(item.id) && styles.selectedText
                    ]}>
                      {item.title}
                    </Text>
                    <Text style={[
                      styles.equipmentDescription,
                      selectedEquipment.includes(item.id) && styles.selectedSubtext
                    ]}>
                      {item.description}
                    </Text>
                  </View>
                  {selectedEquipment.includes(item.id) && (
                    <View style={styles.checkmark}>
                      <Text style={styles.checkmarkText}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[styles.nextButton, !canContinue && styles.nextButtonDisabled]}
              onPress={handleNext}
              disabled={!canContinue}
            >
              <Text style={[styles.nextButtonText, !canContinue && styles.nextButtonTextDisabled]}>
                Continue
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
  equipmentContainer: {
    marginTop: 10,
  },
  equipmentCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedEquipment: {
    borderColor: '#FF6B35',
    backgroundColor: '#fff8f5',
  },
  equipmentIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  equipmentTextContainer: {
    flex: 1,
  },
  equipmentTitle: {
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
  selectedSubtext: {
    color: '#FF8C60',
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
  nextButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonDisabled: {
    backgroundColor: '#ccc',
  },
  nextButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: 'white',
  },
  nextButtonTextDisabled: {
    color: '#999',
  },
});