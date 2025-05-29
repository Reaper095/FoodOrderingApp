import { 
  collection, 
  getDocs, 
  addDoc, 
  onSnapshot,
  orderBy,
  query 
} from 'firebase/firestore';
import { db } from '../../firebase.config';

class FirebaseService {
  // Fetch menu items from Firestore
  async getMenuItems() {
    try {
      const menuCollection = collection(db, 'menuItems');
      const menuQuery = query(menuCollection, orderBy('name'));
      const menuSnapshot = await getDocs(menuQuery);
      
      return menuSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching menu items:', error);
      throw error;
    }
  }

  // Real-time listener for menu items
  subscribeToMenuItems(callback) {
    const menuCollection = collection(db, 'menuItems');
    const menuQuery = query(menuCollection, orderBy('name'));
    
    return onSnapshot(menuQuery, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(items);
    }, (error) => {
      console.error('Error in menu subscription:', error);
    });
  }

  // Submit order to Firestore
  async submitOrder(orderData) {
    try {
      const ordersCollection = collection(db, 'orders');
      const docRef = await addDoc(ordersCollection, {
        ...orderData,
        createdAt: new Date(),
        status: 'pending'
      });
      
      return docRef.id;
    } catch (error) {
      console.error('Error submitting order:', error);
      throw error;
    }
  }
}

export default new FirebaseService();