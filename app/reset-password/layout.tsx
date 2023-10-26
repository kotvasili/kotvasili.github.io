import { PublicEnvProvider } from 'next-runtime-env';
export const metadata = {
    robots: {
        index: false,
        follow: false,
    },
};
export default async function EnvLayout({children}: {
    children: React.ReactNode
}) {
    return <PublicEnvProvider>{children}</PublicEnvProvider>
}
