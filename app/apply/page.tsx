import {requireChatGPTUser} from '../chatgpt-auth';
import ApplyForm from './form';
import './style.css';
export const dynamic='force-dynamic';
export const metadata={title:'青鸟 IRIVA · 填写加入资料'};
export default async function Page({searchParams}:{searchParams:Promise<{plan?:string;role?:string;language?:string}>}){const q=await searchParams;const plan=['native','everyday','professional'].includes(q.plan||'')?q.plan!:'native',role=q.role==='host'?'host':'learner',language=q.language==='Chinese'?'Chinese':'English';const query=new URLSearchParams({plan,role,language});const user=await requireChatGPTUser(`/apply?${query}`);return <ApplyForm email={user.email} account={user.userId} initialPlan={plan} initialRole={role} initialLanguage={language}/>}
