import React from "react";
import { PageWrapper, NavBar, GroupCard, MenuRow } from "../components/Layout";

export default function ProfileScreen({ theme, tx, tab, onNavigate, onGoSettings }) {
  const c = theme;
  return (
    <PageWrapper theme={c} tx={tx} tab={tab} onNavigate={onNavigate}>
      <NavBar title={tx.profile} theme={c} />
      <GroupCard theme={c}><MenuRow icon="🏆" iconBg="#FFD60A" label={tx.awards} onClick={() => {}} theme={c} /><MenuRow icon="📊" iconBg="#5AC8FA" label={tx.statistics} onClick={() => {}} isLast theme={c} /></GroupCard>
      <GroupCard theme={c}><MenuRow icon="⚙️" iconBg="#FF3B30" label={tx.settings} onClick={onGoSettings} theme={c} /><MenuRow icon="🎓" iconBg="#FF9500" label={tx.howToPlay} onClick={() => {}} theme={c} /><MenuRow icon="📖" iconBg="#007AFF" label={tx.rules} onClick={() => {}} isLast theme={c} /></GroupCard>
      <GroupCard theme={c}><MenuRow icon="❓" iconBg="#34C759" label={tx.help} onClick={() => {}} theme={c} /><MenuRow icon="ℹ️" iconBg="#5856D6" label={tx.aboutGame} onClick={() => {}} theme={c} /><MenuRow icon="🔒" iconBg="#AF52DE" label={tx.privacy} onClick={() => {}} theme={c} /><MenuRow icon="🛡️" iconBg="#32D74B" label={tx.privacySettings} onClick={() => {}} isLast theme={c} /></GroupCard>
    </PageWrapper>
  );
}
