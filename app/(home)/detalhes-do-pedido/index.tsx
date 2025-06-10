import { useAuth } from '@clerk/clerk-expo';
import { router, useLocalSearchParams } from 'expo-router';
import { Alert, Button, Text, View } from 'react-native';

export default function DetalhesDoPedido() {
  const { request_string, event_id } = useLocalSearchParams();
  const request = request_string ? JSON.parse(request_string as string) : null;
  const { getToken } = useAuth();

  const handleAccept = async () => {
    try {
      const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
      const token = await getToken();

      const response = await fetch(`${baseUrl}api/v1/autorizar-pedido`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          eventId: event_id,
          requestId: request._id,
        }),
      });

      if (!response.ok) throw new Error('Erro ao autorizar pedido');

      Alert.alert('Sucesso', 'Pedido autorizado');
      router.back();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      Alert.alert('Erro', errorMessage);
    }
  };

  return (
    <View>
      <Text>ID do pedido: {request._id}</Text>
      <Text>Texto do pedido: {request.text}</Text>
      <Text>Email: {request.email}</Text>
      <Text>event_id: {event_id}</Text>

      <Button title="Aceitar pedido" onPress={handleAccept} />
    </View>
  );
}
