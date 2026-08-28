(()=>{var L=window.DROPIC_BASE||"",T=window.DROPIC_API||"",Y=window.matchMedia("(max-width: 768px)").matches,I=null,R=null,A=null,c=document.getElementById("app"),O=document.getElementById("userbox"),U=document.getElementById("toast"),m=null,w={dark_mode:1,notif_likes:1,notif_comments:1,notif_follows:1,notif_mentions:1,notif_messages:1};function r(e){return L+e}function E(e){return e?e.startsWith("http")?e:T+e:""}function i(e){return String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}function p(e){U.textContent=e,U.classList.add("show"),clearTimeout(p._t),p._t=window.setTimeout(()=>U.classList.remove("show"),2200)}async function d(e,t={}){let a={"Content-Type":"application/json",...t.headers},s=localStorage.getItem("token");s&&(a.Authorization=`Bearer ${s}`);let o=await fetch(T+e,{...t,headers:a,credentials:"include"}),n=await o.json().catch(()=>({}));if(!o.ok)throw new Error(n.error||"Something went wrong");return n}async function D(e,t){let a=localStorage.getItem("token"),s={};a&&(s.Authorization=`Bearer ${a}`);let o=await fetch(T+e,{method:"POST",body:t,headers:s,credentials:"include"}),n=await o.json().catch(()=>({}));if(!o.ok){let u=new Error(n.error||"Upload failed");throw u.status=o.status,u.body=n,u}return n}function x(e){let t=new Date(e.replace(" ","T")+"Z"),a=Math.floor((Date.now()-t.getTime())/1e3);return a<60?"just now":a<3600?`${Math.floor(a/60)}m`:a<86400?`${Math.floor(a/3600)}h`:a<604800?`${Math.floor(a/86400)}d`:t.toLocaleDateString()}function H(e){return i(e).replace(/(^|\s)#([a-zA-Z0-9_]+)/g,(t,a,s)=>{let o=r(`/hashtag/${s}`);return`${a}<a href="${o}" data-nav="${o}" class="taglink">#${s}</a>`}).replace(/(^|\s)@([a-zA-Z0-9_]+)/g,(t,a,s)=>{let o=r(`/${s}`);return`${a}<a href="${o}" data-nav="${o}" class="taglink">@${s}</a>`})}function y(e,t=34){let a=i((e.display_name||"?").charAt(0).toUpperCase()),s="is_verified"in e&&e.is_verified?'<span class="verify">\u2713</span>':"";return e.avatar?`<span class="avwrap" style="width:${t}px;height:${t}px">${s}<img class="avatar" src="${E(e.avatar)}" alt="" /></span>`:`<span class="avwrap" style="width:${t}px;height:${t}px">${s}<span class="avatar">${a}</span></span>`}var M={heart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg>',bubble:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.5L3 21l2-5.6A8.5 8.5 0 1 1 21 11.5Z"/></svg>',repost:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 2l4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>',bookmark:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z"/></svg>',pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 17v5"/><path d="M9 10.8V5l-1.5-2h9L15 5v5.8L18 16H6Z"/></svg>',share:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg>',dots:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>',bell:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>'};function k(){if(!m){O.innerHTML=`<a href="${r("/login")}" class="btn" data-nav="${r("/login")}">Log in</a>`;return}O.innerHTML=`
    <a href="${r(`/${i(m.username)}`)}" class="avatar-link" data-nav="${r(`/${i(m.username)}`)}">
      ${y(m)} <span class="uname">${i(m.username)}</span>
    </a>
    <button class="act-btn" data-action="logout" title="Log out">Log out</button>`}function V(){document.querySelectorAll(".nav-item").forEach(e=>{let t=e,a=r(t.dataset.navKey||"");t.classList.toggle("active",location.pathname===a)})}async function S(){if(m)try{let e=await d("/api/notifications/unread");document.querySelectorAll("[data-unread]").forEach(t=>{let a=t;e.unread>0?(a.textContent=String(e.unread),a.style.display="flex"):a.style.display="none"})}catch{}}function Q(e="Share something\u2026"){return`
  <div class="compose-bar">
    <form id="postform">
      <div class="compose-row">
        ${m?y(m):""}
        <textarea class="input" name="body" rows="2" placeholder="${i(e)}" maxlength="280"></textarea>
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
  </div>`}function K(){let e=c.querySelector("textarea[name=body]"),t=c.querySelector("#ccount");if(e&&t){let l=()=>{t.textContent=`${e.value.length}/280`,t.classList.toggle("full",e.value.length>=280)};e.addEventListener("input",l),l()}let a=c.querySelector("#pollbox"),s=c.querySelector("#pollbtn");s&&s.addEventListener("click",()=>a.hidden=!a.hidden);let o=c.querySelector("#draftbtn");o&&o.addEventListener("click",async()=>{let l=e.value.trim();if(!l)return p("Nothing to save");try{await d("/api/misc/drafts",{method:"POST",body:JSON.stringify({body:l})}),p("Saved to drafts")}catch(v){p(v.message)}});let n=c.querySelector('input[name="image"]');n&&n.addEventListener("change",()=>{let l=n.files?.[0];document.getElementById("picname").textContent=l?l.name:""});let u=document.getElementById("postform");u.addEventListener("submit",async l=>{l.preventDefault();let v=new FormData(u);if(!String(v.get("body")??"").trim()&&!v.get("image"))return p("Add text or a photo");let _=String(v.get("poll_question")??"").trim();if(_){let b=[String(v.get("poll_op1")??""),String(v.get("poll_op2")??"")].filter(Boolean);if(b.length<2)return p("Polls need 2+ options");v.append("poll_question",JSON.stringify({question:_,options:b})),v.delete("poll_op1"),v.delete("poll_op2")}try{await D("/api/posts",v),u.reset(),document.getElementById("picname").textContent="",t&&(t.textContent="0/280"),p("Posted"),g()}catch(b){let $=b;if($.status===409&&$.body?.original_username){let B=$.body.original_display_name||$.body.original_username,Z=$.body.exact_match?"exact match":`match score ${$.body.distance}/64`;p(`Already uploaded by @${$.body.original_username} (${Z})`)}else p($.message)}})}async function G(){try{let e=await d("/api/stories"),t=new Map;for(let s of e.stories)t.has(s.user_id)||t.set(s.user_id,[]),t.get(s.user_id).push(s);let a=[...t.entries()];return`
    <div class="stories">
      ${m?'<button class="story-add" data-action="add-story" title="Add story">+</button>':""}
      ${a.map(([s,o])=>`
        <button class="story-ring ${o.some(n=>n.viewed)?"seen":""}" data-action="view-story" data-uid="${s}">
          ${y(o[0],56)}
          <span>${i(o[0].username)}</span>
        </button>`).join("")}
    </div>`}catch{return""}}function X(e){return e.voted_option!=null?`<div class="poll">
      <div class="poll-q">${i(e.question)}</div>
      ${e.options.map(t=>{let a=e.total_votes?Math.round(t.votes/e.total_votes*100):0;return`<div class="poll-result ${t.id===e.voted_option?"mine":""}">
          <div class="poll-bar" style="width:${a}%"></div>
          <span>${i(t.text)} \u2014 ${a}% (${t.votes})</span>
        </div>`}).join("")}
      <div class="poll-total">${e.total_votes} votes</div>
    </div>`:`<div class="poll">
    <div class="poll-q">${i(e.question)}</div>
    ${e.options.map(t=>`<button class="poll-opt" data-action="vote" data-opt="${t.id}">${i(t.text)}</button>`).join("")}
  </div>`}function tt(e){return!e.original_post_id||!e.op_display_name&&!e.op_body&&!e.op_image?"":`<div class="quoted">
    <div class="post-header">
      ${y({avatar:e.op_avatar,display_name:e.op_display_name||""},24)}
      <span>${i(e.op_display_name)}</span>
      ${e.op_created_at?`<span class="time">${x(e.op_created_at)}</span>`:""}
    </div>
    ${e.op_image?`<img class="post-img q" src="${E(e.op_image)}" loading="lazy" />`:""}
    ${e.op_body?`<div class="q-body">${H(e.op_body)}</div>`:""}
  </div>`}function q(e){let t=e.liked_by_me?" liked":"",a=e.original_post_id&&!e.op_body,s=e.reactions||[],o=e.comments||[];return`
  <article class="post" data-postid="${e.id}">
    ${a?`<div class="repost-label">${M.repost} reposted</div>`:""}
    <div class="post-header">
      <a href="${r(`/${i(e.username)}`)}" data-nav="${r(`/${i(e.username)}`)}">${y(e)}</a>
      <a href="${r(`/${i(e.username)}`)}" data-nav="${r(`/${i(e.username)}`)}">${i(e.display_name)}</a>
      <span class="username">@${i(e.username)}</span>
      ${e.pinned?`<span class="pinbadge">${M.pin}</span>`:""}
      <span class="time">${x(e.created_at)}${e.edited_at?" \xB7 edited":""}</span>
      <div class="dropdown">
        <button class="dots" data-action="menu">${M.dots}</button>
        <div class="menu" hidden>
          ${m?`
            <button data-action="report">\u{1F6A9} Report</button>
            <button data-action="share">\u{1F517} Share</button>
            <button data-action="repost">\u{1F501} Repost</button>
            <button data-action="quote">\u{1F4AC} Quote</button>
            ${e.bookmarked?'<button data-action="unsave">\u{1F516} Unsave</button>':'<button data-action="save">\u{1F516} Save</button>'}
          `:""}
          ${e.is_owner?`
            <button data-action="pin">${e.pinned?"\u{1F4CC} Unpin":"\u{1F4CC} Pin"}</button>
            <button data-action="edit">\u270F\uFE0F Edit</button>
            <button data-action="delete">\u{1F5D1}\uFE0F Delete</button>
          `:""}
          ${m&&m.username!==e.username?`
            <button data-action="mute">\u{1F515} Mute @${i(e.username)}</button>
            <button data-action="block">\u{1F6AB} Block @${i(e.username)}</button>
          `:""}
        </div>
      </div>
    </div>
    ${tt(e)}
    ${e.image?`<img class="post-img" data-lightbox src="${E(e.image)}" alt="" loading="lazy" />`:""}
    ${e.body?`<div class="post-body">${H(e.body)}</div>`:""}
    ${e.poll?X(e.poll):""}
    ${s.length?`<div class="reactions">${s.map(n=>`${n.emoji}`).join("")}</div>`:""}
    <div class="post-actions">
      <button class="act-btn${t}" data-action="like">${M.heart} <span>${e.likes_count}</span></button>
      <button class="act-btn" data-action="react">\u{1F60D}</button>
      <button class="act-btn" data-action="toggle-comments">${M.bubble} <span>${e.comments_count}</span></button>
      <button class="act-btn" data-action="repost">${M.repost} <span>${e.reposts_count}</span></button>
    </div>
    <div class="post-comments" data-comments ${o.length>0?"":"hidden"}>
      <div data-comment-list>
        ${o.map(n=>W(n,e.id)).join("")}
      </div>
      ${m?`<form class="comment-form" data-action="comment">
        <label class="btn secondary" style="cursor:pointer;padding:8px 12px">\u{1F4F7}<input type="file" name="image" accept="image/*" hidden /></label>
        <input class="input" name="body" placeholder="Add a comment..." autocomplete="off" />
        <button class="btn">Post</button>
      </form>`:""}
    </div>
  </article>`}function W(e,t){let a=e.replies||[];return`
  <div class="comment" data-comment="${e.id}">
    ${y(e,30)}
    <div class="c-main">
      <div class="c-meta">
        <a href="${r(`/${i(e.username)}`)}" data-nav="${r(`/${i(e.username)}`)}">${i(e.display_name)}</a>
        <span class="c-time"> \xB7 ${x(e.created_at)}</span>
      </div>
      ${e.image?`<img class="comment-img" data-lightbox src="${E(e.image)}" loading="lazy" />`:""}
      <div class="c-body">${H(e.body)}</div>
      <div class="c-actions">
        <button class="mini-btn" data-action="like-comment" data-cid="${e.id}">${e.likes_count?`${e.liked_by_me?"\u2665":"\u2661"} ${e.likes_count}`:"\u2661"}</button>
        <button class="mini-btn" data-action="reply" data-cid="${e.id}">Reply</button>
      </div>
      ${a.length?et(a):""}
    </div>
  </div>`}function et(e){return e.length?`<div class="replies">${e.map(t=>`
    <div class="comment reply" data-comment="${t.id}">
      ${y(t,26)}
      <div class="c-main">
        <div class="c-meta">
          <a href="${r(`/${i(t.username)}`)}" data-nav="${r(`/${i(t.username)}`)}">${i(t.display_name)}</a>
          <span class="c-time"> \xB7 ${x(t.created_at)}</span>
        </div>
        ${t.image?`<img class="comment-img" data-lightbox src="${E(t.image)}" loading="lazy" />`:""}
        <div class="c-body">${H(t.body)}</div>
      </div>
    </div>`).join("")}</div>`:""}function f(){document.title="Dropicgram",c.innerHTML=`
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
  </div>`;let e=Array.from(c.querySelectorAll(".tab"));e.forEach(t=>t.addEventListener("click",()=>{e.forEach(s=>s.classList.remove("active")),t.classList.add("active");let a=t.dataset.tab;c.querySelector('[data-form="login"]').hidden=a!=="login",c.querySelector('[data-form="register"]').hidden=a!=="register"})),c.querySelectorAll("form[data-form]").forEach(t=>{t.addEventListener("submit",async a=>{a.preventDefault();let s=t.querySelector("button");s.disabled=!0;let o=t.dataset.form==="login"?"login":"register",n=new FormData(t),u={username:String(n.get("username")??""),password:String(n.get("password")??"")};o==="register"&&(u.display_name=String(n.get("display_name")||u.username));try{let l=await d(`/api/auth/${o}`,{method:"POST",body:JSON.stringify(u)});l.token&&localStorage.setItem("token",l.token),m=l.user,k(),N(),history.pushState({},"",r("/")),g()}catch(l){p(l.message),s.disabled=!1}})})}async function at(){if(!m)return f();document.title="Home \xB7 Dropicgram",c.innerHTML=`${Q()}<div id="stories"></div><div id="feed"><div class="skeleton"></div><div class="skeleton"></div></div><div class="load-more"><button class="btn secondary" id="loadmore" hidden>Load more</button></div>`,K();let e=await G();document.getElementById("stories").innerHTML=e,$t();let t=null,a=!1;async function s(n=!1){if(!a){a=!0;try{let u=new URLSearchParams;t&&!n&&u.set("before",t);let l=document.getElementById("mediafilter");l&&l.classList.contains("active")&&u.set("media","1");let v=await d(`/api/posts/feed?${u.toString()}`),h=document.getElementById("feed");if(n&&(h.innerHTML=""),!v.posts.length){n&&(h.innerHTML=`<div class="empty">Nothing here yet.<br />Follow some people or post your first pic!<br /><a class="btn" data-nav="${r("/explore")}" href="${r("/explore")}">Explore</a></div>`);return}h.innerHTML+=v.posts.map(q).join(""),t=v.posts[v.posts.length-1].created_at;let b=document.getElementById("loadmore");b&&(b.hidden=v.posts.length<25),P(h),S()}catch(u){p(u.message)}finally{a=!1}}}let o=document.getElementById("loadmore");if(o&&o.addEventListener("click",()=>s()),Y){let n=0;c.addEventListener("touchstart",u=>{window.scrollY<=0?n=u.touches[0].clientY:n=0},{passive:!0}),c.addEventListener("touchend",u=>{n&&window.scrollY<=0&&u.changedTouches[0].clientY>n+80&&s(!0),n=0},{passive:!0})}s(!0)}async function st(){document.title="Explore \xB7 Dropicgram",c.innerHTML=`
    <div class="explore-tools">
      <input class="input" id="globalsearch" placeholder="Search users, posts, #hashtags" />
      <button class="btn secondary" id="mediafilter">\u{1F4F7} Media only</button>
    </div>
    <div id="feed"><div class="skeleton"></div></div>
    <div id="trends" class="card"><h2>Trending</h2><div class="trend-list"></div></div>
    <div class="load-more"><button class="btn secondary" id="loadmore" hidden>Load more</button></div>`;let e=document.getElementById("globalsearch");e.addEventListener("keydown",a=>{if(a.key==="Enter"){let s=e.value.trim();s&&(history.pushState({},"",r(`/search/${encodeURIComponent(s)}`)),g())}});try{let a=await d("/api/search/trending");document.querySelector(".trend-list").innerHTML=a.trends.length?a.trends.map(s=>`<a class="trend" data-nav="${r(`/hashtag/${i(s.tag)}`)}" href="${r(`/hashtag/${i(s.tag)}`)}">#${i(s.tag)} <span>${s.count}</span></a>`).join(""):'<div class="empty">No trends yet</div>'}catch{}let t=await d("/api/posts/explore");document.getElementById("feed").innerHTML=t.posts.map(q).join("")||'<div class="empty">No posts yet \u2014 be the first!</div>',P(c)}async function nt(e){document.title="Search \xB7 Dropicgram",c.innerHTML='<h1 style="margin:4px 4px 14px">Search</h1><div id="results"></div>';let t=await d(`/api/search?q=${encodeURIComponent(e)}`),a="";t.users.length&&(a+=`<div class="card"><h2>People</h2>${t.users.map(s=>`
      <div class="userrow">
        <a href="${r(`/${i(s.username)}`)}" data-nav="${r(`/${i(s.username)}`)}">${y(s,40)} <b>${i(s.display_name)}</b> <span class="username">@${i(s.username)}</span></a>
      </div>`).join("")}</div>`),t.hashtags.length&&(a+=`<div class="card"><h2>Hashtags</h2>${t.hashtags.map(s=>`<a class="trend" data-nav="${r(`/hashtag/${i(s.tag)}`)}" href="${r(`/hashtag/${i(s.tag)}`)}">#${i(s.tag)} <span>${s.count}</span></a>`).join("")}</div>`),t.posts.length&&(a+=`<div id="posts">${t.posts.map(q).join("")}</div>`),!t.users.length&&!t.posts.length&&!t.hashtags.length&&(a='<div class="empty">Nothing found for "'+i(e)+'"</div>'),document.getElementById("results").innerHTML=a,P(c)}async function ot(e){document.title=`#${e} \xB7 Dropicgram`,c.innerHTML=`<h1 style="margin:4px 4px 14px">#${i(e)}</h1><div id="feed"></div>`;let t=await d(`/api/search/hashtag/${encodeURIComponent(e)}`);document.getElementById("feed").innerHTML=t.posts.map(q).join("")||'<div class="empty">No posts with this tag yet.</div>',P(c)}async function j(e){if(!m)return f();document.title=`${e} \xB7 Dropicgram`,c.innerHTML='<div class="skeleton"></div>';try{let t=await d(`/api/posts/user/${encodeURIComponent(e)}`),a=t.user,s=m?.username===a.username;c.innerHTML=`
      <div class="profile">
        ${a.cover?`<div class="cover"><img src="${E(a.cover)}" /></div>`:'<div class="cover plain"></div>'}
        <div class="profile-body">
          <div class="profile-head">
            ${y(a,80)}
            <div class="profile-meta">
              <h1>${i(a.display_name)}${a.is_verified?' <span class="verify big">\u2713</span>':""}</h1>
              <div class="uname">@${i(a.username)}</div>
              <div class="profile-stats">
                <span><b>${a.posts_count}</b> posts</span>
                <span><a data-nav="${r(`/followers/${i(a.username)}`)}" href="${r(`/followers/${i(a.username)}`)}"><b>${a.followers_count}</b> followers</a></span>
                <span><a data-nav="${r(`/following/${i(a.username)}`)}" href="${r(`/following/${i(a.username)}`)}"><b>${a.following_count}</b> following</a></span>
              </div>
              ${a.is_private?'<div class="private-badge">\u{1F512} Private account</div>':""}
              ${a.bio?`<div class="profile-bio">${i(a.bio)}</div>`:""}
              <div class="profile-joined">Joined ${new Date(a.created_at.replace(" ","T")+"Z").toLocaleDateString()}</div>
            </div>
          </div>
          <div class="profile-actions">
            ${s?`
              <a class="btn secondary" data-nav="${r("/settings/edit")}" href="${r("/settings/edit")}">\u270F\uFE0F Edit profile</a>
              <a class="btn secondary" data-nav="${r("/settings")}" href="${r("/settings")}">\u2699\uFE0F Settings</a>
              <button class="btn secondary" data-action="add-story">\u{1F4F8} Add story</button>
            `:`
              <button class="btn ${a.is_following?"following":""}" data-action="follow">${a.is_following?"Following \u2713":a.requested?"Requested \u2713":"Follow"}</button>
              <button class="btn secondary" data-action="dm">\u{1F4AC} Message</button>
              <div class="dropdown">
                <button class="dots" data-action="menu">${M.dots}</button>
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
      <div id="feed">${t.posts.map(q).join("")||'<div class="empty">No posts yet.</div>'}</div>`,P(c),it(a)}catch(t){c.innerHTML=`<div class="empty">${i(t.message)}</div>`}}function it(e){let t=c.querySelector('[data-action="follow"]');t&&t.addEventListener("click",async()=>{let s=e.is_following?"unfollow":"follow",o=await d(`/api/users/${e.username}/${s}`,{method:"POST"});e.is_following=s==="follow"&&!o.requested,e.requested=!!o.requested,t.textContent=e.is_following?"Following \u2713":e.requested?"Requested \u2713":"Follow",t.classList.toggle("following",e.is_following)});let a=c.querySelector('[data-action="dm"]');a&&a.addEventListener("click",()=>{history.pushState({},"",r(`/messages/${i(e.username)}`)),g()})}async function F(e,t){document.title=`${t} \xB7 ${e} \xB7 Dropicgram`,c.innerHTML=`<h1 style="margin:4px 4px 14px">${t==="followers"?"Followers":"Following"}</h1><div id="list"></div>`;let a=await d(`/api/search/${t}/${encodeURIComponent(e)}`);document.getElementById("list").innerHTML=a.users.length?a.users.map(s=>`
      <div class="card userrow">
        <a href="${r(`/${i(s.username)}`)}" data-nav="${r(`/${i(s.username)}`)}">${y(s,40)} <b>${i(s.display_name)}</b> <span class="username">@${i(s.username)}</span></a>
      </div>`).join(""):'<div class="empty">No users here.</div>'}async function rt(){if(!m)return f();document.title="Notifications \xB7 Dropicgram",c.innerHTML='<div class="pagehead"><h1>Notifications</h1><button class="btn secondary" id="readall">Mark all read</button></div><div id="list"><div class="skeleton"></div></div>';let e=await d("/api/notifications");document.getElementById("list").innerHTML=e.notifications.length?e.notifications.map(t=>`
      <div class="card notif ${t.read?"":"unread"}">
        <a href="${r(`/${i(t.actor.username)}`)}" data-nav="${r(`/${i(t.actor.username)}`)}">${y(t.actor,40)}</a>
        <div class="notif-body">
          <div><b>${i(t.actor.display_name)}</b> <span class="username">@${i(t.actor.username)}</span> ${i(t.label)}</div>
          ${t.post_body?`<div class="notif-post">${H(t.post_body)}</div>`:""}
          <div class="c-time">${x(t.created_at)}</div>
        </div>
        ${t.post_id?`<a class="btn secondary" data-nav="${r(`/post/${t.post_id}`)}" href="${r(`/post/${t.post_id}`)}">View</a>`:""}
      </div>`).join(""):'<div class="empty">No notifications yet.</div>',document.getElementById("readall").addEventListener("click",async()=>{await d("/api/notifications/read-all",{method:"POST"}),document.querySelectorAll(".notif").forEach(t=>t.classList.remove("unread")),S(),p("Marked all as read")})}async function dt(e){document.title="Post \xB7 Dropicgram",c.innerHTML='<div class="skeleton"></div>';let t=await d(`/api/posts/${e}`);c.innerHTML=`<div id="feed">${q(t.post)}</div>`,P(c)}async function lt(){if(!m)return f();document.title="Messages \xB7 Dropicgram",c.innerHTML='<h1 style="margin:4px 4px 14px">Messages</h1><div id="list"><div class="skeleton"></div></div>';let e=await d("/api/messages/conversations");document.getElementById("list").innerHTML=e.conversations.length?e.conversations.map(t=>`
      <a class="card conv" data-nav="${r(`/messages/${i(t.other.username)}`)}" href="${r(`/messages/${i(t.other.username)}`)}">
        ${y(t.other,44)}
        <div>
          <div><b>${i(t.other.display_name)}</b> ${t.unread?`<span class="badge">${t.unread}</span>`:""}</div>
          <div class="username">${i(t.last_message)}</div>
        </div>
        <span class="time">${x(t.last_at)}</span>
      </a>`).join(""):'<div class="empty">No messages yet.</div>'}async function ct(e){if(!m)return f();document.title=`${e} \xB7 Dropicgram`,c.innerHTML=`
    <div class="pagehead">
      <button class="btn secondary" data-action="back">\u2190</button>
      <h1>@${i(e)}</h1>
    </div>
    <div id="msgs" class="thread"></div>
    <div class="compose-bar msgbar">
      <form id="msgform">
        <label class="btn secondary" style="cursor:pointer">\u{1F4F7}<input type="file" name="image" accept="image/*" hidden /></label>
        <input class="input" name="body" placeholder="Message..." autocomplete="off" />
        <button class="btn">Send</button>
      </form>
    </div>`,c.querySelector('[data-action="back"]').addEventListener("click",()=>{history.pushState({},"",r("/messages")),g()});let t=document.getElementById("msgs"),a=document.createElement("div");a.id="typing-ind",a.className="mtime typing-ind",t.appendChild(a);async function s(){let l=await d(`/api/messages/${encodeURIComponent(e)}`);t.innerHTML=l.messages.map(v=>`
      <div class="msg ${v.sender}">
        ${v.image?`<img data-lightbox src="${E(v.image)}" />`:""}
        ${v.body?`<div>${H(v.body)}</div>`:""}
        <div class="mtime">${x(v.created_at)}${v.sender==="me"?` ${v.read?"\u2713\u2713":"\u2713"}`:""}</div>
      </div>`).join("")||'<div class="empty">Say hi \u{1F44B}</div>',t.appendChild(a),t.scrollTop=t.scrollHeight}await s(),A=l=>{l.type==="dm"&&String(l.from)!==String(m?.id)?location.pathname.includes(`/messages/${encodeURIComponent(e)}`)&&s():l.type==="typing"&&String(l.from)!==String(m?.id)?(a.textContent="typing\u2026",clearTimeout(a._t),a._t=window.setTimeout(()=>a.textContent="",2e3)):l.type==="read"&&s()};let o=c.querySelector('input[name="body"]'),n=0;o.addEventListener("input",()=>{let l=Date.now();l-n>1500&&(n=l,Lt({type:"typing",to:m&&e?e:""}))}),document.getElementById("msgform").addEventListener("submit",async l=>{l.preventDefault();let v=l.target,h=new FormData(v);if(!(!String(h.get("body")??"").trim()&&!h.get("image")))try{await D(`/api/messages/${encodeURIComponent(e)}`,h),v.reset(),await s(),S()}catch(b){p(b.message)}})}async function mt(){if(!m)return f();document.title="Saved \xB7 Dropicgram",c.innerHTML='<h1 style="margin:4px 4px 14px">\u{1F516} Saved posts</h1><div id="feed"><div class="skeleton"></div></div>';let e=await d("/api/misc/bookmarks");document.getElementById("feed").innerHTML=e.posts.map(q).join("")||'<div class="empty">No saved posts yet.</div>',P(c)}async function ut(){if(!m)return f();document.title="Follow requests \xB7 Dropicgram",c.innerHTML='<h1 style="margin:4px 4px 14px">Follow requests</h1><div id="list"></div>';let e=await d("/api/search/requests");document.getElementById("list").innerHTML=e.users.length?e.users.map(t=>`
      <div class="card userrow">
        <a href="${r(`/${i(t.username)}`)}" data-nav="${r(`/${i(t.username)}`)}">${y(t,40)} <b>${i(t.display_name)}</b></a>
        <button class="btn" data-action="accept" data-u="${i(t.username)}">Accept</button>
        <button class="btn secondary" data-action="decline" data-u="${i(t.username)}">Decline</button>
      </div>`).join(""):'<div class="empty">No pending requests.</div>',document.querySelectorAll("[data-action=accept]").forEach(t=>t.addEventListener("click",async()=>{let a=t.dataset.u;await d(`/api/users/requests/${a}/accept`,{method:"POST"}),t.closest(".userrow").remove(),p("Accepted")})),document.querySelectorAll("[data-action=decline]").forEach(t=>t.addEventListener("click",async()=>{let a=t.dataset.u;await d(`/api/users/requests/${a}/decline`,{method:"POST"}),t.closest(".userrow").remove(),p("Declined")}))}async function pt(){if(!m)return f();document.title="Drafts \xB7 Dropicgram",c.innerHTML='<h1 style="margin:4px 4px 14px">\u{1F4BE} Drafts</h1><div id="list"></div>';let e=await d("/api/misc/drafts");document.getElementById("list").innerHTML=e.drafts.length?e.drafts.map(t=>`
      <div class="card">
        <div class="post-body">${H(t.body)}</div>
        <div style="display:flex;gap:8px;margin-top:8px">
          <button class="btn secondary" data-action="use-draft" data-body="${i(t.body)}">Use it</button>
          <button class="btn secondary" data-action="del-draft" data-id="${t.id}">Delete</button>
        </div>
      </div>`).join(""):'<div class="empty">No drafts saved.</div>',document.querySelectorAll("[data-action=use-draft]").forEach(t=>t.addEventListener("click",()=>{let a=t.dataset.body;history.pushState({},"",r("/")),g().then(()=>{let s=c.querySelector("textarea[name=body]");s&&(s.value=a||"",s.dispatchEvent(new Event("input")),s.focus())})})),document.querySelectorAll("[data-action=del-draft]").forEach(t=>t.addEventListener("click",async()=>{await d(`/api/misc/drafts/${t.dataset.id}`,{method:"DELETE"}),t.closest(".card").remove()}))}async function vt(){if(!m)return f();document.title="Settings \xB7 Dropicgram",c.innerHTML=`
    <h1 style="margin:4px 4px 14px">Settings</h1>
    <div class="card">
      <h2>Appearance</h2>
      <div class="setting-row"><span>Dark mode</span><label class="switch"><input type="checkbox" id="dark" ${w.dark_mode?"checked":""}><span class="slider"></span></label></div>
    </div>
    <div class="card">
      <h2>Notifications</h2>
      ${[["notif_likes","Likes"],["notif_comments","Comments & replies"],["notif_follows","Follows"],["notif_mentions","Mentions"],["notif_messages","Messages"]].map(([e,t])=>`
        <div class="setting-row"><span>${t}</span><label class="switch"><input type="checkbox" data-setting="${e}" ${w[e]?"checked":""}><span class="slider"></span></label></div>`).join("")}
    </div>
    <div class="card">
      <h2>Account</h2>
      <div class="setting-row"><span>Private account</span><label class="switch"><input type="checkbox" id="private"><span class="slider"></span></label></div>
      <div class="setting-row"><a data-nav="${r("/settings/edit")}" href="${r("/settings/edit")}">\u270F\uFE0F Edit profile</a></div>
      <div class="setting-row"><a data-nav="${r("/settings/password")}" href="${r("/settings/password")}">\u{1F512} Change password</a></div>
      <div class="setting-row"><a data-nav="${r("/requests")}" href="${r("/requests")}">\u{1F465} Follow requests</a></div>
      <div class="setting-row"><a data-nav="${r("/drafts")}" href="${r("/drafts")}">\u{1F4BE} Drafts</a></div>
      <div class="setting-row"><a data-nav="${r("/bookmarks")}" href="${r("/bookmarks")}">\u{1F516} Saved posts</a></div>
      <div class="setting-row"><a data-nav="${r("/blocks")}" href="${r("/blocks")}">\u{1F6AB} Blocked users</a></div>
      <div class="setting-row"><a data-nav="${r("/mutes")}" href="${r("/mutes")}">\u{1F515} Muted users</a></div>
      <div class="setting-row"><a data-nav="${r("/muted-words")}" href="${r("/muted-words")}">\u{1F910} Muted words</a></div>
      <div class="setting-row"><a data-nav="${r("/stats")}" href="${r("/stats")}">\u{1F4CA} My stats</a></div>
      <div class="setting-row"><a href="${r("/docs.html")}" target="_blank">\u{1F4DA} Documentation</a></div>
      <div class="setting-row"><a href="${r("/apidocs.html")}" target="_blank">\u26A1 API Reference</a></div>
    </div>
    <div class="card">
      <h2>Data</h2>
      <button class="btn secondary" id="export">\u2B07\uFE0F Export my data</button>
    </div>
    <button class="btn danger" id="logoutbtn" style="width:100%;margin-bottom:8px">Log out</button>
    <button class="btn danger" id="deletebtn" style="width:100%">Delete my account</button>`,document.getElementById("dark").addEventListener("change",e=>{w.dark_mode=e.target.checked?1:0,document.body.classList.toggle("light",w.dark_mode===0),d("/api/account/settings",{method:"PUT",body:JSON.stringify(w)})}),document.querySelectorAll("[data-setting]").forEach(e=>e.addEventListener("change",t=>{let a=t.target.dataset.setting;w[a]=t.target.checked?1:0,d("/api/account/settings",{method:"PUT",body:JSON.stringify(w)}),p("Saved")})),document.getElementById("private").addEventListener("change",async e=>{await d("/api/account/privacy",{method:"PUT",body:JSON.stringify({is_private:e.target.checked})}),p("Privacy updated")}),document.getElementById("export").addEventListener("click",async()=>{let e=localStorage.getItem("token");try{let t=await fetch(T+"/api/misc/export",{headers:e?{Authorization:`Bearer ${e}`}:{},credentials:"include"});if(!t.ok)throw new Error("Export failed");let a=await t.blob(),s=URL.createObjectURL(a),o=document.createElement("a");o.href=s,o.download="dropicgram-export.json",document.body.appendChild(o),o.click(),o.remove(),URL.revokeObjectURL(s),p("Exported")}catch(t){p(t.message)}}),document.getElementById("logoutbtn").addEventListener("click",async()=>{await d("/api/auth/logout",{method:"POST"}),localStorage.removeItem("token"),m=null,k(),location.href=r("/")}),document.getElementById("deletebtn").addEventListener("click",async()=>{confirm("Delete your account permanently? This cannot be undone.")&&(await d("/api/account/account",{method:"DELETE"}),m=null,k(),location.href=r("/login"))})}async function gt(){if(!m)return f();document.title="Edit profile \xB7 Dropicgram",c.innerHTML=`
    <h1 style="margin:4px 4px 14px">Edit profile</h1>
    <div class="card">
      <div class="setting-row"><span>Avatar</span><label class="btn secondary" style="cursor:pointer">Upload<input type="file" id="avatarbtn" accept="image/*" hidden /></label></div>
      <div class="setting-row"><span>Cover photo</span><label class="btn secondary" style="cursor:pointer">Upload<input type="file" id="coverbtn" accept="image/*" hidden /></label></div>
      <form id="profform">
        <label class="field">Display name</label>
        <input class="input" name="display_name" value="${i(m.display_name)}" maxlength="30" />
        <label class="field">Bio</label>
        <textarea class="input" name="bio" rows="3" maxlength="160" placeholder="Tell us about yourself">${i(m.bio)}</textarea>
        <button class="btn" style="width:100%">Save profile</button>
      </form>
    </div>`,document.getElementById("avatarbtn").addEventListener("change",async e=>{let t=e.target.files?.[0];if(!t)return;let a=new FormData;a.append("image",t);let s=localStorage.getItem("token");await fetch(T+"/api/account/avatar",{method:"PUT",body:a,headers:s?{Authorization:`Bearer ${s}`}:{},credentials:"include"}),p("Avatar updated"),m=(await d("/api/auth/me")).user,k()}),document.getElementById("coverbtn").addEventListener("change",async e=>{let t=e.target.files?.[0];if(!t)return;let a=new FormData;a.append("image",t);let s=localStorage.getItem("token");await fetch(T+"/api/account/cover",{method:"PUT",body:a,headers:s?{Authorization:`Bearer ${s}`}:{},credentials:"include"}),p("Cover updated"),m=(await d("/api/auth/me")).user,k()}),document.getElementById("profform").addEventListener("submit",async e=>{e.preventDefault();let t=new FormData(e.target);await d("/api/account/profile",{method:"PUT",body:JSON.stringify({display_name:t.get("display_name"),bio:t.get("bio")})}),p("Profile saved"),m=(await d("/api/auth/me")).user,k()})}function ft(){if(!m)return f();document.title="Change password \xB7 Dropicgram",c.innerHTML=`
    <h1 style="margin:4px 4px 14px">Change password</h1>
    <div class="card">
      <form id="passform">
        <label class="field">Current password</label>
        <input class="input" name="current" type="password" required />
        <label class="field">New password</label>
        <input class="input" name="next" type="password" required />
        <button class="btn" style="width:100%">Change password</button>
      </form>
    </div>`,document.getElementById("passform").addEventListener("submit",async e=>{e.preventDefault();let t=new FormData(e.target);try{await d("/api/account/password",{method:"PUT",body:JSON.stringify({current:t.get("current"),next:t.get("next")})}),p("Password changed")}catch(a){p(a.message)}})}async function J(e,t,a,s){if(!m)return f();document.title=`${t} \xB7 Dropicgram`,c.innerHTML=`<h1 style="margin:4px 4px 14px">${i(t)}</h1><div id="list"></div>`;let o=await d(e);document.getElementById("list").innerHTML=o.users.length?o.users.map(n=>`
      <div class="card userrow">
        <a href="${r(`/${i(n.username)}`)}" data-nav="${r(`/${i(n.username)}`)}">${y(n,40)} <b>${i(n.display_name)}</b> <span class="username">@${i(n.username)}</span></a>
        <button class="btn secondary" data-action="list-act" data-u="${i(n.username)}">${a}</button>
      </div>`).join(""):'<div class="empty">None yet.</div>',document.querySelectorAll("[data-action=list-act]").forEach(n=>n.addEventListener("click",async()=>{let u=n.dataset.u;await d(s.replace("{u}",u),{method:"DELETE"}),n.closest(".userrow").remove(),p("Done")}))}async function yt(){if(!m)return f();document.title="Muted words \xB7 Dropicgram",c.innerHTML=`
    <h1 style="margin:4px 4px 14px">\u{1F910} Muted words</h1>
    <div class="card">
      <form id="wordform" style="display:flex;gap:8px">
        <input class="input" name="word" placeholder="Add a word to mute" />
        <button class="btn">Add</button>
      </form>
      <div id="words" style="margin-top:10px"></div>
    </div>`;async function e(){let t=await d("/api/misc/muted-words");document.getElementById("words").innerHTML=t.words.length?t.words.map(a=>`<span class="wordchip">${i(a)} <button data-action="rmword" data-w="${i(a)}">\xD7</button></span>`).join(""):'<div class="empty">No muted words.</div>',document.querySelectorAll("[data-action=rmword]").forEach(a=>a.addEventListener("click",async()=>{await d("/api/misc/muted-words",{method:"DELETE",body:JSON.stringify({word:a.dataset.w})}),e()}))}document.getElementById("wordform").addEventListener("submit",async t=>{t.preventDefault();let a=t.target.elements.namedItem("word");a.value.trim()&&(await d("/api/misc/muted-words",{method:"POST",body:JSON.stringify({word:a.value})}),a.value="",e())}),e()}async function ht(){if(!m)return f();document.title="Stats \xB7 Dropicgram",c.innerHTML='<h1 style="margin:4px 4px 14px">\u{1F4CA} My stats</h1><div id="s"><div class="skeleton"></div></div>';let e=await d("/api/misc/stats"),t=[["posts","Posts"],["likes_received","Likes received"],["likes_given","Likes given"],["comments_received","Comments received"],["comments_given","Comments given"],["followers","Followers"],["following","Following"],["reposts","Reposts"]];document.getElementById("s").innerHTML=`<div class="stats-grid">${t.map(([a,s])=>`<div class="card stat"><b>${e[a]??0}</b><span>${s}</span></div>`).join("")}</div>`}async function bt(e){let a=(await d("/api/stories")).stories.filter(u=>u.user_id===e);if(!a.length)return p("Story not found");await d(`/api/stories/${a[0].id}/view`,{method:"POST"});let s=0;c.innerHTML=`
    <div class="storyviewer">
      <div class="sv-top">
        ${y(a[0],36)} <b>${i(a[0].username)}</b>
        <button class="btn" data-action="sv-close" style="margin-left:auto">\u2715</button>
      </div>
      <img class="sv-img" src="${E(a[0].image)}" />
      <div class="sv-nav">
        <button class="btn secondary" data-action="sv-prev">\u2190</button>
        <span>${a.length} story${a.length>1?"s":""}</span>
        <button class="btn secondary" data-action="sv-next">\u2192</button>
      </div>
    </div>`;let o=c.querySelector(".sv-img"),n=()=>{o.src=E(a[s].image),document.title=`${a[s].username} \xB7 story`};c.querySelector('[data-action="sv-close"]').addEventListener("click",()=>g()),c.querySelector('[data-action="sv-prev"]').addEventListener("click",()=>{s>0&&(s--,n())}),c.querySelector('[data-action="sv-next"]').addEventListener("click",()=>{s<a.length-1?(s++,n()):g()}),n()}function z(){let e=document.createElement("input");e.type="file",e.accept="image/*",e.style.display="none",document.body.appendChild(e),e.onchange=async()=>{let t=e.files?.[0];if(e.remove(),!t)return;let a=new FormData;a.append("image",t);try{await D("/api/stories",a),p("Story posted for 24h"),g()}catch(s){p(s.message)}},e.click()}function $t(){document.querySelectorAll("[data-action=view-story]").forEach(e=>e.addEventListener("click",()=>{let t=Number(e.dataset.uid);c.innerHTML='<div class="skeleton"></div>',bt(t)})),document.querySelectorAll("[data-action=add-story]").forEach(e=>e.addEventListener("click",()=>z()))}function P(e){e.querySelectorAll("[data-action=like]").forEach(t=>t.addEventListener("click",async()=>{if(!m)return location.href=r("/login");let s=t.closest(".post").dataset.postid,o=t.classList.contains("liked")?"unlike":"like";t.classList.toggle("liked",o==="like");let n=t.querySelector("span");n&&(n.textContent=String(Math.max(0,Number(n.textContent)+(o==="like"?1:-1))));let u=await d(`/api/posts/${s}/${o}`,{method:"POST"});n&&(n.textContent=String(u.post.likes_count))})),e.querySelectorAll(".post").forEach(t=>{let a=0;t.addEventListener("dblclick",()=>{let s=t.querySelector("[data-action=like]");s&&!s.classList.contains("liked")&&s.click()}),t.addEventListener("touchend",s=>{let o=Date.now();if(o-a<300){let n=t.querySelector("[data-action=like]");n&&!n.classList.contains("liked")&&n.click();let u=t.querySelector(".post-img");u&&u.animate([{transform:"scale(1.15)"},{transform:"scale(1)"}],{duration:300})}a=o})}),e.querySelectorAll("[data-action=react]").forEach(t=>t.addEventListener("click",()=>{let s=t.closest(".post").dataset.postid,o=["\u2764\uFE0F","\u{1F602}","\u{1F44D}","\u{1F525}","\u{1F62E}","\u{1F622}"],n=document.createElement("div");n.className="emoji-sheet",n.innerHTML=o.map(l=>`<button class="emoji">${l}</button>`).join(""),c.appendChild(n);let u=async l=>{try{await d(`/api/posts/${s}/react`,{method:"POST",body:JSON.stringify({emoji:l})}),p(`Reacted ${l}`),g()}catch(v){p(v.message)}n.remove()};n.querySelectorAll(".emoji").forEach(l=>l.addEventListener("click",()=>u(l.textContent))),n.addEventListener("click",l=>{l.target===n&&n.remove()})})),e.querySelectorAll("[data-action=toggle-comments]").forEach(t=>t.addEventListener("click",()=>{let a=t.closest(".post").querySelector("[data-comments]");a.hidden=!a.hidden})),e.querySelectorAll("form[data-action=comment]").forEach(t=>t.addEventListener("submit",async a=>{a.preventDefault();let s=t.elements.namedItem("body"),o=t.elements.namedItem("image"),n=o?.files?.[0];if(!s.value.trim()&&!n)return;let u=t.closest(".post"),l=u.dataset.postid,v;if(n){let h=new FormData(t);v=await D(`/api/posts/${l}/comments`,h)}else v=await d(`/api/posts/${l}/comments`,{method:"POST",body:JSON.stringify({body:s.value})});C(u,v.post),s.value="",o&&(o.value=""),S()})),e.querySelectorAll("[data-action=reply]").forEach(t=>t.addEventListener("click",()=>{let a=t.closest(".post"),s=t.dataset.cid,o=a.querySelector(".reply-box");if(o)return o.remove();let n=document.createElement("div");n.className="reply-box",n.innerHTML=`<form style="display:flex;gap:8px;margin-top:8px">
        <label class="btn secondary" style="cursor:pointer;padding:8px 12px">\u{1F4F7}<input type="file" name="image" accept="image/*" hidden /></label>
        <input class="input" placeholder="Reply..." name="body"/><button class="btn">Reply</button>
      </form>`,t.closest(".comment").appendChild(n),n.querySelector("form").addEventListener("submit",async u=>{u.preventDefault();let l=n.querySelector("input[name=body]"),h=n.querySelector("input[name=image]")?.files?.[0],_=l.value.trim();if(!_&&!h)return;let b=a.dataset.postid,$;if(h){let B=new FormData(n.querySelector("form"));B.append("parent_id",String(s)),$=await D(`/api/posts/${b}/comments`,B)}else $=await d(`/api/posts/${b}/comments`,{method:"POST",body:JSON.stringify({body:_,parent_id:s})});C(a,$.post),n.remove()})})),e.querySelectorAll("[data-action=like-comment]").forEach(t=>t.addEventListener("click",async()=>{if(!m)return location.href=r("/login");let a=t.dataset.cid,s=t.closest(".post"),o=s.dataset.postid;await d(`/api/posts/comments/${a}/like`,{method:"POST"});let n=await d(`/api/posts/${o}`);C(s,n.post)})),e.querySelectorAll("[data-action=vote]").forEach(t=>t.addEventListener("click",async()=>{if(!m)return location.href=r("/login");let a=t.closest(".post"),s=a.dataset.postid,o=t.dataset.opt;try{await d(`/api/posts/polls/${a.querySelector(".poll").dataset.pid}/vote`,{method:"POST",body:JSON.stringify({option_id:o})});let n=await d(`/api/posts/${s}`);C(a,n.post)}catch(n){p(n.message)}})),e.querySelectorAll("[data-action=menu]").forEach(t=>t.addEventListener("click",a=>{a.stopPropagation();let s=t.closest(".dropdown").querySelector(".menu");s.hidden=!s.hidden})),document.addEventListener("click",()=>{document.querySelectorAll(".menu").forEach(t=>t.hidden=!0)}),e.querySelectorAll("[data-action=save],[data-action=unsave]").forEach(t=>t.addEventListener("click",async()=>{let s=t.closest(".post").dataset.postid,o=t.dataset.action==="save";await d(`/api/misc/bookmarks/${s}`,{method:o?"POST":"DELETE"}),p(o?"Saved":"Removed"),t.textContent=o?"\u{1F516} Unsave":"\u{1F516} Save",t.dataset.action=o?"unsave":"save"})),e.querySelectorAll("[data-action=pin]").forEach(t=>t.addEventListener("click",async()=>{let a=t.closest(".post");await d(`/api/posts/${a.dataset.postid}/pin`,{method:"POST"}),p("Pinned"),g()})),e.querySelectorAll("[data-action=edit]").forEach(t=>t.addEventListener("click",()=>{let a=t.closest(".post"),s=a.querySelector(".post-body"),o=s&&s.textContent||"",n=document.createElement("div");n.className="reply-box",n.innerHTML=`<form style="display:flex;gap:8px;margin-top:8px"><input class="input" value="${i(o)}"/><button class="btn">Save</button></form>`,a.querySelector(".post-actions").appendChild(n),n.querySelector("form").addEventListener("submit",async u=>{u.preventDefault();let l=n.querySelector("input").value.trim();l&&(await d(`/api/posts/${a.dataset.postid}`,{method:"PUT",body:JSON.stringify({body:l})}),n.remove(),g())})})),e.querySelectorAll("[data-action=delete]").forEach(t=>t.addEventListener("click",async()=>{let a=t.closest(".post");confirm("Delete this post?")&&(await d(`/api/posts/${a.dataset.postid}`,{method:"DELETE"}),a.remove(),p("Deleted"))})),e.querySelectorAll("[data-action=repost]").forEach(t=>t.addEventListener("click",async()=>{if(!m)return location.href=r("/login");let a=t.closest(".post");await d(`/api/posts/${a.dataset.postid}/repost`,{method:"POST"}),p("Reposted"),g()})),e.querySelectorAll("[data-action=quote]").forEach(t=>t.addEventListener("click",()=>{let a=t.closest(".post"),s=a.querySelector(".post-body"),o=s&&s.textContent||"",n=document.createElement("div");n.className="reply-box",n.innerHTML=`<form style="display:flex;gap:8px;margin-top:8px"><input class="input" placeholder="Quote..." value="${i(o)}"/><button class="btn">Quote</button></form>`,a.querySelector(".post-actions").appendChild(n),n.querySelector("form").addEventListener("submit",async u=>{u.preventDefault();let l=n.querySelector("input").value.trim();l&&(await d(`/api/posts/${a.dataset.postid}/quote`,{method:"POST",body:JSON.stringify({body:l})}),n.remove(),g())})})),e.querySelectorAll("[data-action=share]").forEach(t=>t.addEventListener("click",()=>{let a=t.closest(".post").dataset.postid,s=location.origin+r(`/post/${a}`),o=()=>{navigator.clipboard?.writeText(s).then(()=>p("Link copied")).catch(()=>p(s))};navigator.share?navigator.share({url:s}).catch(o):o()})),e.querySelectorAll("[data-action=report]").forEach(t=>t.addEventListener("click",async()=>{let a=t.closest(".post").dataset.postid,s=prompt("Why are you reporting this post?");s!==null&&(await d("/api/misc/reports",{method:"POST",body:JSON.stringify({target_type:"post",target_id:a,reason:s})}),p("Reported. Thanks."))})),e.querySelectorAll("[data-action=mute]").forEach(t=>t.addEventListener("click",async()=>{let a=t.closest(".post"),s=a.dataset.postid?(a.querySelector(".username").textContent||"").replace("@",""):"";await d(`/api/misc/mutes/${encodeURIComponent(s)}`,{method:"POST"}),p(`Muted @${s}`)})),e.querySelectorAll("[data-action=block]").forEach(t=>t.addEventListener("click",async()=>{let a=t.closest(".post"),s=(a.querySelector(".username").textContent||"").replace("@","");await d(`/api/misc/blocks/${encodeURIComponent(s)}`,{method:"POST"}),p(`Blocked @${s}`),a.remove()})),e.querySelectorAll("[data-lightbox]").forEach(t=>t.addEventListener("click",()=>{let a=document.createElement("div");a.className="lightbox",a.innerHTML=`<img src="${i(t.src)}" /><button class="btn" style="position:absolute;top:16px;right:16px">\u2715</button>`,a.addEventListener("click",s=>{(s.target===a||s.target.tagName==="BUTTON")&&a.remove()}),document.body.appendChild(a)}))}function C(e,t){let a=e.querySelector("[data-comment-list]");a&&(a.innerHTML=t.comments.map(u=>W(u,t.id)).join(""));let s=e.querySelector("[data-action=toggle-comments] span");s&&(s.textContent=String(t.comments_count));let o=e.querySelector("[data-action=like] span");o&&(o.textContent=String(t.likes_count));let n=e.querySelector("[data-action=like]");n&&n.classList.toggle("liked",t.liked_by_me)}async function g(){V();let e=location.pathname;location.hash&&location.hash.startsWith("#post")&&(e=`/post/${location.hash.slice(5)}`),L&&e.startsWith(L)&&(e=e.slice(L.length)||"/"),e=e.replace(/^\/#.*/,"");let t=e.split("/").filter(Boolean);if(e==="/")return at();if(e==="/explore")return st();if(t[0]==="search")return nt(decodeURIComponent(t[1]||""));if(t[0]==="hashtag")return ot(t[1]||"");if(t[0]==="notifications")return rt();if(t[0]==="messages")return t[1]?ct(t[1]):lt();if(t[0]==="bookmarks")return mt();if(t[0]==="requests")return ut();if(t[0]==="drafts")return pt();if(t[0]==="settings"&&t[1]==="edit")return gt();if(t[0]==="settings"&&t[1]==="password")return ft();if(t[0]==="settings")return vt();if(t[0]==="blocks")return J("/api/misc/blocks","Blocked users","Unblock","/api/misc/blocks/{u}");if(t[0]==="mutes")return J("/api/misc/mutes","Muted users","Unmute","/api/misc/mutes/{u}");if(t[0]==="muted-words")return yt();if(t[0]==="stats")return ht();if(t[0]==="followers")return F(t[1]||"","followers");if(t[0]==="following")return F(t[1]||"","following");if(t[0]==="post")return dt(Number(t[1]));if(e==="/login")return f();if(t[0]==="me")return m?j(m.username):f();if(t.length===1)return j(t[0])}function wt(){O.addEventListener("click",async t=>{t.target.closest("[data-action=logout]")&&(await d("/api/auth/logout",{method:"POST"}),localStorage.removeItem("token"),m=null,k(),location.href=r("/"))}),document.addEventListener("click",t=>{let a=t.target.closest("[data-nav]");if(!a)return;t.preventDefault();let s=a.dataset.nav;location.pathname!==s&&(history.pushState({},"",s),g())}),document.addEventListener("click",t=>{t.target.closest("[data-action=add-story]")&&z()}),window.addEventListener("popstate",g);let e=document.getElementById("topsearch");e&&e.addEventListener("keydown",t=>{if(t.key==="Enter"){let a=e.value.trim();a&&(history.pushState({},"",r(`/search/${encodeURIComponent(a)}`)),g())}})}function Et(){let e=localStorage.getItem("token")||"",t=location.protocol==="https:"?"wss":"ws",a=T?new URL(T).host:location.host;return`${t}://${a}/ws?token=${encodeURIComponent(e)}`}function N(){let e=localStorage.getItem("token");if(e){R=e;try{I=new WebSocket(Et())}catch{return}I.onmessage=t=>{try{let a=JSON.parse(t.data);if(a.type==="connected")return;A&&A(a)}catch{}},I.onclose=()=>{localStorage.getItem("token")===R&&setTimeout(N,3e3)}}}function Lt(e){I&&I.readyState===WebSocket.OPEN&&I.send(JSON.stringify(e))}function kt(e){if(e.type==="notification")S(),p(`\u{1F514} ${e.notification?.actor?.username||"Someone"} ${e.notification?.label||"interacted"}`);else if(e.type==="dm"){S();let t=String(e.sender_username||""),a=String(e.body||"[photo]");p(`\u{1F4E9} ${t}: ${a}`)}else if(e.type==="new_post")S();else if(e.type==="typing"){let t=Number(e.from);if(location.pathname.includes("/messages/")){let a=document.getElementById("typing-ind");a&&(a.textContent="typing\u2026")}}}async function St(){wt(),A=kt;try{let e=sessionStorage.getItem("redirect");if(e){sessionStorage.removeItem("redirect");try{let a=new URL(e).pathname.replace(/\/$/,"")||"/";L&&a.startsWith(L)&&(a=a.slice(L.length)||"/"),history.replaceState({},"",L+a)}catch{}}}catch{}try{m=(await d("/api/auth/me")).user,N();try{w=(await d("/api/account/settings")).settings}catch{}document.body.classList.toggle("light",w.dark_mode===0)}catch{m=null}k(),S(),g()}St();})();
