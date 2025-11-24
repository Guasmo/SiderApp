import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface QuickAccessItem {
  id: number;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  color: string;
  route?: string;
}

export default function DashboardScreen() {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);

  const quickAccessItems: QuickAccessItem[] = [
    {
      id: 1,
      icon: 'calendar-outline',
      title: 'Vacaciones',
      subtitle: 'Disponible: 12 días',
      color: '#34C759',
      route: 'vacation',
    },
    {
      id: 2,
      icon: 'people-outline',
      title: 'Registro Laboral',
      subtitle: 'Entrada y Salida',
      color: '#007AFF',
      route: 'attendance',
    },
    {
      id: 3,
      icon: 'document-text-outline',
      title: 'Permisos',
      subtitle: 'Solicita días',
      color: '#FF9500',
      route: 'Permissions', 
    },
    {
      id: 4,
      icon: 'folder-outline',
      title: 'Documentos',
      subtitle: 'Empresariales',
      color: '#5856D6',
      route: 'documents',
    },
    {
      id: 5,
      icon: 'time-outline',
      title: 'Horas extra',
      subtitle: 'Realización mensual',
      color: '#FF2D55',
      route: 'overtime',
    },
    
    {
      id: 7,
      icon: 'mail-outline',
      title: 'Correo Electrónico',
      subtitle: 'Outlook, Gmail, etc',
      color: '#00C7BE',
      route: 'email',
    },
  ];

  const handleQuickAccess = (item: QuickAccessItem): void => {
    console.log('Quick access pressed:', item.title);
    if (item.route) {
      router.push(`/(tabs)/${item.route}`);
    }
  };

  const handleLogout = (): void => {
    setShowLogoutModal(false);
    console.log('Logging out...');
    router.replace('/');
  };

  const handleProfilePress = (): void => {
    setShowLogoutModal(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Bienvenido, Dagumo!</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={handleProfilePress}
            >
              <Ionicons name="person-outline" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Próximo Pago Card */}
        <View style={styles.paymentCard}>
          <View style={styles.paymentContent}>
            <View style={styles.dateCircle}>
              <Text style={styles.dateNumber}>9</Text>
              <Text style={styles.dateMonth}>SEP</Text>
            </View>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentTitle}>Próximo Pago</Text>
              <Text style={styles.paymentSubtitle}>Pago total: $000</Text>
              <Text style={styles.paymentStatus}>Estado: Finalizado</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.viewDetailsButton}>
            <Text style={styles.viewDetailsText}>Ver pagos anteriores</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Access Grid */}
        <View style={styles.gridContainer}>
          {quickAccessItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.gridItem}
              onPress={() => handleQuickAccess(item)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: `${item.color}20` },
                ]}
              >
                <Ionicons name={item.icon} size={28} color={item.color} />
              </View>
              <Text style={styles.gridTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.gridSubtitle} numberOfLines={1}>
                {item.subtitle}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Events Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Eventos</Text>
          <TouchableOpacity style={styles.eventCard} activeOpacity={0.7}>
            <Text style={styles.eventDate}>20 Enero</Text>
            <Text style={styles.eventTitle}>
              Reunión mensual - Developer Team
            </Text>
            <Text style={styles.eventTime}>Sala de Juntas · 10:30 am</Text>
          </TouchableOpacity>
        </View>

        {/* Tasks Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tareas</Text>
          <TouchableOpacity style={styles.taskCard} activeOpacity={0.7}>
            <View style={styles.taskHeader}>
              <View style={styles.priorityBadge}>
                <Text style={styles.priorityText}>Baja</Text>
              </View>
            </View>
            <Text style={styles.taskTitle}>Implementación de "Issues"</Text>
            <Text style={styles.taskAssignee}>
              Encargado: Daniel Magalhaoo
            </Text>
            <TouchableOpacity style={styles.taskButton}>
              <Ionicons
                name="chevron-forward"
                size={20}
                color="#000"
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        {/* Spacer for FAB */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
        <Ionicons name="add" size={28} color="#FFF" />
      </TouchableOpacity>

      {/* Logout Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showLogoutModal}
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setShowLogoutModal(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalIcon}>
              <Ionicons name="log-out-outline" size={40} color="#FF3B30" />
            </View>
            
            <Text style={styles.modalTitle}>Cerrar Sesión</Text>
            <Text style={styles.modalMessage}>
              ¿Estás seguro que deseas cerrar sesión?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowLogoutModal(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.logoutButton]}
                onPress={handleLogout}
                activeOpacity={0.7}
              >
                <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF',
  },
  greeting: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentCard: {
    backgroundColor: '#FFF',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  paymentContent: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  dateCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  dateNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  dateMonth: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '600',
  },
  paymentInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  paymentSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 2,
  },
  paymentStatus: {
    fontSize: 14,
    color: '#8E8E93',
  },
  viewDetailsButton: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  viewDetailsText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    gap: 12,
  },
  gridItem: {
    width: '47%',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  gridTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
    minHeight: 40,
  },
  gridSubtitle: {
    fontSize: 13,
    color: '#8E8E93',
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
  },
  eventCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  eventDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 6,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 6,
  },
  eventTime: {
    fontSize: 14,
    color: '#8E8E93',
  },
  taskCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  taskHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  priorityBadge: {
    backgroundColor: '#D1F4E0',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#34C759',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 6,
  },
  taskAssignee: {
    fontSize: 14,
    color: '#8E8E93',
  },
  taskButton: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  bottomSpacer: {
    height: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  modalIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFE5E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 15,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});
