import {React , useState , useContext} from 'react';
import { View, ScrollView, TouchableOpacity,StatusBar, Text } from 'react-native';
import HeaderCard from '../Cards/HeaderCard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {AuthContext} from '../context/AuthContext';
import PromoBanner from '../Components/PromoBanner';
import CategoryPills from '../Components/CategoryPills';
import ServiceCard from '../Cards/HomeServiceCard';

const HomeScreen = ({ navigation, servicesData = [] }) => {
  const { userInfo } = useContext(AuthContext);
 


  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View className="flex-1 bg-white">
     
      <StatusBar barStyle="light-content" backgroundColor="#1a5ea1" />
      
      
      <HeaderCard userName={userInfo?.name || 'User' } />

      
      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: insets.bottom + 90 }}
      className="flex-1 bg-slate-50"
    >
      

      <PromoBanner onPressBanner={() => {}} />


      <View className="px-5">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-slate-900 font-bold text-base">Top Rated Services</Text>
          <TouchableOpacity>
            <Text className="text-[#1a5ea1] font-bold text-xs">View All</Text>
          </TouchableOpacity>
        </View>

        {servicesData.map((serviceItem) => (
          <ServiceCard
            key={serviceItem._id || serviceItem.id}
            item={serviceItem}
            onPressCard={() =>
              navigation.navigate('ViewDetailScreen', {
                serviceId: serviceItem._id,
              })
            }
          />
        ))}
      </View>
    </ScrollView>
    </View>
  );
};

export default HomeScreen;