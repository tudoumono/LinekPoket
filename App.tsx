import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import SplashScreen from './screens/SplashScreen';
import ParentDashboardScreen from './screens/ParentDashboardScreen';
import AlertDetailScreen from './screens/AlertDetailScreen';
import AlertsScreen from './screens/AlertsScreen';
import SettingsScreen from './screens/SettingsScreen';
import ChildProfileScreen from './screens/ChildProfileScreen';
import ChildInterceptScreen from './screens/ChildInterceptScreen';
import ChildImageInterceptScreen from './screens/ChildImageInterceptScreen';
import BottomNav from './components/BottomNav';
import RuleSettingsScreen from './screens/RuleSettingsScreen';
import EditRuleScreen from './screens/EditRuleScreen';
import ConversationScreen from './screens/ConversationScreen';
import RuleGuideScreen from './screens/RuleGuideScreen';
import NotificationSettingsScreen from './screens/NotificationSettingsScreen';
import BatchNotifySettingsScreen from './screens/BatchNotifySettingsScreen';
import MaskingSettingsScreen from './screens/MaskingSettingsScreen';
import RetentionSettingsScreen from './screens/RetentionSettingsScreen';
import ExportDataScreen from './screens/ExportDataScreen';
import ReportScreen from './screens/ReportScreen';
import EditChildProfileScreen from './screens/EditChildProfileScreen';
import ConsultParentScreen from './screens/ConsultParentScreen';
import SafetyChatScreen from './screens/SafetyChatScreen';
import EmergencyContactsScreen from './screens/EmergencyContactsScreen';
import EditEmergencyContactScreen from './screens/EditEmergencyContactScreen';
import ParentConsultChatScreen from './screens/ParentConsultChatScreen';

const App: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="w-full max-w-[420px] h-[800px] bg-white rounded-[40px] shadow-2xl border-[10px] border-black overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20"></div>
        <HashRouter>
          <main className="h-full overflow-y-auto pb-20">
            <Routes>
              <Route path="/" element={<SplashScreen />} />
              <Route path="/dashboard" element={<ParentDashboardScreen />} />
              <Route path="/alerts" element={<AlertsScreen />} />
              <Route path="/alert/:id" element={<AlertDetailScreen />} />
              <Route path="/alert/:id/conversation" element={<ConversationScreen />} />
              <Route path="/alert/:id/consult-chat" element={<ParentConsultChatScreen />} />
              <Route path="/settings" element={<SettingsScreen />} />
              <Route path="/profile" element={<ChildProfileScreen />} />
              <Route path="/profile/:id" element={<EditChildProfileScreen />} />
              <Route path="/child-intercept-text" element={<ChildInterceptScreen />} />
              <Route path="/child-intercept-image" element={<ChildImageInterceptScreen />} />
              <Route path="/settings/rules" element={<RuleSettingsScreen />} />
              <Route path="/settings/rule/:id" element={<EditRuleScreen />} />
              <Route path="/rule-guide" element={<RuleGuideScreen />} />
              <Route path="/settings/notifications-severity" element={<NotificationSettingsScreen />} />
              <Route path="/settings/batch-notifications" element={<BatchNotifySettingsScreen />} />
              <Route path="/settings/masking" element={<MaskingSettingsScreen />} />
              <Route path="/settings/retention" element={<RetentionSettingsScreen />} />
              <Route path="/settings/export" element={<ExportDataScreen />} />
              <Route path="/report" element={<ReportScreen />} />
              <Route path="/consult-parent" element={<ConsultParentScreen />} />
              <Route path="/safety-chat" element={<SafetyChatScreen />} />
              <Route path="/settings/emergency-contacts" element={<EmergencyContactsScreen />} />
              <Route path="/settings/emergency-contact/:id" element={<EditEmergencyContactScreen />} />
            </Routes>
          </main>
          <BottomNav />
        </HashRouter>
      </div>
    </div>
  );
};

export default App;