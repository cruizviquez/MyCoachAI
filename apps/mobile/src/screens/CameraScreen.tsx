import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { ScreenContainer } from 'components/ScreenContainer';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState<'front' | 'back'>('front');

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View><Text>Requesting camera permission...</Text></View>;
  }
  if (hasPermission === false) {
    return <View><Text>No access to camera</Text></View>;
  }

  return (
    <ScreenContainer>
      <View style={{ flex: 1 }}>
  <CameraView style={styles.camera} facing={type}>
          <View style={styles.overlay}>
            <Text style={styles.title}>ROBOQOACH VISION</Text>
            {/* Rep Counter */}
            <View style={styles.repCounter}>
              <Text style={styles.repNumber}>0</Text>
              <Text style={styles.repLabel}>REPS</Text>
            </View>
            {/* Flip Camera Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setType(type === 'back' ? 'front' : 'back');
              }}
            >
              <Text style={styles.buttonText}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
  </CameraView>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    padding: 40,
  },
  title: {
    color: '#00D4FF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  repCounter: {
    alignItems: 'center',
  },
  repNumber: {
    fontSize: 120,
    color: '#00D4FF',
    fontWeight: 'bold',
  },
  repLabel: {
    fontSize: 20,
    color: 'white',
  },
  button: {
    backgroundColor: '#00D4FF',
    padding: 15,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});