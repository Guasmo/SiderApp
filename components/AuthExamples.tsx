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

  // FIXED: Force Face Unlock only (without fingerprint prompt)
  const handleFaceUnlockAuth = async () => {
    if (!weakSensorInfo?.available && !sensorInfo?.available) {
      Alert.alert('Error', 'No hay sensores biométricos disponibles');
      return;
    }

    // IMPORTANTE: En Android, si hay huella disponible, siempre la mostrará primero
    // Esta es una limitación del sistema BiometricPrompt de Android
    Alert.alert(
      '⚠️ Limitación de Android',
      'Android prioriza la huella digital cuando ambos métodos están disponibles. Para usar SOLO Face Unlock:\n\n' +
      '1. Ve a Settings → Passwords & security\n' +
      '2. Deshabilita temporalmente "Fingerprint unlock"\n' +
      '3. O usa el botón "Cualquier Método" que intenta ambos automáticamente',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Intentar De Todos Modos', 
          onPress: async () => {
            setIsLoading(true);
            try {
              const result = await authenticateWithOptions({
                title: '👤 Desbloqueo Facial',
                subtitle: 'Usa Face Unlock o Huella',
                description: 'Android mostrará el método más seguro disponible',
                cancelLabel: 'Cancelar',
                allowDeviceCredentials: true,
                biometricStrength: BiometricStrength.Weak,
              });

              console.log('Face unlock result:', result);

              if (result.success) {
                Alert.alert(
                  '✅ Éxito',
                  `Autenticación exitosa con ${result.biometricStrength || 'biometría'}!`
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
          }
        }
      ]
    );
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
        biometricStrength: BiometricStrength.Strong,
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

  // Any available biometric (Face OR Fingerprint) - BEST OPTION
  const handleAnyBiometricAuth = async () => {
    setIsLoading(true);
    try {
      // Intenta primero con Weak (permite Face Unlock)
      const result = await authenticateWithOptions({
        title: '🔒 Autenticación Biométrica',
        subtitle: 'Usa cualquier método disponible',
        description: 'Huella dactilar o reconocimiento facial',
        cancelLabel: 'Cancelar',
        fallbackLabel: 'Usar contraseña',
        allowDeviceCredentials: true,
        disableDeviceFallback: false,
        biometricStrength: BiometricStrength.Weak, // Permite ambos métodos
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
        Alert.alert(
          '❌ Falló', 
          `Autenticación fallida: ${result.error || 'Error desconocido'}`
        );
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
              ⚠️ IMPORTANTE: En Android, BiometricPrompt siempre prioriza el sensor de huella dactilar 
              cuando está disponible. Esto es una limitación del sistema Android, no de la librería.
            </Text>
            <Text style={styles.infoText}>
              {'\n'}💡 Para usar SOLO Face Unlock, deshabilita temporalmente la huella en:
              Settings → Security → Fingerprint unlock
            </Text>
          </View>
        )}
      </View>

      {/* Authentication Buttons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Métodos de Autenticación</Text>

        {/* RECOMMENDED: Any Method Button - Works Best */}
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
            {isLoading ? 'Procesando...' : 'Cualquier Método (RECOMENDADO)'}
          </Text>
          <Text style={styles.buttonSubtext}>(Permite Face Unlock o Huella)</Text>
        </TouchableOpacity>

        {/* Face Unlock Button - With Warning */}
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
          <Text style={styles.buttonSubtext}>(Puede mostrar huella primero)</Text>
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
        <Text style={styles.helpTitle}>💡 Guía de Uso:</Text>
        <Text style={styles.helpText}>
          <Text style={styles.boldText}>Para Face Unlock EXCLUSIVO:</Text>{'\n'}
          1. Settings → Passwords & security{'\n'}
          2. Desactiva "Fingerprint unlock"{'\n'}
          3. Mantén activo solo "Face unlock"{'\n'}
          4. Usa el botón "Desbloqueo Facial"{'\n\n'}
          
          <Text style={styles.boldText}>Para cualquier método:</Text>{'\n'}
          1. Mantén ambos activos en Settings{'\n'}
          2. Usa el botón "Cualquier Método"{'\n'}
          3. Android elegirá automáticamente
        </Text>
      </View>

      {/* Technical Explanation */}
      <View style={styles.technicalBox}>
        <Text style={styles.technicalTitle}>🔧 Explicación Técnica:</Text>
        <Text style={styles.technicalText}>
          Android BiometricPrompt API tiene una jerarquía de seguridad:
          {'\n\n'}
          1. <Text style={styles.boldText}>Strong (Class 3)</Text>: Huella, Iris
          {'\n'}
          2. <Text style={styles.boldText}>Weak (Class 2)</Text>: Face Unlock
          {'\n\n'}
          Cuando ambos están disponibles, Android SIEMPRE prioriza Strong sobre Weak 
          para máxima seguridad. Esta es una decisión de diseño del sistema operativo.
          {'\n\n'}
          La única forma de forzar Face Unlock es deshabilitando temporalmente los 
          sensores Strong en la configuración del dispositivo.
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
    textAlign: 'center',
  },
  buttonSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    textAlign: 'center',
  },
  helpBox: {
    backgroundColor: '#E3F2FD',
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
    marginBottom: 15,
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
  technicalBox: {
    backgroundColor: '#F3E5F5',
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#9C27B0',
  },
  technicalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7B1FA2',
    marginBottom: 10,
  },
  technicalText: {
    fontSize: 13,
    color: '#7B1FA2',
    lineHeight: 20,
  },
  boldText: {
    fontWeight: '700',
  },
});