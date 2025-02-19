import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Text, Input, Button, Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

const EditMenuItemScreen = ({ route, navigation }) => {
  const { itemId } = route.params;
  
  // Mock data - replace with your actual data fetching
  const [item, setItem] = useState({
    id: itemId,
    name: 'Grilled Salmon',
    description: 'Fresh salmon fillet with herbs and lemon',
    price: '24.99',
    category: 'main',
    image: 'https://picsum.photos/200',
    ingredients: ['Salmon', 'Herbs', 'Lemon', 'Olive Oil'],
    allergens: ['Fish'],
    nutritionalInfo: {
      calories: '350',
      protein: '34',
      carbs: '0',
      fat: '18',
    },
  });
  const [loading, setLoading] = useState(false);

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions to add images.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setItem({ ...item, image: result.assets[0].uri });
    }
  };

  const handleSave = async () => {
    if (!item.name || !item.price || !item.category) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement actual save logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      Alert.alert('Success', 'Menu item updated successfully', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to update menu item');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this menu item?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              // TODO: Implement actual delete logic
              await new Promise(resolve => setTimeout(resolve, 1000));
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete menu item');
            } finally {
              setLoading(false);
            }
          }
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <TouchableOpacity style={styles.imageContainer} onPress={handleImagePick}>
          {item.image ? (
            <Image 
              source={{ uri: item.image }} 
              style={styles.image}
              onError={(e) => console.log('Image failed to load:', e.nativeEvent.error)}
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Icon name="add-photo-alternate" type="material" size={40} color="#636E72" />
              <Text style={styles.imagePlaceholderText}>Add Photo</Text>
            </View>
          )}
        </TouchableOpacity>

        <Input
          label="Item Name*"
          value={item.name}
          onChangeText={(text) => setItem({ ...item, name: text })}
          containerStyle={styles.inputContainer}
        />

        <Input
          label="Description"
          value={item.description}
          onChangeText={(text) => setItem({ ...item, description: text })}
          multiline
          containerStyle={styles.inputContainer}
        />

        <Input
          label="Price*"
          value={item.price}
          onChangeText={(text) => setItem({ ...item, price: text })}
          keyboardType="decimal-pad"
          leftIcon={<Text style={styles.currencySymbol}>$</Text>}
          containerStyle={styles.inputContainer}
        />

        <Input
          label="Category*"
          value={item.category}
          onChangeText={(text) => setItem({ ...item, category: text })}
          containerStyle={styles.inputContainer}
        />
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Delete Item"
          onPress={handleDelete}
          buttonStyle={styles.deleteButton}
          containerStyle={[styles.buttonContainer, styles.deleteButtonContainer]}
          icon={
            <Icon
              name="delete"
              type="material"
              size={20}
              color="#FF6B6B"
              style={{ marginRight: 8 }}
            />
          }
          type="outline"
        />
        <Button
          title="Save Changes"
          onPress={handleSave}
          loading={loading}
          buttonStyle={styles.saveButton}
          containerStyle={styles.buttonContainer}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    padding: 20,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F6FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    marginTop: 8,
    color: '#636E72',
  },
  inputContainer: {
    paddingHorizontal: 0,
  },
  currencySymbol: {
    fontSize: 16,
    color: '#636E72',
    marginRight: 8,
  },
  footer: {
    padding: 20,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#F5F6FA',
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  deleteButtonContainer: {
    flex: 0.4,
  },
  saveButton: {
    backgroundColor: '#ff4500',
    borderRadius: 12,
    paddingVertical: 12,
  },
  deleteButton: {
    borderColor: '#FF6B6B',
    borderRadius: 12,
    paddingVertical: 12,
  },
});

export default EditMenuItemScreen; 