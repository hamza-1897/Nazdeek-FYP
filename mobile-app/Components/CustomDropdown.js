import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
              {items.map((item, index) => {
                const isSelected = selectedValue === item.name;
                return (
                  <TouchableOpacity
                    key={item.id || item._id || index.toString()}
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

export default CustomDropdown;