import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { Language } from '@/data/translations';
import { t as translate } from '@/data/translations';
import type { CitizenProfile, CitizenApplication, CitizenComplaint } from '@/types/welfare';
import { raviProfile, createEmptyProfile, raviApplications, raviComplaints } from '@/data/defaultProfiles';
import { isProfileComplete } from '@/services/eligibilityEngine';

export type Page =
  | 'welcome'
  | 'home'
  | 'profile'
  | 'documents'
  | 'schemes'
  | 'schemeDetails'
  | 'application'
  | 'tracking'
  | 'reportProblem'
  | 'citizenDashboard'
  | 'officerLogin'
  | 'officerDashboard'
  | 'coverageGaps'
  | 'overlapReview'
  | 'howItWorks';

interface AppContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  currentPage: Page;
  navigate: (page: Page) => void;
  selectedSchemeId: string | null;
  setSelectedSchemeId: (id: string | null) => void;
  selectedApplicationId: string | null;
  setSelectedApplicationId: (id: string | null) => void;
  profileCompleted: boolean;
  // Dynamic citizen state
  currentProfile: CitizenProfile;
  setProfile: (profile: CitizenProfile) => void;
  updateProfile: (partial: Partial<CitizenProfile>) => void;
  isRaviProfile: boolean;
  isNewCitizen: boolean;
  startNewCitizen: () => void;
  loadRaviProfile: () => void;
  // Dynamic applications
  applications: CitizenApplication[];
  addApplication: (app: CitizenApplication) => void;
  // Dynamic complaints
  complaints: CitizenComplaint[];
  addComplaint: (complaint: CitizenComplaint) => void;
  // Profile mode: 'edit' or 'new'
  profileMode: 'edit' | 'new';
  setProfileMode: (mode: 'edit' | 'new') => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [currentPage, setCurrentPage] = useState<Page>('welcome');
  const [selectedSchemeId, setSelectedSchemeId] = useState<string | null>(null);
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);
  const [currentProfile, setCurrentProfile] = useState<CitizenProfile>(raviProfile);
  const [isRaviProfile, setIsRaviProfile] = useState(true);
  const [isNewCitizen, setIsNewCitizen] = useState(false);
  const [applications, setApplications] = useState<CitizenApplication[]>(raviApplications);
  const [complaints, setComplaints] = useState<CitizenComplaint[]>(raviComplaints);
  const [profileMode, setProfileMode] = useState<'edit' | 'new'>('edit');
  const profileCompleted = isProfileComplete(currentProfile);

  const navigate = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const t = useCallback((key: string) => translate(language, key), [language]);

  const setProfile = useCallback((profile: CitizenProfile) => {
    setCurrentProfile(profile);
  }, []);

  const updateProfile = useCallback((partial: Partial<CitizenProfile>) => {
    setCurrentProfile((prev) => ({ ...prev, ...partial }));
  }, []);

  const startNewCitizen = useCallback(() => {
    setCurrentProfile(createEmptyProfile());
    setIsRaviProfile(false);
    setIsNewCitizen(true);
    setApplications([]);
    setComplaints([]);
    setProfileMode('new');
  }, []);

  const loadRaviProfile = useCallback(() => {
    setCurrentProfile(raviProfile);
    setIsRaviProfile(true);
    setIsNewCitizen(false);
    setApplications(raviApplications);
    setComplaints(raviComplaints);
    setProfileMode('edit');
  }, []);

  const addApplication = useCallback((app: CitizenApplication) => {
    setApplications((prev) => [...prev, app]);
  }, []);

  const addComplaint = useCallback((complaint: CitizenComplaint) => {
    setComplaints((prev) => [...prev, complaint]);
  }, []);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentPage,
        navigate,
        selectedSchemeId,
        setSelectedSchemeId,
        selectedApplicationId,
        setSelectedApplicationId,
        profileCompleted,
        currentProfile,
        setProfile,
        updateProfile,
        isRaviProfile,
        isNewCitizen,
        startNewCitizen,
        loadRaviProfile,
        applications,
        addApplication,
        complaints,
        addComplaint,
        profileMode,
        setProfileMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
