import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';
import { Text, SearchBar, Icon, Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const BOOKING_FILTERS = [
  { id: 'all', label: 'All Bookings' },
  { id: 'confirmed', label: 'Confirmed' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'completed', label: 'Completed' },
];

const BookingsScreen = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const fadeAnim = new Animated.Value(0);

  // Mock bookings data
  const bookings = [
    {
      id: '1',
      customerName: 'Sarah Johnson',
      eventType: 'Wedding Reception',
      date: '24 Feb 2024',
      time: '6:00 PM',
      guests: 150,
      status: 'confirmed',
      amount: '$2,500',
    },
    {
      id: '2',
      customerName: 'Mike Anderson',
      eventType: 'Corporate Event',
      date: '25 Feb 2024',
      time: '2:00 PM',
      guests: 80,
      status: 'upcoming',
      amount: '$1,800',
    },
  ];

  const BookingCard = ({ booking }) => (
    <TouchableOpacity
      style={styles.bookingCard}
      onPress={() => navigation.navigate('BookingDetails', { bookingId: booking.id })}
    >
      <View style={styles.bookingHeader}>
        <View style={styles.customerInfo}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{booking.customerName[0]}</Text>
          </View>
          <View style={styles.bookingInfo}>
            <Text style={styles.customerName}>{booking.customerName}</Text>
            <Text style={styles.eventType}>{booking.eventType}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, styles[`${booking.status}Badge`]]}>
          <Text style={[styles.statusText, styles[`${booking.status}Text`]]}>
            {booking.status.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.bookingDetails}>
        <View style={styles.detailItem}>
          <Icon name="event" type="material" size={16} color="#636E72" />
          <Text style={styles.detailText}>{booking.date}</Text>
        </View>
        <View style={styles.detailItem}>
          <Icon name="schedule" type="material" size={16} color="#636E72" />
          <Text style={styles.detailText}>{booking.time}</Text>
        </View>
        <View style={styles.detailItem}>
          <Icon name="people" type="material" size={16} color="#636E72" />
          <Text style={styles.detailText}>{booking.guests} guests</Text>
        </View>
      </View>

      <View style={styles.bookingFooter}>
        <Text style={styles.amount}>{booking.amount}</Text>
        {/* <Button
          title="View Details"
          type="clear"
          icon={
            <Icon
              name="chevron-right"
              type="material"
              size={20}
              color="#ff4500"
            />
          }
          iconRight
          titleStyle={styles.viewDetailsText}
        /> */}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <LinearGradient
          colors={['#ff4500', '#cc3700']}
          style={styles.headerGradient}
        >
          <Text style={styles.title}>Bookings</Text>
          <SearchBar
            placeholder="Search bookings..."
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
          {BOOKING_FILTERS.map((filter) => (
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
        data={bookings}
        renderItem={({ item }) => <BookingCard booking={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.bookingsList}
      />
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
  filterContainer: {
    marginBottom: 20,
  },
  filterList: {
    padding: 10,
  },
  filterButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginRight: 10,
  },
  filterButtonActive: {
    backgroundColor: '#ff4500',
  },
  filterButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
  },
  filterButtonTextActive: {
    color: '#FFF',
  },
  bookingsList: {
    padding: 20,
  },
  bookingCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ff4500',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  bookingInfo: {
    marginLeft: 10,
  },
  customerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 4,
  },
  eventType: {
    fontSize: 14,
    color: '#636E72',
  },
  statusBadge: {
    padding: 4,
    borderRadius: 8,
    backgroundColor: '#ffe0cc',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ff4500',
  },
  bookingDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#636E72',
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff4500',
  },
  viewDetailsText: {
    color: '#ff4500',
  },
});

export default BookingsScreen; 