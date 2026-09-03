import React, { useMemo } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 40) / 2;

const DUMMY_PROVIDERS = [
  {
    _id: '1',
    name: 'Ali Raza',
    category: 'Electrician',
    rating: 4.5,
    isPremium: false,
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200',
  },
  {
    _id: '2',
    name: 'Usman Khan',
    category: 'Plumber',
    rating: 4.9,
    isPremium: true,
    image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200',
  },
  {
    _id: '3',
    name: 'Hamza Malik',
    category: 'AC Specialist',
    rating: 4.3,
    isPremium: false,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200',
  },
  {
    _id: '4',
    name: 'Bilal Ahmed',
    category: 'Carpenter',
    rating: 4.8,
    isPremium: true,
    image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200',
  },
  {
    _id: '5',
    name: 'Zainab Bibi',
    category: 'Home Cleaner',
    rating: 4.2,
    isPremium: false,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
  },
  {
    _id: '6',
    name: 'Shahid Iqbal',
    category: 'Painter',
    rating: 4.9,
    isPremium: true,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
  },
];

const ViewPremiumProviders = () => {
  const navigation = useNavigation();

  const sortedProviders = useMemo(() => {
    return [...DUMMY_PROVIDERS].sort(
      (a, b) => (b.isPremium ? 1 : 0) - (a.isPremium ? 1 : 0)
    );
  }, []);

  return (
    <SafeAreaView
      className="flex-1 bg-slate-100"
      style={{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-slate-200">
        <TouchableOpacity
          onPress={() => navigation.canGoBack() && navigation.goBack()}
          className="p-2 rounded-full bg-slate-100"
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={20} color="#0f172a" />
        </TouchableOpacity>

        <Text className="text-lg font-extrabold text-slate-900 text-center flex-1 mr-8">
          Service Providers
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12, paddingTop: 20, paddingBottom: 24 }}
      >
        <View className="flex-row flex-wrap justify-between">
          {sortedProviders.map((item) => {
            const isPremium = item.isPremium;

            return (
              <TouchableOpacity
                key={item._id}
                activeOpacity={0.88}
                style={{ width: CARD_WIDTH }}
                className={`bg-white rounded-3xl p-3.5 mb-5 items-center shadow-sm relative ${
                  isPremium
                    ? 'border-2 border-amber-400 bg-amber-50/10'
                    : 'border border-slate-200'
                }`}
              >
                {isPremium && (
                  <View className="absolute -top-3 bg-amber-500 px-2.5 py-0.5 rounded-full flex-row items-center z-10 shadow-sm border border-amber-200">
                    <FontAwesome5 name="crown" size={9} color="#ffffff" />
                    <Text className="text-[10px] font-black text-white ml-1 tracking-wider uppercase">
                      PRO
                    </Text>
                  </View>
                )}

                <Image
                  source={{ uri: item.image }}
                  className={`w-16 h-16 rounded-full bg-slate-100 mt-2 mb-1 ${
                    isPremium ? 'border-2 border-amber-400' : ''
                  }`}
                />

                <Text
                  className="text-slate-900 font-bold text-sm text-center mt-1"
                  numberOfLines={1}
                >
                  {item.name}
                </Text>

                <Text
                  className="text-slate-400 text-xs font-medium text-center"
                  numberOfLines={1}
                >
                  {item.category}
                </Text>

                

                <TouchableOpacity
                  activeOpacity={0.8}
                  className={`mt-3 w-full py-2 rounded-xl items-center ${
                    isPremium ? 'bg-amber-500' : 'bg-[#1a5ea1]'
                  }`}
                >
                  <Text className="text-white font-bold text-xs">
                    View Profile
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewPremiumProviders;