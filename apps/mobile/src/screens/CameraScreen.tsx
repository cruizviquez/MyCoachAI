import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { useRoute } from '@react-navigation/native';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formScore, setFormScore] = useState(0);
  const [feedback, setFeedback] = useState('Position yourself in frame');
  const route = useRoute();
  const { exerciseId } = route.params as { exerciseId: string };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setFormScore(85);
    setFeedback('Great form! Keep your back straight');
    
    setTimeout(() => {
      setFormScore(92);
      setFeedback('Excellent depth on that squat!');
    }, 2000);
  };

  const stopAnalysis = () => {
    setIsAnalyzing(false);
    setFormScore(0);
    setFeedback('Session complete! Great work 💪');
  };

  if (hasPermission === null) {
    return <View style={styles.container}><Text>Requesting camera permission...</Text></View>;
  }
  if (hasPermission === false) {
    return <View style={styles.container}><Text>No access to camera</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={Camera.Constants.Type.front}>
        <View style={styles.overlay}>
          <View style={styles.header}>
            <Text style={styles.exerciseName}>{exerciseId.toUpperCase()}</Text>
            <Text style={styles.formScore}>Form Score: {formScore}%</Text>
          </View>
          
          <View style={styles.feedbackContainer}>
            <Text style={styles.feedback}>{feedback}</Text>
          </View>
          
          <View style={styles.controls}>
            {!isAnalyzing ? (
              <TouchableOpacity style={styles.startButton} onPress={startAnalysis}>
                <Text style={styles.buttonText}>Start Exercise</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.stopButton} onPress={stopAnalysis}>
                <Text style={styles.buttonText}>Stop</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
    alignItems: 'center',
  },
  exerciseName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  formScore: {
    color: '#4CAF50',
    fontSize: 28,
    fontWeight: 'bold',
  },
  feedbackContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  feedback: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  controls: {
    padding: 30,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
  },
  stopButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
