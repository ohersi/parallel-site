// Imports
import Nav from '@/components/navigation/nav';
import NavLogo from '@/components/navigation/logo.navigation';
import NavProfile from '@/components/navigation/profile.navigation';
import NavSearch from '@/components/navigation/search.navigation';

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Nav search={<NavSearch />} logo={<NavLogo />} profile={<NavProfile />} />
            {children}
        </>

    )
};
