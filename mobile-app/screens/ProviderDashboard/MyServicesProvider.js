import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, StatusBar, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import ProviderServiceCard from '../../Cards/ProviderServiceCard';
import ProviderTabs from '../../Cards/ProviderTabs';
import { getProviderServices, deleteService } from '../../api/ProviderApi';
import { AuthContext } from '../../context/AuthContext';

const MyServicesProvider = ({ navigation }) => {
  const { providerInfo } = useContext(AuthContext);
  const providerId = providerInfo?._id || providerInfo?.id;

  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchServices = async (id) => {
    if (!id) {
      console.log("Provider ID not available yet");
      return;
    }

    try {
      setLoading(true);
      const response = await getProviderServices(id);
      
      if (response && response.data) {
        setServices(response.data);
      } else if (response && response.services) {
        setServices(response.services);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      Alert.alert("Error", "Failed to fetch services. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchServices(providerId);
    }, [providerId])
  );

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Service",
      "Are you sure you want to delete this service?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              const res = await deleteService(id);
              if (res?.success) {
                setServices((prev) => prev.filter((service) => service._id !== id));
                Alert.alert("Success", "Service has been removed successfully.");
              } else {
                Alert.alert("Notice", res?.message || "Failed to delete service.");
              }
            } catch (error) {
              console.error("Error deleting service:", error);
              Alert.alert("Error", error?.response?.data?.message || "Failed to delete service.");
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const handleEdit = (service) => {
    navigation.navigate('EditServiceProvider', { service });
  };

  const filteredServices = services.filter((service) =>
    (service?.serviceName || service?.name || '')
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      <View className="flex-1">
        
        <View className="px-6 pt-3 pb-2 mt-3 flex-row justify-between items-center">
          <View>
            <Text className="text-2xl font-black text-slate-900 tracking-tight">My Services</Text>
            <Text className="text-xs font-semibold text-slate-400 mt-0.5">
              Manage your active service listings
            </Text>
          </View>

          <TouchableOpacity 
            onPress={() => navigation.navigate('CreateService')}
            className="bg-[#1a5ea1] w-12 h-12 rounded-2xl items-center justify-center shadow-md shadow-blue-500/20"
          >
            <Ionicons name="add" size={26} color="white" />
          </TouchableOpacity>
        </View>

        <View className="px-6 my-3">
          <View className="bg-white flex-row items-center px-4 h-13 rounded-2xl border border-slate-100 shadow-sm">
            <Ionicons name="search-outline" size={18} color="#94a3b8" />
            <TextInput 
              placeholder="Search my services..." 
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="ml-3 flex-1 text-slate-800 text-sm font-medium"
            />
            {searchQuery !== '' && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={18} color="#cbd5e1" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <FlatList
          data={filteredServices}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 8, paddingBottom: 24 }}
          refreshing={loading}
          onRefresh={() => fetchServices(providerId)}
          renderItem={({ item }) => (
            <ProviderServiceCard 
              service={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
          ListEmptyComponent={() => (
            <View className="flex-1 items-center justify-center pt-20 px-6">
              <View className="w-20 h-20 bg-blue-50 rounded-full items-center justify-center mb-4">
                <Ionicons name="grid-outline" size={36} color="#1a5ea1" />
              </View>
              <Text className="text-slate-800 font-bold text-lg">
                {loading ? "Loading Services..." : "No Services Found"}
              </Text>
              <Text className="text-slate-400 text-xs text-center mt-1 px-8">
                {searchQuery ? "No results match your search query." : "You haven't listed any services yet."}
              </Text>
              
              {!searchQuery && !loading && (
                <TouchableOpacity 
                  onPress={() => navigation.navigate('CreateService')}
                  className="mt-5 bg-[#1a5ea1] px-5 py-3 rounded-2xl shadow-sm"
                >
                  <Text className="text-white font-bold text-xs">+ Create New Service</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      </View>

    </SafeAreaView>
  );
};

export default MyServicesProvider;