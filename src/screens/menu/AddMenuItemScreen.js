import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Text, Input, Button, Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

const AddMenuItemScreen = ({ navigation }) => {
  const [item, setItem] = useState({
    id: Math.random().toString(36).substr(2, 9),
    name: '',
    description: '',
    price: '',
    category: '',
    image: null,
    status: 'active'
  });
  const [loading, setLoading] = useState(false);
  const [categoryError, setCategoryError] = useState('');

  const validateCategory = (category) => {
    const validCategories = ['appetizers', 'main', 'desserts', 'drinks'];
    return validCategories.includes(category.toLowerCase());
  };

  const handleSave = async () => {
    if (!item.name || !item.price || !item.category) {
      alert('Please fill in all required fields');
      return;
    }

    if (!validateCategory(item.category)) {
      setCategoryError('Please select a valid category: Appetizers, Main, Desserts, or Drinks');
      return;
    }

    const priceNum = parseFloat(item.price);
    if (isNaN(priceNum) || priceNum <= 0) {
      alert('Please enter a valid price');
      return;
    }

    setLoading(true);
    try {
      const newItem = {
        ...item,
        price: priceNum,
        category: item.category.toLowerCase(),
        image: item.image || 'https://picsum.photos/200'
      };
      
      navigation.navigate('Menu', { newItem });
    } catch (error) {
      alert('Failed to save menu item');
    } finally {
      setLoading(false);
    }
  };

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to add images.');
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

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView style={styles.content}>
            <TouchableOpacity style={styles.imageContainer} onPress={handleImagePick}>
              {item.image ? (
                <Image source={{ uri: item.image }} style={styles.image} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Icon name="add-photo-alternate" type="material" size={40} color="#636E72" />
                  <Text style={styles.imagePlaceholderText}>Add Photo</Text>
                </View>
              )}
            </TouchableOpacity>

            <Input
              placeholder="Item Name*"
              value={item.name}
              onChangeText={(text) => setItem(prev => ({ ...prev, name: text }))}
              containerStyle={styles.inputContainer}
              inputContainerStyle={styles.inputField}
              inputStyle={styles.input}
              autoCapitalize="words"
              returnKeyType="next"
            />

            <Input
              placeholder="Description"
              value={item.description}
              onChangeText={(text) => setItem(prev => ({ ...prev, description: text }))}
              multiline
              numberOfLines={3}
              containerStyle={styles.inputContainer}
              inputContainerStyle={styles.inputField}
              inputStyle={styles.input}
            />

            <Input
              placeholder="Price*"
              value={item.price}
              onChangeText={(text) => setItem(prev => ({ ...prev, price: text.replace(/[^0-9.]/g, '') }))}
              keyboardType="decimal-pad"
              leftIcon={<Text style={styles.currencySymbol}>$</Text>}
              containerStyle={styles.inputContainer}
              inputContainerStyle={styles.inputField}
              inputStyle={styles.input}
              returnKeyType="next"
            />

            <Input
              placeholder="Category* (appetizers, main, desserts, drinks)"
              value={item.category}
              onChangeText={(text) => {
                setItem(prev => ({ ...prev, category: text }));
                setCategoryError('');
              }}
              containerStyle={styles.inputContainer}
              inputContainerStyle={styles.inputField}
              inputStyle={styles.input}
              errorMessage={categoryError}
              autoCapitalize="none"
              returnKeyType="done"
            />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <Button
          title="Save Item"
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
  keyboardAvoidingView: {
    flex: 1,
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
    backgroundColor: '#F5F6FA',
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
    marginBottom: 10,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#DFE6E9',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: undefined,
  },
  input: {
    color: '#2D3436',
    fontSize: 16,
    paddingVertical: 8,
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
  },
  buttonContainer: {
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#ff4500',
    borderRadius: 12,
    paddingVertical: 12,
  },
});

export default AddMenuItemScreen;