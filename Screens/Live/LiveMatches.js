import React from 'react';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View, Tab, Tabs, TabHeading, Separator, Row, Title } from "native-base";
import ItemImage from '../../Components/ItemImage';
import HeroImage from '../../Components/HeroImage';
import Layout from '../Layout';
import moment from 'moment';

export default class LiveMatches extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      matches: []
    };

  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Layout navigate={navigate}>
        <Header>
          <Left>
            <Button transparent onPress={() => {this.props.navigation.goBack()}}>
              <Icon name="arrow-menu" />
            </Button>
          </Left>
          <Body>
          <Title>Live games</Title>
          </Body>
          <Right />
        </Header>
        <List>
          {this.state.matches.length
            ? this.state.matches.map((match) =>
                <ListItem>
                  <Text>{match.radiant_team.team_name} vs {match.dire_team.team_name}</Text>
                </ListItem>
              )
            : <Spinner />
          }
        </List>
      </Layout>
    );
  }
}
