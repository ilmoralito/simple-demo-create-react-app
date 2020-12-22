import React, { useContext } from "react";
import { LanguageContext, languages } from "../../contexts/language-context";

export default function LanguageSwitch() {
  const context = useContext(LanguageContext);

  return (
    <div>
      <select
        value={context.language}
        onChange={(event) => context.onToggleLanguage(event.target.value)}
      >
        {Object.values(languages).map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>
    </div>
  );
}
