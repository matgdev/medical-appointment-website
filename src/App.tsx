import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import { Layout } from './Layout';
import { Login } from './Login';

function App() {
    return(
        <Layout title="Dev's Hospital - Log in">
            <Login />
        </Layout>
    );
}

export default App
