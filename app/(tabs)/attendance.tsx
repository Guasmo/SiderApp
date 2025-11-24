import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface AttendanceRecord {
  id: number;
  date: string;
  checkIn: string;
  checkOut: string;
  hours: string;
  status: 'complete' | 'incomplete' | 'late';
}

export default function AttendanceScreen() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<'today' | 'history'>('today');
  const [hasCheckedIn, setHasCheckedIn] = useState<boolean>(false);
  const [hasCheckedOut, setHasCheckedOut] = useState<boolean>(false);

  const attendanceHistory: AttendanceRecord[] = [
    {
      id: 1,
      date: '23 Nov 2024',
      checkIn: '08:30 AM',
      checkOut: '05:45 PM',
      hours: '9h 15m',
      status: 'complete',
    },
    {
      id: 2,
      date: '22 Nov 2024',
      checkIn: '08:45 AM',
      checkOut: '05:30 PM',
      hours: '8h 45m',
      status: 'late',
    },
    {
      id: 3,
      date: '21 Nov 2024',
      checkIn: '08:25 AM',
      checkOut: '05:40 PM',
      hours: '9h 15m',
      status: 'complete',
    },
    {
      id: 4,
      date: '20 Nov 2024',
      checkIn: '08:30 AM',
      checkOut: '--:--',
      hours: '--',
      status: 'incomplete',
    },
  ];

  const handleCheckIn = (): void => {
    setHasCheckedIn(true);
    console.log('Check-in registered');
  };

  const handleCheckOut = (): void => {
    setHasCheckedOut(true);
    console.log('Check-out registered');
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'complete':
        return '#34C759';
      case 'late':
        return '#FF9500';
      case 'incomplete':
        return '#FF3B30';
      default:
        return '#8E8E93';
    }
  };

  const getStatusText = (status: string): string => {
    switch (status) {
      case 'complete':
        return 'Completo';
      case 'late':
        return 'Tardanza';
      case 'incomplete':
        return 'Incompleto';
      default:
        return 'Desconocido';
    }
  };

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
        <Text style={styles.headerTitle}>Registro Laboral</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="calendar-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Current Date Card */}
        <View style={styles.dateCard}>
          <Text style={styles.dateText}>Lunes, 24 de Noviembre</Text>
          <Text style={styles.timeText}>10:30 AM</Text>
        </View>

        {/* Tab Selector */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'today' && styles.activeTab,
            ]}
            onPress={() => setSelectedTab('today')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'today' && styles.activeTabText,
              ]}
            >
              Hoy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'history' && styles.activeTab,
            ]}
            onPress={() => setSelectedTab('history')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'history' && styles.activeTabText,
              ]}
            >
              Historial
            </Text>
          </TouchableOpacity>
        </View>

        {selectedTab === 'today' ? (
          <>
            {/* Check In/Out Buttons */}
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  styles.checkInButton,
                  hasCheckedIn && styles.disabledButton,
                ]}
                onPress={handleCheckIn}
                disabled={hasCheckedIn}
                activeOpacity={0.8}
              >
                <View style={styles.actionIcon}>
                  <Ionicons
                    name="log-in-outline"
                    size={32}
                    color={hasCheckedIn ? '#8E8E93' : '#34C759'}
                  />
                </View>
                <Text style={styles.actionTitle}>Entrada</Text>
                <Text style={styles.actionTime}>
                  {hasCheckedIn ? '08:30 AM' : '--:--'}
                </Text>
                {hasCheckedIn && (
                  <View style={styles.checkmark}>
                    <Ionicons name="checkmark-circle" size={24} color="#34C759" />
                  </View>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.actionButton,
                  styles.checkOutButton,
                  (!hasCheckedIn || hasCheckedOut) && styles.disabledButton,
                ]}
                onPress={handleCheckOut}
                disabled={!hasCheckedIn || hasCheckedOut}
                activeOpacity={0.8}
              >
                <View style={styles.actionIcon}>
                  <Ionicons
                    name="log-out-outline"
                    size={32}
                    color={hasCheckedOut ? '#8E8E93' : '#FF3B30'}
                  />
                </View>
                <Text style={styles.actionTitle}>Salida</Text>
                <Text style={styles.actionTime}>
                  {hasCheckedOut ? '05:30 PM' : '--:--'}
                </Text>
                {hasCheckedOut && (
                  <View style={styles.checkmark}>
                    <Ionicons name="checkmark-circle" size={24} color="#34C759" />
                  </View>
                )}
              </TouchableOpacity>
            </View>

            {/* Today's Summary */}
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Resumen del día</Text>
              <View style={styles.summaryRow}>
                <View style={styles.summaryItem}>
                  <Ionicons name="time-outline" size={20} color="#007AFF" />
                  <Text style={styles.summaryLabel}>Horas trabajadas</Text>
                  <Text style={styles.summaryValue}>
                    {hasCheckedIn && hasCheckedOut ? '9h 00m' : '--'}
                  </Text>
                </View>
                <View style={styles.summaryDivider} />
                <View style={styles.summaryItem}>
                  <Ionicons name="calendar-outline" size={20} color="#007AFF" />
                  <Text style={styles.summaryLabel}>Estado</Text>
                  <Text style={styles.summaryValue}>
                    {hasCheckedIn && hasCheckedOut
                      ? 'Completo'
                      : hasCheckedIn
                      ? 'En progreso'
                      : 'Pendiente'}
                  </Text>
                </View>
              </View>
            </View>

            {/* Quick Stats */}
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>40h</Text>
                <Text style={styles.statLabel}>Esta semana</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>160h</Text>
                <Text style={styles.statLabel}>Este mes</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>95%</Text>
                <Text style={styles.statLabel}>Asistencia</Text>
              </View>
            </View>
          </>
        ) : (
          <>
            {/* History List */}
            <View style={styles.historyContainer}>
              {attendanceHistory.map((record) => (
                <View key={record.id} style={styles.historyCard}>
                  <View style={styles.historyHeader}>
                    <Text style={styles.historyDate}>{record.date}</Text>
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: `${getStatusColor(record.status)}20` },
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusText,
                          { color: getStatusColor(record.status) },
                        ]}
                      >
                        {getStatusText(record.status)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.historyDetails}>
                    <View style={styles.historyTime}>
                      <Ionicons name="log-in-outline" size={18} color="#34C759" />
                      <Text style={styles.historyTimeText}>{record.checkIn}</Text>
                    </View>
                    <View style={styles.historyTime}>
                      <Ionicons name="log-out-outline" size={18} color="#FF3B30" />
                      <Text style={styles.historyTimeText}>{record.checkOut}</Text>
                    </View>
                    <View style={styles.historyTime}>
                      <Ionicons name="time-outline" size={18} color="#007AFF" />
                      <Text style={styles.historyTimeText}>{record.hours}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  dateCard: {
    backgroundColor: '#FFF',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  timeText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#007AFF',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#8E8E93',
  },
  activeTabText: {
    color: '#FFF',
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  checkInButton: {
    borderWidth: 2,
    borderColor: '#34C759',
  },
  checkOutButton: {
    borderWidth: 2,
    borderColor: '#FF3B30',
  },
  disabledButton: {
    opacity: 0.5,
    borderColor: '#E5E5EA',
  },
  actionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  actionTime: {
    fontSize: 20,
    fontWeight: '700',
    color: '#007AFF',
  },
  checkmark: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  summaryCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryDivider: {
    width: 1,
    height: 60,
    backgroundColor: '#E5E5EA',
  },
  summaryLabel: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 8,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
  },
  historyContainer: {
    paddingHorizontal: 16,
  },
  historyCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  historyDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  historyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  historyTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  historyTimeText: {
    fontSize: 14,
    color: '#8E8E93',
  },
});