import React from 'react';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View } from "native-base";
import PlayerListItem from './PlayerListItem';

export default class PlayerList extends React.Component {
  render() {
    let players = this.props.players;
    let navigate = this.props.navigate;
    let playerViews = players.map((player) => <PlayerListItem player={player} navigate={navigate} key={player.account_id} />);

    return (
      <List>
        {playerViews}
      </List>
    );
  }
}

