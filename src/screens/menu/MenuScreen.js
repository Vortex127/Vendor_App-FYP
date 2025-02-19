import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Text, SearchBar, Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const MENU_FILTERS = [
  { id: 'all', label: 'All Items' },
  { id: 'appetizers', label: 'Appetizers' },
  { id: 'main', label: 'Main Course' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'drinks', label: 'Drinks' },
];

const MenuScreen = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [menuItemsState, setMenuItemsState] = useState([
    {
      id: '1',
      name: 'Grilled Salmon',
      category: 'main',
      price: 24.99,
      description: 'Fresh salmon fillet with herbs and lemon',
      image: 'https://picsum.photos/200',
      status: 'active',
    },
    {
      id: '2',
      name: 'Chocolate Cake',
      category: 'desserts',
      price: 8.99,
      description: 'Rich chocolate cake with ganache',
      image: 'https://picsum.photos/201',
      status: 'active',
    },
  ]);
  const [isExpanded, setIsExpanded] = useState(false);
  const buttonWidth = useSharedValue(56);
  const textOpacity = useSharedValue(0);

  const retractFAB = () => {
    setIsExpanded(false);
    buttonWidth.value = withSpring(56, {
      damping: 15,
      stiffness: 300,
      mass: 0.5,
      velocity: 20
    });
    textOpacity.value = withTiming(0, { duration: 50 });
  };

  const handleFABPress = () => {
    if (isExpanded) {
      navigation.navigate('AddMenuItem');
      retractFAB();
    } else {
      setIsExpanded(true);
      buttonWidth.value = withSpring(160, {
        damping: 15,
        stiffness: 300,
        mass: 0.5,
        velocity: 20
      });
      textOpacity.value = withTiming(1, { duration: 100 });
    }
  };

  const handleScreenPress = () => {
    if (isExpanded) {
      retractFAB();
    }
  };

  const animatedStyles = useAnimatedStyle(() => ({
    width: buttonWidth.value,
  }));

  const textStyles = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    display: textOpacity.value === 0 ? 'none' : 'flex',
  }));

  const handleViewMenuItem = (itemId) => {
    navigation.navigate('MenuItemDetails', { itemId });
  };

  const handleEditMenuItem = (itemId) => {
    navigation.navigate('EditMenuItem', { itemId });
  };

  const toggleItemVisibility = (itemId) => {
    setMenuItemsState(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, status: item.status === 'active' ? 'inactive' : 'active' }
          : item
      )
    );
  };

  const filteredMenuItems = menuItemsState.filter(item => {
    const matchesFilter = selectedFilter === 'all' || item.category === selectedFilter;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const MenuItem = ({ item }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => handleViewMenuItem(item.id)}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.menuItemImage}
        onError={(e) => {
          console.log('Image failed to load:', e.nativeEvent.error);
        }}
      />
      <View style={styles.menuItemContent}>
        <View style={styles.menuItemInfo}>
          <Text style={styles.menuItemName}>{item.name}</Text>
          <Text style={styles.menuItemDescription} numberOfLines={2}>
            {item.description}
          </Text>
          <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
        </View>
        <View style={styles.menuItemActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleEditMenuItem(item.id)}
          >
            <Icon name="edit" type="material" size={20} color="#ff4500" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => toggleItemVisibility(item.id)}
          >
            <Icon 
              name={item.status === 'active' ? 'visibility' : 'visibility-off'} 
              type="material" 
              size={20} 
              color="#ff4500" 
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity 
        activeOpacity={1} 
        style={styles.screenPressable}
        onPress={handleScreenPress}
      >
        <View style={styles.header}>
          <LinearGradient
            colors={['#ff4500', '#cc3700']}
            style={styles.headerGradient}
          >
            <Text style={styles.title}>Menu</Text>
            <SearchBar
              placeholder="Search menu items..."
              onChangeText={setSearchQuery}
              value={searchQuery}
              containerStyle={styles.searchContainer}
              inputContainerStyle={styles.searchInputContainer}
              inputStyle={styles.searchInput}
              lightTheme
              round
            />
          </LinearGradient>
        </View>

        <View style={styles.filterContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterList}
          >
            {MENU_FILTERS.map((filter) => (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.filterButton,
                  selectedFilter === filter.id && styles.filterButtonActive,
                ]}
                onPress={() => setSelectedFilter(filter.id)}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    selectedFilter === filter.id && styles.filterButtonTextActive,
                  ]}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <FlatList
          data={filteredMenuItems}
          renderItem={({ item }) => <MenuItem item={item} />}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.menuList}
          showsVerticalScrollIndicator={false}
        />
      </TouchableOpacity>

      <Animated.View style={[styles.fab, animatedStyles]}>
        <TouchableOpacity
          onPress={handleFABPress}
          activeOpacity={0.8}
          style={styles.fabTouchable}
        >
          <LinearGradient
            colors={['#ff4500', '#cc3700']}
            style={styles.fabGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <View style={styles.fabContent}>
              <Icon
                name="add"
                type="material"
                color="#FFF"
                size={24}
              />
              <Animated.Text style={[styles.fabText, textStyles]}>
                Add Menu Item
              </Animated.Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    marginBottom: 20,
  },
  headerGradient: {
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 15,
  },
  searchContainer: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    paddingHorizontal: 0,
  },
  searchInputContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
  },
  menuList: {
    padding: 16,
    paddingBottom: 80, // Add padding to avoid FAB overlap
  },
  menuItem: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItemContent: {
    padding: 15,
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#636E72',
    marginBottom: 8,
    lineHeight: 20,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff4500',
  },
  menuItemActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
    backgroundColor: '#ffe0cc',
    borderRadius: 8,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    height: 56,
    minWidth: 56,
    borderRadius: 28,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: '#ff4500',
    zIndex: 1000,
  },
  fabTouchable: {
    flex: 1,
    width: '100%',
  },
  fabGradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  fabContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  fabText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  filterContainer: {
    backgroundColor: '#FFF',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F6FA',
  },
  filterList: {
    paddingHorizontal: 15,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F6FA',
    marginRight: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#ff4500',
  },
  filterButtonText: {
    color: '#636E72',
    fontSize: 14,
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#FFF',
  },
  menuItemImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  screenPressable: {
    flex: 1,
  },
});

export default MenuScreen; 