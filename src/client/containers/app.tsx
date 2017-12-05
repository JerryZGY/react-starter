// Node module
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Container,
  Grid,
  Transition,
  Dimmer,
  Loader,
  Header,
  Image ,
  Step,
} from 'semantic-ui-react';

interface IAppProps {
  name: string;
}

interface IAppState {
  isLoading: boolean;
}

export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = { isLoading: true };
  }

  public componentDidMount() {
    setTimeout(() => this.setState({ isLoading: false }), 1500);
  }

  public render() {
    const { name } = this.props;
    const { isLoading } = this.state;

    return (
      <Container style={{ height: '100%' }}>
        <Grid
          verticalAlign='middle'
          centered
          columns={1}
          textAlign='center'
          relaxed
          stretched
          style={{ height: '100%' }}
        >
          <Grid.Row>
            <Grid.Column>
              <Transition visible={isLoading} duration={500} unmountOnHide>
                <Dimmer page active>
                  <Loader size='large' content='Loading...' active />
                </Dimmer>
              </Transition>
              <Header as='h1' icon textAlign='center'>
                <Image centered size='large' src='/favicon.ico' />
                <Header.Content>ReactStarter</Header.Content>
              </Header>
              <Step.Group ordered>
                <Step completed>
                  <Step.Content>
                    <Step.Title>Getting Started</Step.Title>
                    <Step.Description>恭喜你，已經成功啟動 ReactStarter！</Step.Description>
                  </Step.Content>
                </Step>
                <Step active>
                  <Step.Content>
                    <Step.Title>JSX</Step.Title>
                    <Step.Description>試試調整 JSX 將本項目打勾</Step.Description>
                  </Step.Content>
                </Step>
                <Step>
                  <Step.Content>
                    <Step.Title>Props</Step.Title>
                    <Step.Description>加入一個 Props 來改變此 Step 的狀態</Step.Description>
                  </Step.Content>
                </Step>
              </Step.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
