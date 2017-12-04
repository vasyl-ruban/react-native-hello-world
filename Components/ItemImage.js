import React from 'react';
import {Image} from 'react-native';

export default class ItemImage extends React.Component {
  render() {
    let itemId = this.props.itemId;
    let isSmall = this.props.small;
    let style = {
      width: 42,
      height: 32,
      marginRight: 5,
      marginTop: 5
    };
    if (isSmall) {
      style = {
        width: 42 * 3/4,
        height: 32 * 3/4,
        marginRight: 5,
        marginTop: 5
      };
    }
    return (
      <Image
        source={{uri: 'http://188.226.147.71:3030/items/lg/' + itemId + '.png'}}
        style={style}
      />
    );
  }
}