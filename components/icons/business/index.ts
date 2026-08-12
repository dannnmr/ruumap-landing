import type { ComponentType, SVGProps } from "react";
import { AssertLogo } from "./AssertLogo";
import { StrattoLogo } from "./StrattoLogo";
import { StrattoHomeLogo } from "./StrattoHomeLogo";
import { ItaguaLogo } from "./ItaguaLogo";
import { FrakLogo } from "./FrakLogo";
import { SttoCapitalLogo } from "./SttoCapitalLogo";
import { JomLogo } from "./JomLogo";

export {
  AssertLogo,
  StrattoLogo,
  StrattoHomeLogo,
  ItaguaLogo,
  FrakLogo,
  SttoCapitalLogo,
  JomLogo,
};

export const BUSINESS_LOGOS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  assert: AssertLogo,
  stratto: StrattoLogo,
  "stratto-home": StrattoHomeLogo,
  itagua: ItaguaLogo,
  frak: FrakLogo,
  "stto-capital": SttoCapitalLogo,
  jom: JomLogo,
};
