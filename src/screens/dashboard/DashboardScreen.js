import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Text, Card, Icon, Rating } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';

const { width } = Dimensions.get('window');

// Mock data for featured vendors (unchanged)
const featuredVendors = [
  {
    id: '1',
    name: 'Event Solutions Pro',
    category: 'Event Equipment',
    rating: 4.5,
    reviews: 128,
    image: 'https://picsum.photos/200',
    location: 'New York, NY',
    coordinates: {
      latitude: 40.7128,
      longitude: -74.0060,
    },
    services: [
      {
        id: '1',
        name: 'Basic Package',
        description: 'Essential equipment for small events',
        price: 299,
        duration: '4 hours',
      },
      {
        id: '2',
        name: 'Premium Package',
        description: 'Complete setup for medium events',
        price: 599,
        duration: '6 hours',
      },
      {
        id: '3',
        name: 'Professional Package',
        description: 'Full-service solution for large events',
        price: 999,
        duration: '8 hours',
      },
    ],
  },
  {
    id: '2',
    name: 'Sound & Lighting Experts',
    category: 'Audio/Visual',
    rating: 4.8,
    reviews: 89,
    image: 'https://picsum.photos/201',
    location: 'Brooklyn, NY',
    coordinates: {
      latitude: 40.7282,
      longitude: -73.7949,
    },
    services: [
      {
        id: '1',
        name: 'Basic Audio Setup',
        description: 'Sound system for small venues',
        price: 399,
        duration: '4 hours',
      },
      {
        id: '2',
        name: 'Premium AV Package',
        description: 'Complete audio and lighting solution',
        price: 799,
        duration: '6 hours',
      },
    ],
  },
];

const FeaturedVendorCard = ({ vendor, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Card containerStyle={styles.featuredCard}>
      <Image source={{ uri: vendor.image }} style={styles.featuredImage} />
      <View style={styles.featuredContent}>
        <Text style={styles.featuredName}>{vendor.name}</Text>
        <Text style={styles.featuredCategory}>{vendor.category}</Text>
        <View style={styles.ratingContainer}>
          <Rating
            readonly
            startingValue={vendor.rating}
            imageSize={16}
            style={styles.rating}
          />
          <Text style={styles.reviews}>({vendor.reviews} reviews)</Text>
        </View>
        <View style={styles.locationContainer}>
          <Icon name="location-on" type="material" size={16} color="#636E72" />
          <Text style={styles.location}>{vendor.location}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>
            Starting at ${Math.min(...vendor.services.map(service => service.price))}
          </Text>
        </View>
      </View>
    </Card>
  </TouchableOpacity>
);

const DashboardScreen = ({ navigation }) => {
  const initialRegion = {
    latitude: 40.7128,
    longitude: -74.0060,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const handleVendorPress = (vendor) => {
    navigation.navigate('VendorDetails', { vendor });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text h4 style={styles.title}>Find Vendors Near You</Text>
        </View>

        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={initialRegion}
          >
            {featuredVendors.map((vendor) => (
              <Marker
                key={vendor.id}
                coordinate={vendor.coordinates}
                title={vendor.name}
                description={vendor.category}
                onPress={() => handleVendorPress(vendor)}
              >
                <View style={styles.markerContainer}>
                  <Icon
                    name="store"
                    type="material"
                    size={24}
                    color="#FF6B6B"
                  />
                </View>
              </Marker>
            ))}
          </MapView>
        </View>

        <View style={styles.featuredSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Vendors</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Vendors')}
              style={styles.seeAllButton}
            >
              <Text style={styles.seeAllText}>See All</Text>
              <Icon
                name="chevron-right"
                type="material"
                size={20}
                color="#FF6B6B"
              />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredList}
          >
            {featuredVendors.map((vendor) => (
              <FeaturedVendorCard
                key={vendor.id}
                vendor={vendor}
                onPress={() => handleVendorPress(vendor)}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#F5F6FA',
  },
  title: {
    color: '#2D3436',
    fontSize: 24,
    fontWeight: 'bold',
  },
  mapContainer: {
    height: 300,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 20,
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FF6B6B',
  },
  featuredSection: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3436',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    color: '#FF6B6B',
    fontSize: 16,
    marginRight: 5,
  },
  featuredList: {
    paddingRight: 20,
  },
  featuredCard: {
    width: width * 0.7,
    padding: 0,
    marginRight: 15,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featuredImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  featuredContent: {
    padding: 15,
  },
  featuredName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 5,
  },
  featuredCategory: {
    fontSize: 14,
    color: '#636E72',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    marginRight: 5,
  },
  reviews: {
    fontSize: 12,
    color: '#636E72',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  location: {
    fontSize: 14,
    color: '#636E72',
    marginLeft: 5,
  },
  priceContainer: {
    marginTop: 5,
  },
  priceText: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
});

export default DashboardScreen;