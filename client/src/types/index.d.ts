export interface AuthUser {
    _id: string;
    name: string;
    email: string;
    chatStreams: string[];
}

export interface AuthContextType {
    authUser: AuthUser | null;
    setAuthUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
}

export interface AuthContextProviderProps {
    children: ReactNode;
}

export interface LoginParams {
    email: string;
    password: string;
}