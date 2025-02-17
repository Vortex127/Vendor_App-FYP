import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";

const VendorDashboard = () => {
  const { width, height } = useWindowDimensions();
  const isSmallDevice = width < 375;

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(255, 87, 34, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 87, 34, ${opacity})`,
    labelColor: () => "#666666",
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: "#FF5722",
    },
    propsForBackgroundLines: {
      strokeDasharray: "",
      strokeWidth: 0.5,
      stroke: "rgba(0, 0, 0, 0.1)",
    },
    formatYLabel: (value) => `$${value}k`,
  };

  const chartWidth = width - (isSmallDevice ? 40 : 60);
  const chartHeight = height * 0.3; // 30% of screen height

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.dateText}>Mon, Feb 17, 2024</Text>
        </View>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: "https://v0.dev/placeholder.svg" }}
            style={styles.avatar}
          />
          <View style={styles.onlineIndicator} />
        </View>
      </View>

      {/* Revenue Chart */}
      <View style={styles.chartContainer}>
        <View style={styles.chartHeader}>
          <View>
            <Text style={styles.chartTitle}>Total Revenue</Text>
            <Text style={styles.revenueAmount}>$12,798</Text>
            <Text style={styles.revenueIncrease}>+23% from last month</Text>
          </View>
          <View style={styles.periodSelector}>
            <Text style={styles.periodActive}>Monthly</Text>
            <Text style={styles.period}>Yearly</Text>
          </View>
        </View>

        <LineChart
          data={data}
          width={chartWidth}
          height={chartHeight}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
          withVerticalLines={false}
          withHorizontalLines={true}
          withVerticalLabels={true}
          withHorizontalLabels={true}
          fromZero
          segments={5}
          yAxisLabel="$"
          yAxisSuffix="k"
          horizontalLabelRotation={isSmallDevice ? -45 : 0}
        />
      </View>

      {/* Booking Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <View style={[styles.iconCircle, styles.upcomingCircle]}>
            <Ionicons name="calendar" size={24} color="#FF5722" />
          </View>
          <Text style={styles.summaryNumber}>24</Text>
          <Text style={styles.summaryLabel}>Upcoming</Text>
        </View>
        <View style={styles.summaryCard}>
          <View style={[styles.iconCircle, styles.completedCircle]}>
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
          </View>
          <Text style={styles.summaryNumber}>156</Text>
          <Text style={styles.summaryLabel}>Completed</Text>
        </View>
        <View style={styles.summaryCard}>
          <View style={[styles.iconCircle, styles.cancelledCircle]}>
            <Ionicons name="close-circle" size={24} color="#F44336" />
          </View>
          <Text style={styles.summaryNumber}>3</Text>
          <Text style={styles.summaryLabel}>Cancelled</Text>
        </View>
      </View>

      {/* Recent Bookings */}
      <View style={styles.recentContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Bookings</Text>
          <Text style={styles.seeAll}>See All</Text>
        </View>
        <View style={styles.bookingItemContainer}>
          <BookingItem
            customerName="John Doe"
            service="Full Service"
            amount="120.00"
            status="completed"
            time="2:30 PM"
          />
        </View>
        <View style={styles.bookingItemContainer}>
          <BookingItem
            customerName="Sarah Smith"
            service="Express Wash"
            amount="45.00"
            status="upcoming"
            time="4:00 PM"
          />
        </View>
        <View style={styles.bookingItemContainer}>
          <BookingItem
            customerName="Mike Johnson"
            service="Interior Clean"
            amount="75.00"
            status="cancelled"
            time="5:30 PM"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const BookingItem = ({ customerName, service, amount, status, time }) => (
  <View style={styles.bookingItem}>
    <View style={styles.bookingLeft}>
      <View style={styles.customerIcon}>
        <Text style={styles.customerInitial}>{customerName[0]}</Text>
      </View>
      <View style={styles.bookingInfo}>
        <Text style={styles.customerName}>{customerName}</Text>
        <Text style={styles.serviceText}>{service}</Text>
      </View>
    </View>
    <View style={styles.bookingRight}>
      <Text style={styles.amountText}>${amount}</Text>
      <Text style={styles.timeText}>{time}</Text>
      <View style={[styles.statusBadge, styles[`${status}Badge`]]}>
        <Text style={[styles.statusText, styles[`${status}Text`]]}>
          {status}
        </Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  welcomeText: {
    color: "#333333",
    fontSize: 24,
    fontWeight: "bold",
  },
  dateText: {
    color: "#666666",
    fontSize: 14,
    marginTop: 4,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#FF5722",
  },
  onlineIndicator: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#4CAF50",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  chartContainer: {
    backgroundColor: "#ffffff",
    margin: 20,
    padding: 15,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  chartTitle: {
    color: "#666666",
    fontSize: 16,
  },
  revenueAmount: {
    color: "#333333",
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 4,
  },
  revenueIncrease: {
    color: "#4CAF50",
    fontSize: 14,
  },
  periodSelector: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    padding: 4,
  },
  period: {
    color: "#666666",
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  periodActive: {
    color: "#ffffff",
    fontSize: 14,
    backgroundColor: "#FF5722",
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    marginHorizontal: -15,
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    flexWrap: "wrap",
  },
  summaryCard: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 20,
    width: "30%",
    minWidth: 100,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 10,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  upcomingCircle: {
    backgroundColor: "#FFF3E0",
  },
  completedCircle: {
    backgroundColor: "#E8F5E9",
  },
  cancelledCircle: {
    backgroundColor: "#FFEBEE",
  },
  summaryNumber: {
    color: "#333333",
    fontSize: 24,
    fontWeight: "bold",
  },
  summaryLabel: {
    color: "#666666",
    fontSize: 12,
    marginTop: 5,
  },
  recentContainer: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    color: "#333333",
    fontSize: 18,
    fontWeight: "bold",
  },
  seeAll: {
    color: "#FF5722",
    fontSize: 14,
  },
  bookingItem: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  customerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FF5722",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  customerInitial: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  bookingInfo: {
    flex: 1,
  },
  customerName: {
    color: "#333333",
    fontSize: 16,
    fontWeight: "500",
  },
  serviceText: {
    color: "#666666",
    fontSize: 14,
    marginTop: 4,
  },
  bookingRight: {
    alignItems: "flex-end",
  },
  amountText: {
    color: "#333333",
    fontSize: 16,
    fontWeight: "600",
  },
  timeText: {
    color: "#666666",
    fontSize: 12,
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
  },
  completedBadge: {
    backgroundColor: "#E8F5E9",
  },
  upcomingBadge: {
    backgroundColor: "#FFF3E0",
  },
  cancelledBadge: {
    backgroundColor: "#FFEBEE",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  completedText: {
    color: "#4CAF50",
  },
  upcomingText: {
    color: "#FF5722",
  },
  cancelledText: {
    color: "#F44336",
  },
  bookingItemContainer: {
    marginBottom: 10,
  },
});

export default VendorDashboard;
