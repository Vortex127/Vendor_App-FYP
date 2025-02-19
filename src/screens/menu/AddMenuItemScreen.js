import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Text, Input, Button, Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

const AddMenuItemScreen = ({ navigation }) => {
  const [item, setItem] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);

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

  const handleSave = async () => {
    if (!item.name || !item.price || !item.category) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement save logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigation.goBack();
    } catch (error) {
      alert('Failed to save menu item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
          onChangeText={(text) => setItem({ ...item, name: text })}
          containerStyle={styles.inputContainer}
        />

        <Input
          placeholder="Description"
          value={item.description}
          onChangeText={(text) => setItem({ ...item, description: text })}
          multiline
          containerStyle={styles.inputContainer}
        />

        <Input
          placeholder="Price*"
          value={item.price}
          onChangeText={(text) => setItem({ ...item, price: text })}
          keyboardType="decimal-pad"
          leftIcon={<Text style={styles.currencySymbol}>$</Text>}
          containerStyle={styles.inputContainer}
        />

        <Input
          placeholder="Category*"
          value={item.category}
          onChangeText={(text) => setItem({ ...item, category: text })}
          containerStyle={styles.inputContainer}
        />
      </ScrollView>

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