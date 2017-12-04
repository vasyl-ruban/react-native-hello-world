import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';

export default class HeroImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeToRespawn: this.props.timeToRespawn
    };

    let timer = setInterval(() => {
      this.setState(prev => {
        if (prev.timeToRespawn == 0) {
          clearInterval(timer);
          return {
           timeToRespawn: 0
          };
        }
        return {
          ...prev,
          timeToRespawn: --prev.timeToRespawn
        };
      })
    }, 1000);
  }


  render() {
    let heroId = this.props.heroId;
    let timeToRespawn = this.state.timeToRespawn;
    return (
      <View>
        <Image
          source={{uri: 'http://188.226.147.71:3030/heroes/full/' + heroId + '.png'}}
          style={styles.heroImg}
        />
        {
          timeToRespawn
          ? <View style={styles.respawnTimerOverlay} />
          : null
        }
        {
          timeToRespawn
          ? <View style={styles.respawnTimerContainer}>
              <Text style={styles.respawnTimerText}>{timeToRespawn}</Text>
            </View>
          : null
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  heroImg: {
    width: 64, height: 36, marginLeft: 15
  },
  respawnTimerOverlay: {
    width: 64, height: 36, marginLeft: 15, position: "absolute", backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  respawnTimerContainer: {
    position: "absolute", width: 30, height: 15, bottom: 0, right: 0, backgroundColor: "red"
  },
  respawnTimerText: {
    color: "white", fontSize: 10, textAlign: "center"
  }
});
