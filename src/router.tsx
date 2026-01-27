import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import AuthLayout from './layouts/AuthLayout';
import AppLayout from './layouts/AppLayout';
import HomeView from './views/HomeView';
import RecipesView from './views/RecipesView';
import PublicRecipesView from './views/PublicRecipesView';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path='/auth/login' element={<LoginView />} />
                    <Route path='/auth/register' element={<RegisterView />} />
                </Route>
                <Route path='/' element={<AppLayout />} >
                    <Route path='recipes' element={<PublicRecipesView/>}/>
                    <Route path='book' element={<RecipesView/>}/>
                </Route>
                <Route path='/' element={<HomeView />} />
            </Routes>
        </BrowserRouter>
    )
}
