import React from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';

const Card = (props) => {
  const { onPress, style, fontSize = 32, title, cover, isShow } = props;

  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Text style={{ fontSize }}>{isShow ? title : cover}</Text>
    </TouchableOpacity>
  );
};

export default Card;
