import {requireChatGPTUser} from '../chatgpt-auth';
import FeedbackForm from './form';
import '../apply/style.css';
export const dynamic='force-dynamic';
export const metadata={title:'青鸟 IRIVA · 给青鸟的建议'};
export default async function Page(){const user=await requireChatGPTUser('/feedback');return <FeedbackForm email={user.email}/>}
