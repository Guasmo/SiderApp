import {
    authenticateWithOptions,
    BiometricStrength,
    isSensorAvailable,
    setDebugMode
} from '@sbaiahmed1/react-native-biometrics';
import { useEffect, useState } from 'react';
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const AuthExamples = () => {
  const [sensorInfo, setSensorInfo] = useState<any>(null);
  const [weakSensorInfo, setWeakSensorInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkAllSensorAvailability();
  }, []);

  const checkAllSensorAvailability = async () => {
    try {
      await setDebugMode(true);

      // Check for STRONG biometrics (Fingerprint)
      const strongInfo = await isSensorAvailable();
      console.log('✅ Strong Biometric Info:', strongInfo);
      setSensorInfo(strongInfo);

      // Check for WEAK biometrics (Face Unlock)
      const weakInfo = await isSensorAvailable({
        biometricStrength: BiometricStrength.Weak,
      });
      console.log('✅ Weak Biometric Info (Face):', weakInfo);
      setWeakSensorInfo(weakInfo);

      // Show results to user
      if (weakInfo.available) {
        Alert.alert(
          '👤 Face Unlock Disponible',
          'Tu dispositivo soporta Face Unlock (biometría débil). Puedes usarlo para autenticación.',
          [{ text: 'Entendido' }]
        );
      }
    } catch (error) {
      console.error('💥 Error checking sensors:', error);
      Alert.alert('Error', 'Failed to check biometric availability');
    }
  };

  // Simple authentication with Face Unlock (Weak Biometric)
  const handleFaceUnlockAuth = async () => {
    if (!weakSensorInfo?.available && !sensorInfo?.available) {
      Alert.alert('Error', 'No hay sensores biométricos disponibles');
      return;
    }

    setIsLoading(true);
    try {
      const result = await authenticateWithOptions({
        title: '👤 Desbloqueo Facial',
        subtitle: 'Mira a la cámara para autenticarte',
        description: 'Usando reconocimiento facial de tu Xiaomi',
        cancelLabel: 'Cancelar',
        allowDeviceCredentials: true,
        biometricStrength: BiometricStrength.Weak, // CRÍTICO: Permite Face Unlock
      });

      console.log('Face unlock result:', result);

      if (result.success) {
        Alert.alert(
          '✅ Éxito',
          `Autenticación exitosa con ${result.biometricStrength || 'biometría débil'}!`
        );
      } else {
        Alert.alert(
          '❌ Falló',
          `Error: ${result.error || 'Autenticación fallida'}\nCódigo: ${result.errorCode || 'N/A'}`
        );
      }
    } catch (error) {
      console.error('Face unlock error:', error);
      Alert.alert('Error', 'Error en autenticación facial');
    } finally {
      setIsLoading(false);
    }
  };

  // Fingerprint authentication (Strong Biometric)
  const handleFingerprintAuth = async () => {
    if (!sensorInfo?.available) {
      Alert.alert('Error', 'Huella dactilar no disponible');
      return;
    }

    setIsLoading(true);
    try {
      const result = await authenticateWithOptions({
        title: '🔐 Huella Dactilar',
        subtitle: 'Coloca tu dedo en el sensor',
        description: 'Autenticación con huella dactilar',
        cancelLabel: 'Cancelar',
        allowDeviceCredentials: true,
        biometricStrength: BiometricStrength.Strong, // Solo huella
      });

      if (result.success) {
        Alert.alert('✅ Éxito', 'Autenticación con huella exitosa!');
      } else {
        Alert.alert('❌ Falló', result.error || 'Autenticación fallida');
      }
    } catch (error) {
      console.error('Fingerprint error:', error);
      Alert.alert('Error', 'Error en autenticación con huella');
    } finally {
      setIsLoading(false);
    }
  };

  // Any available biometric (Face OR Fingerprint)
  const handleAnyBiometricAuth = async () => {
    setIsLoading(true);
    try {
      // Primero intenta con Strong (huella)
      const result = await authenticateWithOptions({
        title: '🔒 Autenticación Biométrica',
        subtitle: 'Usa huella o rostro',
        description: 'Autenticación flexible con cualquier método disponible',
        cancelLabel: 'Cancelar',
        fallbackLabel: 'Usar contraseña',
        allowDeviceCredentials: true,
        disableDeviceFallback: false,
        biometricStrength: BiometricStrength.Strong,
      });

      console.log('Any biometric result:', result);

      if (result.success) {
        const method = result.biometricStrength === 'strong' 
          ? 'huella dactilar' 
          : 'reconocimiento facial';
        Alert.alert(
          '✅ Autenticado',
          `Éxito con ${method}!${result.fallbackUsed ? ' (con fallback)' : ''}`
        );
      } else {
        // Si falla Strong, intenta con Weak
        console.log('Strong failed, trying Weak...');
        const weakResult = await authenticateWithOptions({
          title: '👤 Reconocimiento Facial',
          subtitle: 'Mira a la cámara',
          description: 'Intentando con Face Unlock',
          cancelLabel: 'Cancelar',
          allowDeviceCredentials: true,
          biometricStrength: BiometricStrength.Weak,
        });

        if (weakResult.success) {
          Alert.alert('✅ Autenticado', 'Éxito con reconocimiento facial!');
        } else {
          Alert.alert('❌ Falló', 'No se pudo autenticar con ningún método');
        }
      }
    } catch (error) {
      console.error('Biometric auth error:', error);
      Alert.alert('Error', 'Error en autenticación biométrica');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 Autenticación Biométrica</Text>
      <Text style={styles.subtitle}>Xiaomi Redmi Note 10 Pro</Text>

      {/* Sensor Status Card */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📱 Sensores Disponibles</Text>

        {/* Strong Biometric (Fingerprint) */}
        <View style={styles.sensorCard}>
          <Text style={styles.sensorLabel}>🔵 Huella Dactilar (Strong):</Text>
          <Text
            style={[
              styles.sensorStatus,
              sensorInfo?.available ? styles.available : styles.unavailable,
            ]}
          >
            {sensorInfo?.available ? '✅ Disponible' : '❌ No disponible'}
          </Text>
          {sensorInfo?.biometryType && (
            <Text style={styles.sensorType}>Tipo: {sensorInfo.biometryType}</Text>
          )}
        </View>

        {/* Weak Biometric (Face Unlock) */}
        <View style={styles.sensorCard}>
          <Text style={styles.sensorLabel}>🟡 Face Unlock (Weak):</Text>
          <Text
            style={[
              styles.sensorStatus,
              weakSensorInfo?.available ? styles.available : styles.unavailable,
            ]}
          >
            {weakSensorInfo?.available ? '✅ Disponible' : '❌ No disponible'}
          </Text>
          {weakSensorInfo?.biometryType && (
            <Text style={styles.sensorType}>Tipo: {weakSensorInfo.biometryType}</Text>
          )}
        </View>

        {Platform.OS === 'android' && (
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              ℹ️ En Android, Face Unlock se considera "biometría débil" (Weak).
              Asegúrate de tener configurado el Face Unlock en Settings → Security.
            </Text>
          </View>
        )}
      </View>

      {/* Authentication Buttons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Métodos de Autenticación</Text>

        {/* Face Unlock Button */}
        <TouchableOpacity
          style={[
            styles.button,
            styles.faceButton,
            (!weakSensorInfo?.available && !sensorInfo?.available) && styles.buttonDisabled,
            isLoading && styles.buttonDisabled,
          ]}
          onPress={handleFaceUnlockAuth}
          disabled={(!weakSensorInfo?.available && !sensorInfo?.available) || isLoading}
        >
          <Text style={styles.buttonIcon}>👤</Text>
          <Text style={styles.buttonText}>
            {isLoading ? 'Procesando...' : 'Desbloqueo Facial'}
          </Text>
          <Text style={styles.buttonSubtext}>(Weak Biometric)</Text>
        </TouchableOpacity>

        {/* Fingerprint Button */}
        <TouchableOpacity
          style={[
            styles.button,
            styles.fingerprintButton,
            !sensorInfo?.available && styles.buttonDisabled,
            isLoading && styles.buttonDisabled,
          ]}
          onPress={handleFingerprintAuth}
          disabled={!sensorInfo?.available || isLoading}
        >
          <Text style={styles.buttonIcon}>👆</Text>
          <Text style={styles.buttonText}>
            {isLoading ? 'Procesando...' : 'Huella Dactilar'}
          </Text>
          <Text style={styles.buttonSubtext}>(Strong Biometric)</Text>
        </TouchableOpacity>

        {/* Any Biometric Button */}
        <TouchableOpacity
          style={[
            styles.button,
            styles.anyButton,
            (!weakSensorInfo?.available && !sensorInfo?.available) && styles.buttonDisabled,
            isLoading && styles.buttonDisabled,
          ]}
          onPress={handleAnyBiometricAuth}
          disabled={(!weakSensorInfo?.available && !sensorInfo?.available) || isLoading}
        >
          <Text style={styles.buttonIcon}>🔓</Text>
          <Text style={styles.buttonText}>
            {isLoading ? 'Procesando...' : 'Cualquier Método'}
          </Text>
          <Text style={styles.buttonSubtext}>(Automático con Fallback)</Text>
        </TouchableOpacity>

        {/* Re-check Button */}
        <TouchableOpacity
          style={[styles.button, styles.refreshButton]}
          onPress={checkAllSensorAvailability}
        >
          <Text style={styles.buttonIcon}>🔄</Text>
          <Text style={styles.buttonText}>Re-verificar Sensores</Text>
        </TouchableOpacity>
      </View>

      {/* Info Box */}
      <View style={styles.helpBox}>
        <Text style={styles.helpTitle}>💡 Cómo usar Face Unlock:</Text>
        <Text style={styles.helpText}>
          1. Ve a Settings → Passwords & security{'\n'}
          2. Selecciona "Face unlock"{'\n'}
          3. Configura tu rostro{'\n'}
          4. Vuelve a la app y usa el botón "Desbloqueo Facial"
        </Text>
      </View>
    </View>
  );
};

export default AuthExamples;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
    color: '#666',
  },
  section: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  sensorCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  sensorLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  sensorStatus: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  sensorType: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  available: {
    color: '#4CAF50',
  },
  unavailable: {
    color: '#F44336',
  },
  infoBox: {
    backgroundColor: '#FFF3CD',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  infoText: {
    fontSize: 13,
    color: '#856404',
    lineHeight: 18,
  },
  button: {
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  faceButton: {
    backgroundColor: '#FF9500',
  },
  fingerprintButton: {
    backgroundColor: '#007AFF',
  },
  anyButton: {
    backgroundColor: '#34C759',
  },
  refreshButton: {
    backgroundColor: '#8E8E93',
  },
  buttonDisabled: {
    backgroundColor: '#D1D1D6',
    opacity: 0.6,
  },
  buttonIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  buttonSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  },
  helpBox: {
    backgroundColor: '#E3F2FD',
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1976D2',
    marginBottom: 10,
  },
  helpText: {
    fontSize: 14,
    color: '#1976D2',
    lineHeight: 22,
  },
});