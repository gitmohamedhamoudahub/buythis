import { AuthAppContext } from './auth/index.jsx';

const AppProvider = ({children}) => {
    return (
        <AuthAppContext>
            {children}
        </AuthAppContext>
    )
}

export default AppProvider;