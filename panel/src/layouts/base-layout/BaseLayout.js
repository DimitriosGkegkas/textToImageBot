import { Layout } from 'antd';

import SideBar from '../../components/sidebar/SideBar';
import Logo from '../../public/logo.png';

const { Sider, Content } = Layout;

const logoStyle = {
    height: '100px',
    margin: '18px'
}

const contentStyle = {
    paddingLeft: '20px',
    paddingTop: '20px',
    paddingRight: '20px'
}

const BaseLayout = (props) => {
    let { content: Main, location } = props;
    return (
        <Layout style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, width: '100%' }}>
            <Sider style={{ backgroundColor: "#0E8FC9" , flex: "0 0 250px"}}>
                <img alt="logo" style={logoStyle} src={Logo} />
                <SideBar location={location} />
            </Sider>
            <Content style={contentStyle}>
                <Main />
            </Content>
        </Layout>
    );
}

export default BaseLayout;
