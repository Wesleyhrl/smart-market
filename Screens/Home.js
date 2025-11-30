import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { db } from '../Database/Firebase';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [totalList, setTotalList] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const q = query(collection(db, "lista_compras"), orderBy("dataAdicao", "desc"));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const listaTemp = [];
      let somaTotal = 0;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const totalItem = data.quantidade * data.precoUnitario;
        somaTotal += totalItem;

        listaTemp.push({
          id: doc.id,
          ...data,
          totalItem: totalItem
        });
      });

      setProducts(listaTemp);
      setTotalList(somaTotal);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = (item) => {
    Alert.alert(
      "Excluir",
      `Deseja remover ${item.nomeProduto}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sim", 
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "lista_compras", item.id));
              Toast.show({ type: 'success', text1: 'Produto removido!' });
            } catch (e) {
              console.error(e);
            }
          }
        }
      ]
    );
  };

  const toggleComprado = async (item) => {
    try {
      const docRef = doc(db, "lista_compras", item.id);
      await updateDoc(docRef, {
        comprado: !item.comprado
      });
    } catch (e) {
      console.error(e);
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.card, item.comprado && styles.cardComprado]}>
      <TouchableOpacity onPress={() => toggleComprado(item)} style={styles.checkButton}>
        <Ionicons 
          name={item.comprado ? "checkbox" : "square-outline"} 
          size={24} 
          color={item.comprado ? "#2E7D32" : "#888"} 
        />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.infoContainer} 
        onPress={() => navigation.navigate('Novo Produto', { item })} // Vai para edição
      >
        <Text style={[styles.productName, item.comprado && styles.textStrikethrough]}>
          {item.nomeProduto}
        </Text>
        <Text style={styles.productDetails}>
          {item.quantidade} x R$ {item.precoUnitario.toFixed(2)}
        </Text>
      </TouchableOpacity>

      <View style={styles.rightContainer}>
        <Text style={styles.itemTotal}>
          R$ {item.totalItem.toFixed(2)}
        </Text>
        <TouchableOpacity onPress={() => handleDelete(item)} style={styles.deleteButton}>
          <FontAwesome5 name="trash-alt" size={18} color="#e53935" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SmartMarket</Text>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total da Lista</Text>
          <Text style={styles.totalValue}>R$ {totalList.toFixed(2)}</Text>
        </View>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Sua lista está vazia. Adicione produtos!</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F5F8',
  },
  header: {
    backgroundColor: '#2E7D32',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  totalContainer: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  totalLabel: {
    color: '#555',
    fontSize: 16,
    fontWeight: '600',
  },
  totalValue: {
    color: '#2E7D32',
    fontSize: 20,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 15,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
  },
  cardComprado: {
    backgroundColor: '#E8F5E9',
    opacity: 0.8,
  },
  checkButton: {
    paddingRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  textStrikethrough: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  productDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  rightContainer: {
    alignItems: 'flex-end',
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 5,
  },
  deleteButton: {
    padding: 5,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#999',
    fontSize: 16,
  }
});