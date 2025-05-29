import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCart } from '../context/CartContext';
import FirebaseService from '../services/firebaseService';

const OrderSummaryScreen = ({ navigation }) => {
  const { cart, clearCart } = useCart();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmitOrder = async () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    setLoading(true);
    
    try {
      const orderData = {
        items: cart.items,
        total: cart.total,
        customerInfo,
        orderDate: new Date().toISOString(),
      };

      const orderId = await FirebaseService.submitOrder(orderData);
      
      Alert.alert(
        'Order Placed Successfully!',
        `Your order ID is: ${orderId}\nWe'll contact you soon for delivery.`,
        [
          {
            text: 'OK',
            onPress: () => {
              clearCart();
              navigation.popToTop();
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Order Summary</Text>
      </LinearGradient>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Order Details</Text>
        
        {cart.items.map((item) => (
          <View key={item.id} style={styles.orderItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDetails}>
              Qty: {item.quantity} × ${item.price.toFixed(2)}
            </Text>
            <Text style={styles.itemTotal}>
              ${(item.quantity * item.price).toFixed(2)}
            </Text>
          </View>
        ))}
        
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Amount:</Text>
          <Text style={styles.totalAmount}>${cart.total.toFixed(2)}</Text>
        </View>

        <Text style={styles.sectionTitle}>Delivery Information</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Full Name *"
          value={customerInfo.name}
          onChangeText={(text) => setCustomerInfo({...customerInfo, name: text})}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Phone Number *"
          value={customerInfo.phone}
          onChangeText={(text) => setCustomerInfo({...customerInfo, phone: text})}
          keyboardType="phone-pad"
        />
        
        <TextInput
          style={[styles.input, styles.addressInput]}
          placeholder="Delivery Address *"
          value={customerInfo.address}
          onChangeText={(text) => setCustomerInfo({...customerInfo, address: text})}
          multiline
          numberOfLines={3}
        />

        <TouchableOpacity
          style={[styles.submitButton, loading && styles.disabledButton]}
          onPress={handleSubmitOrder}
          disabled={loading}
        >
          <LinearGradient
            colors={loading ? ['#6c757d', '#6c757d'] : ['#28a745', '#20c997']}
            style={styles.submitGradient}
          >
            <Text style={styles.submitButtonText}>
              {loading ? 'Placing Order...' : 'Place Order'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    marginTop: 10,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemName: {
    flex: 2,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemDetails: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  addressInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 20,
  },
  submitGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.7,
  },
});

export default OrderSummaryScreen;