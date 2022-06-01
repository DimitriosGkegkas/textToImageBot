import React from 'react';
import { testUsers } from './../../services/broadcast';
import { Modal, Checkbox, notification, List, Button, Steps, Icon } from 'antd';
const Item = List.Item;
const Step = Steps.Step;

export default class TesterPicker extends React.Component {


    state = {
        open: false,
        testers: []
    }


    async componentDidMount() {
        const { data } = await testUsers();

        this.state.testers = data?.testers?.map((tester) => { return { send: false, index: tester.id, ...tester } })
        console.log(this.state.testers)
    }
    changeSend = (index) => {
        const { testers } = this.state;
        testers[index].send = !testers[index].send;
        this.setState({ testers });
    }

    handleOk = () => {
        notification.success({
            message: 'Αποστολή Δοκιμαστικού'
        })
        this.props.dispatch({ type: 'broadcast/send' })
    }

    handleTest = () => {
        const users = this.state.testers.filter((user) => {
            return user.send
        });
        console.log(users);
        this.props.dispatch({ type: 'broadcast/test', payload: { users } })
        this.setState({ open: true })
    }

    closeModal = () => {
        this.props.dispatch({ type: 'broadcast/clear' })
    }

    render() {
        const { open } = this.props;
        return (
            <div>
                <Modal
                    title="Επιλογή Tester"
                    visible={open}
                    onCancel={this.closeModal}
                    footer={[
                        <Button key="close" onClick={this.closeModal}>Πίσω</Button>,
                        <Button key="send" type="primary" onClick={this.handleTest}>
                            Δοκιμή<Icon type="right" />
                        </Button>,
                    ]}
                >
                    <Steps current={1} style={{ paddingBottom: '10px' }}>
                        <Step title="Δημιουργία" />
                        <Step title="Έλεγχος" />
                        <Step title="Αποστολή" />
                    </Steps>
                    <List
                        dataSource={this.state.testers}
                        renderItem={(item, index) => (
                            <Item>
                                <div>
                                    <Checkbox
                                        style={{ float: 'left', paddingRight: '10px' }}
                                        checked={item.send}
                                        onClick={() => this.changeSend(index)}
                                    />
                                    {item.firstName}
                                </div>
                            </Item>
                        )}
                    />
                </Modal>
            </div>
        )
    }
}
