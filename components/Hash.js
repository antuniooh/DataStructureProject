import * as React from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import estilos from '../estilo';
import HashTable from '../objects/HashTable';
import Botao from './CustomButtom';
import Canvas from 'react-native-canvas';
import DrawCanvas from '../Canvas/Frame/DrawCanvas';

export default class Hash extends React.Component {
  constructor(props) {
    super(props);
    this.keyText = undefined;
    this.valueText = undefined;
    this.managerCanvas = undefined;
  }

  handleCanvas = (canvasReceive) => {
    if (canvasReceive != null) {
      this.setState({
        managerCanvas: new DrawCanvas(canvasReceive, new HashTable()),
      });
    }
  };

  render() {
    return (
      <View style={estilos.container}>
        <Canvas ref={this.handleCanvas} />

        <View style={estilos.rowStyle}>
          <TextInput
            style={estilos.caixaHash}
            placeholder="Digite a chave"
            keyboardType={'numeric'}
            onChangeText={(texto) =>
              this.setState({ keyText: texto })
            }></TextInput>
          <TextInput
            style={estilos.caixaHash}
            placeholder="Digite o valor"
            onChangeText={(texto) =>
              this.setState({ valueText: texto })
            }></TextInput>
        </View>

        <View style={estilos.rowStyle}>
          <Botao
            onPress={() =>
              this.state.managerCanvas.insertStaticQueue(this.state.text)
            }>
            Inserir
          </Botao>

          <Botao
            onPress={() =>
              this.state.managerCanvas.insertHash(
                this.state.keyText,
                this.state.valueText
              )
            }>
            Remover
          </Botao>

          <Botao onPress={() => this.hashTableObj.search(this.state.keyText)}>
            Pesquisar
          </Botao>
          <Botao onPress={() => this.state.managerCanvas.clear()}>Limpar</Botao>
        </View>
      </View>
    );
  }
}
