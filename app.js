(()=>{var T=window.DROPIC_BASE||"",k=window.DROPIC_API||"",Z=window.matchMedia("(max-width: 768px)").matches,A=null,j=null,O=null,l=document.getElementById("app"),R=document.getElementById("userbox"),U=document.getElementById("toast"),m=null,L={dark_mode:1,notif_likes:1,notif_comments:1,notif_follows:1,notif_mentions:1,notif_messages:1};function r(e){return T+e}function S(e){return e?e.startsWith("http")?e:k+e:""}function o(e){return String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}function g(e){U.textContent=e,U.classList.add("show"),clearTimeout(g._t),g._t=window.setTimeout(()=>U.classList.remove("show"),2200)}async function c(e,t={}){let a={"Content-Type":"application/json",...t.headers},s=localStorage.getItem("token");s&&(a.Authorization=`Bearer ${s}`);let i=await fetch(k+e,{...t,headers:a,credentials:"include"}),n=await i.json().catch(()=>({}));if(!i.ok)throw new Error(n.error||"Something went wrong");return n}async function B(e,t){let a=localStorage.getItem("token"),s={};a&&(s.Authorization=`Bearer ${a}`);let i=await fetch(k+e,{method:"POST",body:t,headers:s,credentials:"include"}),n=await i.json().catch(()=>({}));if(!i.ok){let u=new Error(n.error||"Upload failed");throw u.status=i.status,u.body=n,u}return n}function x(e){let t=new Date(e.replace(" ","T")+"Z"),a=Math.floor((Date.now()-t.getTime())/1e3);return a<60?"just now":a<3600?`${Math.floor(a/60)}m`:a<86400?`${Math.floor(a/3600)}h`:a<604800?`${Math.floor(a/86400)}d`:t.toLocaleDateString()}function q(e){return o(e).replace(/(^|\s)#([a-zA-Z0-9_]+)/g,(t,a,s)=>{let i=r(`/hashtag/${s}`);return`${a}<a href="${i}" data-nav="${i}" class="taglink">#${s}</a>`}).replace(/(^|\s)@([a-zA-Z0-9_]+)/g,(t,a,s)=>{let i=r(`/${s}`);return`${a}<a href="${i}" data-nav="${i}" class="taglink">@${s}</a>`})}function $(e,t=34){let a=o((e.display_name||"?").charAt(0).toUpperCase()),s="is_verified"in e&&e.is_verified?'<span class="verify">\u2713</span>':"";return e.avatar?`<span class="avwrap" style="width:${t}px;height:${t}px">${s}<img class="avatar" src="${S(e.avatar)}" alt="" /></span>`:`<span class="avwrap" style="width:${t}px;height:${t}px">${s}<span class="avatar">${a}</span></span>`}var H={heart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg>',bubble:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.5L3 21l2-5.6A8.5 8.5 0 1 1 21 11.5Z"/></svg>',repost:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 2l4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>',bookmark:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z"/></svg>',pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 17v5"/><path d="M9 10.8V5l-1.5-2h9L15 5v5.8L18 16H6Z"/></svg>',share:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg>',dots:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>',bell:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>'};function _(){if(!m){R.innerHTML=`<a href="${r("/login")}" class="btn" data-nav="${r("/login")}">Log in</a>`;return}R.innerHTML=`
    <a href="${r(`/${o(m.username)}`)}" class="avatar-link" data-nav="${r(`/${o(m.username)}`)}">
      ${$(m)} <span class="uname">${o(m.username)}</span>
    </a>
    <button class="act-btn" data-action="logout" title="Log out">Log out</button>`}function Q(){document.querySelectorAll(".nav-item").forEach(e=>{let t=e,a=r(t.dataset.navKey||"");t.classList.toggle("active",location.pathname===a)})}async function M(){if(m)try{let e=await c("/api/notifications/unread");document.querySelectorAll("[data-unread]").forEach(t=>{let a=t;e.unread>0?(a.textContent=String(e.unread),a.style.display="flex"):a.style.display="none"})}catch{}}function Y(e="Share something\u2026"){return`
  <div class="compose-bar">
    <form id="postform">
      <div class="compose-row">
        ${m?$(m):""}
        <textarea class="input" name="body" rows="2" placeholder="${o(e)}" maxlength="280"></textarea>
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
  </div>`}function V(){let e=l.querySelector("textarea[name=body]"),t=l.querySelector("#ccount");if(e&&t){let d=()=>{t.textContent=`${e.value.length}/280`,t.classList.toggle("full",e.value.length>=280)};e.addEventListener("input",d),d()}let a=l.querySelector("#pollbox"),s=l.querySelector("#pollbtn");s&&s.addEventListener("click",()=>a.hidden=!a.hidden);let i=l.querySelector("#draftbtn");i&&i.addEventListener("click",async()=>{let d=e.value.trim();if(!d)return g("Nothing to save");try{await c("/api/misc/drafts",{method:"POST",body:JSON.stringify({body:d})}),g("Saved to drafts")}catch(p){g(p.message)}});let n=l.querySelector('input[name="image"]');n&&n.addEventListener("change",()=>{let d=n.files?.[0];document.getElementById("picname").textContent=d?d.name:""});let u=document.getElementById("postform");u.addEventListener("submit",async d=>{d.preventDefault();let p=new FormData(u);if(!String(p.get("body")??"").trim()&&!p.get("image"))return g("Add text or a photo");let w=String(p.get("poll_question")??"").trim();if(w){let h=[String(p.get("poll_op1")??""),String(p.get("poll_op2")??"")].filter(Boolean);if(h.length<2)return g("Polls need 2+ options");p.append("poll_question",JSON.stringify({question:w,options:h})),p.delete("poll_op1"),p.delete("poll_op2")}try{await B("/api/posts",p),u.reset(),document.getElementById("picname").textContent="",t&&(t.textContent="0/280"),g("Posted"),f()}catch(h){let b=h;if(b.status===409&&b.body?.original_username){let E=b.body.original_display_name||b.body.original_username,D=b.body.exact_match?"exact match":`match score ${b.body.distance}/64`;g(`Already uploaded by @${b.body.original_username} (${D})`)}else g(b.message)}})}async function X(){try{let e=await c("/api/stories"),t=new Map;for(let s of e.stories)t.has(s.user_id)||t.set(s.user_id,[]),t.get(s.user_id).push(s);let a=[...t.entries()];return`
    <div class="stories">
      ${m?'<button class="story-add" data-action="add-story" title="Add story">+</button>':""}
      ${a.map(([s,i])=>`
        <button class="story-ring ${i.some(n=>n.viewed)?"seen":""}" data-action="view-story" data-uid="${s}">
          ${$(i[0],56)}
          <span>${o(i[0].username)}</span>
        </button>`).join("")}
    </div>`}catch{return""}}function K(e){return e.voted_option!=null?`<div class="poll">
      <div class="poll-q">${o(e.question)}</div>
      ${e.options.map(t=>{let a=e.total_votes?Math.round(t.votes/e.total_votes*100):0;return`<div class="poll-result ${t.id===e.voted_option?"mine":""}">
          <div class="poll-bar" style="width:${a}%"></div>
          <span>${o(t.text)} \u2014 ${a}% (${t.votes})</span>
        </div>`}).join("")}
      <div class="poll-total">${e.total_votes} votes</div>
    </div>`:`<div class="poll">
    <div class="poll-q">${o(e.question)}</div>
    ${e.options.map(t=>`<button class="poll-opt" data-action="vote" data-opt="${t.id}">${o(t.text)}</button>`).join("")}
  </div>`}function G(e){return!e.original_post_id||!e.op_display_name&&!e.op_body&&!e.op_image?"":`<div class="quoted">
    <div class="post-header">
      ${$({avatar:e.op_avatar,display_name:e.op_display_name||""},24)}
      <span>${o(e.op_display_name)}</span>
      ${e.op_created_at?`<span class="time">${x(e.op_created_at)}</span>`:""}
    </div>
    ${e.op_image?`<img class="post-img q" src="${S(e.op_image)}" loading="lazy" />`:""}
    ${e.op_body?`<div class="q-body">${q(e.op_body)}</div>`:""}
  </div>`}function P(e){let t=e.liked_by_me?" liked":"",a=e.original_post_id&&!e.op_body,s=e.reactions||[],i=e.comments||[];return`
  <article class="post" data-postid="${e.id}">
    ${a?`<div class="repost-label">${H.repost} reposted</div>`:""}
    <div class="post-header">
      <a href="${r(`/${o(e.username)}`)}" data-nav="${r(`/${o(e.username)}`)}">${$(e)}</a>
      <a href="${r(`/${o(e.username)}`)}" data-nav="${r(`/${o(e.username)}`)}">${o(e.display_name)}</a>
      <span class="username">@${o(e.username)}</span>
      ${e.pinned?`<span class="pinbadge">${H.pin}</span>`:""}
      <span class="time">${x(e.created_at)}${e.edited_at?" \xB7 edited":""}</span>
      <div class="dropdown">
        <button class="dots" data-action="menu">${H.dots}</button>
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
            <button data-action="mute">\u{1F515} Mute @${o(e.username)}</button>
            <button data-action="block">\u{1F6AB} Block @${o(e.username)}</button>
          `:""}
        </div>
      </div>
    </div>
    ${G(e)}
    ${e.image?`<img class="post-img" data-lightbox src="${S(e.image)}" alt="" loading="lazy" />`:""}
    ${e.body?`<div class="post-body">${q(e.body)}</div>`:""}
    ${e.poll?K(e.poll):""}
    ${s.length?`<div class="reactions">${s.map(n=>`${n.emoji}`).join("")}</div>`:""}
    <div class="post-actions">
      <button class="act-btn${t}" data-action="like">${H.heart} <span>${e.likes_count}</span></button>
      <button class="act-btn" data-action="react">\u{1F60D}</button>
      <button class="act-btn" data-action="toggle-comments">${H.bubble} <span>${e.comments_count}</span></button>
      <button class="act-btn" data-action="repost">${H.repost} <span>${e.reposts_count}</span></button>
    </div>
    <div class="post-comments" data-comments ${i.length>0?"":"hidden"}>
      <div data-comment-list>
        ${i.map(n=>z(n,e.id)).join("")}
      </div>
      ${m?`<form class="comment-form" data-action="comment">
        <label class="btn secondary" style="cursor:pointer;padding:8px 12px">\u{1F4F7}<input type="file" name="image" accept="image/*" hidden /></label>
        <input class="input" name="body" placeholder="Add a comment..." autocomplete="off" />
        <button class="btn">Post</button>
      </form>`:""}
    </div>
  </article>`}function z(e,t){let a=e.replies||[];return`
  <div class="comment" data-comment="${e.id}">
    ${$(e,30)}
    <div class="c-main">
      <div class="c-meta">
        <a href="${r(`/${o(e.username)}`)}" data-nav="${r(`/${o(e.username)}`)}">${o(e.display_name)}</a>
        <span class="c-time"> \xB7 ${x(e.created_at)}</span>
      </div>
      ${e.image?`<img class="comment-img" data-lightbox src="${S(e.image)}" loading="lazy" />`:""}
      <div class="c-body">${q(e.body)}</div>
      <div class="c-actions">
        <button class="mini-btn" data-action="like-comment" data-cid="${e.id}">${e.likes_count?`${e.liked_by_me?"\u2665":"\u2661"} ${e.likes_count}`:"\u2661"}</button>
        <button class="mini-btn" data-action="reply" data-cid="${e.id}">Reply</button>
      </div>
      ${a.length?tt(a):""}
    </div>
  </div>`}function tt(e){return e.length?`<div class="replies">${e.map(t=>`
    <div class="comment reply" data-comment="${t.id}">
      ${$(t,26)}
      <div class="c-main">
        <div class="c-meta">
          <a href="${r(`/${o(t.username)}`)}" data-nav="${r(`/${o(t.username)}`)}">${o(t.display_name)}</a>
          <span class="c-time"> \xB7 ${x(t.created_at)}</span>
        </div>
        ${t.image?`<img class="comment-img" data-lightbox src="${S(t.image)}" loading="lazy" />`:""}
        <div class="c-body">${q(t.body)}</div>
      </div>
    </div>`).join("")}</div>`:""}function y(){document.title="Dropicgram",l.innerHTML=`
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
  </div>`;let e=Array.from(l.querySelectorAll(".tab"));e.forEach(t=>t.addEventListener("click",()=>{e.forEach(s=>s.classList.remove("active")),t.classList.add("active");let a=t.dataset.tab;l.querySelector('[data-form="login"]').hidden=a!=="login",l.querySelector('[data-form="register"]').hidden=a!=="register"})),l.querySelectorAll("form[data-form]").forEach(t=>{t.addEventListener("submit",async a=>{a.preventDefault();let s=t.querySelector("button");s.disabled=!0;let i=t.dataset.form==="login"?"login":"register",n=new FormData(t),u={username:String(n.get("username")??""),password:String(n.get("password")??"")};i==="register"&&(u.display_name=String(n.get("display_name")||u.username));try{let d=await c(`/api/auth/${i}`,{method:"POST",body:JSON.stringify(u)});d.token&&localStorage.setItem("token",d.token),m=d.user,_(),N(),history.pushState({},"",r("/")),f()}catch(d){g(d.message),s.disabled=!1}})})}async function et(){if(!m)return y();document.title="Home \xB7 Dropicgram",l.innerHTML=`${Y()}<div id="stories"></div><div id="feed"><div class="skeleton"></div><div class="skeleton"></div></div><div class="load-more"><button class="btn secondary" id="loadmore" hidden>Load more</button></div>`,V();let e=await X();document.getElementById("stories").innerHTML=e,Et();let t=null,a=!1;async function s(n=!1){if(!a){a=!0;try{let u=new URLSearchParams;t&&!n&&u.set("before",t);let d=document.getElementById("mediafilter");d&&d.classList.contains("active")&&u.set("media","1");let p=await c(`/api/posts/feed?${u.toString()}`),v=document.getElementById("feed");if(n&&(v.innerHTML=""),!p.posts.length){n&&(v.innerHTML=`<div class="empty">Nothing here yet.<br />Follow some people or post your first pic!<br /><a class="btn" data-nav="${r("/explore")}" href="${r("/explore")}">Explore</a></div>`);return}v.innerHTML+=p.posts.map(P).join(""),t=p.posts[p.posts.length-1].created_at;let h=document.getElementById("loadmore");h&&(h.hidden=p.posts.length<25),I(v),M()}catch(u){g(u.message)}finally{a=!1}}}let i=document.getElementById("loadmore");if(i&&i.addEventListener("click",()=>s()),Z){let n=0;l.addEventListener("touchstart",u=>{window.scrollY<=0?n=u.touches[0].clientY:n=0},{passive:!0}),l.addEventListener("touchend",u=>{n&&window.scrollY<=0&&u.changedTouches[0].clientY>n+80&&s(!0),n=0},{passive:!0})}s(!0)}async function at(){document.title="Explore \xB7 Dropicgram",l.innerHTML=`
    <div class="explore-tools">
      <input class="input" id="globalsearch" placeholder="Search users, posts, #hashtags" />
      <button class="btn secondary" id="mediafilter">\u{1F4F7} Media only</button>
    </div>
    <div id="feed"><div class="skeleton"></div></div>
    <div id="trends" class="card"><h2>Trending</h2><div class="trend-list"></div></div>
    <div class="load-more"><button class="btn secondary" id="loadmore" hidden>Load more</button></div>`;let e=document.getElementById("globalsearch");e.addEventListener("keydown",a=>{if(a.key==="Enter"){let s=e.value.trim();s&&(history.pushState({},"",r(`/search/${encodeURIComponent(s)}`)),f())}});try{let a=await c("/api/search/trending");document.querySelector(".trend-list").innerHTML=a.trends.length?a.trends.map(s=>`<a class="trend" data-nav="${r(`/hashtag/${o(s.tag)}`)}" href="${r(`/hashtag/${o(s.tag)}`)}">#${o(s.tag)} <span>${s.count}</span></a>`).join(""):'<div class="empty">No trends yet</div>'}catch{}let t=await c("/api/posts/explore");document.getElementById("feed").innerHTML=t.posts.map(P).join("")||'<div class="empty">No posts yet \u2014 be the first!</div>',I(l)}async function st(e){document.title="Search \xB7 Dropicgram",l.innerHTML='<h1 style="margin:4px 4px 14px">Search</h1><div id="results"></div>';let t=await c(`/api/search?q=${encodeURIComponent(e)}`),a="";t.users.length&&(a+=`<div class="card"><h2>People</h2>${t.users.map(s=>`
      <div class="userrow">
        <a href="${r(`/${o(s.username)}`)}" data-nav="${r(`/${o(s.username)}`)}">${$(s,40)} <b>${o(s.display_name)}</b> <span class="username">@${o(s.username)}</span></a>
      </div>`).join("")}</div>`),t.hashtags.length&&(a+=`<div class="card"><h2>Hashtags</h2>${t.hashtags.map(s=>`<a class="trend" data-nav="${r(`/hashtag/${o(s.tag)}`)}" href="${r(`/hashtag/${o(s.tag)}`)}">#${o(s.tag)} <span>${s.count}</span></a>`).join("")}</div>`),t.posts.length&&(a+=`<div id="posts">${t.posts.map(P).join("")}</div>`),!t.users.length&&!t.posts.length&&!t.hashtags.length&&(a='<div class="empty">Nothing found for "'+o(e)+'"</div>'),document.getElementById("results").innerHTML=a,I(l)}async function nt(e){document.title=`#${e} \xB7 Dropicgram`,l.innerHTML=`<h1 style="margin:4px 4px 14px">#${o(e)}</h1><div id="feed"></div>`;let t=await c(`/api/search/hashtag/${encodeURIComponent(e)}`);document.getElementById("feed").innerHTML=t.posts.map(P).join("")||'<div class="empty">No posts with this tag yet.</div>',I(l)}async function F(e){if(!m)return y();document.title=`${e} \xB7 Dropicgram`,l.innerHTML='<div class="skeleton"></div>';try{let t=await c(`/api/posts/user/${encodeURIComponent(e)}`),a=t.user,s=m?.username===a.username;l.innerHTML=`
      <div class="profile">
        ${a.cover?`<div class="cover"><img src="${S(a.cover)}" /></div>`:'<div class="cover plain"></div>'}
        <div class="profile-body">
          <div class="profile-head">
            ${$(a,80)}
            <div class="profile-meta">
              <h1>${o(a.display_name)}${a.is_verified?' <span class="verify big">\u2713</span>':""}</h1>
              <div class="uname">@${o(a.username)}</div>
              <div class="profile-stats">
                <span><b>${a.posts_count}</b> posts</span>
                <span><a data-nav="${r(`/followers/${o(a.username)}`)}" href="${r(`/followers/${o(a.username)}`)}"><b>${a.followers_count}</b> followers</a></span>
                <span><a data-nav="${r(`/following/${o(a.username)}`)}" href="${r(`/following/${o(a.username)}`)}"><b>${a.following_count}</b> following</a></span>
              </div>
              ${a.is_private?'<div class="private-badge">\u{1F512} Private account</div>':""}
              ${a.bio?`<div class="profile-bio">${o(a.bio)}</div>`:""}
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
                <button class="dots" data-action="menu">${H.dots}</button>
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
      <div id="feed">${t.posts.map(P).join("")||'<div class="empty">No posts yet.</div>'}</div>`,I(l),ot(a)}catch(t){l.innerHTML=`<div class="empty">${o(t.message)}</div>`}}function ot(e){let t=l.querySelector('[data-action="follow"]');t&&t.addEventListener("click",async()=>{let s=e.is_following?"unfollow":"follow",i=await c(`/api/users/${e.username}/${s}`,{method:"POST"});e.is_following=s==="follow"&&!i.requested,e.requested=!!i.requested,t.textContent=e.is_following?"Following \u2713":e.requested?"Requested \u2713":"Follow",t.classList.toggle("following",e.is_following)});let a=l.querySelector('[data-action="dm"]');a&&a.addEventListener("click",()=>{history.pushState({},"",r(`/messages/${o(e.username)}`)),f()})}async function J(e,t){document.title=`${t} \xB7 ${e} \xB7 Dropicgram`,l.innerHTML=`<h1 style="margin:4px 4px 14px">${t==="followers"?"Followers":"Following"}</h1><div id="list"></div>`;let a=await c(`/api/search/${t}/${encodeURIComponent(e)}`);document.getElementById("list").innerHTML=a.users.length?a.users.map(s=>`
      <div class="card userrow">
        <a href="${r(`/${o(s.username)}`)}" data-nav="${r(`/${o(s.username)}`)}">${$(s,40)} <b>${o(s.display_name)}</b> <span class="username">@${o(s.username)}</span></a>
      </div>`).join(""):'<div class="empty">No users here.</div>'}async function it(){if(!m)return y();document.title="Notifications \xB7 Dropicgram",l.innerHTML='<div class="pagehead"><h1>Notifications</h1><button class="btn secondary" id="readall">Mark all read</button></div><div id="list"><div class="skeleton"></div></div>';let e=await c("/api/notifications");document.getElementById("list").innerHTML=e.notifications.length?e.notifications.map(t=>`
      <div class="card notif ${t.read?"":"unread"}">
        <a href="${r(`/${o(t.actor.username)}`)}" data-nav="${r(`/${o(t.actor.username)}`)}">${$(t.actor,40)}</a>
        <div class="notif-body">
          <div><b>${o(t.actor.display_name)}</b> <span class="username">@${o(t.actor.username)}</span> ${o(t.label)}</div>
          ${t.post_body?`<div class="notif-post">${q(t.post_body)}</div>`:""}
          <div class="c-time">${x(t.created_at)}</div>
        </div>
        ${t.post_id?`<a class="btn secondary" data-nav="${r(`/post/${t.post_id}`)}" href="${r(`/post/${t.post_id}`)}">View</a>`:""}
      </div>`).join(""):'<div class="empty">No notifications yet.</div>',document.getElementById("readall").addEventListener("click",async()=>{await c("/api/notifications/read-all",{method:"POST"}),document.querySelectorAll(".notif").forEach(t=>t.classList.remove("unread")),M(),g("Marked all as read")})}async function rt(e){document.title="Post \xB7 Dropicgram",l.innerHTML='<div class="skeleton"></div>';let t=await c(`/api/posts/${e}`);l.innerHTML=`<div id="feed">${P(t.post)}</div>`,I(l)}async function dt(){if(!m)return y();document.title="Messages \xB7 Dropicgram",l.innerHTML='<h1 style="margin:4px 4px 14px">Messages</h1><div id="list"><div class="skeleton"></div></div>';let e=await c("/api/messages/conversations");document.getElementById("list").innerHTML=e.conversations.length?e.conversations.map(t=>`
      <a class="card conv" data-nav="${r(`/messages/${o(t.other.username)}`)}" href="${r(`/messages/${o(t.other.username)}`)}">
        ${$(t.other,44)}
        <div>
          <div><b>${o(t.other.display_name)}</b> ${t.unread?`<span class="badge">${t.unread}</span>`:""}</div>
          <div class="username">${o(t.last_message)}</div>
        </div>
        <span class="time">${x(t.last_at)}</span>
      </a>`).join(""):'<div class="empty">No messages yet.</div>'}async function ct(e){if(!m)return y();document.title=`${e} \xB7 Dropicgram`,l.innerHTML=`
    <div class="pagehead">
      <button class="btn secondary" data-action="back">\u2190</button>
      <h1>@${o(e)}</h1>
    </div>
    <div id="msgs" class="thread"></div>
    <div class="compose-bar msgbar">
      <form id="msgform">
        <label class="btn secondary" style="cursor:pointer">\u{1F4F7}<input type="file" name="image" accept="image/*" hidden /></label>
        <input class="input" name="body" placeholder="Message..." autocomplete="off" />
        <button class="btn">Send</button>
      </form>
    </div>`,l.querySelector('[data-action="back"]').addEventListener("click",()=>{history.pushState({},"",r("/messages")),f()});let t=document.getElementById("msgs"),a=document.createElement("div");a.id="typing-ind",a.className="mtime typing-ind",t.appendChild(a);async function s(){let d=await c(`/api/messages/${encodeURIComponent(e)}`);t.innerHTML=d.messages.map(p=>`
      <div class="msg ${p.sender}">
        ${p.image?`<img data-lightbox src="${S(p.image)}" />`:""}
        ${p.body?`<div>${q(p.body)}</div>`:""}
        <div class="mtime">${x(p.created_at)}${p.sender==="me"?` ${p.read?"\u2713\u2713":"\u2713"}`:""}</div>
      </div>`).join("")||'<div class="empty">Say hi \u{1F44B}</div>',t.appendChild(a),t.scrollTop=t.scrollHeight}await s(),O=d=>{d.type==="dm"&&String(d.from)!==String(m?.id)?location.pathname.includes(`/messages/${encodeURIComponent(e)}`)&&s():d.type==="typing"&&String(d.from)!==String(m?.id)?(a.textContent="typing\u2026",clearTimeout(a._t),a._t=window.setTimeout(()=>a.textContent="",2e3)):d.type==="read"&&s()};let i=l.querySelector('input[name="body"]'),n=0;i.addEventListener("input",()=>{let d=Date.now();d-n>1500&&(n=d,St({type:"typing",to:m&&e?e:""}))}),document.getElementById("msgform").addEventListener("submit",async d=>{d.preventDefault();let p=d.target,v=new FormData(p);if(!(!String(v.get("body")??"").trim()&&!v.get("image")))try{await B(`/api/messages/${encodeURIComponent(e)}`,v),p.reset(),await s(),M()}catch(h){g(h.message)}})}async function lt(){if(!m)return y();document.title="Saved \xB7 Dropicgram",l.innerHTML='<h1 style="margin:4px 4px 14px">\u{1F516} Saved posts</h1><div id="feed"><div class="skeleton"></div></div>';let e=await c("/api/misc/bookmarks");document.getElementById("feed").innerHTML=e.posts.map(P).join("")||'<div class="empty">No saved posts yet.</div>',I(l)}async function mt(){if(!m)return y();document.title="Follow requests \xB7 Dropicgram",l.innerHTML='<h1 style="margin:4px 4px 14px">Follow requests</h1><div id="list"></div>';let e=await c("/api/search/requests");document.getElementById("list").innerHTML=e.users.length?e.users.map(t=>`
      <div class="card userrow">
        <a href="${r(`/${o(t.username)}`)}" data-nav="${r(`/${o(t.username)}`)}">${$(t,40)} <b>${o(t.display_name)}</b></a>
        <button class="btn" data-action="accept" data-u="${o(t.username)}">Accept</button>
        <button class="btn secondary" data-action="decline" data-u="${o(t.username)}">Decline</button>
      </div>`).join(""):'<div class="empty">No pending requests.</div>',document.querySelectorAll("[data-action=accept]").forEach(t=>t.addEventListener("click",async()=>{let a=t.dataset.u;await c(`/api/users/requests/${a}/accept`,{method:"POST"}),t.closest(".userrow").remove(),g("Accepted")})),document.querySelectorAll("[data-action=decline]").forEach(t=>t.addEventListener("click",async()=>{let a=t.dataset.u;await c(`/api/users/requests/${a}/decline`,{method:"POST"}),t.closest(".userrow").remove(),g("Declined")}))}async function ut(){if(!m)return y();document.title="Drafts \xB7 Dropicgram",l.innerHTML='<h1 style="margin:4px 4px 14px">\u{1F4BE} Drafts</h1><div id="list"></div>';let e=await c("/api/misc/drafts");document.getElementById("list").innerHTML=e.drafts.length?e.drafts.map(t=>`
      <div class="card">
        <div class="post-body">${q(t.body)}</div>
        <div style="display:flex;gap:8px;margin-top:8px">
          <button class="btn secondary" data-action="use-draft" data-body="${o(t.body)}">Use it</button>
          <button class="btn secondary" data-action="del-draft" data-id="${t.id}">Delete</button>
        </div>
      </div>`).join(""):'<div class="empty">No drafts saved.</div>',document.querySelectorAll("[data-action=use-draft]").forEach(t=>t.addEventListener("click",()=>{let a=t.dataset.body;history.pushState({},"",r("/")),f().then(()=>{let s=l.querySelector("textarea[name=body]");s&&(s.value=a||"",s.dispatchEvent(new Event("input")),s.focus())})})),document.querySelectorAll("[data-action=del-draft]").forEach(t=>t.addEventListener("click",async()=>{await c(`/api/misc/drafts/${t.dataset.id}`,{method:"DELETE"}),t.closest(".card").remove()}))}async function pt(){if(!m)return y();document.title="Settings \xB7 Dropicgram",l.innerHTML=`
    <h1 style="margin:4px 4px 14px">Settings</h1>
    <div class="card">
      <h2>Appearance</h2>
      <div class="setting-row"><span>Dark mode</span><label class="switch"><input type="checkbox" id="dark" ${L.dark_mode?"checked":""}><span class="slider"></span></label></div>
    </div>
    <div class="card">
      <h2>Notifications</h2>
      ${[["notif_likes","Likes"],["notif_comments","Comments & replies"],["notif_follows","Follows"],["notif_mentions","Mentions"],["notif_messages","Messages"]].map(([e,t])=>`
        <div class="setting-row"><span>${t}</span><label class="switch"><input type="checkbox" data-setting="${e}" ${L[e]?"checked":""}><span class="slider"></span></label></div>`).join("")}
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
    </div>
    <div class="card">
      <h2>Data</h2>
      <button class="btn secondary" id="export">\u2B07\uFE0F Export my data</button>
    </div>
    <button class="btn danger" id="logoutbtn" style="width:100%;margin-bottom:8px">Log out</button>
    <button class="btn danger" id="deletebtn" style="width:100%">Delete my account</button>`,document.getElementById("dark").addEventListener("change",e=>{L.dark_mode=e.target.checked?1:0,document.body.classList.toggle("light",L.dark_mode===0),c("/api/account/settings",{method:"PUT",body:JSON.stringify(L)})}),document.querySelectorAll("[data-setting]").forEach(e=>e.addEventListener("change",t=>{let a=t.target.dataset.setting;L[a]=t.target.checked?1:0,c("/api/account/settings",{method:"PUT",body:JSON.stringify(L)}),g("Saved")})),document.getElementById("private").addEventListener("change",async e=>{await c("/api/account/privacy",{method:"PUT",body:JSON.stringify({is_private:e.target.checked})}),g("Privacy updated")}),document.getElementById("export").addEventListener("click",async()=>{let e=localStorage.getItem("token");try{let t=await fetch(k+"/api/misc/export",{headers:e?{Authorization:`Bearer ${e}`}:{},credentials:"include"});if(!t.ok)throw new Error("Export failed");let a=await t.blob(),s=URL.createObjectURL(a),i=document.createElement("a");i.href=s,i.download="dropicgram-export.json",document.body.appendChild(i),i.click(),i.remove(),URL.revokeObjectURL(s),g("Exported")}catch(t){g(t.message)}}),document.getElementById("logoutbtn").addEventListener("click",async()=>{await c("/api/auth/logout",{method:"POST"}),localStorage.removeItem("token"),m=null,_(),location.href=r("/")}),document.getElementById("deletebtn").addEventListener("click",async()=>{confirm("Delete your account permanently? This cannot be undone.")&&(await c("/api/account/account",{method:"DELETE"}),m=null,_(),location.href=r("/login"))})}async function gt(){if(!m)return y();document.title="Edit profile \xB7 Dropicgram",l.innerHTML=`
    <h1 style="margin:4px 4px 14px">Edit profile</h1>
    <div class="card">
      <div class="setting-row"><span>Avatar</span><label class="btn secondary" style="cursor:pointer">Upload<input type="file" id="avatarbtn" accept="image/*" hidden /></label></div>
      <div class="setting-row"><span>Cover photo</span><label class="btn secondary" style="cursor:pointer">Upload<input type="file" id="coverbtn" accept="image/*" hidden /></label></div>
      <form id="profform">
        <label class="field">Display name</label>
        <input class="input" name="display_name" value="${o(m.display_name)}" maxlength="30" />
        <label class="field">Bio</label>
        <textarea class="input" name="bio" rows="3" maxlength="160" placeholder="Tell us about yourself">${o(m.bio)}</textarea>
        <button class="btn" style="width:100%">Save profile</button>
      </form>
    </div>`,document.getElementById("avatarbtn").addEventListener("change",async e=>{let t=e.target.files?.[0];if(!t)return;let a=new FormData;a.append("image",t);let s=localStorage.getItem("token");await fetch(k+"/api/account/avatar",{method:"PUT",body:a,headers:s?{Authorization:`Bearer ${s}`}:{},credentials:"include"}),g("Avatar updated"),m=(await c("/api/auth/me")).user,_()}),document.getElementById("coverbtn").addEventListener("change",async e=>{let t=e.target.files?.[0];if(!t)return;let a=new FormData;a.append("image",t);let s=localStorage.getItem("token");await fetch(k+"/api/account/cover",{method:"PUT",body:a,headers:s?{Authorization:`Bearer ${s}`}:{},credentials:"include"}),g("Cover updated"),m=(await c("/api/auth/me")).user,_()}),document.getElementById("profform").addEventListener("submit",async e=>{e.preventDefault();let t=new FormData(e.target);await c("/api/account/profile",{method:"PUT",body:JSON.stringify({display_name:t.get("display_name"),bio:t.get("bio")})}),g("Profile saved"),m=(await c("/api/auth/me")).user,_()})}function vt(){if(!m)return y();document.title="Change password \xB7 Dropicgram",l.innerHTML=`
    <h1 style="margin:4px 4px 14px">Change password</h1>
    <div class="card">
      <form id="passform">
        <label class="field">Current password</label>
        <input class="input" name="current" type="password" required />
        <label class="field">New password</label>
        <input class="input" name="next" type="password" required />
        <button class="btn" style="width:100%">Change password</button>
      </form>
    </div>`,document.getElementById("passform").addEventListener("submit",async e=>{e.preventDefault();let t=new FormData(e.target);try{await c("/api/account/password",{method:"PUT",body:JSON.stringify({current:t.get("current"),next:t.get("next")})}),g("Password changed")}catch(a){g(a.message)}})}async function W(e,t,a,s){if(!m)return y();document.title=`${t} \xB7 Dropicgram`,l.innerHTML=`<h1 style="margin:4px 4px 14px">${o(t)}</h1><div id="list"></div>`;let i=await c(e);document.getElementById("list").innerHTML=i.users.length?i.users.map(n=>`
      <div class="card userrow">
        <a href="${r(`/${o(n.username)}`)}" data-nav="${r(`/${o(n.username)}`)}">${$(n,40)} <b>${o(n.display_name)}</b> <span class="username">@${o(n.username)}</span></a>
        <button class="btn secondary" data-action="list-act" data-u="${o(n.username)}">${a}</button>
      </div>`).join(""):'<div class="empty">None yet.</div>',document.querySelectorAll("[data-action=list-act]").forEach(n=>n.addEventListener("click",async()=>{let u=n.dataset.u;await c(s.replace("{u}",u),{method:"DELETE"}),n.closest(".userrow").remove(),g("Done")}))}async function ft(){if(!m)return y();document.title="Muted words \xB7 Dropicgram",l.innerHTML=`
    <h1 style="margin:4px 4px 14px">\u{1F910} Muted words</h1>
    <div class="card">
      <form id="wordform" style="display:flex;gap:8px">
        <input class="input" name="word" placeholder="Add a word to mute" />
        <button class="btn">Add</button>
      </form>
      <div id="words" style="margin-top:10px"></div>
    </div>`;async function e(){let t=await c("/api/misc/muted-words");document.getElementById("words").innerHTML=t.words.length?t.words.map(a=>`<span class="wordchip">${o(a)} <button data-action="rmword" data-w="${o(a)}">\xD7</button></span>`).join(""):'<div class="empty">No muted words.</div>',document.querySelectorAll("[data-action=rmword]").forEach(a=>a.addEventListener("click",async()=>{await c("/api/misc/muted-words",{method:"DELETE",body:JSON.stringify({word:a.dataset.w})}),e()}))}document.getElementById("wordform").addEventListener("submit",async t=>{t.preventDefault();let a=t.target.elements.namedItem("word");a.value.trim()&&(await c("/api/misc/muted-words",{method:"POST",body:JSON.stringify({word:a.value})}),a.value="",e())}),e()}async function ht(){document.title="Docs \xB7 Dropicgram",l.innerHTML=`
  <div class="card docs">
    <h1>\u{1F4DA} Dropicgram Documentation</h1>
    <p class="muted">Dropicgram is a social photo-sharing platform with a custom <code>.pqos</code> image format, real-time messaging, and full REST + WebSocket APIs.</p>

    <h2>Quick Start</h2>
    <ol class="docs-list">
      <li>Create an account via <code>POST /api/auth/register</code> \u2014 you get back a <b>JWT</b>.</li>
      <li>Send it as <code>Authorization: Bearer &lt;token&gt;</code> on every request.</li>
      <li>Post text or images to <code>POST /api/posts</code>.</li>
      <li>For real-time events, open a WebSocket to <code>/ws?token=&lt;JWT&gt;</code>.</li>
    </ol>

    <h2>Authentication</h2>
    <p>All endpoints except <code>register</code> and <code>login</code> require a Bearer token. Registering or logging in also sets an <code>httpOnly</code> cookie as a fallback.</p>
    <pre class="codeblock">curl -X POST https://api/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"username":"you","password":"pass"}'</pre>

    <h2>Images & the .pqos format</h2>
    <p>Uploaded images are converted to <b>.pqos</b>: a container holding a <code>PQOS</code> magic header, owner id, timestamp, sha256, an invisible XOR-obfuscated watermark, and WebP payload. Images are served back as <code>image/webp</code>.</p>
    <ul class="docs-list">
      <li><b>Watermark</b> \u2014 each image is cryptographically tied to its uploader.</li>
      <li><b>Dedup</b> \u2014 exact SHA-256 match <i>plus</i> a perceptual pHash catch re-encoded, resized, and rotated copies. Duplicates are rejected with a 409 naming the original owner.</li>
      <li><b>Compact</b> \u2014 images are capped at 1600px, auto-rotated, and recompressed to WebP.</li>
    </ul>

    <h2>WebSocket events</h2>
    <table class="doctable">
      <tr><th>Event</th><th>Payload</th><th>When</th></tr>
      <tr><td>connected</td><td>{userId}</td><td>on connect</td></tr>
      <tr><td>dm</td><td>{from, sender_username, body, image}</td><td>new DM</td></tr>
      <tr><td>notification</td><td>{notification}</td><td>new notification</td></tr>
      <tr><td>typing</td><td>{from}</td><td>someone typing</td></tr>
      <tr><td>read</td><td>{from}</td><td>messages read</td></tr>
      <tr><td>new_post</td><td>{post}</td><td>a post was created</td></tr>
    </table>

    <h2>API Reference</h2>
    <p>Browse every endpoint interactively in the <a class="taglink" data-nav="${r("/apidocs")}" href="${r("/apidocs")}">API docs</a>.</p>
  </div>`}function yt(e){return o(typeof e=="string"?e:JSON.stringify(e,null,2))}async function bt(){document.title="API Docs \xB7 Dropicgram",l.innerHTML='<div class="card"><h1>\u26A1 API Reference</h1><div class="skeleton"></div></div>';let e;try{e=await(await fetch(k+"/api/openapi.json")).json()}catch{l.innerHTML='<div class="card"><h1>API Reference</h1><div class="empty">Failed to load the OpenAPI spec.</div></div>';return}let t=e.tags?.map(d=>d.name)??[],a=e.paths??{},s=`<div class="card">
    <h1>\u26A1 API Reference</h1>
    <p class="muted">${o(e.info.title)} \u2014 ${o(e.info.version)}. ${o(e.info.description||"")}</p>
    <p class="muted">Auth: <code>Authorization: Bearer &lt;JWT&gt;</code></p>
    <div class="apidoc-tags">${t.map(d=>`<button class="btn secondary apidoc-tag" data-tag="${o(d)}">${o(d)}</button>`).join("")}</div>
  </div>
  <div id="apidoc-paths"></div>`;l.innerHTML=s;let i=[];for(let[d,p]of Object.entries(a))for(let[v,w]of Object.entries(p)){if(!["get","post","put","delete"].includes(v))continue;let h=w.tags?.[0]??"other";i.push({tag:h,path:d,method:v,summary:w.summary||"",op:w})}let n=document.getElementById("apidoc-paths");function u(d){let p=d?i.filter(v=>v.tag===d):i;n.innerHTML=p.map(v=>{let w=(v.op.parameters||[]).map(E=>`
        <tr><td>${o(E.name)}</td><td>${o(E.in)}</td><td>${E.required?"required":"optional"}</td><td>${o(JSON.stringify(E.schema||{}))}</td></tr>`).join(""),h=v.op.requestBody?.content?Object.entries(v.op.requestBody.content).map(([E,D])=>`<div class="doc-section"><div class="doc-label">${o(E)}</div><pre class="codeblock">${yt(D.schema)}</pre></div>`).join(""):"",b=v.op.responses?Object.entries(v.op.responses).map(([E,D])=>`
          <div class="doc-section"><span class="doc-badge">${o(E)}</span> ${o(D.description||"")}</div>`).join(""):"";return`
      <div class="card apidoc-endpoint" data-tag="${o(v.tag)}">
        <div class="apidoc-head">
          <span class="apidoc-method ${o(v.method)}">${o(v.method.toUpperCase())}</span>
          <code class="apidoc-path">${o(v.path)}</code>
        </div>
        <p class="muted">${o(v.summary)}</p>
        <button class="btn secondary apidoc-toggle">Show details</button>
        <div class="apidoc-detail" hidden>
          ${w?`<div class="doc-section"><div class="doc-label">Parameters</div><table class="doctable">${w}</table></div>`:""}
          ${h}
          ${b?`<div class="doc-section"><div class="doc-label">Responses</div>${b}</div>`:""}
        </div>
      </div>`}).join("")||'<div class="empty">No endpoints in this tag.</div>'}u(),l.querySelectorAll(".apidoc-tag").forEach(d=>d.addEventListener("click",()=>{let p=d.dataset.tag;l.querySelectorAll(".apidoc-tag").forEach(v=>v.classList.remove("active")),d.classList.add("active"),u(p)})),n.addEventListener("click",d=>{let p=d.target.closest(".apidoc-toggle");if(!p)return;let v=p.closest(".apidoc-endpoint").querySelector(".apidoc-detail");v.hidden=!v.hidden,p.textContent=v.hidden?"Show details":"Hide details"})}async function $t(){if(!m)return y();document.title="Stats \xB7 Dropicgram",l.innerHTML='<h1 style="margin:4px 4px 14px">\u{1F4CA} My stats</h1><div id="s"><div class="skeleton"></div></div>';let e=await c("/api/misc/stats"),t=[["posts","Posts"],["likes_received","Likes received"],["likes_given","Likes given"],["comments_received","Comments received"],["comments_given","Comments given"],["followers","Followers"],["following","Following"],["reposts","Reposts"]];document.getElementById("s").innerHTML=`<div class="stats-grid">${t.map(([a,s])=>`<div class="card stat"><b>${e[a]??0}</b><span>${s}</span></div>`).join("")}</div>`}async function wt(e){let a=(await c("/api/stories")).stories.filter(u=>u.user_id===e);if(!a.length)return g("Story not found");await c(`/api/stories/${a[0].id}/view`,{method:"POST"});let s=0;l.innerHTML=`
    <div class="storyviewer">
      <div class="sv-top">
        ${$(a[0],36)} <b>${o(a[0].username)}</b>
        <button class="btn" data-action="sv-close" style="margin-left:auto">\u2715</button>
      </div>
      <img class="sv-img" src="${S(a[0].image)}" />
      <div class="sv-nav">
        <button class="btn secondary" data-action="sv-prev">\u2190</button>
        <span>${a.length} story${a.length>1?"s":""}</span>
        <button class="btn secondary" data-action="sv-next">\u2192</button>
      </div>
    </div>`;let i=l.querySelector(".sv-img"),n=()=>{i.src=S(a[s].image),document.title=`${a[s].username} \xB7 story`};l.querySelector('[data-action="sv-close"]').addEventListener("click",()=>f()),l.querySelector('[data-action="sv-prev"]').addEventListener("click",()=>{s>0&&(s--,n())}),l.querySelector('[data-action="sv-next"]').addEventListener("click",()=>{s<a.length-1?(s++,n()):f()}),n()}function Et(){document.querySelectorAll("[data-action=view-story]").forEach(e=>e.addEventListener("click",()=>{let t=Number(e.dataset.uid);l.innerHTML='<div class="skeleton"></div>',wt(t)})),document.querySelectorAll("[data-action=add-story]").forEach(e=>e.addEventListener("click",()=>{let t=document.createElement("input");t.type="file",t.accept="image/*",t.onchange=async()=>{let a=t.files?.[0];if(!a)return;let s=new FormData;s.append("image",a);try{await B("/api/stories",s),g("Story posted for 24h"),f()}catch(i){g(i.message)}},t.click()}))}function I(e){e.querySelectorAll("[data-action=like]").forEach(t=>t.addEventListener("click",async()=>{if(!m)return location.href=r("/login");let s=t.closest(".post").dataset.postid,i=t.classList.contains("liked")?"unlike":"like";t.classList.toggle("liked",i==="like");let n=t.querySelector("span");n&&(n.textContent=String(Math.max(0,Number(n.textContent)+(i==="like"?1:-1))));let u=await c(`/api/posts/${s}/${i}`,{method:"POST"});n&&(n.textContent=String(u.post.likes_count))})),e.querySelectorAll(".post").forEach(t=>{let a=0;t.addEventListener("dblclick",()=>{let s=t.querySelector("[data-action=like]");s&&!s.classList.contains("liked")&&s.click()}),t.addEventListener("touchend",s=>{let i=Date.now();if(i-a<300){let n=t.querySelector("[data-action=like]");n&&!n.classList.contains("liked")&&n.click();let u=t.querySelector(".post-img");u&&u.animate([{transform:"scale(1.15)"},{transform:"scale(1)"}],{duration:300})}a=i})}),e.querySelectorAll("[data-action=react]").forEach(t=>t.addEventListener("click",()=>{let s=t.closest(".post").dataset.postid,i=["\u2764\uFE0F","\u{1F602}","\u{1F44D}","\u{1F525}","\u{1F62E}","\u{1F622}"],n=document.createElement("div");n.className="emoji-sheet",n.innerHTML=i.map(d=>`<button class="emoji">${d}</button>`).join(""),l.appendChild(n);let u=async d=>{try{await c(`/api/posts/${s}/react`,{method:"POST",body:JSON.stringify({emoji:d})}),g(`Reacted ${d}`),f()}catch(p){g(p.message)}n.remove()};n.querySelectorAll(".emoji").forEach(d=>d.addEventListener("click",()=>u(d.textContent))),n.addEventListener("click",d=>{d.target===n&&n.remove()})})),e.querySelectorAll("[data-action=toggle-comments]").forEach(t=>t.addEventListener("click",()=>{let a=t.closest(".post").querySelector("[data-comments]");a.hidden=!a.hidden})),e.querySelectorAll("form[data-action=comment]").forEach(t=>t.addEventListener("submit",async a=>{a.preventDefault();let s=t.elements.namedItem("body"),i=t.elements.namedItem("image"),n=i?.files?.[0];if(!s.value.trim()&&!n)return;let u=t.closest(".post"),d=u.dataset.postid,p;if(n){let v=new FormData(t);p=await B(`/api/posts/${d}/comments`,v)}else p=await c(`/api/posts/${d}/comments`,{method:"POST",body:JSON.stringify({body:s.value})});C(u,p.post),s.value="",i&&(i.value=""),M()})),e.querySelectorAll("[data-action=reply]").forEach(t=>t.addEventListener("click",()=>{let a=t.closest(".post"),s=t.dataset.cid,i=a.querySelector(".reply-box");if(i)return i.remove();let n=document.createElement("div");n.className="reply-box",n.innerHTML=`<form style="display:flex;gap:8px;margin-top:8px">
        <label class="btn secondary" style="cursor:pointer;padding:8px 12px">\u{1F4F7}<input type="file" name="image" accept="image/*" hidden /></label>
        <input class="input" placeholder="Reply..." name="body"/><button class="btn">Reply</button>
      </form>`,t.closest(".comment").appendChild(n),n.querySelector("form").addEventListener("submit",async u=>{u.preventDefault();let d=n.querySelector("input[name=body]"),v=n.querySelector("input[name=image]")?.files?.[0],w=d.value.trim();if(!w&&!v)return;let h=a.dataset.postid,b;if(v){let E=new FormData(n.querySelector("form"));E.append("parent_id",String(s)),b=await B(`/api/posts/${h}/comments`,E)}else b=await c(`/api/posts/${h}/comments`,{method:"POST",body:JSON.stringify({body:w,parent_id:s})});C(a,b.post),n.remove()})})),e.querySelectorAll("[data-action=like-comment]").forEach(t=>t.addEventListener("click",async()=>{if(!m)return location.href=r("/login");let a=t.dataset.cid,s=t.closest(".post"),i=s.dataset.postid;await c(`/api/posts/comments/${a}/like`,{method:"POST"});let n=await c(`/api/posts/${i}`);C(s,n.post)})),e.querySelectorAll("[data-action=vote]").forEach(t=>t.addEventListener("click",async()=>{if(!m)return location.href=r("/login");let a=t.closest(".post"),s=a.dataset.postid,i=t.dataset.opt;try{await c(`/api/posts/polls/${a.querySelector(".poll").dataset.pid}/vote`,{method:"POST",body:JSON.stringify({option_id:i})});let n=await c(`/api/posts/${s}`);C(a,n.post)}catch(n){g(n.message)}})),e.querySelectorAll("[data-action=menu]").forEach(t=>t.addEventListener("click",a=>{a.stopPropagation();let s=t.closest(".dropdown").querySelector(".menu");s.hidden=!s.hidden})),document.addEventListener("click",()=>{document.querySelectorAll(".menu").forEach(t=>t.hidden=!0)}),e.querySelectorAll("[data-action=save],[data-action=unsave]").forEach(t=>t.addEventListener("click",async()=>{let s=t.closest(".post").dataset.postid,i=t.dataset.action==="save";await c(`/api/misc/bookmarks/${s}`,{method:i?"POST":"DELETE"}),g(i?"Saved":"Removed"),t.textContent=i?"\u{1F516} Unsave":"\u{1F516} Save",t.dataset.action=i?"unsave":"save"})),e.querySelectorAll("[data-action=pin]").forEach(t=>t.addEventListener("click",async()=>{let a=t.closest(".post");await c(`/api/posts/${a.dataset.postid}/pin`,{method:"POST"}),g("Pinned"),f()})),e.querySelectorAll("[data-action=edit]").forEach(t=>t.addEventListener("click",()=>{let a=t.closest(".post"),s=a.querySelector(".post-body"),i=s&&s.textContent||"",n=document.createElement("div");n.className="reply-box",n.innerHTML=`<form style="display:flex;gap:8px;margin-top:8px"><input class="input" value="${o(i)}"/><button class="btn">Save</button></form>`,a.querySelector(".post-actions").appendChild(n),n.querySelector("form").addEventListener("submit",async u=>{u.preventDefault();let d=n.querySelector("input").value.trim();d&&(await c(`/api/posts/${a.dataset.postid}`,{method:"PUT",body:JSON.stringify({body:d})}),n.remove(),f())})})),e.querySelectorAll("[data-action=delete]").forEach(t=>t.addEventListener("click",async()=>{let a=t.closest(".post");confirm("Delete this post?")&&(await c(`/api/posts/${a.dataset.postid}`,{method:"DELETE"}),a.remove(),g("Deleted"))})),e.querySelectorAll("[data-action=repost]").forEach(t=>t.addEventListener("click",async()=>{if(!m)return location.href=r("/login");let a=t.closest(".post");await c(`/api/posts/${a.dataset.postid}/repost`,{method:"POST"}),g("Reposted"),f()})),e.querySelectorAll("[data-action=quote]").forEach(t=>t.addEventListener("click",()=>{let a=t.closest(".post"),s=a.querySelector(".post-body"),i=s&&s.textContent||"",n=document.createElement("div");n.className="reply-box",n.innerHTML=`<form style="display:flex;gap:8px;margin-top:8px"><input class="input" placeholder="Quote..." value="${o(i)}"/><button class="btn">Quote</button></form>`,a.querySelector(".post-actions").appendChild(n),n.querySelector("form").addEventListener("submit",async u=>{u.preventDefault();let d=n.querySelector("input").value.trim();d&&(await c(`/api/posts/${a.dataset.postid}/quote`,{method:"POST",body:JSON.stringify({body:d})}),n.remove(),f())})})),e.querySelectorAll("[data-action=share]").forEach(t=>t.addEventListener("click",()=>{let a=t.closest(".post").dataset.postid,s=location.origin+r(`/post/${a}`),i=()=>{navigator.clipboard?.writeText(s).then(()=>g("Link copied")).catch(()=>g(s))};navigator.share?navigator.share({url:s}).catch(i):i()})),e.querySelectorAll("[data-action=report]").forEach(t=>t.addEventListener("click",async()=>{let a=t.closest(".post").dataset.postid,s=prompt("Why are you reporting this post?");s!==null&&(await c("/api/misc/reports",{method:"POST",body:JSON.stringify({target_type:"post",target_id:a,reason:s})}),g("Reported. Thanks."))})),e.querySelectorAll("[data-action=mute]").forEach(t=>t.addEventListener("click",async()=>{let a=t.closest(".post"),s=a.dataset.postid?(a.querySelector(".username").textContent||"").replace("@",""):"";await c(`/api/misc/mutes/${encodeURIComponent(s)}`,{method:"POST"}),g(`Muted @${s}`)})),e.querySelectorAll("[data-action=block]").forEach(t=>t.addEventListener("click",async()=>{let a=t.closest(".post"),s=(a.querySelector(".username").textContent||"").replace("@","");await c(`/api/misc/blocks/${encodeURIComponent(s)}`,{method:"POST"}),g(`Blocked @${s}`),a.remove()})),e.querySelectorAll("[data-lightbox]").forEach(t=>t.addEventListener("click",()=>{let a=document.createElement("div");a.className="lightbox",a.innerHTML=`<img src="${o(t.src)}" /><button class="btn" style="position:absolute;top:16px;right:16px">\u2715</button>`,a.addEventListener("click",s=>{(s.target===a||s.target.tagName==="BUTTON")&&a.remove()}),document.body.appendChild(a)}))}function C(e,t){let a=e.querySelector("[data-comment-list]");a&&(a.innerHTML=t.comments.map(u=>z(u,t.id)).join(""));let s=e.querySelector("[data-action=toggle-comments] span");s&&(s.textContent=String(t.comments_count));let i=e.querySelector("[data-action=like] span");i&&(i.textContent=String(t.likes_count));let n=e.querySelector("[data-action=like]");n&&n.classList.toggle("liked",t.liked_by_me)}async function f(){Q();let e=location.pathname;location.hash&&location.hash.startsWith("#post")&&(e=`/post/${location.hash.slice(5)}`),T&&e.startsWith(T)&&(e=e.slice(T.length)||"/"),e=e.replace(/^\/#.*/,"");let t=e.split("/").filter(Boolean);if(e==="/")return et();if(e==="/explore")return at();if(t[0]==="search")return st(decodeURIComponent(t[1]||""));if(t[0]==="hashtag")return nt(t[1]||"");if(t[0]==="notifications")return it();if(t[0]==="messages")return t[1]?ct(t[1]):dt();if(t[0]==="bookmarks")return lt();if(t[0]==="requests")return mt();if(t[0]==="drafts")return ut();if(t[0]==="settings"&&t[1]==="edit")return gt();if(t[0]==="settings"&&t[1]==="password")return vt();if(t[0]==="settings")return pt();if(t[0]==="blocks")return W("/api/misc/blocks","Blocked users","Unblock","/api/misc/blocks/{u}");if(t[0]==="mutes")return W("/api/misc/mutes","Muted users","Unmute","/api/misc/mutes/{u}");if(t[0]==="muted-words")return ft();if(t[0]==="docs")return ht();if(t[0]==="apidocs")return bt();if(t[0]==="stats")return $t();if(t[0]==="followers")return J(t[1]||"","followers");if(t[0]==="following")return J(t[1]||"","following");if(t[0]==="post")return rt(Number(t[1]));if(e==="/login")return y();if(t[0]==="me")return m?F(m.username):y();if(t.length===1)return F(t[0])}function Lt(){R.addEventListener("click",async t=>{t.target.closest("[data-action=logout]")&&(await c("/api/auth/logout",{method:"POST"}),localStorage.removeItem("token"),m=null,_(),location.href=r("/"))}),document.addEventListener("click",t=>{let a=t.target.closest("[data-nav]");if(!a)return;t.preventDefault();let s=a.dataset.nav;location.pathname!==s&&(history.pushState({},"",s),f())}),window.addEventListener("popstate",f);let e=document.getElementById("topsearch");e&&e.addEventListener("keydown",t=>{if(t.key==="Enter"){let a=e.value.trim();a&&(history.pushState({},"",r(`/search/${encodeURIComponent(a)}`)),f())}})}function kt(){let e=localStorage.getItem("token")||"",t=location.protocol==="https:"?"wss":"ws",a=k?new URL(k).host:location.host;return`${t}://${a}/ws?token=${encodeURIComponent(e)}`}function N(){let e=localStorage.getItem("token");if(e){j=e;try{A=new WebSocket(kt())}catch{return}A.onmessage=t=>{try{let a=JSON.parse(t.data);if(a.type==="connected")return;O&&O(a)}catch{}},A.onclose=()=>{localStorage.getItem("token")===j&&setTimeout(N,3e3)}}}function St(e){A&&A.readyState===WebSocket.OPEN&&A.send(JSON.stringify(e))}function Tt(e){if(e.type==="notification")M(),g(`\u{1F514} ${e.notification?.actor?.username||"Someone"} ${e.notification?.label||"interacted"}`);else if(e.type==="dm"){M();let t=String(e.sender_username||""),a=String(e.body||"[photo]");g(`\u{1F4E9} ${t}: ${a}`)}else if(e.type==="new_post")M();else if(e.type==="typing"){let t=Number(e.from);if(location.pathname.includes("/messages/")){let a=document.getElementById("typing-ind");a&&(a.textContent="typing\u2026")}}}async function _t(){Lt(),O=Tt;try{let e=sessionStorage.getItem("redirect");if(e){sessionStorage.removeItem("redirect");try{let a=new URL(e).pathname.replace(/\/$/,"")||"/";T&&a.startsWith(T)&&(a=a.slice(T.length)||"/"),history.replaceState({},"",T+a)}catch{}}}catch{}try{m=(await c("/api/auth/me")).user,N();try{L=(await c("/api/account/settings")).settings}catch{}document.body.classList.toggle("light",L.dark_mode===0)}catch{m=null}_(),M(),f()}_t();})();
