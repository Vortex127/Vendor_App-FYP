import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Text, Card, Icon, Divider } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data for bookings (unchanged)
// Mock data for bookings
const mockBookings = [
  {
    id: '1',
    vendorName: 'Event Solutions Pro',
    date: '2024-04-15',
    time: '14:00',
    status: 'upcoming',
    package: 'Basic Package',
    price: 299,
  },
  {
    id: '2',
    vendorName: 'Sound & Lighting Experts',
    date: '2024-03-20',
    time: '10:00',
    status: 'completed',
    package: 'Premium AV Package',
    price: 799,
  },
  // Add more mock bookings as needed
];

const BookingCard = React.memo(({ booking, onPress }) => {
  const getStatusColor = useCallback((status) => {
    switch (status) {
      case 'upcoming':
        return '#2ecc71';
      case 'completed':
        return '#3498db';
      case 'cancelled':
        return '#e74c3c';
      default:
        return '#95a5a6';
    }
  }, []);

  return (
    <Card containerStyle={styles.bookingCard}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.bookingHeader}>
          <View style={styles.vendorNameContainer}>
            <Text style={styles.vendorName} numberOfLines={1} ellipsizeMode="tail">
              {booking.vendorName}
            </Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) }]}>
            <Text style={styles.statusText}>{booking.status.toUpperCase()}</Text>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.bookingDetails}>
          <DetailRow icon="event" text={booking.date} />
          <DetailRow icon="schedule" text={booking.time} />
          <DetailRow icon="local-offer" text={booking.package} />
          <DetailRow icon="attach-money" text={`$${booking.price}`} />
        </View>
      </TouchableOpacity>
    </Card>
  );
});

const DetailRow = React.memo(({ icon, text }) => (
  <View style={styles.detailRow}>
    <Icon name={icon} type="material" size={16} color="#636E72" />
    <Text style={styles.detailText} numberOfLines={1} ellipsizeMode="tail">{text}</Text>
  </View>
));

const FilterButton = React.memo(({ filter, isActive, onPress }) => (
  <TouchableOpacity
    style={[styles.filterButton, isActive && styles.filterButtonActive]}
    onPress={onPress}
  >
    <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
      {filter.charAt(0).toUpperCase() + filter.slice(1)}
    </Text>
  </TouchableOpacity>
));

const BookingsScreen = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const filters = ['all', 'upcoming', 'completed', 'cancelled'];

  const filteredBookings = mockBookings.filter(booking => 
    selectedFilter === 'all' ? true : booking.status === selectedFilter
  );

  const handleBookingPress = useCallback((booking) => {
    // Navigate to booking details screen
    // navigation.navigate('BookingDetails', { booking });
  }, [navigation]);

  const renderBookingCard = useCallback(({ item }) => (
    <BookingCard booking={item} onPress={() => handleBookingPress(item)} />
  ), [handleBookingPress]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text h4 style={styles.title}>My Bookings</Text>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters.map((filter) => (
            <FilterButton
              key={filter}
              filter={filter}
              isActive={selectedFilter === filter}
              onPress={() => setSelectedFilter(filter)}
            />
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredBookings}
        keyExtractor={(item) => item.id}
        renderItem={renderBookingCard}
        contentContainerStyle={styles.bookingsList}
        showsVerticalScrollIndicator={false}
      />
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
  filterContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F6FA',
    marginHorizontal: 5,
  },
  filterButtonActive: {
    backgroundColor: '#FF6B6B',
  },
  filterText: {
    color: '#636E72',
    fontSize: 14,
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  bookingsList: {
    padding: 20,
  },
  bookingCard: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  vendorNameContainer: {
    flex: 1,
    marginRight: 10,
  },
  vendorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3436',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 10,
  },
  bookingDetails: {
    marginTop: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#636E72',
  },
});

export default BookingsScreen;