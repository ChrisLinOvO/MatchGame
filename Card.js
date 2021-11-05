import React from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';

const Card = (props) => {

  return (
    <>
         <TouchableOpacity onPress={props.onPress} style={{...props.style}}>
              <Text style={{fontSize:props.fontSize}||32}>{props.isShow?props.title:props.cover}</Text>
            </TouchableOpacity>


    </>
  );
};

export default Card;

