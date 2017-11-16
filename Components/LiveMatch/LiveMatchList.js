import React from 'react';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View } from "native-base";
import LiveMatch from './LiveMatch';

export default class LiveMatchList extends React.Component {
  render() {
    let matches = this.props.matches;
    let heroes = this.props.heroes;

    if (!matches.length || !heroes.length) return <Spinner />;

    const matchViews = matches.map(match => <LiveMatch match={match} heroes={heroes} key={match.lobby_id} />);

    return (
      <List>
        {matchViews}
      </List>
    );
  }
}
