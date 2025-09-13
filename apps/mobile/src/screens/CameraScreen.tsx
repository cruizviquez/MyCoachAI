import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';

export default function CameraScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [repCount, setRepCount] = useState(0);

  const handleStartStop = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Reset rep count when starting
      setRepCount(0);
    }
  };

  // Simulate rep counting for demo
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRepCount(prev => prev + 1);
      }, 2000); // Increment every 2 seconds for demo
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  return (
    <View style={styles.container}>
      <View style={styles.cameraView}>
        <Text style={styles.cameraIcon}>📹</Text>
        <Text style={styles.title}>Camera View</Text>
        
        {Platform.OS === 'web' ? (
          <Text style={styles.webNotice}>
            Camera analysis works on mobile devices.
            Using demo mode on web.
          </Text>
        ) : null}

        {isRecording && (
          <View style={styles.analysisOverlay}>
            <Text style={styles.analysisText}>🤖 AI Analyzing Form...</Text>
            <Text style={styles.repCounter}>Reps: {repCount}</Text>
          </View>
        )}
      </View>

      <View style={styles.controls}>
        <View style={styles.feedbackCard}>
          <Text style={styles.feedbackTitle}>Form Feedback</Text>
          {isRecording ? (
            <>
              <Text style={styles.feedbackGood}>✅ Good posture</Text>
              <Text style={styles.feedbackWarning}>⚠️ Keep your back straight</Text>
              <Text style={styles.feedbackTip}>💡 Tip: Go deeper on squats</Text>
            </>
          ) : (
            <Text style={styles.feedbackWaiting}>Press Start to begin analysis</Text>
          )}
        </View>

        <TouchableOpacity 
          style={[styles.recordButton, isRecording && styles.recordButtonActive]}
          onPress={handleStartStop}
        >
          <Text style={styles.recordButtonText}>
            {isRecording ? '⏹ Stop Workout' : '▶️ Start Workout'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff5f0',
  },
  cameraView: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderRadius: 20,
    position: 'relative',
  },
  cameraIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  webNotice: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 20,
  },
  analysisOverlay: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(255, 107, 53, 0.9)',
    padding: 15,
    borderRadius: 10,
  },
  analysisText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  repCounter: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  controls: {
    padding: 20,
  },
  feedbackCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    minHeight: 120,
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  feedbackGood: {
    color: '#22c55e',
    fontSize: 16,
    marginBottom: 8,
  },
  feedbackWarning: {
    color: '#f59e0b',
    fontSize: 16,
    marginBottom: 8,
  },
  feedbackTip: {
    color: '#3b82f6',
    fontSize: 16,
  },
  feedbackWaiting: {
    color: '#999',
    fontSize: 16,
    fontStyle: 'italic',
  },
  recordButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  recordButtonActive: {
    backgroundColor: '#dc2626',
  },
  recordButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});