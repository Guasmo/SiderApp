import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// Definición de la interfaz para un registro de horas extras
interface OvertimeRecord {
  id: number;
  date: string;
  hours: number;
  description: string;
}

// Datos de ejemplo para el historial de horas extras
const overtimeHistory: OvertimeRecord[] = [
  {
    id: 1,
    date: '2024-06-15',
    hours: 3.5,
    description: 'Proyecto Alpha',
  },
  {
    id: 2,
    date: '2024-06-10',
    hours: 2,
    description: 'Mantenimiento de Sistema',
  },
  {
    id: 3,
    date: '2024-05-15',
    hours: 6,
    description: 'Capacitación de Equipo',
  },
  {
    id: 4,
    date: '2024-05-01',
    hours: 4.5,
    description: 'Implementación de Módulo X',
  },
  {
    id: 5,
    date: '2024-04-20',
    hours: 1.5,
    description: 'Soporte de emergencia',
  },
];

// Cálculo de totales (simulado)
const totalHours = overtimeHistory.reduce((sum, record) => sum + record.hours, 0);
// Suponiendo un pago promedio de $20 por hora extra (ejemplo)
const hourlyRate = 20; 
const totalEarnings = totalHours * hourlyRate;

export default function OvertimeScreen() {
  const router = useRouter();

  // Componente para las tarjetas de resumen
  const StatCard = ({ title, value, isMoney = false }: { title: string; value: string | number; isMoney?: boolean }) => (
    <View style={styles.statCard}>
      <Text style={styles.statLabel}>{title}</Text>
      <Text style={[styles.statValue, isMoney && styles.moneyValue]}>
        {isMoney ? `$${(value as number).toFixed(2)}` : value}
      </Text>
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
        <Text style={styles.headerTitle}>Horas Extras</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="add" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Sección de Resumen */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumen</Text>
          <View style={styles.summaryGrid}>
            <StatCard title="Total Horas Extras" value={totalHours} />
            <StatCard title="Total Ganancias" value={totalEarnings} isMoney={true} />
          </View>
        </View>

        {/* Sección de Detalles/Historial */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalles</Text>
          <View style={styles.historyContainer}>
            {overtimeHistory.map((record) => (
              <View key={record.id} style={styles.historyItem}>
                <Text style={styles.historyDate}>{record.date}</Text>
                <Text style={styles.historyHours}>{record.hours} horas</Text>
                <Text style={styles.historyDescription}>{record.description}</Text>
                <View style={styles.historyDivider} />
              </View>
            ))}
            {overtimeHistory.length === 0 && (
                <Text style={styles.emptyText}>No hay registros de horas extras.</Text>
            )}
          </View>
        </View>
        
        {/* Spacer */}
        <View style={styles.bottomSpacer} />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF',
    marginHorizontal: -16, // Para extender a los bordes si el scrollContent tiene padding
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
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 16,
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
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
  moneyValue: {
    color: '#34C759', // Color verde para ganancias
  },
  historyContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  historyItem: {
    paddingVertical: 10,
    position: 'relative',
  },
  historyDivider: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#E5E5EA',
  },
  historyDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 4,
  },
  historyHours: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  historyDescription: {
    fontSize: 15,
    color: '#007AFF',
  },
  emptyText: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    paddingVertical: 20,
  },
  bottomSpacer: {
    height: 20,
  },
});