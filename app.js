(()=>{function te(t,e){if(e==="snake")return ue(t);if(e==="2048")return pe(t);if(e==="ttt")return ve(t);if(e==="memory")return ge(t);me(t)}function me(t){document.title="Games \xB7 Dropicgram";let e=[{key:"snake",icon:"\u{1F40D}",name:"Snake",desc:"Eat, grow, don't bite yourself."},{key:"2048",icon:"\u{1F3B2}",name:"2048",desc:"Merge tiles to reach the big one."},{key:"ttt",icon:"\u274C",name:"Tic-Tac-Toe",desc:"Classic 3-in-a-row, two players."},{key:"memory",icon:"\u{1F9E0}",name:"Memory",desc:"Flip cards and match pairs."}];t.el.innerHTML=`
    <div class="games-head">
      <h1>\u{1F3AE} Games</h1>
      <p>Quick games to kill time. Scores live in your browser.</p>
    </div>
    <div class="games-grid">
      ${e.map(a=>`
        <a class="card game-card" data-nav="${t.pathFor(`/games/${a.key}`)}" href="${t.pathFor(`/games/${a.key}`)}">
          <div class="game-icon">${a.icon}</div>
          <h3>${a.name}</h3>
          <p>${a.desc}</p>
        </a>`).join("")}
    </div>`}function Y(t,e,a,n){return document.title=`${e} \xB7 Dropicgram`,t.el.innerHTML=`
    <div class="game-shell">
      <div class="game-top">
        <a class="btn secondary" data-nav="${t.pathFor("/games")}" href="${t.pathFor("/games")}">\u2190 Games</a>
        <h1>${a} ${e}</h1>
        <button class="btn secondary" id="gamerestart">\u21BB Restart</button>
      </div>
      ${n}
    </div>`,t.el.querySelector("#gamerestart")}function ue(t){let e=Y(t,"Snake","\u{1F40D}",'<canvas id="snake" width="400" height="400"></canvas><div class="game-score" id="snakescore">0</div>'),a=t.el.querySelector("#snake"),n=t.el.querySelector("#snakescore"),s=20;a.width=400,a.height=400;let o=a.width/s,d=a.height/s,i=a.getContext("2d"),m=[],h={x:1,y:0},E={x:1,y:0},w={x:10,y:10},b=0,v=!0,f=0;function y(){for(;w={x:Math.floor(Math.random()*o),y:Math.floor(Math.random()*d)},!!m.some($=>$.x===w.x&&$.y===w.y););}function H(){m=[{x:4,y:4},{x:3,y:4},{x:2,y:4}],h=E={x:1,y:0},b=0,v=!0,y(),n.textContent="0"}function M(){if(!v)return;h=E;let $={x:m[0].x+h.x,y:m[0].y+h.y},L=$.x<0||$.y<0||$.x>=o||$.y>=d,U=m.some(G=>G.x===$.x&&G.y===$.y);if(L||U){v=!1,_();return}m.unshift($),$.x===w.x&&$.y===w.y?(b+=10,n.textContent=String(b),y()):m.pop(),_()}function _(){let $=getComputedStyle(t.el),L=$.getPropertyValue("--card").trim()||"#1a1d26",U=$.getPropertyValue("--border").trim()||"#282d3a",G=$.getPropertyValue("--accent").trim()||"#5e7bff",de=$.getPropertyValue("--accent-2").trim()||"#a06bff";i.fillStyle=L,i.fillRect(0,0,a.width,a.height),i.strokeStyle=U,i.lineWidth=1;for(let x=0;x<=o;x++)i.beginPath(),i.moveTo(x*s,0),i.lineTo(x*s,a.height),i.stroke();for(let x=0;x<=d;x++)i.beginPath(),i.moveTo(0,x*s),i.lineTo(a.width,x*s),i.stroke();i.fillStyle="#ff4d6d",i.beginPath(),i.arc(w.x*s+s/2,w.y*s+s/2,s/2-2,0,Math.PI*2),i.fill(),m.forEach((x,ce)=>{i.fillStyle=ce===0?G:de,i.fillRect(x.x*s+1,x.y*s+1,s-2,s-2)}),v||(i.fillStyle="rgba(0,0,0,0.55)",i.fillRect(0,0,a.width,a.height),i.fillStyle="#fff",i.font="bold 26px system-ui",i.textAlign="center",i.fillText(`Game over \xB7 ${b}`,a.width/2,a.height/2))}let I=($,L)=>{$===h.x&&L===h.y||$===-h.x||L===-h.y||(E={x:$,y:L})};document.addEventListener("keydown",$=>{if(!a.isConnected)return;let L=$.key;L.startsWith("Arrow")&&$.preventDefault(),(L==="ArrowUp"||L==="w")&&I(0,-1),(L==="ArrowDown"||L==="s")&&I(0,1),(L==="ArrowLeft"||L==="a")&&I(-1,0),(L==="ArrowRight"||L==="d")&&I(1,0)});let K=0,ee=0;a.addEventListener("touchstart",$=>{K=$.touches[0].clientX,ee=$.touches[0].clientY},{passive:!0}),a.addEventListener("touchmove",$=>{let L=$.touches[0].clientX-K,U=$.touches[0].clientY-ee;Math.abs(L)>Math.abs(U)&&Math.abs(L)>20?I(L>0?1:-1,0):Math.abs(U)>20&&I(0,U>0?1:-1)},{passive:!0}),e.addEventListener("click",H),H(),_(),f=window.setInterval(M,110);let le=()=>window.clearInterval(f);window.addEventListener("beforeunload",le)}function pe(t){let e=Y(t,"2048","\u{1F3B2}",'<div class="game-score" id="t2048score">0</div><div class="t-grid" id="t2048grid"></div>'),a=t.el.querySelector("#t2048grid"),n=t.el.querySelector("#t2048score"),s=[],o=0;function d(){s=Array.from({length:4},()=>Array(4).fill(0)),o=0,n.textContent="0",i(),i(),E()}function i(){let v=[];if(s.forEach((H,M)=>H.forEach((_,I)=>{_||v.push([I,M])})),!v.length)return;let[f,y]=v[Math.floor(Math.random()*v.length)];s[y][f]=Math.random()<.9?2:4}function m(v){let f=v.filter(Boolean),y=[],H=0;for(let M=0;M<f.length;M++)if(f[M]===f[M+1]){let _=f[M]*2;y.push(_),o+=_,H++,M++}else y.push(f[M]);for(;y.length<4;)y.push(0);return y}function h(v){let f=JSON.stringify(s);if(v==="left"&&(s=s.map(m)),v==="right"&&(s=s.map(y=>m([...y].reverse()).reverse())),v==="up")for(let y=0;y<4;y++)m([s[0][y],s[1][y],s[2][y],s[3][y]]).forEach((M,_)=>s[_][y]=M);if(v==="down")for(let y=0;y<4;y++)m([s[3][y],s[2][y],s[1][y],s[0][y]]).reverse().forEach((M,_)=>s[_][y]=M);JSON.stringify(s)!==f&&(n.textContent=String(o),i(),E())}function E(){document.title=`2048 \xB7 ${o} \xB7 Dropicgram`,a.innerHTML=s.map(v=>v.map(f=>`<div class="t-cell t-${f}">${f||""}</div>`).join("")).join("")}document.addEventListener("keydown",v=>{if(!a.isConnected)return;let f=v.key;f.startsWith("Arrow")&&v.preventDefault(),(f==="ArrowUp"||f==="w")&&h("up"),(f==="ArrowDown"||f==="s")&&h("down"),(f==="ArrowLeft"||f==="a")&&h("left"),(f==="ArrowRight"||f==="d")&&h("right")});let w=0,b=0;a.addEventListener("touchstart",v=>{w=v.touches[0].clientX,b=v.touches[0].clientY},{passive:!0}),a.addEventListener("touchend",v=>{let f=v.changedTouches[0].clientX-w,y=v.changedTouches[0].clientY-b;Math.abs(f)<15&&Math.abs(y)<15||(Math.abs(f)>Math.abs(y)?h(f>0?"right":"left"):h(y>0?"down":"up"))},{passive:!0}),e.addEventListener("click",d),d()}function ve(t){let e=Y(t,"Tic-Tac-Toe","\u274C",'<div class="game-score" id="tttbody"></div><div class="ttt-grid" id="tttgrid"></div>'),a=t.el.querySelector("#tttgrid"),n=t.el.querySelector("#tttbody"),s=Array(9).fill(0),o=1,d=0,i=["","X","O"],m=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];function h(){for(let[v,f,y]of m)if(s[v]&&s[v]===s[f]&&s[v]===s[y])return s[v];return s.every(Boolean)?-1:0}function E(){a.innerHTML=s.map(v=>`<button class="ttt-cell">${i[v]}</button>`).join("")}function w(){d===-1?n.textContent="Draw!":d?n.textContent=`${i[d]} wins!`:n.textContent=`${i[o]} to move`}b();function b(){s=Array(9).fill(0),o=1,d=0,E(),w()}a.addEventListener("click",v=>{let f=v.target.closest(".ttt-cell");if(!f||d)return;let y=Array.from(a.children).indexOf(f);s[y]||(s[y]=o,d=h(),d||(o=o===1?2:1),E(),w())}),e.addEventListener("click",b)}function ge(t){let e=Y(t,"Memory","\u{1F9E0}",'<div class="game-score" id="memscore">Pairs: 0/8 \xB7 Moves: 0</div><div class="mem-grid" id="memgrid"></div>'),a=t.el.querySelector("#memgrid"),n=t.el.querySelector("#memscore"),s=["\u{1F34E}","\u{1F34C}","\u{1F347}","\u{1F353}","\u{1F352}","\u{1F95D}","\u{1F349}","\u{1F34D}"],o=[],d=[],i=0,m=0,h=!1;function E(){a.innerHTML=o.map((b,v)=>{let f=d.includes(v)||b==="";return`<button class="mem-cell ${f?"up":""}" data-i="${v}">${f?b:"\u2754"}</button>`}).join("")}function w(){o=[...s,...s].sort(()=>Math.random()-.5),d=[],i=0,m=0,h=!1,E(),n.textContent="Pairs: 0/8 \xB7 Moves: 0"}a.addEventListener("click",b=>{let v=b.target.closest(".mem-cell");if(!v||h)return;let f=Number(v.dataset.i);if(!(d.includes(f)||o[f]==="")&&(d.push(f),E(),d.length===2)){h=!0,m++;let[y,H]=d;o[y]===o[H]?(i++,o[y]=o[H]="",d=[],h=!1,i===s.length?n.textContent=`You win! ${m} moves`:n.textContent=`Pairs: ${i}/8 \xB7 Moves: ${m}`,E()):(n.textContent=`Pairs: ${i}/8 \xB7 Moves: ${m}`,setTimeout(()=>{d=[],h=!1,E()},700))}}),e.addEventListener("click",w),w()}var C=window.DROPIC_BASE||"",B=window.DROPIC_API||"",fe=window.matchMedia("(max-width: 768px)").matches,J=null,ae=null,V=null,u=document.getElementById("app"),X=document.getElementById("userbox"),Z=document.getElementById("toast"),p=null,q={dark_mode:1,notif_likes:1,notif_comments:1,notif_follows:1,notif_mentions:1,notif_messages:1};function l(t){return C+t}function P(t){return t?t.startsWith("http")?t:B+t:""}function r(t){return String(t??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function g(t){Z.textContent=t,Z.classList.add("show"),clearTimeout(g._t),g._t=window.setTimeout(()=>Z.classList.remove("show"),2200)}async function c(t,e={}){let a={"Content-Type":"application/json",...e.headers},n=localStorage.getItem("token");n&&(a.Authorization=`Bearer ${n}`);let s=await fetch(B+t,{...e,headers:a,credentials:"include"}),o=await s.json().catch(()=>({}));if(!s.ok)throw new Error(o.error||"Something went wrong");return o}async function W(t,e){let a=localStorage.getItem("token"),n={};a&&(n.Authorization=`Bearer ${a}`);let s=await fetch(B+t,{method:"POST",body:e,headers:n,credentials:"include"}),o=await s.json().catch(()=>({}));if(!s.ok){let d=new Error(o.error||"Upload failed");throw d.status=s.status,d.body=o,d}return o}function N(t){let e=new Date(t.replace(" ","T")+"Z"),a=Math.floor((Date.now()-e.getTime())/1e3);return a<60?"just now":a<3600?`${Math.floor(a/60)}m`:a<86400?`${Math.floor(a/3600)}h`:a<604800?`${Math.floor(a/86400)}d`:e.toLocaleDateString()}function R(t){return r(t).replace(/(^|\s)#([a-zA-Z0-9_]+)/g,(e,a,n)=>{let s=l(`/hashtag/${n}`);return`${a}<a href="${s}" data-nav="${s}" class="taglink">#${n}</a>`}).replace(/(^|\s)@([a-zA-Z0-9_]+)/g,(e,a,n)=>{let s=l(`/${n}`);return`${a}<a href="${s}" data-nav="${s}" class="taglink">@${n}</a>`})}function S(t,e=34){let a=r((t.display_name||"?").charAt(0).toUpperCase()),n="is_verified"in t&&t.is_verified?'<span class="verify">\u2713</span>':"";return t.avatar?`<span class="avwrap" style="width:${e}px;height:${e}px">${n}<img class="avatar" src="${P(t.avatar)}" alt="" /></span>`:`<span class="avwrap" style="width:${e}px;height:${e}px">${n}<span class="avatar">${a}</span></span>`}var O={heart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg>',bubble:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.5L3 21l2-5.6A8.5 8.5 0 1 1 21 11.5Z"/></svg>',repost:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 2l4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>',bookmark:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z"/></svg>',pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 17v5"/><path d="M9 10.8V5l-1.5-2h9L15 5v5.8L18 16H6Z"/></svg>',share:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg>',dots:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>',bell:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>'};function A(){if(!p){X.innerHTML=`<a href="${l("/login")}" class="btn" data-nav="${l("/login")}">Log in</a>`;return}X.innerHTML=`
    <a href="${l(`/${r(p.username)}`)}" class="avatar-link" data-nav="${l(`/${r(p.username)}`)}">
      ${S(p)} <span class="uname">${r(p.username)}</span>
    </a>
    <button class="act-btn" data-action="logout" title="Log out">Log out</button>`}function ye(){document.querySelectorAll(".nav-item").forEach(t=>{let e=t,a=l(e.dataset.navKey||"");e.classList.toggle("active",location.pathname===a)})}async function D(){if(p)try{let t=await c("/api/notifications/unread");document.querySelectorAll("[data-unread]").forEach(e=>{let a=e;t.unread>0?(a.textContent=String(t.unread),a.style.display="flex"):a.style.display="none"})}catch{}}function he(t="Share something\u2026"){return`
  <div class="compose-bar">
    <form id="postform">
      <div class="compose-row">
        ${p?S(p):""}
        <textarea class="input" name="body" rows="2" placeholder="${r(t)}" maxlength="280"></textarea>
      </div>
      <div class="compose-count" id="ccount">0/280</div>
      <div id="pollbox" hidden>
        <input class="input" name="poll_question" placeholder="Poll question" maxlength="140" />
        <input class="input" name="poll_op1" placeholder="Option 1" maxlength="50" />
        <input class="input" name="poll_op2" placeholder="Option 2" maxlength="50" />
      </div>
      <div class="compose-actions">
        <label class="btn secondary" style="cursor:pointer">
          \u{1F4F7}
          <input type="file" name="image" accept="image/*" hidden />
        </label>
        <button type="button" class="btn secondary" id="pollbtn">\u{1F4CA} Poll</button>
        <button type="button" class="btn secondary" id="draftbtn">\u{1F4BE} Draft</button>
        <span id="picname" class="username"></span>
        <button class="btn" style="margin-left:auto">Post</button>
      </div>
    </form>
  </div>`}function be(){let t=u.querySelector("textarea[name=body]"),e=u.querySelector("#ccount");if(t&&e){let i=()=>{e.textContent=`${t.value.length}/280`,e.classList.toggle("full",t.value.length>=280)};t.addEventListener("input",i),i()}let a=u.querySelector("#pollbox"),n=u.querySelector("#pollbtn");n&&n.addEventListener("click",()=>a.hidden=!a.hidden);let s=u.querySelector("#draftbtn");s&&s.addEventListener("click",async()=>{let i=t.value.trim();if(!i)return g("Nothing to save");try{await c("/api/misc/drafts",{method:"POST",body:JSON.stringify({body:i})}),g("Saved to drafts")}catch(m){g(m.message)}});let o=u.querySelector('input[name="image"]');o&&o.addEventListener("change",()=>{let i=o.files?.[0];document.getElementById("picname").textContent=i?i.name:""});let d=document.getElementById("postform");d.addEventListener("submit",async i=>{i.preventDefault();let m=new FormData(d);if(!String(m.get("body")??"").trim()&&!m.get("image"))return g("Add text or a photo");let E=String(m.get("poll_question")??"").trim();if(E){let w=[String(m.get("poll_op1")??""),String(m.get("poll_op2")??"")].filter(Boolean);if(w.length<2)return g("Polls need 2+ options");m.append("poll_question",JSON.stringify({question:E,options:w})),m.delete("poll_op1"),m.delete("poll_op2")}try{await W("/api/posts",m),d.reset(),document.getElementById("picname").textContent="",e&&(e.textContent="0/280"),g("Posted"),k()}catch(w){let b=w;if(b.status===409&&b.body?.original_username){let v=b.body.original_display_name||b.body.original_username,f=b.body.exact_match?"exact match":`match score ${b.body.distance}/64`;g(`Already uploaded by @${b.body.original_username} (${f})`)}else g(b.message)}})}async function we(){try{let t=await c("/api/stories"),e=new Map;for(let n of t.stories)e.has(n.user_id)||e.set(n.user_id,[]),e.get(n.user_id).push(n);let a=[...e.entries()];return`
    <div class="stories">
      ${p?'<button class="story-add" data-action="add-story" title="Add story">+</button>':""}
      ${a.map(([n,s])=>`
        <button class="story-ring ${s.some(o=>o.viewed)?"seen":""}" data-action="view-story" data-uid="${n}">
          ${S(s[0],56)}
          <span>${r(s[0].username)}</span>
        </button>`).join("")}
    </div>`}catch{return""}}function $e(t){return t.voted_option!=null?`<div class="poll">
      <div class="poll-q">${r(t.question)}</div>
      ${t.options.map(e=>{let a=t.total_votes?Math.round(e.votes/t.total_votes*100):0;return`<div class="poll-result ${e.id===t.voted_option?"mine":""}">
          <div class="poll-bar" style="width:${a}%"></div>
          <span>${r(e.text)} \u2014 ${a}% (${e.votes})</span>
        </div>`}).join("")}
      <div class="poll-total">${t.total_votes} votes</div>
    </div>`:`<div class="poll">
    <div class="poll-q">${r(t.question)}</div>
    ${t.options.map(e=>`<button class="poll-opt" data-action="vote" data-opt="${e.id}">${r(e.text)}</button>`).join("")}
  </div>`}function Ee(t){return!t.original_post_id||!t.op_display_name&&!t.op_body&&!t.op_image?"":`<div class="quoted">
    <div class="post-header">
      ${S({avatar:t.op_avatar,display_name:t.op_display_name||""},24)}
      <span>${r(t.op_display_name)}</span>
      ${t.op_created_at?`<span class="time">${N(t.op_created_at)}</span>`:""}
    </div>
    ${t.op_image?`<img class="post-img q" src="${P(t.op_image)}" loading="lazy" />`:""}
    ${t.op_body?`<div class="q-body">${R(t.op_body)}</div>`:""}
  </div>`}function F(t){let e=t.liked_by_me?" liked":"",a=t.original_post_id&&!t.op_body,n=t.reactions||[],s=t.comments||[];return`
  <article class="post" data-postid="${t.id}">
    ${a?`<div class="repost-label">${O.repost} reposted</div>`:""}
    <div class="post-header">
      <a href="${l(`/${r(t.username)}`)}" data-nav="${l(`/${r(t.username)}`)}">${S(t)}</a>
      <a href="${l(`/${r(t.username)}`)}" data-nav="${l(`/${r(t.username)}`)}">${r(t.display_name)}</a>
      <span class="username">@${r(t.username)}</span>
      ${t.pinned?`<span class="pinbadge">${O.pin}</span>`:""}
      <span class="time">${N(t.created_at)}${t.edited_at?" \xB7 edited":""}</span>
      <div class="dropdown">
        <button class="dots" data-action="menu">${O.dots}</button>
        <div class="menu" hidden>
          ${p?`
            <button data-action="report">\u{1F6A9} Report</button>
            <button data-action="share">\u{1F517} Share</button>
            <button data-action="repost">\u{1F501} Repost</button>
            <button data-action="quote">\u{1F4AC} Quote</button>
            ${t.bookmarked?'<button data-action="unsave">\u{1F516} Unsave</button>':'<button data-action="save">\u{1F516} Save</button>'}
          `:""}
          ${t.is_owner?`
            <button data-action="pin">${t.pinned?"\u{1F4CC} Unpin":"\u{1F4CC} Pin"}</button>
            <button data-action="edit">\u270F\uFE0F Edit</button>
            <button data-action="delete">\u{1F5D1}\uFE0F Delete</button>
          `:""}
          ${p&&p.username!==t.username?`
            <button data-action="mute">\u{1F515} Mute @${r(t.username)}</button>
            <button data-action="block">\u{1F6AB} Block @${r(t.username)}</button>
          `:""}
        </div>
      </div>
    </div>
    ${Ee(t)}
    ${t.image?`<img class="post-img" data-lightbox src="${P(t.image)}" alt="" loading="lazy" />`:""}
    ${t.body?`<div class="post-body">${R(t.body)}</div>`:""}
    ${t.poll?$e(t.poll):""}
    ${n.length?`<div class="reactions">${n.map(o=>`${o.emoji}`).join("")}</div>`:""}
    <div class="post-actions">
      <button class="act-btn${e}" data-action="like">${O.heart} <span>${t.likes_count}</span></button>
      <button class="act-btn" data-action="react">\u{1F60D}</button>
      <button class="act-btn" data-action="toggle-comments">${O.bubble} <span>${t.comments_count}</span></button>
      <button class="act-btn" data-action="repost">${O.repost} <span>${t.reposts_count}</span></button>
    </div>
    <div class="post-comments" data-comments ${s.length>0?"":"hidden"}>
      <div data-comment-list>
        ${s.map(o=>ie(o,t.id)).join("")}
      </div>
      ${p?`<form class="comment-form" data-action="comment">
        <label class="btn secondary" style="cursor:pointer;padding:8px 12px">\u{1F4F7}<input type="file" name="image" accept="image/*" hidden /></label>
        <input class="input" name="body" placeholder="Add a comment..." autocomplete="off" />
        <button class="btn">Post</button>
      </form>`:""}
    </div>
  </article>`}function ie(t,e){let a=t.replies||[];return`
  <div class="comment" data-comment="${t.id}">
    ${S(t,30)}
    <div class="c-main">
      <div class="c-meta">
        <a href="${l(`/${r(t.username)}`)}" data-nav="${l(`/${r(t.username)}`)}">${r(t.display_name)}</a>
        <span class="c-time"> \xB7 ${N(t.created_at)}</span>
      </div>
      ${t.image?`<img class="comment-img" data-lightbox src="${P(t.image)}" loading="lazy" />`:""}
      <div class="c-body">${R(t.body)}</div>
      <div class="c-actions">
        <button class="mini-btn" data-action="like-comment" data-cid="${t.id}">${t.likes_count?`${t.liked_by_me?"\u2665":"\u2661"} ${t.likes_count}`:"\u2661"}</button>
        <button class="mini-btn" data-action="reply" data-cid="${t.id}">Reply</button>
      </div>
      ${a.length?Le(a):""}
    </div>
  </div>`}function Le(t){return t.length?`<div class="replies">${t.map(e=>`
    <div class="comment reply" data-comment="${e.id}">
      ${S(e,26)}
      <div class="c-main">
        <div class="c-meta">
          <a href="${l(`/${r(e.username)}`)}" data-nav="${l(`/${r(e.username)}`)}">${r(e.display_name)}</a>
          <span class="c-time"> \xB7 ${N(e.created_at)}</span>
        </div>
        ${e.image?`<img class="comment-img" data-lightbox src="${P(e.image)}" loading="lazy" />`:""}
        <div class="c-body">${R(e.body)}</div>
      </div>
    </div>`).join("")}</div>`:""}function T(){document.title="Dropicgram",u.innerHTML=`
  <div class="auth-wrap">
    <span class="logo-big">Dropicgram</span>
    <p class="tag">Share photos and moments with the world</p>
    <div class="tabs">
      <button class="tab active" data-tab="login">Log in</button>
      <button class="tab" data-tab="register">Sign up</button>
    </div>
    <div class="card">
      <form data-form="login">
        <label class="field">Username</label>
        <input class="input" name="username" autocomplete="username" required />
        <label class="field">Password</label>
        <input class="input" name="password" type="password" autocomplete="current-password" required />
        <button class="btn" style="width:100%">Log in</button>
      </form>
      <form data-form="register" hidden>
        <label class="field">Username</label>
        <input class="input" name="username" autocomplete="username" required />
        <label class="field">Display name</label>
        <input class="input" name="display_name" autocomplete="nickname" />
        <label class="field">Password (min 6 chars)</label>
        <input class="input" name="password" type="password" autocomplete="new-password" required />
        <button class="btn" style="width:100%">Create account</button>
      </form>
    </div>
  </div>`;let t=Array.from(u.querySelectorAll(".tab"));t.forEach(e=>e.addEventListener("click",()=>{t.forEach(n=>n.classList.remove("active")),e.classList.add("active");let a=e.dataset.tab;u.querySelector('[data-form="login"]').hidden=a!=="login",u.querySelector('[data-form="register"]').hidden=a!=="register"})),u.querySelectorAll("form[data-form]").forEach(e=>{e.addEventListener("submit",async a=>{a.preventDefault();let n=e.querySelector("button");n.disabled=!0;let s=e.dataset.form==="login"?"login":"register",o=new FormData(e),d={username:String(o.get("username")??""),password:String(o.get("password")??"")};s==="register"&&(d.display_name=String(o.get("display_name")||d.username));try{let i=await c(`/api/auth/${s}`,{method:"POST",body:JSON.stringify(d)});i.token&&localStorage.setItem("token",i.token),p=i.user,A(),Q(),history.pushState({},"",l("/")),k()}catch(i){g(i.message),n.disabled=!1}})})}async function ke(){if(!p)return T();document.title="Home \xB7 Dropicgram",u.innerHTML=`${he()}<div id="stories"></div><div id="feed"><div class="skeleton"></div><div class="skeleton"></div></div><div class="load-more"><button class="btn secondary" id="loadmore" hidden>Load more</button></div>`,be();let t=await we();document.getElementById("stories").innerHTML=t,je();let e=null,a=!1;async function n(o=!1){if(!a){a=!0;try{let d=new URLSearchParams;e&&!o&&d.set("before",e);let i=document.getElementById("mediafilter");i&&i.classList.contains("active")&&d.set("media","1");let m=await c(`/api/posts/feed?${d.toString()}`),h=document.getElementById("feed");if(o&&(h.innerHTML=""),!m.posts.length){o&&(h.innerHTML=`<div class="empty">Nothing here yet.<br />Follow some people or post your first pic!<br /><a class="btn" data-nav="${l("/explore")}" href="${l("/explore")}">Explore</a></div>`);return}h.innerHTML+=m.posts.map(F).join(""),e=m.posts[m.posts.length-1].created_at;let w=document.getElementById("loadmore");w&&(w.hidden=m.posts.length<25),j(h),D()}catch(d){g(d.message)}finally{a=!1}}}let s=document.getElementById("loadmore");if(s&&s.addEventListener("click",()=>n()),fe){let o=0;u.addEventListener("touchstart",d=>{window.scrollY<=0?o=d.touches[0].clientY:o=0},{passive:!0}),u.addEventListener("touchend",d=>{o&&window.scrollY<=0&&d.changedTouches[0].clientY>o+80&&n(!0),o=0},{passive:!0})}n(!0)}async function Te(){document.title="Explore \xB7 Dropicgram",u.innerHTML=`
    <div class="explore-tools">
      <input class="input" id="globalsearch" placeholder="Search users, posts, #hashtags" />
      <button class="btn secondary" id="mediafilter">\u{1F4F7} Media only</button>
      <a class="btn secondary" data-nav="${l("/users")}" href="${l("/users")}">\u{1F465} Users</a>
    </div>
    <div id="feed"><div class="skeleton"></div></div>
    <div id="trends" class="card"><h2>Trending</h2><div class="trend-list"></div></div>`;let t=document.getElementById("globalsearch");t.addEventListener("keydown",a=>{if(a.key==="Enter"){let n=t.value.trim();n&&(history.pushState({},"",l(`/search/${encodeURIComponent(n)}`)),k())}});try{let a=await c("/api/search/trending");document.querySelector(".trend-list").innerHTML=a.trends.length?a.trends.map(n=>`<a class="trend" data-nav="${l(`/hashtag/${r(n.tag)}`)}" href="${l(`/hashtag/${r(n.tag)}`)}">#${r(n.tag)} <span>${n.count}</span></a>`).join(""):'<div class="empty">No trends yet</div>'}catch{}let e=document.getElementById("feed");try{let a=await c("/api/posts/explore");e.innerHTML=a.posts.map(F).join("")||'<div class="empty">No posts yet \u2014 be the first!</div>',j(e)}catch(a){e.innerHTML=`<div class="empty">${r(a.message)}</div>`}}async function Se(t){document.title="Search \xB7 Dropicgram",u.innerHTML='<h1 style="margin:4px 4px 14px">Search</h1><div id="results"></div>';let e=await c(`/api/search?q=${encodeURIComponent(t)}`),a="";e.users.length&&(a+=`<div class="card"><h2>People</h2>${e.users.map(n=>`
      <div class="userrow">
        <a href="${l(`/${r(n.username)}`)}" data-nav="${l(`/${r(n.username)}`)}">${S(n,40)} <b>${r(n.display_name)}</b> <span class="username">@${r(n.username)}</span></a>
      </div>`).join("")}</div>`),e.hashtags.length&&(a+=`<div class="card"><h2>Hashtags</h2>${e.hashtags.map(n=>`<a class="trend" data-nav="${l(`/hashtag/${r(n.tag)}`)}" href="${l(`/hashtag/${r(n.tag)}`)}">#${r(n.tag)} <span>${n.count}</span></a>`).join("")}</div>`),e.posts.length&&(a+=`<div id="posts">${e.posts.map(F).join("")}</div>`),!e.users.length&&!e.posts.length&&!e.hashtags.length&&(a='<div class="empty">Nothing found for "'+r(t)+'"</div>'),document.getElementById("results").innerHTML=a,j(u)}async function Me(t){document.title=`#${t} \xB7 Dropicgram`,u.innerHTML=`<h1 style="margin:4px 4px 14px">#${r(t)}</h1><div id="feed"></div>`;let e=await c(`/api/search/hashtag/${encodeURIComponent(t)}`);document.getElementById("feed").innerHTML=e.posts.map(F).join("")||'<div class="empty">No posts with this tag yet.</div>',j(u)}async function _e(){document.title="Users \xB7 Dropicgram",u.innerHTML=`
    <h1 style="margin:4px 4px 14px">Users</h1>
    <div class="explore-tools">
      <input class="input" id="usersearch" placeholder="Search people\u2026" autocomplete="off" />
    </div>
    <div id="userlist"><div class="skeleton"></div></div>`;let t=document.getElementById("usersearch"),e=document.getElementById("userlist"),a=[];function n(s){let o=(s||"").toLowerCase(),d=o?a.filter(i=>i.username.toLowerCase().includes(o)||(i.display_name||"").toLowerCase().includes(o)):a;if(!d.length){e.innerHTML='<div class="empty">No users found.</div>';return}e.innerHTML=d.map(i=>`
      <div class="card userrow" data-username="${r(i.username)}">
        <a href="${l(`/${r(i.username)}`)}" data-nav="${l(`/${r(i.username)}`)}">
          ${S(i,44)}
          <div class="uinfo">
            <div class="uname-row"><b>${r(i.display_name)}</b> <span class="username">@${r(i.username)}</span></div>
            <div class="umeta">${i.posts_count} posts \xB7 ${i.followers_count} followers</div>
          </div>
        </a>
        ${p&&p.username!==i.username?`
          <button class="btn ${i.is_following?"following":""}" data-action="follow-user" data-u="${r(i.username)}">
            ${i.is_following?"Following \u2713":"Follow"}
          </button>`:""}
      </div>`).join(""),e.querySelectorAll("[data-action=follow-user]").forEach(i=>i.addEventListener("click",async()=>{let m=i.dataset.u,h=i.closest(".userrow"),E=i.classList.contains("following"),w=E?"unfollow":"follow";try{await c(`/api/users/${m}/${w}`,{method:"POST"});let b=a.find(v=>v.username===m);b&&(b.is_following=!E,b.followers_count+=E?-1:1),n(t.value)}catch(b){g(b.message)}}))}t.addEventListener("input",()=>n(t.value));try{a=(await c("/api/search/users")).users,n()}catch(s){e.innerHTML=`<div class="empty">${r(s.message)}</div>`}}async function ne(t){if(!p)return T();document.title=`${t} \xB7 Dropicgram`,u.innerHTML='<div class="skeleton"></div>';try{let e=await c(`/api/posts/user/${encodeURIComponent(t)}`),a=e.user,n=p?.username===a.username;u.innerHTML=`
      <div class="profile">
        ${a.cover?`<div class="cover"><img src="${P(a.cover)}" /></div>`:'<div class="cover plain"></div>'}
        <div class="profile-body">
          <div class="profile-head">
            ${S(a,80)}
            <div class="profile-meta">
              <h1>${r(a.display_name)}${a.is_verified?' <span class="verify big">\u2713</span>':""}</h1>
              <div class="uname">@${r(a.username)}</div>
              <div class="profile-stats">
                <span><b>${a.posts_count}</b> posts</span>
                <span><a data-nav="${l(`/followers/${r(a.username)}`)}" href="${l(`/followers/${r(a.username)}`)}"><b>${a.followers_count}</b> followers</a></span>
                <span><a data-nav="${l(`/following/${r(a.username)}`)}" href="${l(`/following/${r(a.username)}`)}"><b>${a.following_count}</b> following</a></span>
              </div>
              ${a.is_private?'<div class="private-badge">\u{1F512} Private account</div>':""}
              ${a.bio?`<div class="profile-bio">${r(a.bio)}</div>`:""}
              <div class="profile-joined">Joined ${new Date(a.created_at.replace(" ","T")+"Z").toLocaleDateString()}</div>
            </div>
          </div>
          <div class="profile-actions">
            ${n?`
              <a class="btn secondary" data-nav="${l("/settings/edit")}" href="${l("/settings/edit")}">\u270F\uFE0F Edit profile</a>
              <a class="btn secondary" data-nav="${l("/settings")}" href="${l("/settings")}">\u2699\uFE0F Settings</a>
              <button class="btn secondary" data-action="add-story">\u{1F4F8} Add story</button>
            `:`
              <button class="btn ${a.is_following?"following":""}" data-action="follow">${a.is_following?"Following \u2713":a.requested?"Requested \u2713":"Follow"}</button>
              <button class="btn secondary" data-action="dm">\u{1F4AC} Message</button>
              <div class="dropdown">
                <button class="dots" data-action="menu">${O.dots}</button>
                <div class="menu" hidden>
                  <button data-action="report-user">\u{1F6A9} Report</button>
                  <button data-action="mute-user">${a.is_muted?"\u{1F514} Unmute":"\u{1F515} Mute"}</button>
                  <button data-action="block-user">\u{1F6AB} Block</button>
                </div>
              </div>
            `}
          </div>
        </div>
      </div>
      <div id="feed">${e.posts.map(F).join("")||'<div class="empty">No posts yet.</div>'}</div>`,j(u),xe(a)}catch(e){u.innerHTML=`<div class="empty">${r(e.message)}</div>`}}function xe(t){let e=u.querySelector('[data-action="follow"]');e&&e.addEventListener("click",async()=>{let n=t.is_following?"unfollow":"follow",s=await c(`/api/users/${t.username}/${n}`,{method:"POST"});t.is_following=n==="follow"&&!s.requested,t.requested=!!s.requested,e.textContent=t.is_following?"Following \u2713":t.requested?"Requested \u2713":"Follow",e.classList.toggle("following",t.is_following)});let a=u.querySelector('[data-action="dm"]');a&&a.addEventListener("click",()=>{history.pushState({},"",l(`/messages/${r(t.username)}`)),k()})}async function se(t,e){document.title=`${e} \xB7 ${t} \xB7 Dropicgram`,u.innerHTML=`<h1 style="margin:4px 4px 14px">${e==="followers"?"Followers":"Following"}</h1><div id="list"></div>`;let a=await c(`/api/search/${e}/${encodeURIComponent(t)}`);document.getElementById("list").innerHTML=a.users.length?a.users.map(n=>`
      <div class="card userrow">
        <a href="${l(`/${r(n.username)}`)}" data-nav="${l(`/${r(n.username)}`)}">${S(n,40)} <b>${r(n.display_name)}</b> <span class="username">@${r(n.username)}</span></a>
      </div>`).join(""):'<div class="empty">No users here.</div>'}async function He(){if(!p)return T();document.title="Notifications \xB7 Dropicgram",u.innerHTML='<div class="pagehead"><h1>Notifications</h1><button class="btn secondary" id="readall">Mark all read</button></div><div id="list"><div class="skeleton"></div></div>';let t=await c("/api/notifications");document.getElementById("list").innerHTML=t.notifications.length?t.notifications.map(e=>`
      <div class="card notif ${e.read?"":"unread"}">
        <a href="${l(`/${r(e.actor.username)}`)}" data-nav="${l(`/${r(e.actor.username)}`)}">${S(e.actor,40)}</a>
        <div class="notif-body">
          <div><b>${r(e.actor.display_name)}</b> <span class="username">@${r(e.actor.username)}</span> ${r(e.label)}</div>
          ${e.post_body?`<div class="notif-post">${R(e.post_body)}</div>`:""}
          <div class="c-time">${N(e.created_at)}</div>
        </div>
        ${e.post_id?`<a class="btn secondary" data-nav="${l(`/post/${e.post_id}`)}" href="${l(`/post/${e.post_id}`)}">View</a>`:""}
      </div>`).join(""):'<div class="empty">No notifications yet.</div>',document.getElementById("readall").addEventListener("click",async()=>{await c("/api/notifications/read-all",{method:"POST"}),document.querySelectorAll(".notif").forEach(e=>e.classList.remove("unread")),D(),g("Marked all as read")})}async function qe(t){document.title="Post \xB7 Dropicgram",u.innerHTML='<div class="skeleton"></div>';let e=await c(`/api/posts/${t}`);u.innerHTML=`<div id="feed">${F(e.post)}</div>`,j(u)}async function Pe(){if(!p)return T();document.title="Messages \xB7 Dropicgram",u.innerHTML='<h1 style="margin:4px 4px 14px">Messages</h1><div id="list"><div class="skeleton"></div></div>';let t=await c("/api/messages/conversations");document.getElementById("list").innerHTML=t.conversations.length?t.conversations.map(e=>`
      <a class="card conv" data-nav="${l(`/messages/${r(e.other.username)}`)}" href="${l(`/messages/${r(e.other.username)}`)}">
        ${S(e.other,44)}
        <div>
          <div><b>${r(e.other.display_name)}</b> ${e.unread?`<span class="badge">${e.unread}</span>`:""}</div>
          <div class="username">${r(e.last_message)}</div>
        </div>
        <span class="time">${N(e.last_at)}</span>
      </a>`).join(""):'<div class="empty">No messages yet.</div>'}async function Ie(t){if(!p)return T();document.title=`${t} \xB7 Dropicgram`,u.innerHTML=`
    <div class="pagehead">
      <button class="btn secondary" data-action="back">\u2190</button>
      <h1>@${r(t)}</h1>
    </div>
    <div id="msgs" class="thread"></div>
    <div class="compose-bar msgbar">
      <form id="msgform">
        <label class="btn secondary" style="cursor:pointer">\u{1F4F7}<input type="file" name="image" accept="image/*" hidden /></label>
        <input class="input" name="body" placeholder="Message..." autocomplete="off" />
        <button class="btn">Send</button>
      </form>
    </div>`,u.querySelector('[data-action="back"]').addEventListener("click",()=>{history.pushState({},"",l("/messages")),k()});let e=document.getElementById("msgs"),a=document.createElement("div");a.id="typing-ind",a.className="mtime typing-ind",e.appendChild(a);async function n(){let i=await c(`/api/messages/${encodeURIComponent(t)}`);e.innerHTML=i.messages.map(m=>`
      <div class="msg ${m.sender}">
        ${m.image?`<img data-lightbox src="${P(m.image)}" />`:""}
        ${m.body?`<div>${R(m.body)}</div>`:""}
        <div class="mtime">${N(m.created_at)}${m.sender==="me"?` ${m.read?"\u2713\u2713":"\u2713"}`:""}</div>
      </div>`).join("")||'<div class="empty">Say hi \u{1F44B}</div>',e.appendChild(a),e.scrollTop=e.scrollHeight}await n(),V=i=>{i.type==="dm"&&String(i.from)!==String(p?.id)?location.pathname.includes(`/messages/${encodeURIComponent(t)}`)&&n():i.type==="typing"&&String(i.from)!==String(p?.id)?(a.textContent="typing\u2026",clearTimeout(a._t),a._t=window.setTimeout(()=>a.textContent="",2e3)):i.type==="read"&&n()};let s=u.querySelector('input[name="body"]'),o=0;s.addEventListener("input",()=>{let i=Date.now();i-o>1500&&(o=i,Ge({type:"typing",to:p&&t?t:""}))}),document.getElementById("msgform").addEventListener("submit",async i=>{i.preventDefault();let m=i.target,h=new FormData(m);if(!(!String(h.get("body")??"").trim()&&!h.get("image")))try{await W(`/api/messages/${encodeURIComponent(t)}`,h),m.reset(),await n(),D()}catch(w){g(w.message)}})}async function Ce(){if(!p)return T();document.title="Saved \xB7 Dropicgram",u.innerHTML='<h1 style="margin:4px 4px 14px">\u{1F516} Saved posts</h1><div id="feed"><div class="skeleton"></div></div>';let t=await c("/api/misc/bookmarks");document.getElementById("feed").innerHTML=t.posts.map(F).join("")||'<div class="empty">No saved posts yet.</div>',j(u)}async function Ae(){if(!p)return T();document.title="Follow requests \xB7 Dropicgram",u.innerHTML='<h1 style="margin:4px 4px 14px">Follow requests</h1><div id="list"></div>';let t=await c("/api/search/requests");document.getElementById("list").innerHTML=t.users.length?t.users.map(e=>`
      <div class="card userrow">
        <a href="${l(`/${r(e.username)}`)}" data-nav="${l(`/${r(e.username)}`)}">${S(e,40)} <b>${r(e.display_name)}</b></a>
        <button class="btn" data-action="accept" data-u="${r(e.username)}">Accept</button>
        <button class="btn secondary" data-action="decline" data-u="${r(e.username)}">Decline</button>
      </div>`).join(""):'<div class="empty">No pending requests.</div>',document.querySelectorAll("[data-action=accept]").forEach(e=>e.addEventListener("click",async()=>{let a=e.dataset.u;await c(`/api/users/requests/${a}/accept`,{method:"POST"}),e.closest(".userrow").remove(),g("Accepted")})),document.querySelectorAll("[data-action=decline]").forEach(e=>e.addEventListener("click",async()=>{let a=e.dataset.u;await c(`/api/users/requests/${a}/decline`,{method:"POST"}),e.closest(".userrow").remove(),g("Declined")}))}async function De(){if(!p)return T();document.title="Drafts \xB7 Dropicgram",u.innerHTML='<h1 style="margin:4px 4px 14px">\u{1F4BE} Drafts</h1><div id="list"></div>';let t=await c("/api/misc/drafts");document.getElementById("list").innerHTML=t.drafts.length?t.drafts.map(e=>`
      <div class="card">
        <div class="post-body">${R(e.body)}</div>
        <div style="display:flex;gap:8px;margin-top:8px">
          <button class="btn secondary" data-action="use-draft" data-body="${r(e.body)}">Use it</button>
          <button class="btn secondary" data-action="del-draft" data-id="${e.id}">Delete</button>
        </div>
      </div>`).join(""):'<div class="empty">No drafts saved.</div>',document.querySelectorAll("[data-action=use-draft]").forEach(e=>e.addEventListener("click",()=>{let a=e.dataset.body;history.pushState({},"",l("/")),k().then(()=>{let n=u.querySelector("textarea[name=body]");n&&(n.value=a||"",n.dispatchEvent(new Event("input")),n.focus())})})),document.querySelectorAll("[data-action=del-draft]").forEach(e=>e.addEventListener("click",async()=>{await c(`/api/misc/drafts/${e.dataset.id}`,{method:"DELETE"}),e.closest(".card").remove()}))}async function Be(){if(!p)return T();document.title="Settings \xB7 Dropicgram",u.innerHTML=`
    <h1 style="margin:4px 4px 14px">Settings</h1>
    <div class="card">
      <h2>Appearance</h2>
      <div class="setting-row"><span>Dark mode</span><label class="switch"><input type="checkbox" id="dark" ${q.dark_mode?"checked":""}><span class="slider"></span></label></div>
    </div>
    <div class="card">
      <h2>Notifications</h2>
      ${[["notif_likes","Likes"],["notif_comments","Comments & replies"],["notif_follows","Follows"],["notif_mentions","Mentions"],["notif_messages","Messages"]].map(([t,e])=>`
        <div class="setting-row"><span>${e}</span><label class="switch"><input type="checkbox" data-setting="${t}" ${q[t]?"checked":""}><span class="slider"></span></label></div>`).join("")}
    </div>
    <div class="card">
      <h2>Account</h2>
      <div class="setting-row"><span>Private account</span><label class="switch"><input type="checkbox" id="private"><span class="slider"></span></label></div>
      <div class="setting-row"><a data-nav="${l("/settings/edit")}" href="${l("/settings/edit")}">\u270F\uFE0F Edit profile</a></div>
      <div class="setting-row"><a data-nav="${l("/settings/password")}" href="${l("/settings/password")}">\u{1F512} Change password</a></div>
      <div class="setting-row"><a data-nav="${l("/requests")}" href="${l("/requests")}">\u{1F465} Follow requests</a></div>
      <div class="setting-row"><a data-nav="${l("/drafts")}" href="${l("/drafts")}">\u{1F4BE} Drafts</a></div>
      <div class="setting-row"><a data-nav="${l("/bookmarks")}" href="${l("/bookmarks")}">\u{1F516} Saved posts</a></div>
      <div class="setting-row"><a data-nav="${l("/blocks")}" href="${l("/blocks")}">\u{1F6AB} Blocked users</a></div>
      <div class="setting-row"><a data-nav="${l("/mutes")}" href="${l("/mutes")}">\u{1F515} Muted users</a></div>
      <div class="setting-row"><a data-nav="${l("/muted-words")}" href="${l("/muted-words")}">\u{1F910} Muted words</a></div>
      <div class="setting-row"><a data-nav="${l("/stats")}" href="${l("/stats")}">\u{1F4CA} My stats</a></div>
      <div class="setting-row"><a href="${l("/docs.html")}" target="_blank">\u{1F4DA} Documentation</a></div>
      <div class="setting-row"><a href="${l("/apidocs.html")}" target="_blank">\u26A1 API Reference</a></div>
    </div>
    <div class="card">
      <h2>Data</h2>
      <button class="btn secondary" id="export" style="margin-bottom:8px">\u2B07\uFE0F Export my data</button>
      <button class="btn secondary" id="clearcache">\u{1F9F9} Clear cache &amp; reload</button>
    </div>
    <button class="btn danger" id="logoutbtn" style="width:100%;margin-bottom:8px">Log out</button>
    <button class="btn danger" id="deletebtn" style="width:100%">Delete my account</button>`,document.getElementById("dark").addEventListener("change",t=>{q.dark_mode=t.target.checked?1:0,document.body.classList.toggle("light",q.dark_mode===0),c("/api/account/settings",{method:"PUT",body:JSON.stringify(q)})}),document.querySelectorAll("[data-setting]").forEach(t=>t.addEventListener("change",e=>{let a=e.target.dataset.setting;q[a]=e.target.checked?1:0,c("/api/account/settings",{method:"PUT",body:JSON.stringify(q)}),g("Saved")})),document.getElementById("private").addEventListener("change",async t=>{await c("/api/account/privacy",{method:"PUT",body:JSON.stringify({is_private:t.target.checked})}),g("Privacy updated")}),document.getElementById("export").addEventListener("click",async()=>{let t=localStorage.getItem("token");try{let e=await fetch(B+"/api/misc/export",{headers:t?{Authorization:`Bearer ${t}`}:{},credentials:"include"});if(!e.ok)throw new Error("Export failed");let a=await e.blob(),n=URL.createObjectURL(a),s=document.createElement("a");s.href=n,s.download="dropicgram-export.json",document.body.appendChild(s),s.click(),s.remove(),URL.revokeObjectURL(n),g("Exported")}catch(e){g(e.message)}}),document.getElementById("clearcache").addEventListener("click",async()=>{if(g("Clearing cache\u2026"),"caches"in window){let t=await caches.keys();await Promise.all(t.map(e=>caches.delete(e)))}if("serviceWorker"in navigator){let t=await navigator.serviceWorker.getRegistrations();await Promise.all(t.map(e=>e.unregister()))}setTimeout(()=>location.reload(),300)}),document.getElementById("logoutbtn").addEventListener("click",async()=>{await c("/api/auth/logout",{method:"POST"}),localStorage.removeItem("token"),p=null,A(),location.href=l("/")}),document.getElementById("deletebtn").addEventListener("click",async()=>{confirm("Delete your account permanently? This cannot be undone.")&&(await c("/api/account/account",{method:"DELETE"}),p=null,A(),location.href=l("/login"))})}async function Ue(){if(!p)return T();document.title="Edit profile \xB7 Dropicgram",u.innerHTML=`
    <h1 style="margin:4px 4px 14px">Edit profile</h1>
    <div class="card">
      <div class="setting-row"><span>Avatar</span><label class="btn secondary" style="cursor:pointer">Upload<input type="file" id="avatarbtn" accept="image/*" hidden /></label></div>
      <div class="setting-row"><span>Cover photo</span><label class="btn secondary" style="cursor:pointer">Upload<input type="file" id="coverbtn" accept="image/*" hidden /></label></div>
      <form id="profform">
        <label class="field">Display name</label>
        <input class="input" name="display_name" value="${r(p.display_name)}" maxlength="30" />
        <label class="field">Bio</label>
        <textarea class="input" name="bio" rows="3" maxlength="160" placeholder="Tell us about yourself">${r(p.bio)}</textarea>
        <button class="btn" style="width:100%">Save profile</button>
      </form>
    </div>`,document.getElementById("avatarbtn").addEventListener("change",async t=>{let e=t.target.files?.[0];if(!e)return;let a=new FormData;a.append("image",e);let n=localStorage.getItem("token");await fetch(B+"/api/account/avatar",{method:"PUT",body:a,headers:n?{Authorization:`Bearer ${n}`}:{},credentials:"include"}),g("Avatar updated"),p=(await c("/api/auth/me")).user,A()}),document.getElementById("coverbtn").addEventListener("change",async t=>{let e=t.target.files?.[0];if(!e)return;let a=new FormData;a.append("image",e);let n=localStorage.getItem("token");await fetch(B+"/api/account/cover",{method:"PUT",body:a,headers:n?{Authorization:`Bearer ${n}`}:{},credentials:"include"}),g("Cover updated"),p=(await c("/api/auth/me")).user,A()}),document.getElementById("profform").addEventListener("submit",async t=>{t.preventDefault();let e=new FormData(t.target);await c("/api/account/profile",{method:"PUT",body:JSON.stringify({display_name:e.get("display_name"),bio:e.get("bio")})}),g("Profile saved"),p=(await c("/api/auth/me")).user,A()})}function Oe(){if(!p)return T();document.title="Change password \xB7 Dropicgram",u.innerHTML=`
    <h1 style="margin:4px 4px 14px">Change password</h1>
    <div class="card">
      <form id="passform">
        <label class="field">Current password</label>
        <input class="input" name="current" type="password" required />
        <label class="field">New password</label>
        <input class="input" name="next" type="password" required />
        <button class="btn" style="width:100%">Change password</button>
      </form>
    </div>`,document.getElementById("passform").addEventListener("submit",async t=>{t.preventDefault();let e=new FormData(t.target);try{await c("/api/account/password",{method:"PUT",body:JSON.stringify({current:e.get("current"),next:e.get("next")})}),g("Password changed")}catch(a){g(a.message)}})}async function oe(t,e,a,n){if(!p)return T();document.title=`${e} \xB7 Dropicgram`,u.innerHTML=`<h1 style="margin:4px 4px 14px">${r(e)}</h1><div id="list"></div>`;let s=await c(t);document.getElementById("list").innerHTML=s.users.length?s.users.map(o=>`
      <div class="card userrow">
        <a href="${l(`/${r(o.username)}`)}" data-nav="${l(`/${r(o.username)}`)}">${S(o,40)} <b>${r(o.display_name)}</b> <span class="username">@${r(o.username)}</span></a>
        <button class="btn secondary" data-action="list-act" data-u="${r(o.username)}">${a}</button>
      </div>`).join(""):'<div class="empty">None yet.</div>',document.querySelectorAll("[data-action=list-act]").forEach(o=>o.addEventListener("click",async()=>{let d=o.dataset.u;await c(n.replace("{u}",d),{method:"DELETE"}),o.closest(".userrow").remove(),g("Done")}))}async function Ne(){if(!p)return T();document.title="Muted words \xB7 Dropicgram",u.innerHTML=`
    <h1 style="margin:4px 4px 14px">\u{1F910} Muted words</h1>
    <div class="card">
      <form id="wordform" style="display:flex;gap:8px">
        <input class="input" name="word" placeholder="Add a word to mute" />
        <button class="btn">Add</button>
      </form>
      <div id="words" style="margin-top:10px"></div>
    </div>`;async function t(){let e=await c("/api/misc/muted-words");document.getElementById("words").innerHTML=e.words.length?e.words.map(a=>`<span class="wordchip">${r(a)} <button data-action="rmword" data-w="${r(a)}">\xD7</button></span>`).join(""):'<div class="empty">No muted words.</div>',document.querySelectorAll("[data-action=rmword]").forEach(a=>a.addEventListener("click",async()=>{await c("/api/misc/muted-words",{method:"DELETE",body:JSON.stringify({word:a.dataset.w})}),t()}))}document.getElementById("wordform").addEventListener("submit",async e=>{e.preventDefault();let a=e.target.elements.namedItem("word");a.value.trim()&&(await c("/api/misc/muted-words",{method:"POST",body:JSON.stringify({word:a.value})}),a.value="",t())}),t()}async function Re(){if(!p)return T();document.title="Stats \xB7 Dropicgram",u.innerHTML='<h1 style="margin:4px 4px 14px">\u{1F4CA} My stats</h1><div id="s"><div class="skeleton"></div></div>';let t=await c("/api/misc/stats"),e=[["posts","Posts"],["likes_received","Likes received"],["likes_given","Likes given"],["comments_received","Comments received"],["comments_given","Comments given"],["followers","Followers"],["following","Following"],["reposts","Reposts"]];document.getElementById("s").innerHTML=`<div class="stats-grid">${e.map(([a,n])=>`<div class="card stat"><b>${t[a]??0}</b><span>${n}</span></div>`).join("")}</div>`}async function Fe(t){let a=(await c("/api/stories")).stories.filter(d=>d.user_id===t);if(!a.length)return g("Story not found");await c(`/api/stories/${a[0].id}/view`,{method:"POST"});let n=0;u.innerHTML=`
    <div class="storyviewer">
      <div class="sv-top">
        ${S(a[0],36)} <b>${r(a[0].username)}</b>
        <button class="btn" data-action="sv-close" style="margin-left:auto">\u2715</button>
      </div>
      <img class="sv-img" src="${P(a[0].image)}" />
      <div class="sv-nav">
        <button class="btn secondary" data-action="sv-prev">\u2190</button>
        <span>${a.length} story${a.length>1?"s":""}</span>
        <button class="btn secondary" data-action="sv-next">\u2192</button>
      </div>
    </div>`;let s=u.querySelector(".sv-img"),o=()=>{s.src=P(a[n].image),document.title=`${a[n].username} \xB7 story`};u.querySelector('[data-action="sv-close"]').addEventListener("click",()=>k()),u.querySelector('[data-action="sv-prev"]').addEventListener("click",()=>{n>0&&(n--,o())}),u.querySelector('[data-action="sv-next"]').addEventListener("click",()=>{n<a.length-1?(n++,o()):k()}),o()}function re(){let t=document.createElement("input");t.type="file",t.accept="image/*",t.style.display="none",document.body.appendChild(t),t.onchange=async()=>{let e=t.files?.[0];if(t.remove(),!e)return;let a=new FormData;a.append("image",e);try{await W("/api/stories",a),g("Story posted for 24h"),k()}catch(n){g(n.message)}},t.click()}function je(){document.querySelectorAll("[data-action=view-story]").forEach(t=>t.addEventListener("click",()=>{let e=Number(t.dataset.uid);u.innerHTML='<div class="skeleton"></div>',Fe(e)})),document.querySelectorAll("[data-action=add-story]").forEach(t=>t.addEventListener("click",()=>re()))}function j(t){t.querySelectorAll("[data-action=like]").forEach(e=>e.addEventListener("click",async()=>{if(!p)return location.href=l("/login");let n=e.closest(".post").dataset.postid,s=e.classList.contains("liked")?"unlike":"like";e.classList.toggle("liked",s==="like");let o=e.querySelector("span");o&&(o.textContent=String(Math.max(0,Number(o.textContent)+(s==="like"?1:-1))));let d=await c(`/api/posts/${n}/${s}`,{method:"POST"});o&&(o.textContent=String(d.post.likes_count))})),t.querySelectorAll(".post").forEach(e=>{let a=0;e.addEventListener("dblclick",()=>{let n=e.querySelector("[data-action=like]");n&&!n.classList.contains("liked")&&n.click()}),e.addEventListener("touchend",n=>{let s=Date.now();if(s-a<300){let o=e.querySelector("[data-action=like]");o&&!o.classList.contains("liked")&&o.click();let d=e.querySelector(".post-img");d&&d.animate([{transform:"scale(1.15)"},{transform:"scale(1)"}],{duration:300})}a=s})}),t.querySelectorAll("[data-action=react]").forEach(e=>e.addEventListener("click",()=>{let n=e.closest(".post").dataset.postid,s=["\u2764\uFE0F","\u{1F602}","\u{1F44D}","\u{1F525}","\u{1F62E}","\u{1F622}"],o=document.createElement("div");o.className="emoji-sheet",o.innerHTML=s.map(i=>`<button class="emoji">${i}</button>`).join(""),u.appendChild(o);let d=async i=>{try{await c(`/api/posts/${n}/react`,{method:"POST",body:JSON.stringify({emoji:i})}),g(`Reacted ${i}`),k()}catch(m){g(m.message)}o.remove()};o.querySelectorAll(".emoji").forEach(i=>i.addEventListener("click",()=>d(i.textContent))),o.addEventListener("click",i=>{i.target===o&&o.remove()})})),t.querySelectorAll("[data-action=toggle-comments]").forEach(e=>e.addEventListener("click",()=>{let a=e.closest(".post").querySelector("[data-comments]");a.hidden=!a.hidden})),t.querySelectorAll("form[data-action=comment]").forEach(e=>e.addEventListener("submit",async a=>{a.preventDefault();let n=e.elements.namedItem("body"),s=e.elements.namedItem("image"),o=s?.files?.[0];if(!n.value.trim()&&!o)return;let d=e.closest(".post"),i=d.dataset.postid,m;if(o){let h=new FormData(e);m=await W(`/api/posts/${i}/comments`,h)}else m=await c(`/api/posts/${i}/comments`,{method:"POST",body:JSON.stringify({body:n.value})});z(d,m.post),n.value="",s&&(s.value=""),D()})),t.querySelectorAll("[data-action=reply]").forEach(e=>e.addEventListener("click",()=>{let a=e.closest(".post"),n=e.dataset.cid,s=a.querySelector(".reply-box");if(s)return s.remove();let o=document.createElement("div");o.className="reply-box",o.innerHTML=`<form style="display:flex;gap:8px;margin-top:8px">
        <label class="btn secondary" style="cursor:pointer;padding:8px 12px">\u{1F4F7}<input type="file" name="image" accept="image/*" hidden /></label>
        <input class="input" placeholder="Reply..." name="body"/><button class="btn">Reply</button>
      </form>`,e.closest(".comment").appendChild(o),o.querySelector("form").addEventListener("submit",async d=>{d.preventDefault();let i=o.querySelector("input[name=body]"),h=o.querySelector("input[name=image]")?.files?.[0],E=i.value.trim();if(!E&&!h)return;let w=a.dataset.postid,b;if(h){let v=new FormData(o.querySelector("form"));v.append("parent_id",String(n)),b=await W(`/api/posts/${w}/comments`,v)}else b=await c(`/api/posts/${w}/comments`,{method:"POST",body:JSON.stringify({body:E,parent_id:n})});z(a,b.post),o.remove()})})),t.querySelectorAll("[data-action=like-comment]").forEach(e=>e.addEventListener("click",async()=>{if(!p)return location.href=l("/login");let a=e.dataset.cid,n=e.closest(".post"),s=n.dataset.postid;await c(`/api/posts/comments/${a}/like`,{method:"POST"});let o=await c(`/api/posts/${s}`);z(n,o.post)})),t.querySelectorAll("[data-action=vote]").forEach(e=>e.addEventListener("click",async()=>{if(!p)return location.href=l("/login");let a=e.closest(".post"),n=a.dataset.postid,s=e.dataset.opt;try{await c(`/api/posts/polls/${a.querySelector(".poll").dataset.pid}/vote`,{method:"POST",body:JSON.stringify({option_id:s})});let o=await c(`/api/posts/${n}`);z(a,o.post)}catch(o){g(o.message)}})),t.querySelectorAll("[data-action=menu]").forEach(e=>e.addEventListener("click",a=>{a.stopPropagation();let n=e.closest(".dropdown").querySelector(".menu");n.hidden=!n.hidden})),document.addEventListener("click",()=>{document.querySelectorAll(".menu").forEach(e=>e.hidden=!0)}),t.querySelectorAll("[data-action=save],[data-action=unsave]").forEach(e=>e.addEventListener("click",async()=>{let n=e.closest(".post").dataset.postid,s=e.dataset.action==="save";await c(`/api/misc/bookmarks/${n}`,{method:s?"POST":"DELETE"}),g(s?"Saved":"Removed"),e.textContent=s?"\u{1F516} Unsave":"\u{1F516} Save",e.dataset.action=s?"unsave":"save"})),t.querySelectorAll("[data-action=pin]").forEach(e=>e.addEventListener("click",async()=>{let a=e.closest(".post");await c(`/api/posts/${a.dataset.postid}/pin`,{method:"POST"}),g("Pinned"),k()})),t.querySelectorAll("[data-action=edit]").forEach(e=>e.addEventListener("click",()=>{let a=e.closest(".post"),n=a.querySelector(".post-body"),s=n&&n.textContent||"",o=document.createElement("div");o.className="reply-box",o.innerHTML=`<form style="display:flex;gap:8px;margin-top:8px"><input class="input" value="${r(s)}"/><button class="btn">Save</button></form>`,a.querySelector(".post-actions").appendChild(o),o.querySelector("form").addEventListener("submit",async d=>{d.preventDefault();let i=o.querySelector("input").value.trim();i&&(await c(`/api/posts/${a.dataset.postid}`,{method:"PUT",body:JSON.stringify({body:i})}),o.remove(),k())})})),t.querySelectorAll("[data-action=delete]").forEach(e=>e.addEventListener("click",async()=>{let a=e.closest(".post");confirm("Delete this post?")&&(await c(`/api/posts/${a.dataset.postid}`,{method:"DELETE"}),a.remove(),g("Deleted"))})),t.querySelectorAll("[data-action=repost]").forEach(e=>e.addEventListener("click",async()=>{if(!p)return location.href=l("/login");let a=e.closest(".post");await c(`/api/posts/${a.dataset.postid}/repost`,{method:"POST"}),g("Reposted"),k()})),t.querySelectorAll("[data-action=quote]").forEach(e=>e.addEventListener("click",()=>{let a=e.closest(".post"),n=a.querySelector(".post-body"),s=n&&n.textContent||"",o=document.createElement("div");o.className="reply-box",o.innerHTML=`<form style="display:flex;gap:8px;margin-top:8px"><input class="input" placeholder="Quote..." value="${r(s)}"/><button class="btn">Quote</button></form>`,a.querySelector(".post-actions").appendChild(o),o.querySelector("form").addEventListener("submit",async d=>{d.preventDefault();let i=o.querySelector("input").value.trim();i&&(await c(`/api/posts/${a.dataset.postid}/quote`,{method:"POST",body:JSON.stringify({body:i})}),o.remove(),k())})})),t.querySelectorAll("[data-action=share]").forEach(e=>e.addEventListener("click",()=>{let a=e.closest(".post").dataset.postid,n=location.origin+l(`/post/${a}`),s=()=>{navigator.clipboard?.writeText(n).then(()=>g("Link copied")).catch(()=>g(n))};navigator.share?navigator.share({url:n}).catch(s):s()})),t.querySelectorAll("[data-action=report]").forEach(e=>e.addEventListener("click",async()=>{let a=e.closest(".post").dataset.postid,n=prompt("Why are you reporting this post?");n!==null&&(await c("/api/misc/reports",{method:"POST",body:JSON.stringify({target_type:"post",target_id:a,reason:n})}),g("Reported. Thanks."))})),t.querySelectorAll("[data-action=mute]").forEach(e=>e.addEventListener("click",async()=>{let a=e.closest(".post"),n=a.dataset.postid?(a.querySelector(".username").textContent||"").replace("@",""):"";await c(`/api/misc/mutes/${encodeURIComponent(n)}`,{method:"POST"}),g(`Muted @${n}`)})),t.querySelectorAll("[data-action=block]").forEach(e=>e.addEventListener("click",async()=>{let a=e.closest(".post"),n=(a.querySelector(".username").textContent||"").replace("@","");await c(`/api/misc/blocks/${encodeURIComponent(n)}`,{method:"POST"}),g(`Blocked @${n}`),a.remove()})),t.querySelectorAll("[data-lightbox]").forEach(e=>e.addEventListener("click",()=>{let a=document.createElement("div");a.className="lightbox",a.innerHTML=`<img src="${r(e.src)}" /><button class="btn" style="position:absolute;top:16px;right:16px">\u2715</button>`,a.addEventListener("click",n=>{(n.target===a||n.target.tagName==="BUTTON")&&a.remove()}),document.body.appendChild(a)}))}function z(t,e){let a=t.querySelector("[data-comment-list]");a&&(a.innerHTML=e.comments.map(d=>ie(d,e.id)).join(""));let n=t.querySelector("[data-action=toggle-comments] span");n&&(n.textContent=String(e.comments_count));let s=t.querySelector("[data-action=like] span");s&&(s.textContent=String(e.likes_count));let o=t.querySelector("[data-action=like]");o&&o.classList.toggle("liked",e.liked_by_me)}async function k(){ye();let t=location.pathname;location.hash&&location.hash.startsWith("#post")&&(t=`/post/${location.hash.slice(5)}`),C&&t.startsWith(C)&&(t=t.slice(C.length)||"/"),t=t.replace(/^\/#.*/,"");let e=t.split("/").filter(Boolean);if(t==="/")return ke();if(t==="/explore")return Te();if(e[0]==="games")return te({el:u,pathFor:l,esc:r},e[1]||"");if(e[0]==="users")return _e();if(e[0]==="search")return Se(decodeURIComponent(e[1]||""));if(e[0]==="hashtag")return Me(e[1]||"");if(e[0]==="notifications")return He();if(e[0]==="messages")return e[1]?Ie(e[1]):Pe();if(e[0]==="bookmarks")return Ce();if(e[0]==="requests")return Ae();if(e[0]==="drafts")return De();if(e[0]==="settings"&&e[1]==="edit")return Ue();if(e[0]==="settings"&&e[1]==="password")return Oe();if(e[0]==="settings")return Be();if(e[0]==="blocks")return oe("/api/misc/blocks","Blocked users","Unblock","/api/misc/blocks/{u}");if(e[0]==="mutes")return oe("/api/misc/mutes","Muted users","Unmute","/api/misc/mutes/{u}");if(e[0]==="muted-words")return Ne();if(e[0]==="stats")return Re();if(e[0]==="followers")return se(e[1]||"","followers");if(e[0]==="following")return se(e[1]||"","following");if(e[0]==="post")return qe(Number(e[1]));if(t==="/login")return T();if(e[0]==="me")return p?ne(p.username):T();if(e.length===1)return ne(e[0])}function Je(){X.addEventListener("click",async e=>{e.target.closest("[data-action=logout]")&&(await c("/api/auth/logout",{method:"POST"}),localStorage.removeItem("token"),p=null,A(),location.href=l("/"))}),document.addEventListener("click",e=>{let a=e.target.closest("[data-nav]");if(!a)return;e.preventDefault();let n=a.dataset.nav;location.pathname!==n&&(history.pushState({},"",n),k())}),document.addEventListener("click",e=>{e.target.closest("[data-action=add-story]")&&re()}),window.addEventListener("popstate",k);let t=document.getElementById("topsearch");t&&t.addEventListener("keydown",e=>{if(e.key==="Enter"){let a=t.value.trim();a&&(history.pushState({},"",l(`/search/${encodeURIComponent(a)}`)),k())}})}function We(){let t=localStorage.getItem("token")||"",e=location.protocol==="https:"?"wss":"ws",a=B?new URL(B).host:location.host;return`${e}://${a}/ws?token=${encodeURIComponent(t)}`}function Q(){let t=localStorage.getItem("token");if(t){ae=t;try{J=new WebSocket(We())}catch{return}J.onmessage=e=>{try{let a=JSON.parse(e.data);if(a.type==="connected")return;V&&V(a)}catch{}},J.onclose=()=>{localStorage.getItem("token")===ae&&setTimeout(Q,3e3)}}}function Ge(t){J&&J.readyState===WebSocket.OPEN&&J.send(JSON.stringify(t))}function Ye(t){if(t.type==="notification")D(),g(`\u{1F514} ${t.notification?.actor?.username||"Someone"} ${t.notification?.label||"interacted"}`);else if(t.type==="dm"){D();let e=String(t.sender_username||""),a=String(t.body||"[photo]");g(`\u{1F4E9} ${e}: ${a}`)}else if(t.type==="new_post")D();else if(t.type==="typing"){let e=Number(t.from);if(location.pathname.includes("/messages/")){let a=document.getElementById("typing-ind");a&&(a.textContent="typing\u2026")}}}async function ze(){Je(),V=Ye;try{let t=sessionStorage.getItem("redirect");if(t){sessionStorage.removeItem("redirect");try{let a=new URL(t).pathname.replace(/\/$/,"")||"/";C&&a.startsWith(C)&&(a=a.slice(C.length)||"/"),history.replaceState({},"",C+a)}catch{}}}catch{}try{p=(await c("/api/auth/me")).user,Q();try{q=(await c("/api/account/settings")).settings}catch{}document.body.classList.toggle("light",q.dark_mode===0)}catch{p=null}A(),D(),k()}ze();})();
