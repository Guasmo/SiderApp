import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

interface Permission {
  id: number;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
}

export default function PermissionsScreen() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<'request' | 'history'>('request');
  const [showRequestModal, setShowRequestModal] = useState<boolean>(false);
  const [permissionType, setPermissionType] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [reason, setReason] = useState<string>('');

  const permissionTypes = [
    { id: 1, name: 'Permiso Médico', icon: 'medical-outline', color: '#FF3B30' },
    { id: 2, name: 'Permiso Personal', icon: 'person-outline', color: '#007AFF' },
    { id: 3, name: 'Permiso Familiar', icon: 'people-outline', color: '#34C759' },
    { id: 4, name: 'Día por Salud', icon: 'heart-outline', color: '#FF9500' },
    { id: 5, name: 'Trámite Bancario', icon: 'card-outline', color: '#5856D6' },
    { id: 6, name: 'Otro', icon: 'ellipsis-horizontal-outline', color: '#8E8E93' },
  ];

  const permissionsHistory: Permission[] = [
    {
      id: 1,
      type: 'Permiso Médico',
      startDate: '15 Nov 2024',
      endDate: '15 Nov 2024',
      days: 1,
      status: 'approved',
      reason: 'Cita médica de control',
    },
    {
      id: 2,
      type: 'Permiso Personal',
      startDate: '10 Nov 2024',
      endDate: '11 Nov 2024',
      days: 2,
      status: 'pending',
      reason: 'Asuntos personales urgentes',
    },
    {
      id: 3,
      type: 'Permiso Familiar',
      startDate: '5 Nov 2024',
      endDate: '5 Nov 2024',
      days: 1,
      status: 'rejected',
      reason: 'Evento familiar importante',
    },
  ];

  const handleSelectType = (type: string): void => {
    setPermissionType(type);
  };

  const handleSubmitRequest = (): void => {
    console.log('Permission request submitted:', {
      permissionType,
      startDate,
      endDate,
      reason,
    });
    setShowRequestModal(false);
    setPermissionType('');
    setStartDate('');
    setEndDate('');
    setReason('');
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'approved':
        return '#34C759';
      case 'pending':
        return '#FF9500';
      case 'rejected':
        return '#FF3B30';
      default:
        return '#8E8E93';
    }
  };

  const getStatusText = (status: string): string => {
    switch (status) {
      case 'approved':
        return 'Aprobado';
      case 'pending':
        return 'Pendiente';
      case 'rejected':
        return 'Rechazado';
      default:
        return 'Desconocido';
    }
  };

  const getStatusIcon = (status: string): keyof typeof Ionicons.glyphMap => {
    switch (status) {
      case 'approved':
        return 'checkmark-circle';
      case 'pending':
        return 'time-outline';
      case 'rejected':
        return 'close-circle';
      default:
        return 'help-circle-outline';
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
        <Text style={styles.headerTitle}>Permisos</Text>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => setShowRequestModal(true)}
        >
          <Ionicons name="add" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Disponibles</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Usados</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>1</Text>
            <Text style={styles.statLabel}>Pendientes</Text>
          </View>
        </View>

        {/* Tab Selector */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'request' && styles.activeTab,
            ]}
            onPress={() => setSelectedTab('request')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'request' && styles.activeTabText,
              ]}
            >
              Solicitar
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

        {selectedTab === 'request' ? (
          <>
            {/* Permission Types Grid */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Tipo de Permiso</Text>
              <View style={styles.typesGrid}>
                {permissionTypes.map((type) => (
                  <TouchableOpacity
                    key={type.id}
                    style={styles.typeCard}
                    onPress={() => setShowRequestModal(true)}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        styles.typeIcon,
                        { backgroundColor: `${type.color}20` },
                      ]}
                    >
                      <Ionicons name={type.icon} size={28} color={type.color} />
                    </View>
                    <Text style={styles.typeName}>{type.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Info Card */}
            <View style={styles.infoCard}>
              <View style={styles.infoIcon}>
                <Ionicons name="information-circle" size={24} color="#007AFF" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Información importante</Text>
                <Text style={styles.infoText}>
                  Los permisos deben ser solicitados con al menos 24 horas de
                  anticipación. Las solicitudes urgentes serán evaluadas caso por caso.
                </Text>
              </View>
            </View>
          </>
        ) : (
          <>
            {/* History List */}
            <View style={styles.historyContainer}>
              {permissionsHistory.map((permission) => (
                <View key={permission.id} style={styles.historyCard}>
                  <View style={styles.historyHeader}>
                    <View style={styles.historyTypeContainer}>
                      <Text style={styles.historyType}>{permission.type}</Text>
                      <Text style={styles.historyDays}>{permission.days} día(s)</Text>
                    </View>
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: `${getStatusColor(permission.status)}20` },
                      ]}
                    >
                      <Ionicons
                        name={getStatusIcon(permission.status)}
                        size={16}
                        color={getStatusColor(permission.status)}
                      />
                      <Text
                        style={[
                          styles.statusText,
                          { color: getStatusColor(permission.status) },
                        ]}
                      >
                        {getStatusText(permission.status)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.historyDates}>
                    <View style={styles.dateItem}>
                      <Ionicons name="calendar-outline" size={16} color="#8E8E93" />
                      <Text style={styles.dateText}>
                        {permission.startDate} - {permission.endDate}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.historyReason}>{permission.reason}</Text>
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>

      {/* Request Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showRequestModal}
        onRequestClose={() => setShowRequestModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Solicitar Permiso</Text>
              <TouchableOpacity
                onPress={() => setShowRequestModal(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.inputLabel}>Tipo de Permiso</Text>
              <View style={styles.typesList}>
                {permissionTypes.map((type) => (
                  <TouchableOpacity
                    key={type.id}
                    style={[
                      styles.typeOption,
                      permissionType === type.name && styles.typeOptionSelected,
                    ]}
                    onPress={() => handleSelectType(type.name)}
                  >
                    <Ionicons
                      name={type.icon}
                      size={20}
                      color={permissionType === type.name ? '#007AFF' : '#8E8E93'}
                    />
                    <Text
                      style={[
                        styles.typeOptionText,
                        permissionType === type.name && styles.typeOptionTextSelected,
                      ]}
                    >
                      {type.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.inputLabel}>Fecha de Inicio</Text>
              <TextInput
                style={styles.input}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="#C7C7CC"
                value={startDate}
                onChangeText={setStartDate}
              />

              <Text style={styles.inputLabel}>Fecha de Fin</Text>
              <TextInput
                style={styles.input}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="#C7C7CC"
                value={endDate}
                onChangeText={setEndDate}
              />

              <Text style={styles.inputLabel}>Motivo</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Describe el motivo de tu solicitud..."
                placeholderTextColor="#C7C7CC"
                value={reason}
                onChangeText={setReason}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmitRequest}
                activeOpacity={0.8}
              >
                <Text style={styles.submitButtonText}>Enviar Solicitud</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  statsCard: {
    backgroundColor: '#FFF',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#8E8E93',
  },
  statDivider: {
    width: 1,
    height: 50,
    backgroundColor: '#E5E5EA',
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
  section: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 16,
  },
  typesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  typeCard: {
    width: '47%',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  typeIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#E3F2FD',
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    gap: 12,
  },
  infoIcon: {
    marginTop: 2,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: '#1976D2',
    lineHeight: 18,
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
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  historyTypeContainer: {
    flex: 1,
  },
  historyType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  historyDays: {
    fontSize: 13,
    color: '#8E8E93',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  historyDates: {
    marginBottom: 8,
  },
  dateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 13,
    color: '#8E8E93',
  },
  historyReason: {
    fontSize: 14,
    color: '#000',
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 10,
    marginTop: 16,
  },
  typesList: {
    gap: 8,
  },
  typeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    backgroundColor: '#FFF',
    gap: 12,
  },
  typeOptionSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F8FF',
  },
  typeOptionText: {
    fontSize: 15,
    color: '#000',
    fontWeight: '500',
  },
  typeOptionTextSelected: {
    color: '#007AFF',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#FFF',
    color: '#000',
  },
  textArea: {
    height: 100,
    paddingTop: 16,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 10,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '600',
  },
});