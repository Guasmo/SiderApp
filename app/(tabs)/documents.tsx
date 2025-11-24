import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// Definición de la interfaz para un documento
interface DocumentRecord {
  id: number;
  title: string;
  type: string; // Mensual, Anual, Contrato, etc.
  iconColor: string;
  iconName: keyof typeof Ionicons.glyphMap;
}

// Datos de ejemplo para las dos pestañas
const payrolls: DocumentRecord[] = [
  {
    id: 1,
    title: 'Nómina de Enero',
    type: 'Mensual',
    iconColor: '#D3A369', // Tono naranja/marrón claro
    iconName: 'document-text-outline',
  },
  {
    id: 2,
    title: 'Nómina de Febrero',
    type: 'Mensual',
    iconColor: '#388E8E', // Tono verde oscuro
    iconName: 'document-text-outline',
  },
  {
    id: 3,
    title: 'Nómina de Marzo',
    type: 'Mensual',
    iconColor: '#C9AF9F', // Tono gris/beige
    iconName: 'folder-outline',
  },
  {
    id: 4,
    title: 'Nómina de Abril',
    type: 'Mensual',
    iconColor: '#4A90E2',
    iconName: 'document-text-outline',
  },
];

const corporateDocuments: DocumentRecord[] = [
  {
    id: 1,
    title: 'Manual del Empleado',
    type: 'Contrato',
    iconColor: '#007AFF',
    iconName: 'book-outline',
  },
  {
    id: 2,
    title: 'Política de Vacaciones',
    type: 'Reglamento',
    iconColor: '#34C759',
    iconName: 'reader-outline',
  },
  {
    id: 3,
    title: 'Contrato Laboral',
    type: 'Legal',
    iconColor: '#FF3B30',
    iconName: 'document-lock-outline',
  },
];

export default function DocumentsScreen() {
  const router = useRouter();
  // 'payroll' para Nómina, 'corporate' para Documentos Empresariales
  const [selectedTab, setSelectedTab] = useState<'payroll' | 'corporate'>('payroll');

  const handleDownload = (document: DocumentRecord): void => {
    // Lógica de descarga simulada
    Alert.alert('Descarga Iniciada', `Descargando: ${document.title}`);
    console.log(`Downloading ${document.title}`);
  };

  const currentData = selectedTab === 'payroll' ? payrolls : corporateDocuments;

  // Componente para renderizar la lista de documentos
  const DocumentItem = ({ document }: { document: DocumentRecord }) => (
    <View style={styles.documentCard}>
      <View style={styles.documentInfo}>
        <Text style={styles.documentTitle}>{document.title}</Text>
        <Text style={styles.documentType}>Tipo: {document.type}</Text>
        <TouchableOpacity
          style={styles.downloadButton}
          onPress={() => handleDownload(document)}
          activeOpacity={0.7}
        >
          <Text style={styles.downloadText}>Descargar</Text>
          <Ionicons name="download-outline" size={18} color="#007AFF" />
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.documentIconContainer,
          // Usamos un color de fondo más claro
          { backgroundColor: `${document.iconColor}30` }, 
        ]}
      >
        <Ionicons name={document.iconName} size={40} color={document.iconColor} />
      </View>
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
        <Text style={styles.headerTitle}>Documentos Empresariales</Text>
        <View style={{ width: 40 }} /> {/* Spacer */}
      </View>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'payroll' && styles.activeTab,
          ]}
          onPress={() => setSelectedTab('payroll')}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'payroll' && styles.activeTabText,
            ]}
          >
            Nómina
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'corporate' && styles.activeTab,
          ]}
          onPress={() => setSelectedTab('corporate')}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'corporate' && styles.activeTabText,
            ]}
          >
            Documentos Empresariales
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.listContainer}>
          {currentData.map((doc) => (
            <DocumentItem key={doc.id} document={doc} />
          ))}
        </View>
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
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 4,
    backgroundColor: '#FFF',
    borderRadius: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: '#E5E5EA', // Color de fondo del tab activo
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#8E8E93',
  },
  activeTabText: {
    color: '#000',
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  documentCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  documentInfo: {
    flex: 1,
    marginRight: 16,
  },
  documentTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  documentType: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  downloadText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#007AFF',
  },
  documentIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSpacer: {
    height: 20,
  },
});