import dva from 'dva';
import './index.css';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/authentication').default);
app.model(require('./models/messages').default);
app.model(require('./models/broadcast').default);
app.model(require('./models/info').default);
app.model(require('./models/users').default);
// 4. Router
app.router(require('./router').default);
app.use({
    onStateChange: ((state) => {
        localStorage.setItem('expiresIn', state.authentication.expiresIn);
        localStorage.setItem('token', state.authentication.token);
    }),
})
// 5. Start
app.start('#root');
