import { type Functions, getFunctions } from "firebase/functions";

import { getFirebaseApp } from "./client";
import { getFunctionsRegion } from "./config";

export function getFirebaseFunctions(): Functions {
  const region = getFunctionsRegion();
  return region ? getFunctions(getFirebaseApp(), region) : getFunctions(getFirebaseApp());
}
