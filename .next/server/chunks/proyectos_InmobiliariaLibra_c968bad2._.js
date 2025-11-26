module.exports=[72071,e=>e.a(async(a,t)=>{try{var i=e.i(4831),s=e.i(3966),r=a([s]);async function n(e,{params:a}){try{var t;let e;if(!s.sql)return i.NextResponse.json({error:"Database not configured"},{status:503});let{id:r}=await a,[n]=await s.sql`
      SELECT * FROM properties WHERE id = ${r}
    `;if(!n)return i.NextResponse.json({error:"Property not found"},{status:404});let o=await s.sql`
      SELECT * FROM rooms WHERE property_id = ${r}
    `,l=await s.sql`
      SELECT s.* FROM services s
      JOIN property_services ps ON s.id = ps.service_id
      WHERE ps.property_id = ${r}
    `,d=(t={...n,rooms:o,images:[],services:l},e=new Date().toLocaleDateString("es-AR",{day:"numeric",month:"long",year:"numeric"}),`
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Borrador de Contrato de Alquiler - ${t.title}</title>
  <style>
    @page {
      margin: 2cm;
    }
    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      color: #2A3136;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      color: #FE5000;
      text-align: center;
      font-size: 24px;
      margin-bottom: 10px;
    }
    h2 {
      color: #FE5000;
      font-size: 18px;
      margin-top: 30px;
      margin-bottom: 15px;
      border-bottom: 2px solid #FE5000;
      padding-bottom: 5px;
    }
    h3 {
      color: #425563;
      font-size: 16px;
      margin-top: 20px;
      margin-bottom: 10px;
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 3px solid #FE5000;
    }
    .subtitle {
      color: #425563;
      font-size: 14px;
      margin-top: 5px;
    }
    .section {
      margin-bottom: 25px;
    }
    .property-info {
      background-color: #FFF4EC;
      padding: 15px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin: 10px 0;
    }
    .info-item {
      padding: 8px;
      background: white;
      border-radius: 4px;
    }
    .info-label {
      font-weight: bold;
      color: #425563;
      font-size: 12px;
      text-transform: uppercase;
    }
    .info-value {
      color: #2A3136;
      font-size: 16px;
      margin-top: 3px;
    }
    .room-list {
      margin: 15px 0;
    }
    .room-item {
      background: #F8F8F8;
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 4px;
      border-left: 3px solid #FE5000;
    }
    .room-title {
      font-weight: bold;
      color: #2A3136;
      margin-bottom: 5px;
    }
    .room-description {
      color: #425563;
      font-size: 14px;
    }
    .clause {
      margin-bottom: 20px;
      text-align: justify;
    }
    .clause-number {
      font-weight: bold;
      color: #FE5000;
    }
    .services-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin: 10px 0;
    }
    .service-badge {
      background: #FE5000;
      color: white;
      padding: 5px 12px;
      border-radius: 15px;
      font-size: 12px;
    }
    .signature-section {
      margin-top: 60px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
    }
    .signature-box {
      text-align: center;
      padding-top: 40px;
      border-top: 2px solid #2A3136;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #F8F8F8;
      text-align: center;
      font-size: 12px;
      color: #425563;
    }
    .highlight {
      background-color: #FFF4EC;
      padding: 2px 5px;
      border-radius: 3px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>BORRADOR DE CONTRATO DE LOCACI\xd3N</h1>
    <p class="subtitle">Propiedad: ${t.title}</p>
    <p class="subtitle">Fecha: ${e}</p>
  </div>

  <div class="property-info">
    <h2>Informaci\xf3n de la Propiedad</h2>
    <div class="info-grid">
      <div class="info-item">
        <div class="info-label">Superficie</div>
        <div class="info-value">${t.square_meters} m\xb2</div>
      </div>
      <div class="info-item">
        <div class="info-label">Cantidad de Ambientes</div>
        <div class="info-value">${t.rooms.length}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Precio Mensual</div>
        <div class="info-value">$${t.rental_price.toLocaleString("es-AR")}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Expensas</div>
        <div class="info-value">$${t.expenses.toLocaleString("es-AR")}</div>
      </div>
    </div>

    ${t.description?`
    <div style="margin-top: 15px;">
      <div class="info-label">Descripci\xf3n General</div>
      <p style="margin-top: 5px;">${t.description}</p>
    </div>
    `:""}
  </div>

  <div class="section">
    <h2>Descripci\xf3n de Ambientes</h2>
    <div class="room-list">
      ${t.rooms.map(e=>`
        <div class="room-item">
          <div class="room-title">${e.title}</div>
          ${e.description?`<div class="room-description">${e.description}</div>`:""}
        </div>
      `).join("")}
    </div>
  </div>

  ${t.services.length>0?`
  <div class="section">
    <h2>Servicios Incluidos</h2>
    <div class="services-list">
      ${t.services.map(e=>`
        <span class="service-badge">${e.name}</span>
      `).join("")}
    </div>
  </div>
  `:""}

  <div class="section">
    <h2>Cl\xe1usulas del Contrato</h2>

    <div class="clause">
      <span class="clause-number">PRIMERA - PARTES:</span> Entre el <span class="highlight">LOCADOR</span> 
      (propietario del inmueble) y el <span class="highlight">LOCATARIO</span> (inquilino), se celebra el 
      presente contrato de locaci\xf3n bajo las siguientes condiciones.
    </div>

    <div class="clause">
      <span class="clause-number">SEGUNDA - OBJETO:</span> El LOCADOR da en locaci\xf3n al LOCATARIO el 
      inmueble ubicado en <span class="highlight">[DIRECCI\xd3N A COMPLETAR]</span>, con una superficie de 
      <strong>${t.square_meters} metros cuadrados</strong>, compuesto por ${t.rooms.length} 
      ambientes conforme a la descripci\xf3n detallada anteriormente.
    </div>

    <div class="clause">
      <span class="clause-number">TERCERA - DESTINO:</span> El inmueble se destinar\xe1 exclusivamente para 
      vivienda \xfanica, familiar y permanente del LOCATARIO, quedando prohibido el cambio de destino sin 
      autorizaci\xf3n previa y por escrito del LOCADOR.
    </div>

    <div class="clause">
      <span class="clause-number">CUARTA - PLAZO:</span> El presente contrato se celebra por el t\xe9rmino de 
      <strong>24 (VEINTICUATRO) MESES</strong>, comenzando el d\xeda <span class="highlight">[FECHA INICIO]</span> 
      y finalizando el d\xeda <span class="highlight">[FECHA FIN]</span>.
    </div>

    <div class="clause">
      <span class="clause-number">QUINTA - PRECIO:</span> El precio del alquiler mensual se fija en la suma de 
      <strong>PESOS ${t.rental_price.toLocaleString("es-AR")} ($${t.rental_price.toLocaleString("es-AR")})</strong>, 
      que el LOCATARIO abonar\xe1 mensualmente por adelantado dentro de los primeros 10 d\xedas de cada mes.
    </div>

    <div class="clause">
      <span class="clause-number">SEXTA - EXPENSAS:</span> Las expensas ordinarias y extraordinarias del 
      inmueble ascienden a <strong>PESOS ${t.expenses.toLocaleString("es-AR")} ($${t.expenses.toLocaleString("es-AR")})</strong> 
      mensuales y ser\xe1n abonadas por el LOCATARIO.
    </div>

    <div class="clause">
      <span class="clause-number">S\xc9PTIMA - ACTUALIZACI\xd3N:</span> El precio del alquiler ser\xe1 actualizado 
      <strong>TRIMESTRALMENTE</strong> de acuerdo con las variaciones del <strong>\xcdndice de Precios al Consumidor (IPC)</strong> 
      publicado por el INDEC, seg\xfan lo establecido en el art\xedculo 14 de la Ley 27.551 (suspendida). Ante la ausencia 
      de ley de alquileres vigente, las partes acuerdan esta modalidad de actualizaci\xf3n como mecanismo de ajuste peri\xf3dico.
    </div>

    <div class="clause">
      <span class="clause-number">OCTAVA - GARANT\xcdA:</span> El LOCATARIO constituir\xe1 garant\xeda mediante 
      <span class="highlight">[ESPECIFICAR TIPO DE GARANT\xcdA: Seguro de Cauci\xf3n, T\xedtulo de Propiedad, Recibo de Sueldo, etc.]</span>
    </div>

    <div class="clause">
      <span class="clause-number">NOVENA - SERVICIOS:</span> Corren por cuenta del LOCATARIO los servicios de 
      ${t.services.length>0?t.services.map(e=>e.name).join(", "):"luz, agua, gas, internet"} 
      y dem\xe1s servicios que se contraten para el inmueble.
    </div>

    <div class="clause">
      <span class="clause-number">D\xc9CIMA - OBLIGACIONES DEL LOCATARIO:</span> El LOCATARIO se compromete a:
      <ul style="margin-top: 10px;">
        <li>Mantener el inmueble en buen estado de conservaci\xf3n y limpieza.</li>
        <li>No realizar modificaciones sin autorizaci\xf3n del LOCADOR.</li>
        <li>Permitir inspecciones peri\xf3dicas con previo aviso.</li>
        <li>Abonar puntualmente el alquiler y expensas.</li>
        <li>Dar aviso inmediato de cualquier desperfecto.</li>
      </ul>
    </div>

    <div class="clause">
      <span class="clause-number">DECIMOPRIMERA - RESCISI\xd3N:</span> Cualquiera de las partes podr\xe1 rescindir 
      anticipadamente el contrato transcurridos 6 meses de contrato, debiendo notificar fehacientemente a la 
      otra parte con 60 d\xedas de anticipaci\xf3n si la rescisi\xf3n la ejerce el LOCATARIO, o con 90 d\xedas si la ejerce 
      el LOCADOR.
    </div>
  </div>

  <div class="footer">
    <p><strong>NOTA IMPORTANTE:</strong> Este es un borrador de contrato que debe ser revisado y completado 
    por un profesional del derecho antes de su firma. Los datos marcados entre corchetes [  ] deben ser 
    completados con la informaci\xf3n espec\xedfica de las partes.</p>
  </div>

  <div class="signature-section">
    <div class="signature-box">
      <strong>LOCADOR</strong><br>
      Firma y Aclaraci\xf3n<br>
      DNI:
    </div>
    <div class="signature-box">
      <strong>LOCATARIO</strong><br>
      Firma y Aclaraci\xf3n<br>
      DNI:
    </div>
  </div>
</body>
</html>
  `);return new i.NextResponse(d,{headers:{"Content-Type":"text/html; charset=utf-8"}})}catch(e){return console.error("[v0] Error generating PDF:",e),i.NextResponse.json({error:"Error generating PDF"},{status:500})}}[s]=r.then?(await r)():r,e.s(["GET",()=>n]),t()}catch(e){t(e)}},!1),887,e=>e.a(async(a,t)=>{try{var i=e.i(47215),s=e.i(89737),r=e.i(57717),n=e.i(42471),o=e.i(54165),l=e.i(53033),d=e.i(22960),c=e.i(86335),p=e.i(47482),u=e.i(72149),m=e.i(54516),v=e.i(33443),x=e.i(99156),g=e.i(94548),h=e.i(50693),f=e.i(56920),R=e.i(93695);e.i(27709);var b=e.i(29181),A=e.i(72071),E=a([A]);[A]=E.then?(await E)():E;let y=new i.AppRouteRouteModule({definition:{kind:s.RouteKind.APP_ROUTE,page:"/api/properties/[id]/pdf/route",pathname:"/api/properties/[id]/pdf",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/proyectos/InmobiliariaLibra/app/api/properties/[id]/pdf/route.ts",nextConfigOutput:"",userland:A}),{workAsyncStorage:T,workUnitAsyncStorage:I,serverHooks:w}=y;function C(){return(0,r.patchFetch)({workAsyncStorage:T,workUnitAsyncStorage:I})}async function O(e,a,t){y.isDev&&(0,n.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let i="/api/properties/[id]/pdf/route";i=i.replace(/\/index$/,"")||"/";let r=await y.prepare(e,a,{srcPage:i,multiZoneDraftMode:!1});if(!r)return a.statusCode=400,a.end("Bad Request"),null==t.waitUntil||t.waitUntil.call(t,Promise.resolve()),null;let{buildId:A,params:E,nextConfig:C,parsedUrl:O,isDraftMode:T,prerenderManifest:I,routerServerContext:w,isOnDemandRevalidate:S,revalidateOnlyGenerated:N,resolvedPathname:P,clientReferenceManifest:L,serverActionsManifest:D}=r,F=(0,c.normalizeAppPath)(i),$=!!(I.dynamicRoutes[F]||I.routes[P]),q=async()=>((null==w?void 0:w.render404)?await w.render404(e,a,O,!1):a.end("This page could not be found"),null);if($&&!T){let e=!!I.routes[P],a=I.dynamicRoutes[F];if(a&&!1===a.fallback&&!e){if(C.experimental.adapterPath)return await q();throw new R.NoFallbackError}}let M=null;!$||y.isDev||T||(M=P,M="/index"===M?"/":M);let _=!0===y.isDev||!$,H=$&&!_;D&&L&&(0,l.setReferenceManifestsSingleton)({page:i,clientReferenceManifest:L,serverActionsManifest:D,serverModuleMap:(0,d.createServerModuleMap)({serverActionsManifest:D})});let U=e.method||"GET",j=(0,o.getTracer)(),z=j.getActiveScopeSpan(),k={params:E,prerenderManifest:I,renderOpts:{experimental:{authInterrupts:!!C.experimental.authInterrupts},cacheComponents:!!C.cacheComponents,supportsDynamicResponse:_,incrementalCache:(0,n.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:C.cacheLife,waitUntil:t.waitUntil,onClose:e=>{a.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(a,t,i)=>y.onRequestError(e,a,i,w)},sharedContext:{buildId:A}},B=new p.NodeNextRequest(e),G=new p.NodeNextResponse(a),K=u.NextRequestAdapter.fromNodeNextRequest(B,(0,u.signalFromNodeResponse)(a));try{let r=async e=>y.handle(K,k).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":a.statusCode,"next.rsc":!1});let t=j.getRootSpanAttributes();if(!t)return;if(t.get("next.span_type")!==m.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${t.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let s=t.get("next.route");if(s){let a=`${U} ${s}`;e.setAttributes({"next.route":s,"http.route":s,"next.span_name":a}),e.updateName(a)}else e.updateName(`${U} ${i}`)}),l=!!(0,n.getRequestMeta)(e,"minimalMode"),d=async n=>{var o,d;let c=async({previousCacheEntry:s})=>{try{if(!l&&S&&N&&!s)return a.statusCode=404,a.setHeader("x-nextjs-cache","REVALIDATED"),a.end("This page could not be found"),null;let i=await r(n);e.fetchMetrics=k.renderOpts.fetchMetrics;let o=k.renderOpts.pendingWaitUntil;o&&t.waitUntil&&(t.waitUntil(o),o=void 0);let d=k.renderOpts.collectedTags;if(!$)return await (0,x.sendResponse)(B,G,i,k.renderOpts.pendingWaitUntil),null;{let e=await i.blob(),a=(0,g.toNodeOutgoingHttpHeaders)(i.headers);d&&(a[f.NEXT_CACHE_TAGS_HEADER]=d),!a["content-type"]&&e.type&&(a["content-type"]=e.type);let t=void 0!==k.renderOpts.collectedRevalidate&&!(k.renderOpts.collectedRevalidate>=f.INFINITE_CACHE)&&k.renderOpts.collectedRevalidate,s=void 0===k.renderOpts.collectedExpire||k.renderOpts.collectedExpire>=f.INFINITE_CACHE?void 0:k.renderOpts.collectedExpire;return{value:{kind:b.CachedRouteKind.APP_ROUTE,status:i.status,body:Buffer.from(await e.arrayBuffer()),headers:a},cacheControl:{revalidate:t,expire:s}}}}catch(a){throw(null==s?void 0:s.isStale)&&await y.onRequestError(e,a,{routerKind:"App Router",routePath:i,routeType:"route",revalidateReason:(0,v.getRevalidateReason)({isStaticGeneration:H,isOnDemandRevalidate:S})},w),a}},p=await y.handleResponse({req:e,nextConfig:C,cacheKey:M,routeKind:s.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:I,isRoutePPREnabled:!1,isOnDemandRevalidate:S,revalidateOnlyGenerated:N,responseGenerator:c,waitUntil:t.waitUntil,isMinimalMode:l});if(!$)return null;if((null==p||null==(o=p.value)?void 0:o.kind)!==b.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==p||null==(d=p.value)?void 0:d.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});l||a.setHeader("x-nextjs-cache",S?"REVALIDATED":p.isMiss?"MISS":p.isStale?"STALE":"HIT"),T&&a.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let u=(0,g.fromNodeOutgoingHttpHeaders)(p.value.headers);return l&&$||u.delete(f.NEXT_CACHE_TAGS_HEADER),!p.cacheControl||a.getHeader("Cache-Control")||u.get("Cache-Control")||u.set("Cache-Control",(0,h.getCacheControlHeader)(p.cacheControl)),await (0,x.sendResponse)(B,G,new Response(p.value.body,{headers:u,status:p.value.status||200})),null};z?await d(z):await j.withPropagatedContext(e.headers,()=>j.trace(m.BaseServerSpan.handleRequest,{spanName:`${U} ${i}`,kind:o.SpanKind.SERVER,attributes:{"http.method":U,"http.target":e.url}},d))}catch(a){if(a instanceof R.NoFallbackError||await y.onRequestError(e,a,{routerKind:"App Router",routePath:F,routeType:"route",revalidateReason:(0,v.getRevalidateReason)({isStaticGeneration:H,isOnDemandRevalidate:S})}),$)throw a;return await (0,x.sendResponse)(B,G,new Response(null,{status:500})),null}}e.s(["handler",()=>O,"patchFetch",()=>C,"routeModule",()=>y,"serverHooks",()=>w,"workAsyncStorage",()=>T,"workUnitAsyncStorage",()=>I]),t()}catch(e){t(e)}},!1)];

//# sourceMappingURL=proyectos_InmobiliariaLibra_c968bad2._.js.map