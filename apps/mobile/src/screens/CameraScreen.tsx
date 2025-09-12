import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Camera } from 'expo-camera';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraRef, setCameraRef] = useState<Camera | null>(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'web') {
        // On web, we'll show a placeholder for now
        setHasPermission(false);
        return;
      }
      
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Web fallback
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <View style={styles.webFallback}>
          <Text style={styles.webTitle}>📱 Camera View</Text>
          <Text style={styles.webText}>
            Camera functionality is available on mobile devices.
          </Text>
          <Text style={styles.webText}>
            On web, you'll see your workout form analysis here.
          </Text>
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>🎥</Text>
            <Text style={styles.placeholderText}>Camera Preview</Text>
          </View>
        </View>
      </View>
    );
  }

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.noPermissionText}>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera 
        style={styles.camera} 
        ref={(ref) => setCameraRef(ref)}
        type={Camera.Constants?.Type?.front || 'front' as any}
      >
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>AI Form Analysis Active 🤖</Text>
          <TouchableOpacity style={styles.stopButton}>
            <Text style={styles.stopButtonText}>Stop Workout</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: 20,
  },
  overlayText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 8,
  },
  stopButton: {
    backgroundColor: '#FF6B35',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  stopButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  webFallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff5f0',
    padding: 40,
  },
  webTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 20,
  },
  webText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 24,
  },
  placeholder: {
    marginTop: 40,
    padding: 60,
    backgroundColor: '#FF6B35',
    borderRadius: 20,
    alignItems: 'center',
    opacity: 0.8,
  },
  placeholderText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  noPermissionText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
