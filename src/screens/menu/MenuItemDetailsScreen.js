import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Text, Icon, Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

const MenuItemDetailsScreen = ({ route, navigation }) => {
  const { itemId } = route.params;
  
  // Mock data - replace with your actual data fetching logic
  const item = {
    id: itemId,
    name: 'Grilled Salmon',
    description: 'Fresh salmon fillet with herbs and lemon',
    price: 24.99,
    image: 'https://picsum.photos/200',
    category: 'main',
    ingredients: ['Salmon', 'Herbs', 'Lemon', 'Olive Oil'],
    allergens: ['Fish'],
    nutritionalInfo: {
      calories: '350 kcal',
      protein: '34g',
      carbs: '0g',
      fat: '18g',
    },
  };

  const InfoSection = ({ title, children }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.image}
          onError={(e) => console.log('Image failed to load:', e.nativeEvent.error)}
        />
        <View style={styles.content}>
          <Text style={styles.category}>{item.category.toUpperCase()}</Text>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          
          <InfoSection title="Ingredients">
            <View style={styles.tagContainer}>
              {item.ingredients.map((ingredient, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{ingredient}</Text>
                </View>
              ))}
            </View>
          </InfoSection>

          <InfoSection title="Allergens">
            <View style={styles.tagContainer}>
              {item.allergens.map((allergen, index) => (
                <View key={index} style={[styles.tag, styles.allergenTag]}>
                  <Text style={[styles.tagText, styles.allergenText]}>{allergen}</Text>
                </View>
              ))}
            </View>
          </InfoSection>

          <InfoSection title="Nutritional Information">
            <View style={styles.nutritionGrid}>
              {Object.entries(item.nutritionalInfo).map(([key, value]) => (
                <View key={key} style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>{value}</Text>
                  <Text style={styles.nutritionLabel}>{key}</Text>
                </View>
              ))}
            </View>
          </InfoSection>
          
          <View style={styles.spacing} />
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button
          title="Edit Item"
          onPress={() => navigation.navigate('EditMenuItem', { itemId })}
          buttonStyle={styles.editButton}
          icon={
            <Icon
              name="edit"
              type="material"
              size={20}
              color="#FFF"
              style={{ marginRight: 8 }}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollView: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 24,
    paddingBottom: 32,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#636E72',
    marginBottom: 16,
    lineHeight: 24,
  },
  price: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ff4500',
    marginBottom: 24,
  },
  category: {
    fontSize: 14,
    color: '#ff4500',
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: 1,
  },
  section: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 16,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  tag: {
    backgroundColor: '#F5F6FA',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    margin: 6,
  },
  tagText: {
    color: '#636E72',
    fontSize: 14,
    fontWeight: '500',
  },
  allergenTag: {
    backgroundColor: '#FFE9E9',
  },
  allergenText: {
    color: '#FF6B6B',
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -12,
  },
  nutritionItem: {
    width: '50%',
    padding: 12,
  },
  nutritionValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 6,
  },
  nutritionLabel: {
    fontSize: 14,
    color: '#636E72',
    textTransform: 'capitalize',
  },
  footer: {
    padding: 24,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#F5F6FA',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  editButton: {
    backgroundColor: '#ff4500',
    borderRadius: 12,
    paddingVertical: 14,
  },
  spacing: {
    height: 24,
  },
});

export default MenuItemDetailsScreen;