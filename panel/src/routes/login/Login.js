import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button, Spin, Alert } from 'antd';
import styles from './login.less'

const FormItem = Form.Item;


class Login extends Component {

  // constructor(props) {
  //   super(props)
  //   this.handleLogin = this.handleLogin.bind(this);
  // }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const payload = values
        this.props.dispatch({ type: 'authentication/login', payload});
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    if(this.props.loading) {
      return (
              <Spin className={styles.form}/>
      );
    }
    let error = null;
    if(this.props.message) {
      error = <FormItem>
                  <Alert message={this.props.message} type="error" />
                </FormItem>
    }
    return(
      <div className={styles.form}>
      <Form layout="vertical" onSubmit={this.handleSubmit} className="login-form">
       <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        {error}
        <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
        </Button>
      </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.authentication
});

export default connect(mapStateToProps)(Form.create()(Login));
