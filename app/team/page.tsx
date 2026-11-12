import {requireChatGPTUser} from '../chatgpt-auth';
import {teamRole} from '../../lib/team';
import Team from './team';
import './team.css';
export const dynamic='force-dynamic';
export const metadata={title:'青鸟 · 运营工作台'};
export default async function Page(){const u=await requireChatGPTUser('/team');const r=await teamRole(u);if(!r)return <main style={{padding:60,maxWidth:700,margin:'auto'}}><h1>这里是青鸟团队的工作空间。</h1><p>当前账号没有访问申请资料的权限。请使用已获授权的工作邮箱登录。</p><a href="/signout-with-chatgpt?return_to=%2Fteam">切换账号</a> · <a href="/learn">进入我的学习空间</a></main>;return <Team/>}
