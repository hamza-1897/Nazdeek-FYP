import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';

const formatTime = (seconds = 0) => {
  const total = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const VoiceMessagePlayer = ({ uri, duration = 0, isMyMessage }) => {
  const player = useAudioPlayer(uri ? { uri } : null);
  const status = useAudioPlayerStatus(player);

  const isPlaying = status?.playing || false;
  const currentTime = status?.currentTime || 0;
  const totalDuration = status?.duration || duration || 0;

  const togglePlayback = () => {
    if (!player) return;

    if (isPlaying) {
      player.pause();
    } else {
      if (status?.didJustFinish || currentTime >= totalDuration && totalDuration > 0) {
        player.seekTo(0);
      }
      player.play();
    }
  };

  const progress = totalDuration > 0 ? Math.min(currentTime / totalDuration, 1) : 0;

  return (
    <View className="flex-row items-center min-w-[170px]">
      <TouchableOpacity
        onPress={togglePlayback}
        activeOpacity={0.7}
        className={`w-9 h-9 rounded-full items-center justify-center mr-2 ${
          isMyMessage ? 'bg-white/25' : 'bg-[#1a5ea1]/10'
        }`}
      >
        <Ionicons
          name={isPlaying ? 'pause' : 'play'}
          size={16}
          color={isMyMessage ? '#ffffff' : '#1a5ea1'}
          style={{ marginLeft: isPlaying ? 0 : 2 }}
        />
      </TouchableOpacity>

      <View className="flex-1">
        <View
          className={`h-1.5 rounded-full overflow-hidden ${
            isMyMessage ? 'bg-white/30' : 'bg-slate-200'
          }`}
        >
          <View
            style={{ width: `${progress * 100}%` }}
            className={`h-full rounded-full ${isMyMessage ? 'bg-white' : 'bg-[#1a5ea1]'}`}
          />
        </View>
        <Text
          className={`text-[10px] mt-1 ${isMyMessage ? 'text-blue-100' : 'text-slate-400'}`}
        >
          {formatTime(isPlaying || currentTime > 0 ? currentTime : totalDuration)}
        </Text>
      </View>
    </View>
  );
};

export default VoiceMessagePlayer;
