import React from 'react';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View } from "native-base";
import Layout from './Layout';
import LiveMatchList from '../Components/LiveMatch/LiveMatchList';

const removeDuplicates = (lives) => {
  let existenIds = [];
  let uniqLives = [];
  lives.forEach((live) => {
    if (existenIds.indexOf(live.lobby_id) === -1) {
      uniqLives.push(live);
      existenIds.push(live.lobby_id);
    }
  });

  return uniqLives;
};

export default class Live extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      live: [],
      heroes: []
    };

    fetch('https://api.opendota.com/api/live')
      .then((response) => response.json())
      .then((response) => {
        this.setState(prevState => {
          response.sort((a, b) => b.spectators - a.spectators);
          response = removeDuplicates(response);
          response = response.filter((live) => {
            return live.spectators > 0;
          });

          prevState.live = response;
          return prevState;
        })
      });

    fetch('https://api.opendota.com/api/heroStats')
      .then((response) => response.json())
      .then((response) => {
        this.setState((prevState) => {
          prevState.heroes = response;
          return prevState;
        })
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Layout navigate={navigate}>
        <LiveMatchList matches={this.state.live} heroes={this.state.heroes} />
      </Layout>
    );
  }
}
