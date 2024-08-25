'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const LanguageSwitcher = () => {
  const [language, setLanguage] = useState("English");

  return (
    <Select>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder={language} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en" onClick={() => setLanguage("English")}>
          English
        </SelectItem>
        <SelectItem value="es" onClick={() => setLanguage("Español")}>
          Español
        </SelectItem>
        <SelectItem value="pt-BR" onClick={() => setLanguage("Português")}>
          Português
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;