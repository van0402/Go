const fs=require('fs');const {Client}=require('pg');
const url=fs.readFileSync('.env','utf8').split(/\r?\n/).find(l=>l.startsWith('DATABASE_URL=')).slice(13).trim().replace(/^["']|["']$/g,'');
(async()=>{const c=new Client({connectionString:url});await c.connect();
const q=async(s)=>console.log(s.slice(0,60),'\n',JSON.stringify((await c.query(s)).rows,null,0).slice(0,1500));
await q("select id,slug,generate_slug,_status from posts");
await q("select _locale,left(title,30) t,left(excerpt,20) e,(content is not null) has_c, length(content::text) len from posts_locales");
await q("select _parent_id,version__locale as loc,left(version_title,25) t,(version_content is not null) has_c,length(version_content::text) len from _posts_v_locales order by id desc limit 8");
await c.end()})().catch(e=>console.log('E',e.message))
