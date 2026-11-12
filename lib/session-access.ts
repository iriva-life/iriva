// Alias is internal and constant at each call site, never user input.
export const visibleSession=(alias='s')=>`${alias}.household=? AND (?='host' OR ((${alias}.participant IS NULL OR ${alias}.participant=?) AND (${alias}.pair IS NULL OR EXISTS(SELECT 1 FROM practice_pairs p WHERE p.id=${alias}.pair AND p.household=${alias}.household AND (p.first=? OR p.second=?)))))`;
export const visibilityArgs=(household:unknown,role:unknown,user:string)=>[household,role,user,user,user];
export const reminderKinds=[{kind:'day',minutes:1440},{kind:'soon',minutes:15}];
export function reminderDue(at:string,now=new Date()){const start=Date.parse(at);if(!Number.isFinite(start)||start<=now.getTime())return[];return reminderKinds.map(r=>({kind:r.kind,due:new Date(start-r.minutes*60000).toISOString()}));}
