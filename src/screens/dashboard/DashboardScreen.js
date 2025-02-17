import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  RefreshControl,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const DashboardScreen = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const isSmallDevice = width < 375;

  const weeklyData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [2100, 2400, 1800, 3200, 2900, 3800, 3100],
        color: (opacity = 1) => `rgba(255, 107, 107, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const monthlyData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [15000, 18000, 21000, 19000, 24000, 28000],
        color: (opacity = 1) => `rgba(255, 107, 107, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const chartData = selectedPeriod === 'weekly' ? weeklyData : monthlyData;

  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 107, 107, ${opacity})`,
    labelColor: () => "#636E72",
    style: { borderRadius: 16 },
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: "#FF6B6B",
    },
    propsForBackgroundLines: {
      strokeDasharray: "",
      strokeWidth: 0.5,
      stroke: "rgba(0, 0, 0, 0.05)",
    },
    formatYLabel: (value) => `$${value}`,
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  const handleAddBalance = () => {
    navigation.navigate('AddBalance');
  };

  const handleSendMoney = () => {
    navigation.navigate('SendMoney');
  };

  const handleReceiveMoney = () => {
    navigation.navigate('ReceiveMoney');
  };

  const handleStatCardPress = (type) => {
    switch (type) {
      case 'revenue':
        navigation.navigate('RevenueDetails');
        break;
      case 'bookings':
        navigation.navigate('BookingsList');
        break;
      case 'customers':
        navigation.navigate('CustomersList');
        break;
      case 'ratings':
        navigation.navigate('RatingsReviews');
        break;
    }
  };

  const StatCard = ({ icon, label, value, trend, color, type }) => (
    <TouchableOpacity 
      style={styles.statCardNew}
      onPress={() => handleStatCardPress(type)}
    >
      <LinearGradient
        colors={[color + '15', color + '05']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.statGradient}
      >
        <View style={styles.statContent}>
          <View style={[styles.iconCircle, { backgroundColor: `${color}15` }]}>
            <Ionicons name={icon} size={20} color={color} />
          </View>
          <View style={styles.statInfo}>
            <Text style={styles.statLabel}>{label}</Text>
            <Text style={[styles.statValue, { color }]}>{value}</Text>
          </View>
        </View>
        {trend && (
          <View style={[styles.trendBadge, { backgroundColor: trend > 0 ? 'rgba(46, 213, 115, 0.15)' : 'rgba(255, 71, 87, 0.15)' }]}>
            <Ionicons 
              name={trend > 0 ? "trending-up" : "trending-down"} 
              size={14} 
              color={trend > 0 ? "#2ed573" : "#ff4757"} 
            />
            <Text style={[styles.trendText, { color: trend > 0 ? "#2ed573" : "#ff4757" }]}>
              {Math.abs(trend)}%
            </Text>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Main Balance Card */}
      <View style={styles.balanceCard}>
        <LinearGradient
          colors={['#FF6B6B', '#ff8585']}
          style={styles.balanceGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.balanceHeader}>
            <View>
              <Text style={styles.balanceLabel}>Total Balance</Text>
              <Text style={styles.balanceAmount}>$28,458.00</Text>
            </View>
            <TouchableOpacity 
              style={styles.avatarContainer}
              onPress={() => navigation.navigate('Profile')}
            >
              <Image
                source={{ uri: "https://ui-avatars.com/api/?name=J&background=FF6B6B&color=fff" }}
                style={styles.avatar}
              />
            </TouchableOpacity>
          </View>
          
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleAddBalance}
            >
              <Ionicons name="add-circle-outline" size={24} color="#fff" />
              <Text style={styles.actionText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleSendMoney}
            >
              <Ionicons name="arrow-up-circle-outline" size={24} color="#fff" />
              <Text style={styles.actionText}>Send</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleReceiveMoney}
            >
              <Ionicons name="arrow-down-circle-outline" size={24} color="#fff" />
              <Text style={styles.actionText}>Receive</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Overview</Text>
        <View style={styles.statsGrid}>
          <StatCard
            icon="wallet-outline"
            label="Today's Revenue"
            value="$1,458"
            trend={12.5}
            color="#FF6B6B"
            type="revenue"
          />
          <StatCard
            icon="calendar-outline"
            label="New Bookings"
            value="8"
            trend={-5.2}
            color="#4834d4"
            type="bookings"
          />
          <StatCard
            icon="people-outline"
            label="Total Customers"
            value="248"
            trend={8.1}
            color="#20bf6b"
            type="customers"
          />
          <StatCard
            icon="star-outline"
            label="Avg Rating"
            value="4.8"
            trend={2.3}
            color="#f39c12"
            type="ratings"
          />
        </View>
      </View>

      {/* Chart Section - Updated */}
      <View style={styles.chartContainer}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Revenue Overview</Text>
          <View style={styles.periodSelector}>
            <TouchableOpacity
              onPress={() => setSelectedPeriod('weekly')}
              style={[styles.periodButton, selectedPeriod === 'weekly' && styles.periodButtonActive]}
            >
              <Text style={[styles.periodButtonText, selectedPeriod === 'weekly' && styles.periodButtonTextActive]}>
                Week
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedPeriod('monthly')}
              style={[styles.periodButton, selectedPeriod === 'monthly' && styles.periodButtonActive]}
            >
              <Text style={[styles.periodButtonText, selectedPeriod === 'monthly' && styles.periodButtonTextActive]}>
                Month
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <LineChart
          data={chartData}
          width={width - 48}
          height={180}
          chartConfig={{
            ...chartConfig,
            propsForBackgroundLines: {
              strokeDasharray: "",
              strokeWidth: 0.5,
              stroke: "rgba(0, 0, 0, 0.05)",
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>

      {/* Recent Activity */}
      <View style={styles.activityContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity 
            onPress={() => navigation.navigate('AllActivities')}
            style={styles.seeAllButton}
          >
            <Text style={styles.seeAllText}>View All</Text>
            <Ionicons name="chevron-forward" size={16} color="#FF6B6B" />
          </TouchableOpacity>
        </View>

        <ActivityItem
          type="booking"
          title="New Booking Request"
          description="Wedding Reception - Sarah Johnson"
          time="2 hours ago"
          amount="$2,500"
          onPress={() => navigation.navigate('BookingDetails', { 
            bookingId: '1',
            title: 'Wedding Reception - Sarah Johnson'
          })}
        />
        <ActivityItem
          type="payment"
          title="Payment Received"
          description="Corporate Event - Tech Corp"
          time="5 hours ago"
          amount="$1,800"
          onPress={() => navigation.navigate('PaymentDetails', {
            paymentId: '1',
            title: 'Corporate Event - Tech Corp'
          })}
        />
        <ActivityItem
          type="review"
          title="New Review"
          description="Birthday Party - John Smith"
          time="Yesterday"
          rating={4.5}
          onPress={() => navigation.navigate('ReviewDetails', {
            reviewId: '1',
            title: 'Birthday Party - John Smith'
          })}
        />
      </View>
    </ScrollView>
  );
};

const ActivityItem = ({ type, title, description, time, amount, rating, onPress }) => (
  <TouchableOpacity 
    style={styles.activityItem}
    onPress={onPress}
  >
    <View style={styles.activityLeft}>
      <View style={[styles.activityIcon, styles[`${type}Icon`]]}>
        <Ionicons
          name={
            type === 'booking' ? 'calendar' :
            type === 'payment' ? 'wallet' : 'star'
          }
          size={20}
          color="#fff"
        />
      </View>
      <View style={styles.activityInfo}>
        <Text style={styles.activityTitle}>{title}</Text>
        <Text style={styles.activityDescription}>{description}</Text>
        <Text style={styles.activityTime}>{time}</Text>
      </View>
    </View>
    {amount && <Text style={styles.activityAmount}>{amount}</Text>}
    {rating && (
      <View style={styles.ratingContainer}>
        <Ionicons name="star" size={16} color="#FFB800" />
        <Text style={styles.ratingText}>{rating}</Text>
      </View>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  contentContainer: {
    paddingBottom: 24,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: '#FFF',
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#2D3436",
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    color: "#636E72",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 16,
    gap: 6,
  },
  statCard: {
    width: '47%',
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  statInfo: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: "#636E72",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2D3436",
  },
  trendBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trendText: {
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  },
  chartContainer: {
    margin: 24,
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2D3436",
  },
  periodSelector: {
    flexDirection: "row",
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 4,
  },
  periodButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 10,
  },
  periodButtonActive: {
    backgroundColor: "#FF6B6B",
  },
  periodButtonText: {
    fontSize: 13,
    color: "#636E72",
  },
  periodButtonTextActive: {
    color: "#FFF",
    fontWeight: "500",
  },
  chart: {
    marginTop: 8,
    borderRadius: 16,
  },
  activityContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D3436",
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  seeAllText: {
    color: "#FF6B6B",
    fontSize: 14,
    marginRight: 4,
  },
  activityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  bookingIcon: {
    backgroundColor: "#4834d4",
  },
  paymentIcon: {
    backgroundColor: "#20bf6b",
  },
  reviewIcon: {
    backgroundColor: "#FFB800",
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2D3436",
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 14,
    color: "#636E72",
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: "#95a5a6",
  },
  activityAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2D3436",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2D3436",
    marginLeft: 4,
  },
  seeAllButtonContainer: {
    padding: 8,
  },
  balanceCard: {
    margin: 16,
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: "#FF6B6B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  balanceGradient: {
    padding: 24,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  balanceLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '600',
    color: '#ffffff',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    color: '#ffffff',
    marginTop: 8,
    fontSize: 12,
  },
  statsContainer: {
    padding: 16,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 16,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  seeAllText: {
    color: "#FF6B6B",
    fontSize: 14,
    marginRight: 4,
  },
  statCardNew: {
    width: '47%',
    borderRadius: 16,
    padding: 16,
  },
  statGradient: {
    padding: 16,
    borderRadius: 16,
  },
});

export default DashboardScreen;
