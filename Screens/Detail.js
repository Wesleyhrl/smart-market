import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useCallback, useState } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { db } from '../Database/Firebase';

export default function Detail({ route }) {
  const navigation = useNavigation();
  

  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');
  const [editingId, setEditingId] = useState(null);

  useFocusEffect(
    useCallback(() => {
      if (route.params?.item) {
        const { item } = route.params;
        setNome(item.nomeProduto);
        setQuantidade(item.quantidade.toString());
        setPreco(item.precoUnitario.toString());
        setEditingId(item.id);
      } else {
        setNome('');
        setQuantidade('');
        setPreco('');
        setEditingId(null);
      }
    }, [route.params]) // Dependência apenas dos params
  );

  const clearForm = () => {
    setNome('');
    setQuantidade('');
    setPreco('');
    setEditingId(null);
  };

  const handleSave = async () => {
    if (!nome || !quantidade || !preco) {
      Toast.show({ type: 'error', text1: 'Preencha todos os campos!' });
      return;
    }

    try {
      const dataToSave = {
        nomeProduto: nome,
        quantidade: parseFloat(quantidade.replace(',', '.')), 
        precoUnitario: parseFloat(preco.replace(',', '.')), 
        comprado: false 
      };

      if (editingId) {
        // Atualizar existente
        await updateDoc(doc(db, "lista_compras", editingId), dataToSave);
        Toast.show({ type: 'success', text1: 'Produto atualizado!' });
      } else {
        // Criar novo
        await addDoc(collection(db, "lista_compras"), {
          ...dataToSave,
          dataAdicao: serverTimestamp()
        });
        Toast.show({ type: 'success', text1: 'Produto adicionado!' });
      }

      Keyboard.dismiss();
      clearForm();
      
      navigation.setParams({ item: null });
      navigation.navigate('Lista'); 
      
    } catch (error) {
      console.error(error);
      Toast.show({ type: 'error', text1: 'Erro ao salvar.' });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{editingId ? "Editar Produto" : "Novo Produto"}</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>Nome do Produto</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Arroz 5kg"
          value={nome}
          onChangeText={setNome}
        />

        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Text style={styles.label}>Quantidade</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 2"
              value={quantidade}
              onChangeText={setQuantidade}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.halfInput}>
            <Text style={styles.label}>Preço Unitário (R$)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 15.90"
              value={preco}
              onChangeText={setPreco}
              keyboardType="numeric"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>{editingId ? "Atualizar" : "Adicionar à Lista"}</Text>
        </TouchableOpacity>
        
        {editingId && (
          <TouchableOpacity 
            style={styles.cancelButton} 
            onPress={() => { 
              clearForm(); 
              navigation.setParams({ item: null });
              navigation.navigate('Lista'); 
            }}
          >
            <Text style={styles.cancelText}>Cancelar Edição</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F2F5F8',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  button: {
    backgroundColor: '#2E7D32',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: 15,
    alignItems: 'center',
    marginTop: 5,
  },
  cancelText: {
    color: '#777',
    fontSize: 16,
  }
});