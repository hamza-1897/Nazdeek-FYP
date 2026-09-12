import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Modal,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import ServiceCard from '../Cards/ServiceCard';
import { getAllServices, getAvailableFilters } from '../api/customerApi';

const CustomDropdown = ({ label, selectedValue, items, onSelect, iconName }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="flex-1 mx-1">
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
        className="bg-white flex-row items-center justify-between px-3 h-11 rounded-xl border border-slate-200/80 shadow-xs"
      >
        <View className="flex-row items-center flex-1 mr-1">
          <Ionicons name={iconName} size={16} color="#64748b" />
          <Text className="ml-2 text-slate-700 font-medium text-xs" numberOfLines={1}>
            {selectedValue === 'All' ? `All ${label}` : selectedValue}
          </Text>
        </View>
        <Ionicons name="chevron-down" size={16} color="#94a3b8" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.4)' }}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
          className="justify-center items-center px-6"
        >
          <View className="bg-white w-full max-h-80 rounded-2xl p-4 shadow-xl border border-slate-100">
            <View className="flex-row justify-between items-center pb-3 border-b border-slate-100 mb-2">
              <Text className="text-slate-800 font-bold text-base">Select {label}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close-circle" size={22} color="#94a3b8" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {items.map((item) => {
                const isSelected = selectedValue === item.name;
                return (
                  <TouchableOpacity
                    key={item.id || item._id}
                    onPress={() => {
                      onSelect(item.name);
                      setModalVisible(false);
                    }}
                    className={`flex-row items-center justify-between py-3 px-3 rounded-xl mb-1 ${
                      isSelected ? 'bg-blue-50' : 'active:bg-slate-50'
                    }`}
                  >
                    <Text
                      className={`text-sm ${
                        isSelected ? 'font-bold text-blue-600' : 'font-medium text-slate-700'
                      }`}
                    >
                      {item.name === 'All' ? `All ${label}` : item.name}
                    </Text>
                    {isSelected && <Ionicons name="checkmark-circle" size={18} color="#2563eb" />}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const ServicesScreen = ({ navigation }) => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([{ id: 'all', name: 'All' }]);
  const [cities, setCities] = useState([{ id: 'all', name: 'All' }]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchServices();
      fetchFilters();
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

  const fetchFilters = async () => {
    try {
      const response = await getAvailableFilters();
      const data = response?.data ? response.data : response;

      if (data?.categories) {
        setCategories([
          { id: 'all', name: 'All' },
          ...data.categories.map((c) => ({ id: c._id, name: c.name })),
        ]);
      }
      if (data?.cities) {
        setCities([
          { id: 'all', name: 'All' },
          ...data.cities.map((c) => ({ id: c._id, name: c.name })),
        ]);
      }
    } catch (error) {
      console.error('Error fetching available filters:', error);
    }
  };

  const filteredServices = useMemo(() => {
    return services.filter((item) => {
      const itemCategoryName = item?.categoryId?.name || '';
      const itemCityName = item?.providerId?.city?.name || '';

      const matchesCategory =
        selectedCategory === 'All' ||
        itemCategoryName.toLowerCase() === selectedCategory.toLowerCase();

      const matchesCity =
        selectedCity === 'All' ||
        itemCityName.toLowerCase() === selectedCity.toLowerCase();

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item?.serviceName?.toLowerCase().includes(query) ||
        item?.description?.toLowerCase().includes(query) ||
        itemCategoryName.toLowerCase().includes(query);

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
          keyExtractor={(item, index) => item._id || item.id || index.toString()}
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