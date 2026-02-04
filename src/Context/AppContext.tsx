import { createContext, useContext, useState, type ReactNode } from "react";

interface AppContextType {
    isSidebarCollapsed: boolean;
    setIsSidebarCollapsed: (collapsed: boolean) => void;
}

const AppProvider = createContext<AppContextType>({
    isSidebarCollapsed: false,
    setIsSidebarCollapsed: () => {},
});

function AppContext({ children }: { children: ReactNode }) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <AppProvider.Provider value={{ isSidebarCollapsed, setIsSidebarCollapsed }}>
            {children}
        </AppProvider.Provider>
    );
}

export default AppContext

export const useAppContext = () => {
    return useContext(AppProvider);
}