import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

const AddMenuItemScreen = ({ navigation }) => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('main');
  const [image, setImage] = useState(null);
  const [preparationTime, setPreparationTime] = useState('');
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isSpicy, setIsSpicy] = useState(false);
  const [errors, setErrors] = useState({});

  const pickImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Sorry, we need camera roll permissions to upload images.');
        return;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const validateForm = () => {
    let tempErrors = {};

    if (!itemName) tempErrors.itemName = 'Item name is required';
    if (!description) tempErrors.description = 'Description is required';
    if (!price) tempErrors.price = 'Price is required';
    else if (isNaN(parseFloat(price))) tempErrors.price = 'Price must be a number';
    if (!image) tempErrors.image = 'Please upload an image';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const menuItem = {
        name: itemName,
        description,
        price: parseFloat(price),
        category,
        image,
        preparationTime: preparationTime ? parseInt(preparationTime) : 0,
        isVegetarian,
        isSpicy,
      };

      console.log('Submitting menu item:', menuItem);

      Alert.alert(
        'Success',
        'Menu item added successfully!',
        [
          {
            text: 'Add Another',
            onPress: () => {
              setItemName('');
              setDescription('');
              setPrice('');
              setCategory('main');
              setImage(null);
              setPreparationTime('');
              setIsVegetarian(false);
              setIsSpicy(false);
              setErrors({});
            },
          },
          {
            text: 'Go to Menu',
            onPress: () => navigation.navigate('Menu'),
          },
        ]
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Add New Menu Item</Text>
          </View>

          <View style={styles.formContainer}>
            <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
              {image ? (
                <Image source={{ uri: image }} style={styles.uploadedImage} />
              ) : (
                <View style={styles.uploadPlaceholder}>
                  <Text style={styles.uploadText}>Tap to upload image</Text>
                </View>
              )}
            </TouchableOpacity>
            {errors.image && <Text style={styles.errorText}>{errors.image}</Text>}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Item Name*</Text>
              <TextInput
                style={[styles.input, styles.textInput, errors.itemName && styles.inputError]}
                value={itemName}
                onChangeText={setItemName}
                placeholder="Enter item name"
                placeholderTextColor="#999"
                multiline
              />
              {errors.itemName && <Text style={styles.errorText}>{errors.itemName}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description*</Text>
              <TextInput
                style={[styles.input, styles.textArea, errors.description && styles.inputError]}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter item description"
                placeholderTextColor="#999"
                multiline
              />
              {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Price*</Text>
              <TextInput
                style={[styles.input, errors.price && styles.inputError]}
                value={price}
                onChangeText={setPrice}
                placeholder="Enter price"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />
              {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Category</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={category}
                  onValueChange={(itemValue) => setCategory(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Appetizer" value="appetizer" />
                  <Picker.Item label="Main Course" value="main" />
                  <Picker.Item label="Dessert" value="dessert" />
                  <Picker.Item label="Beverage" value="beverage" />
                  <Picker.Item label="Side Dish" value="side" />
                </Picker>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Preparation Time (minutes)</Text>
              <TextInput
                style={styles.input}
                value={preparationTime}
                onChangeText={setPreparationTime}
                placeholder="Enter preparation time"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.attributesContainer}>
              <TouchableOpacity
                style={[styles.attributeButton, isVegetarian && styles.attributeButtonActive]}
                onPress={() => setIsVegetarian(!isVegetarian)}
              >
                <Text style={[styles.attributeText, isVegetarian && styles.attributeTextActive]}>
                  Vegetarian
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.attributeButton, isSpicy && styles.attributeButtonActive]}
                onPress={() => setIsSpicy(!isSpicy)}
              >
                <Text style={[styles.attributeText, isSpicy && styles.attributeTextActive]}>
                  Spicy
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Add Menu Item</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F2',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#FF8C42',
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  formContainer: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  imageUpload: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FF8C42',
    borderStyle: 'dashed',
  },
  uploadPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF0E6',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  uploadText: {
    color: '#FF8C42',
    fontSize: 16,
    fontWeight: '500',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    minHeight: 48,
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 4,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  attributesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  attributeButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FF8C42',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  attributeButtonActive: {
    backgroundColor: '#FF8C42',
  },
  attributeText: {
    color: '#FF8C42',
    fontSize: 16,
    fontWeight: '500',
  },
  attributeTextActive: {
    color: '#FFFFFF',
  },
  submitButton: {
    backgroundColor: '#FF8C42',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddMenuItemScreen;