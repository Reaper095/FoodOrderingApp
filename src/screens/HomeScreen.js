import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FoodItem from '../components/FoodItem';
import LoadingSpinner from '../components/LoadingSpinner';
import FirebaseService from '../services/firebaseService';
import { useCart } from '../context/CartContext';

const HomeScreen = ({ navigation }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cart } = useCart();

  useEffect(() => {
    const unsubscribe = FirebaseService.subscribeToMenuItems((items) => {
      setMenuItems(items);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const renderFoodItem = ({ item }) => (
    <FoodItem item={item} />
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Delicious Food</Text>
        <Text style={styles.headerSubtitle}>Order your favorite meals</Text>
        
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <Text style={styles.cartButtonText}>
            Cart ({cart.items.length})
          </Text>
        </TouchableOpacity>
      </LinearGradient>

      <FlatList
        data={menuItems}
        renderItem={renderFoodItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 20,
  },
  cartButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingVertical: 20,
  },
});

export default HomeScreen;