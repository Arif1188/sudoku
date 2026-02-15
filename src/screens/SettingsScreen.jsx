import React from "react";
import { PageWrapper, NavBar, GroupCard, SettingsRow } from "../components/Layout";
import { LANG_FLAGS, LANG_LABELS } from "../data/translations";
import { playSound } from "../utils/sounds";

export default function SettingsScreen({ theme, tx, lang, setLang, settings, updateSetting, darkMode, setDarkMode, onBack }) {
  const c = theme;
  return (
    <PageWrapper theme={c} tx={tx} showNav={false}>
      <NavBar title={tx.settings} showBack onBack={onBack} theme={c} />
      <GroupCard theme={c}>
        <div style={{ padding: "14px 16px" }}>
          <div style={{ fontSize: 16, color: c.tx, marginBottom: 12 }}>{tx.language}</div>
          <div style={{ display: "flex", gap: 10 }}>
            {["ru","en","uz"].map((l) => (
              <button key={l} onClick={() => { playSound("tap"); setLang(l); }}
                className={lang === l ? "pop-in" : ""}
                style={{
                  flex: 1, padding: "12px 6px", borderRadius: 12,
                  border: lang === l ? `2px solid ${c.ac}` : `1px solid ${c.bd}`,
                  background: lang === l ? c.acS : "transparent", cursor: "pointer", textAlign: "center",
                  transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  boxShadow: lang === l ? `0 2px 10px ${c.ac}20` : "none",
                }}>
                <div style={{ fontSize: 26, marginBottom: 4 }}>{LANG_FLAGS[l]}</div>
                <div style={{ fontSize: 12, fontWeight: lang === l ? 700 : 500, color: lang === l ? c.ac : c.tx }}>{LANG_LABELS[l]}</div>
              </button>
            ))}
          </div>
        </div>
      </GroupCard>

      <GroupCard theme={c}>
        <SettingsRow label={tx.sounds} value={settings.sounds} onToggle={() => updateSetting("sounds")} theme={c} />
        <SettingsRow label={tx.vibration} value={settings.vibration} onToggle={() => updateSetting("vibration")} theme={c} />
        <SettingsRow label={tx.autoLock} value={settings.autoLock} onToggle={() => updateSetting("autoLock")} theme={c} />
        <SettingsRow label={tx.timer} value={settings.timer} onToggle={() => updateSetting("timer")} theme={c} />
        <SettingsRow label={tx.scoreToggle} value={settings.score} onToggle={() => updateSetting("score")} isLast theme={c} />
      </GroupCard>

      {[
        { l: tx.scoreAnimation, d: tx.scoreAnimationDesc, k: "scoreAnim" },
        { l: tx.statisticsMsg, d: tx.statisticsMsgDesc, k: "statsMsg" },
        { l: tx.smartHints, d: tx.smartHintsDesc, k: "smartHints" },
        { l: tx.numberInput, d: tx.numberInputDesc, k: "numInput" },
        { l: tx.mistakeLimit, d: tx.mistakeLimitDesc, k: "mistakeLimit" },
        { l: tx.autoCheck, d: tx.autoCheckDesc, k: "autoCheck" },
        { l: tx.hlDuplicates, d: tx.hlDuplicatesDesc, k: "hlDup" },
        { l: tx.hlAreas, d: tx.hlAreasDesc, k: "hlArea" },
        { l: tx.hlSameNum, d: tx.hlSameNumDesc, k: "hlSame" },
        { l: tx.hideUsed, d: tx.hideUsedDesc, k: "hideUsed" },
        { l: tx.autoNotes, d: tx.autoNotesDesc, k: "autoNotes" },
        { l: tx.hlCombo, d: tx.hlComboDesc, k: "hlCombo" },
      ].map((item) => (
        <GroupCard key={item.k} theme={c}>
          <SettingsRow label={item.l} desc={item.d} value={settings[item.k]} onToggle={() => updateSetting(item.k)} isLast theme={c} />
        </GroupCard>
      ))}

      <GroupCard theme={c}>
        <SettingsRow label={tx.darkMode} value={darkMode} onToggle={() => setDarkMode(!darkMode)} isLast theme={c} />
      </GroupCard>
      <div style={{ height: 40 }} />
    </PageWrapper>
  );
}
