import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import MobileNavBar from './MobileNavbar';

const MobileNavBarWrapper = async () => {
    const { isAuthenticated } = getKindeServerSession();
    const isLoggedIn = await isAuthenticated();

    return <MobileNavBar isLoggedIn={isLoggedIn} />;
};

export default MobileNavBarWrapper; 