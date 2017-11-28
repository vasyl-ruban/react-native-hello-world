import React from 'react';
import {Image} from 'react-native';

export default class ItemImage extends React.Component {
  render() {
    let itemId = this.props.itemId;
    return (
      <Image
        source={{uri: 'http://188.226.147.71:3030/items/lg/' + itemId + '.png'}}
        style={{width: 42, height: 32, marginRight: 5, marginTop: 5}}
      />
    );
  }
}