import React from 'react';
import {Image} from 'react-native';

export default class HeroImage extends React.Component {
  render() {
    let heroId = this.props.heroId;
    return (
      <Image
        source={{uri: 'http://188.226.147.71:3030/heroes/full/' + heroId + '.png?timestamp='+Date.now()}}
        style={{width: 64, height: 36, marginLeft: 15}}
      />
    );
  }
}