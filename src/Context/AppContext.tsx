import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { setGlobalFilters } from "../utils/globalFilters";

export interface GlobalFilterData {
    /** Location id for API (e.g. overview-cards) */
    locationId?: string | null;
    /** Camera id when a single camera is selected; null for All Cameras */
    cameraId?: string | null;
    /** Date range start (YYYY-MM-DD) */
    fromDate?: string;
    /** Date range end (YYYY-MM-DD) */
    toDate?: string;
}

interface AppContextType {
    isSidebarCollapsed: boolean;
    setIsSidebarCollapsed: (collapsed: boolean) => void;
    globalFilterData: GlobalFilterData;
    setGlobalFilterData: React.Dispatch<React.SetStateAction<GlobalFilterData>>;
}

const AppProvider = createContext<AppContextType>({
    isSidebarCollapsed: false,
    setIsSidebarCollapsed: () => {},
    globalFilterData: {},
    setGlobalFilterData: () => {},
});

function AppContext({ children }: { children: ReactNode }) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [globalFilterData, setGlobalFilterData] = useState<GlobalFilterData>({});

    useEffect(() => {
        setGlobalFilters(globalFilterData);
    }, [globalFilterData]);

    return (
        <AppProvider.Provider value={{ isSidebarCollapsed, setIsSidebarCollapsed, globalFilterData, setGlobalFilterData }}>
            {children}
        </AppProvider.Provider>
    );
}

export default AppContext

export const useAppContext = () => {
    return useContext(AppProvider);
}