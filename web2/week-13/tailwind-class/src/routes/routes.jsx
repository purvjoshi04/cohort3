import { Route, Routes } from "react-router-dom"
import { EmailScreen } from "../components/EmailVerify";
import { VerifyAge } from '../components/VerifyAge';
import { Opt } from "../components/Otp";
import DashboardLayout from "../components/DashboardLayout";

export const AppRoutes = () => {

    return (
        <Routes>
            <Route path='/' element={<VerifyAge placeholder={"Your Birth Year"} />} />
            <Route path='/email' element={<EmailScreen placeholder={"Email"} />} />
            <Route path="/verifyemail" element={<Opt />} />
            <Route path="/hero" element={<DashboardLayout />}/>
        </Routes>
    )
}