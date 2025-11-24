import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

const userData = {
  name: 'Dagumo',
  employeeId: '12345',
  vacation: {
    total: 15,
    used: 5,
    remaining: 10,
  },
  workDays: {
    worked: 120,
    target: 200,
  },
};

export default function VacationScreen() {
  const router = useRouter();

  const vacationProgress = (userData.vacation.used / userData.vacation.total) * 100;
  const workDaysProgress = (userData.workDays.worked / userData.workDays.target) * 100;

  const StatCard = ({ title, value }: { title: string; value: number }) => (
    <View style={styles.statCard}>
      <Text style={styles.statLabel}>{title}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.push('/(tabs)/dashboard')}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vacaciones y días laborables</Text>
        <View style={{ width: 40 }} /> {/* Spacer */}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Profile Info */}
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: 'https://i.imgur.com/Wf58IuR.png' }} 
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{userData.name}</Text>
          <Text style={styles.profileId}>
            ID de empleado: {userData.employeeId}
          </Text>
        </View>

        {/* Vacation Balance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saldo de vacaciones</Text>
          
          <View style={styles.vacationGrid}>
            <StatCard title="Disponible" value={userData.vacation.remaining} />
            <StatCard title="Usados" value={userData.vacation.used} />
          </View>

          <View style={styles.remainingCard}>
            <Text style={styles.statLabel}>Restantes</Text>
            <Text style={styles.statValue}>{userData.vacation.remaining}</Text>
          </View>
        </View>

        {/* Vacation Days Progress */}
        <View style={styles.progressSection}>
          <Text style={styles.progressLabel}>Días de vacaciones</Text>
          <Text style={styles.progressText}>
            {userData.vacation.used}/{userData.vacation.total}
          </Text>
          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${vacationProgress}%` },
              ]}
            />
          </View>
        </View>

        {/* Accumulated Work Days */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Días laborables acumulados</Text>
          <View style={styles.remainingCard}>
            <Text style={styles.statLabel}>Días trabajados</Text>
            <Text style={styles.statValue}>{userData.workDays.worked}</Text>
          </View>
        </View>

        {/* Work Days Progress */}
        <View style={styles.progressSection}>
          <Text style={styles.progressLabel}>
            Días laborables - últimas vacaciones
          </Text>
          <Text style={styles.progressText}>
            {userData.workDays.worked}/{userData.workDays.target}
          </Text>
          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                { 
                  width: `${workDaysProgress > 100 ? 100 : workDaysProgress}%`,
                  backgroundColor: workDaysProgress > 100 ? '#FF3B30' : '#34C759',
                },
              ]}
            />
          </View>
        </View>
        
        {/* Button to Request */}
        <TouchableOpacity 
          style={styles.requestButton}
          onPress={() => router.push('/(tabs)/Permissions')} 
          activeOpacity={0.8}
        >
          <Text style={styles.requestButtonText}>Solicitar Vacaciones/Permisos</Text>
        </TouchableOpacity>
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    flex: 1,
    textAlign: 'center',
    marginLeft: -40, // Compensa el espacio del botón
  },
  profileContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 10,
    backgroundColor: '#FFF',
    marginHorizontal: -16, // Extender a los bordes
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E5E5EA',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  profileId: {
    fontSize: 14,
    color: '#8E8E93',
  },
  section: {
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
  },
  vacationGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  remainingCard: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  statLabel: {
    fontSize: 15,
    color: '#8E8E93',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
  },
  progressSection: {
    marginTop: 15,
  },
  progressLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  progressText: {
    fontSize: 14,
    color: '#8E8E93',
    alignSelf: 'flex-end',
    marginBottom: 6,
    marginTop: -20, // Ajuste para que quede en la esquina superior derecha
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#E5E5EA',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#007AFF', // Color principal de progreso
    borderRadius: 4,
  },
  requestButton: {
    backgroundColor: '#34C759',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  requestButtonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '600',
  },
});