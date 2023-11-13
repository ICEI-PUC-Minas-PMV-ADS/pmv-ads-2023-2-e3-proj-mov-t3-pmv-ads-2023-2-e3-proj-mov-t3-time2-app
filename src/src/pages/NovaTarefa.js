import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView} from 'react-native';
import { Button, Appbar} from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import { insertTarefa, updateTarefa, deleteTarefa } from '../services/ProjetosServicesDB';

import Container from '../components/Container';
import Header from '../components/Header';
import Body from '../components/Body';
import Input from '../components/Input';

const NovaTarefa = ({ route }) => {

  const navigation = useNavigation();
  const { item } = route.params ? route.params : {};
  const [tarefa, setTarefa] = useState('');

  useEffect(() => {
    if (item) {
      setTarefa(item.tarefa);
    }
  }, [item]);

  const handleSalvar = () => {
    if (item) {
      updateTarefa(
        {
          tarefa: tarefa,
          id: item.id
        }
      ).then();
    } else {
      insertTarefa(
        {
          tarefa: tarefa,
        }
      ).then();
    }
    navigation.goBack()
  }
  const handleExcluir = () => {
    deleteTarefa(item.id).then();
    navigation.goBack();
  };

  return (
    <Container>
      <Header

        title={'Cadastrar Tarefas'} goBack={() => navigation.goBack()} >

        <Appbar.Action icon="check" onPress={handleSalvar} />
        {
          <Appbar.Action icon="trash-can" onPress={handleExcluir} />
        }
      </Header>
      <ScrollView>
        <Body>
          <Input
            label="Tarefas"
            value={tarefa}
            onChangeText={(text) => setColaborador(text)}
          />
          <Button
            mode="contained"
            style={styles.buttom}
            color={'#4682B4'}
            onPress={handleSalvar}>
            Salvar
          </Button>

          {
            <Button
              mode="contained"
              color={'red'}
              style={styles.buttom}
              onPress={handleExcluir}>
              Excluir
            </Button>
          }
        </Body>
      </ScrollView>
    </Container >
  );
};

const styles = StyleSheet.create({
  colabField: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  colabFieldBox:{
    width: 300,
    backgroundColor: '#fff',
    marginBottom:4
  },
  buttom: {
    margin: 8
  },
  colabButton: {
    alignSelf: 'center'
  }
});


export default NovaTarefa;