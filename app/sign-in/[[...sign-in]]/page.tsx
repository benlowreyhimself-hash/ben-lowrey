import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
        }}>
            <SignIn afterSignInUrl="/admin/opportunities" />
        </div>
    );
}
