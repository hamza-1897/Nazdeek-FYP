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
import CustomDropdown from '../Components/CustomDropdown';
import { getAllServices, getCities, getAvailableFilters } from '../api/customerApi';

const ServicesScreen = ({ navigation }) => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([{ id: 'all', name: 'All' }]);
  const [cities, setCities] = useState([{ id: 'all', name: 'All' }]);
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
     const hasLoadedOnce = React.useRef(false);

  useFocusEffect(
    useCallback(() => {
      loadInitialData();
    }, [])
  );

  const loadInitialData = async () => {
       if (!hasLoadedOnce.current) setLoading(true);
    try {
      const servicesRes = await getAllServices();
      const list = servicesRes?.data?.data || servicesRes?.data || servicesRes || [];
      setServices(Array.isArray(list) ? list : []);

      const filtersRes = await getAvailableFilters();
      const catData = filtersRes?.data?.categories || filtersRes?.categories || [];
      if (Array.isArray(catData)) {
        setCategories([
          { id: 'all', name: 'All' },
          ...catData.map((c) => ({ id: c._id || c.id, name: c.name || '' })),
        ]);
      }

      const citiesRes = await getCities();
      const cityList = citiesRes?.cities || citiesRes?.data?.cities || citiesRes?.data || [];
      if (Array.isArray(cityList)) {
        setCities([
          { id: 'all', name: 'All' },
          ...cityList.map((c) => ({
            id: c._id || c.id,
            name: typeof c === 'string' ? c : c.name || '',
          })),
        ]);
      }
    } catch (error) {
      console.error('Error loading screen data:', error);
    } finally {
      setLoading(false);
         hasLoadedOnce.current = true;
    }
  };

  const filteredServices = useMemo(() => {
    return services.filter((item) => {
      const categoryName =
        (typeof item?.categoryId === 'object'
          ? item?.categoryId?.name
          : item?.categoryName) || '';

      const cityName =
        (typeof item?.providerId?.city === 'object'
          ? item?.providerId?.city?.name
          : item?.providerId?.city) || '';

      const catStr = String(categoryName).toLowerCase();
      const cityStr = String(cityName).toLowerCase();
      const query = searchQuery.toLowerCase().trim();

      const matchesCategory =
        selectedCategory === 'All' || catStr === selectedCategory.toLowerCase();

      const matchesCity =
        selectedCity === 'All' || cityStr === selectedCity.toLowerCase();

      const matchesSearch =
        !query ||
        String(item?.serviceName || '').toLowerCase().includes(query) ||
        catStr.includes(query);

      return matchesCategory && matchesCity && matchesSearch;
    });
  }, [services, selectedCategory, selectedCity, searchQuery]);

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      <View className="px-5 pt-3 pb-2 flex-row justify-center items-center border-b border-slate-100 bg-white shadow-xs">
        <Text className="text-slate-900 text-lg font-black tracking-wide text-center">
          Popular Services
        </Text>
      </View>

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

      <View className="px-4 flex-row justify-between my-2">
        <CustomDropdown
          label="Categories"
          selectedValue={selectedCategory}
          items={categories}
          onSelect={(catName) => setSelectedCategory(catName)}
          iconName="apps-outline"
        />

        <CustomDropdown
          label="Cities"
          selectedValue={selectedCity}
          items={cities}
          onSelect={(cityName) => setSelectedCity(cityName)}
          iconName="location-outline"
        />
      </View>

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
          keyExtractor={(item, index) => item._id || index.toString()}
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
                Try searching with another keyword, or change the category/city filter.
              </Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default ServicesScreen;