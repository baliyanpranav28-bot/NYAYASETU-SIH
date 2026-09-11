import { AppProvider, useApp } from '@/context/AppContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WelcomePage } from '@/pages/WelcomePage';
import { HomePage } from '@/pages/HomePage';
import { ProfilePage } from '@/pages/ProfilePage';
import { DocumentsPage } from '@/pages/DocumentsPage';
import { SchemeResultsPage } from '@/pages/SchemeResultsPage';
import { SchemeDetailsPage } from '@/pages/SchemeDetailsPage';
import { ApplicationPage } from '@/pages/ApplicationPage';
import { TrackingPage } from '@/pages/TrackingPage';
import { ReportProblemPage } from '@/pages/ReportProblemPage';
import { CitizenDashboardPage } from '@/pages/CitizenDashboardPage';
import { OfficerLoginPage } from '@/pages/OfficerLoginPage';
import { OfficerDashboardPage } from '@/pages/OfficerDashboardPage';
import { CoverageGapsPage } from '@/pages/CoverageGapsPage';
import { OverlapReviewPage } from '@/pages/OverlapReviewPage';
import { HowItWorksPage } from '@/pages/HowItWorksPage';

function AppContent() {
  const { currentPage } = useApp();

  const pagesWithoutChrome: string[] = ['welcome', 'officerLogin'];
  const showChrome = !pagesWithoutChrome.includes(currentPage);

  let page;
  switch (currentPage) {
    case 'welcome': page = <WelcomePage />; break;
    case 'home': page = <HomePage />; break;
    case 'profile': page = <ProfilePage />; break;
    case 'documents': page = <DocumentsPage />; break;
    case 'schemes': page = <SchemeResultsPage />; break;
    case 'schemeDetails': page = <SchemeDetailsPage />; break;
    case 'application': page = <ApplicationPage />; break;
    case 'tracking': page = <TrackingPage />; break;
    case 'reportProblem': page = <ReportProblemPage />; break;
    case 'citizenDashboard': page = <CitizenDashboardPage />; break;
    case 'officerLogin': page = <OfficerLoginPage />; break;
    case 'officerDashboard': page = <OfficerDashboardPage />; break;
    case 'coverageGaps': page = <CoverageGapsPage />; break;
    case 'overlapReview': page = <OverlapReviewPage />; break;
    case 'howItWorks': page = <HowItWorksPage />; break;
    default: page = <HomePage />;
  }

  if (!showChrome) {
    return <div className="min-h-screen">{page}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{page}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
