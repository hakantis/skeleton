import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

export const ModalView = (props) => {
  const {
    children,
    modalVisible,
    closeModal
  } = props;

  return <Modal isVisible={modalVisible} style={{ justifyContent: 'center', alignItems: 'center', gap: 20, }}>
    <View style={{ width: '90%', height: 250, borderRadius: 15, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
      {children}
    </View>
    <TouchableOpacity
      style={{ width: '90%', backgroundColor: 'white', height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 15 }}
      onPress={closeModal}>
      <Text style={{ color: 'red' }}>Hide Modal</Text>
    </TouchableOpacity>
  </Modal>
}