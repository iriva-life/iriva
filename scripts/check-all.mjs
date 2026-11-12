import {spawnSync} from 'node:child_process';
import {readdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
const cwd=fileURLToPath(new URL('../',import.meta.url));
const commands=[['node_modules/typescript/bin/tsc','--noEmit'],...readdirSync(new URL('../tests/',import.meta.url)).filter(n=>n.endsWith('.cjs')).sort().map(n=>['tests/'+n])];
for(const args of commands){process.stdout.write('\nChecking '+args[0]+'\n');const r=spawnSync(process.execPath,args,{cwd,stdio:'inherit'});if(r.error){process.stderr.write(r.error.message+'\n');process.exit(1)}if(r.status!==0)process.exit(r.status||1)}
process.stdout.write('\nAll source checks passed. Real deployment/authentication and browser QA remain required.\n');
