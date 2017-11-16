import React from 'react';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View } from "native-base";

export default class PlayerListItem extends React.Component {
  render() {
    const navigate = this.props.navigate;
    const player = this.props.player;
    const lastMatch = (new Date(player.last_match_time)).toString();

    return (
      <ListItem key={player.account_id} style={{marginLeft: 0}} onPress={() => navigate('Player', {playerId: player.account_id})}>
        <Thumbnail square size={80} source={{ uri: player.avatarfull }} />
        <Body>
        <Text>{player.personaname}</Text>
        <Text note>{lastMatch}</Text>
        </Body>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    );
  }
}
