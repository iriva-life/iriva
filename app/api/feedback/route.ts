import {env} from 'cloudflare:workers';
import {getChatGPTUser} from '../../chatgpt-auth';
import {sameOrigin} from '../../../lib/team';
export const dynamic='force-dynamic';
const out=(v:unknown,s=200)=>Response.json(v,{status:s,headers:{'Cache-Control':'no-store'}});
export async function POST(req:Request){
 const u=await getChatGPTUser();if(!u)return out({error:'请先登录后提交。'},401);
 if(!sameOrigin(req))return out({error:'请求来源不正确。'},403);
 try{const raw=await req.text();if(raw.length>6000)return out({error:'建议内容过长。'},413);const b=JSON.parse(raw);
 if(typeof b.body!=='string'||!b.body.trim()||b.body.trim().length>2000||!['learning','matching','tools','other'].includes(b.category)||b.consent!==true)return out({error:'请填写建议、选择类别，并确认资料用途。'},400);
 const db=env.DB!;const since=new Date(Date.now()-86400000).toISOString();
 const result=await db.prepare("INSERT INTO feedback(id,user,email,category,body,status,created) SELECT ?,?,?,?,?,'new',? WHERE (SELECT COUNT(*) FROM feedback WHERE user=? AND created>?) < 10").bind(crypto.randomUUID(),u.userId,u.email.toLowerCase(),b.category,b.body.trim(),new Date().toISOString(),u.userId,since).run();
 if(!result.meta.changes)return out({error:'今天提交较多，请明天再来补充。'},429);
 return out({ok:true});
 }catch{return out({error:'暂时未能保存，请稍后重试。'},503)}
}
