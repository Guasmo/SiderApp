import ColorDemo from '@/components/ColorExample';
import CombinedBiometricsDemo from '@/components/CombinedBiometricsDemo';
import DebuggingExample from '@/components/DebuggingExample';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import AuthExample from '../../components/AuthExamples';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <AuthExample />
        <ColorDemo />
        <CombinedBiometricsDemo />
        <DebuggingExample />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
  },
});