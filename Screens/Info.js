import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Info() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Ionicons name="cart" size={60} color="#2E7D32" />
          <Text style={styles.title}>SmartMarket</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Objetivo</Text>
          <Text style={styles.text}>
            Este aplicativo ajuda você a controlar seus gastos no supermercado em tempo real, 
            evitando surpresas no caixa.
          </Text>

          <Text style={styles.sectionTitle}>Funcionalidades</Text>
          <Text style={styles.item}>• Adicionar produtos com preço e quantidade</Text>
          <Text style={styles.item}>• Cálculo automático do total por item</Text>
          <Text style={styles.item}>• Cálculo automático do total da compra</Text>
          <Text style={styles.item}>• Marcar itens como comprados (Check)</Text>
          <Text style={styles.item}>• Editar e Excluir itens</Text>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E7D32',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 10,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 25,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginTop: 15,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
  item: {
    fontSize: 15,
    color: '#444',
    marginBottom: 5,
    marginLeft: 10,
  },
  footer: {
    marginTop: 30,
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    fontStyle: 'italic',
  }
});