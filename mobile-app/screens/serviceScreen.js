import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import ServiceCard from '../Cards/ServiceCard';
import { CategoryPills } from '../Components/CategoryPills';
import { getAllServices } from '../api/customerApi';

const ServicesScreen = ({ navigation }) => {
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchServices();
    }, [])
  );

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await getAllServices();
      const data = response?.data?.data || response?.data || [];
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'All', icon: 'apps-outline', type: 'ion' },
    { id: 'plumber', name: 'Plumber', icon: 'pipe-leak', type: 'mc' },
    { id: 'electrician', name: 'Electrician', icon: 'flash-outline', type: 'ion' },
    { id: 'technician', name: 'Technician', icon: 'tools', type: 'mc' },
  ];

  // Dynamic Filtering based on Category Pills & Search Bar Text
  const filteredServices = useMemo(() => {
    return services.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        item?.categoryId?.name?.toLowerCase() === selectedCategory.toLowerCase() ||
        item?.category?.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSearch =
        item?.serviceName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item?.description?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [services, selectedCategory, searchQuery]);

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      {/* Top Header Section (Centered Title) */}
      <View className="px-5 pt-3 pb-2 flex-row justify-center items-center border-b border-slate-100 bg-white shadow-xs">
        <Text className="text-slate-900 text-lg font-black tracking-wide text-center">
          Popular Services
        </Text>
      </View>

      {/* Clean Full-Width Search Bar */}
      <View className="px-5 pt-4 pb-2">
        <View className="bg-white flex-row items-center px-4 h-12 rounded-2xl border border-slate-200/80 shadow-xs">
          <Ionicons name="search-outline" size={18} color="#94a3b8" />
          <TextInput
            placeholder="Search electrician, plumber, AC repair..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="ml-3 flex-1 text-slate-800 font-medium text-sm h-full"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} className="p-1">
              <Ionicons name="close-circle" size={18} color="#94a3b8" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Horizontal Pills */}
      <View className="my-1">
        <CategoryPills
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={(catName) => setSelectedCategory(catName)}
        />
      </View>

      {/* Services Content List */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#1a5ea1" />
          <Text className="text-slate-400 font-medium text-xs mt-3">
            Loading available services...
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredServices}
          renderItem={({ item }) => (
            <View className="px-5">
              <ServiceCard
                item={item}
                onPress={() =>
                  navigation.navigate('ViewDetail', { serviceId: item._id })
                }
              />
            </View>
          )}
          keyExtractor={(item) => item._id || item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 110, paddingTop: 6 }}
          ListEmptyComponent={() => (
            <View className="flex-1 justify-center items-center pt-16 px-6">
              <View className="w-16 h-16 bg-slate-100 rounded-full items-center justify-center mb-3">
                <Ionicons name="search-outline" size={32} color="#94a3b8" />
              </View>
              <Text className="text-slate-800 font-bold text-base text-center">
                No Services Found
              </Text>
              <Text className="text-slate-400 text-xs font-medium text-center mt-1">
                Try searching with another keyword or change the category filter.
              </Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default ServicesScreen;