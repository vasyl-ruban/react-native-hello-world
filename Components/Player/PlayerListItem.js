import React from 'react';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View } from "native-base";

export default class PlayerListItem extends React.Component {
  render() {
    let navigate = this.props.navigate;
    let player = this.props.player;
    let playerPressHandler = this.props.playerPressHandler;
    let lastMatch = (new Date(player.last_match_time)).toString();

    return (
      <ListItem key={player.account_id} style={{marginLeft: 0}} onPress={() => playerPressHandler(player)}>
        <Thumbnail square size={80} source={{ uri: player.avatarfull }} />
        <Body>
        <Text>{player.personaname}</Text>
        <Text note>{lastMatch}/{player.account_id}</Text>
        </Body>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    );
  }
}
