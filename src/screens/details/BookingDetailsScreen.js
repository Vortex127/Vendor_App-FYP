import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Text, Button, Icon, Divider } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const BookingDetailsScreen = ({ route, navigation }) => {
  const { bookingId } = route.params;
  const [loading, setLoading] = useState(false);
  const fadeAnim = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  // Mock booking data
  const booking = {
    id: bookingId,
    customerName: "Sarah Johnson",
    eventType: "Wedding Reception",
    date: "24 Feb 2024",
    time: "6:00 PM - 11:00 PM",
    venue: "123 Wedding Hall, New York",
    status: "pending",
    services: [
      { name: "Catering Service", price: 1500 },
      { name: "Decoration", price: 800 },
      { name: "Photography", price: 200 },
    ],
    notes: "Special dietary requirements: 5 vegetarian meals needed.",
    customer: {
      phone: "+1 234-567-8900",
      email: "sarah.j@email.com",
    },
    customerId: "sarah.j@email.com",
    customerAvatar: "https://via.placeholder.com/50",
  };

  const handleAcceptBooking = async () => {
    setLoading(true);
    try {
      // TODO: Implement booking acceptance logic
      await new Promise((resolve) => setTimeout(resolve, 1500));
      navigation.goBack();
    } catch (error) {
      alert("Failed to accept booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleMessageCustomer = () => {
    navigation.navigate("Chat", {
      customerId: booking.customerId,
      customerName: booking.customerName,
      customerAvatar: booking.customerAvatar,
    });
  };

  const DetailItem = ({ icon, label, value }) => (
    <View style={styles.detailItem}>
      <View style={styles.detailIcon}>
        <Icon name={icon} type="material" size={20} color="#ff4500" />
      </View>
      <View style={styles.detailContent}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <LinearGradient
            colors={["#cc3700", "#ff4500"]}
            style={styles.headerGradient}
          >
            <View style={styles.statusContainer}>
              <View
                style={[styles.statusBadge, styles[`${booking.status}Badge`]]}
              >
                <Text
                  style={[styles.statusText, styles[`${booking.status}Text`]]}
                >
                  {booking.status.toUpperCase()}
                </Text>
              </View>
            </View>
            <Text style={styles.bookingId}>Booking #{booking.id}</Text>
            <Text style={styles.customerName}>{booking.customerName}</Text>
            <Text style={styles.eventType}>{booking.eventType}</Text>
          </LinearGradient>
        </Animated.View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Event Details</Text>
          <DetailItem icon="event" label="Date" value={booking.date} />
          <DetailItem icon="schedule" label="Time" value={booking.time} />
          <DetailItem icon="location-on" label="Venue" value={booking.venue} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Contact</Text>
          <DetailItem
            icon="phone"
            label="Phone"
            value={booking.customer.phone}
          />
          <DetailItem
            icon="email"
            label="Email"
            value={booking.customer.email}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services & Pricing</Text>
          {booking.services.map((service, index) => (
            <View key={index} style={styles.serviceItem}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.servicePrice}>${service.price}</Text>
            </View>
          ))}
          <Divider style={styles.divider} />
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalAmount}>
              $
              {booking.services.reduce(
                (sum, service) => sum + service.price,
                0
              )}
            </Text>
          </View>
        </View>

        {booking.notes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Notes</Text>
            <Text style={styles.notes}>{booking.notes}</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          <Button
            title="Message"
            icon={
              <Icon
                name="message"
                type="material"
                size={20}
                color="#ff4500"
                style={styles.buttonIcon}
              />
            }
            type="outline"
            buttonStyle={styles.messageButton}
            titleStyle={styles.messageButtonText}
            onPress={handleMessageCustomer}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={loading ? "Accepting..." : "Accept Booking"}
            onPress={handleAcceptBooking}
            loading={loading}
            disabled={loading || booking.status !== "pending"}
            icon={
              !loading && (
                <Icon
                  name="check"
                  type="material"
                  size={20}
                  color="#fff"
                  style={styles.buttonIcon}
                />
              )
            }
            type="outline"
            buttonStyle={styles.acceptButton}
            titleStyle={styles.acceptButtonText}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
  header: {
    marginBottom: 20,
  },
  headerGradient: {
    padding: 20,
    alignItems: "center",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  statusContainer: {
    marginBottom: 15,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  pendingBadge: {
    backgroundColor: "#FFF3E0",
  },
  completedBadge: {
    backgroundColor: "#E8F5E9",
  },
  cancelledBadge: {
    backgroundColor: "#FFEBEE",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  pendingText: {
    color: "#FF9800",
  },
  completedText: {
    color: "#4CAF50",
  },
  cancelledText: {
    color: "#F44336",
  },
  bookingId: {
    color: "#FFF",
    fontSize: 14,
    opacity: 0.9,
    marginBottom: 8,
  },
  customerName: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  eventType: {
    color: "#FFF",
    fontSize: 16,
    opacity: 0.9,
  },
  section: {
    padding: 20,
    backgroundColor: "#FFF",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D3436",
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  detailIcon: {
    backgroundColor: "#ffe0cc",
    padding: 10,
    borderRadius: 10,
    marginRight: 15,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: "#636E72",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: "#2D3436",
    fontWeight: "500",
  },
  serviceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  serviceName: {
    fontSize: 16,
    color: "#2D3436",
  },
  servicePrice: {
    fontSize: 16,
    color: "#2D3436",
    fontWeight: "600",
  },
  divider: {
    marginVertical: 15,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D3436",
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ff4500",
  },
  notes: {
    fontSize: 16,
    color: "#636E72",
    lineHeight: 24,
  },
  footer: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#F5F6FA",
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  messageButton: {
    backgroundColor: "#FFF",
    borderColor: "#ff4500",
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
  },
  messageButtonText: {
    color: "#ff4500",
    fontSize: 13,
  },
  acceptButtonText: {
    color: "#fff",
    fontSize: 13,
  },
  acceptButton: {
    backgroundColor: "#ff4500",
    borderRadius: 12,
    paddingVertical: 12,
  },
  buttonIcon: {
    marginRight: 8,
  },
});

export default BookingDetailsScreen;
