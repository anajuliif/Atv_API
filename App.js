import React, { useState } from "react"; // Importando o React e a função useState do pacote 'react'
import { View, TextInput, Button, Text } from "react-native"; // Importa componentes básicos do React Native
import axios from "axios"; // Importando a biblioteca axios que nos ajuda a fazer pedidos para outros lugares na internet.

// Aqui vamos definir doiis estados com a função useState
const App = () => {
  const [cep, setCep] = useState(""); // ESte estado vai armazenar o CEP digitado pelo usuário
  const [address, setAddress] = useState(null); // E este estado vai guardar as informações do endereço que vamos buscar.

  // A função fetchAddress foi criada para buscar os CEPs que o usuário digitou   
  const fetchAddress = async () => {
    try {
      //Aqui é feita uma solicitação para o site "viacep.com", para nos fornecer informações sobre os CEPs 
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      // Atualiza o estado 'address' com os dados retornados pela API
      setAddress(response.data);
    } catch (error) {
      // Caso dê errado, aparecerá umamensagem de erro no console
      console.error("Error fetching address:", error);
      setAddress(null);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* Componente TextInput para permitir que o usuário insira o CEP */}
      <TextInput
        placeholder="Digite o CEP"
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
      />
      {/* Quando o usuário clica no botão, a função fetchAdderss é chamada.*/}
      <Button title="Buscar Endereço" onPress={fetchAddress} />
      {/* Condicional que renderiza o endereço somente se o estado 'address' não for null */}
      {address && (
        <View>
          {/* Exibe as informações do endereço retornadas pela API */}
          <Text>CEP: {address.cep}</Text>
          <Text>Rua: {address.logradouro}</Text>
          <Text>Bairro: {address.bairro}</Text>
          <Text>Cidade: {address.localidade}</Text>
          <Text>Estado: {address.uf}</Text>
        </View>
      )}
    </View>
  );
};

// Exporta o componente principal para ser utilizado em outros arquivos
export default App;
