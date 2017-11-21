import React from 'react';
import {
  Body,
  Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left,
  List,
  ListItem,
  Right,
  Spinner,
  Text, Thumbnail, View
} from "native-base";
import {Platform} from "react-native";

export default class Layout extends React.Component {
  render() {
    const navigate = this.props.navigate;
    const activeTab = this.props.activeTab;
    const isCollapsed = this.props.isCollapsed;
    return (
      <Container>
        <Content>
          {this.props.children}
        </Content>
      </Container>
    );
  }
}
