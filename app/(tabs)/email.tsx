import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface Email {
  id: number;
  sender: string;
  subject: string;
  time: string; 
  isRead: boolean;
}

const allEmails: Email[] = [
  {
    id: 1,
    sender: 'Liam Carter',
    subject: 'Actualizar Proyecto',
    time: '10:30 AM',
    isRead: false,
  },
  {
    id: 2,
    sender: 'Sophia Bennett',
    subject: 'Recordatorio de Reunión',
    time: 'Ayer',
    isRead: false,
  },
  {
    id: 3,
    sender: 'Ethan Harper',
    subject: 'Nuevo anuncio de funcionalidad',
    time: 'Hace 2 días',
    isRead: true,
  },
  {
    id: 4,
    sender: 'Ava Morgan',
    subject: 'Mantenimiento de Sistema',
    time: 'Hace 3 días',
    isRead: true,
  },
  {
    id: 5,
    sender: 'Noah Foster',
    subject: 'Alerta de seguridad',
    time: 'Hace una semana',
    isRead: false,
  },
  {
    id: 6,
    sender: 'Isabella Reed',
    subject: 'Cambio de políticas',
    time: 'Hace 2 semanas',
    isRead: true,
  },
];

export default function EmailScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 🔎 Función de filtrado con useMemo para optimizar
  const filteredEmails = useMemo(() => {
    if (!searchQuery) {
      return allEmails;
    }
    const query = searchQuery.toLowerCase();
    return allEmails.filter(
      (email) =>
        email.sender.toLowerCase().includes(query) ||
        email.subject.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Componente para renderizar un ítem de correo
  const EmailItem = ({ email }: { email: Email }) => (
    <TouchableOpacity style={styles.emailCard} activeOpacity={0.7}>
      <View style={styles.emailContent}>
        <Text
          style={[styles.senderText, !email.isRead && styles.unreadText]}
          numberOfLines={1}
        >
          {email.sender}
        </Text>
        <Text style={styles.subjectText} numberOfLines={1}>
          {email.subject}
        </Text>
      </View>
      <View style={styles.emailTimeContainer}>
        <Text style={styles.timeText}>{email.time}</Text>
        {!email.isRead && <View style={styles.unreadDot} />}
      </View>
    </TouchableOpacity>
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
        <Text style={styles.headerTitle}>Correo Electrónico</Text>
        <View style={{ width: 40 }} /> {/* Spacer */}
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#8E8E93" />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar"
          placeholderTextColor="#8E8E93"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.listContainer}>
          {filteredEmails.length > 0 ? (
            filteredEmails.map((email) => (
              <EmailItem key={email.id} email={email} />
            ))
          ) : (
            <Text style={styles.emptyText}>No se encontraron correos.</Text>
          )}
        </View>
      </ScrollView>

      {/* Floating Action Button (Redactar/Compose) */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
        <Ionicons name="add" size={28} color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    paddingBottom: 80, // Espacio para el FAB
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
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    flex: 1,
    textAlign: 'center',
    marginLeft: -40, // Compensa el espacio del botón
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAEAEA',
    marginHorizontal: 16,
    marginVertical: 10,
    padding: 10,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    color: '#000',
  },
  listContainer: {
    backgroundColor: '#FFF',
  },
  emailCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    alignItems: 'center',
  },
  emailContent: {
    flex: 1,
    marginRight: 10,
  },
  senderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  unreadText: {
    fontWeight: '700', // Más grueso para correos no leídos
  },
  subjectText: {
    fontSize: 14,
    color: '#8E8E93',
  },
  emailTimeContainer: {
    alignItems: 'flex-end',
    minWidth: 70,
  },
  timeText: {
    fontSize: 13,
    color: '#8E8E93',
    marginBottom: 4,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007AFF',
  },
  emptyText: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#8E8E93',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF9500', // Un color distintivo para componer
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});