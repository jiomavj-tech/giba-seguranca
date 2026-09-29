import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

type Camera={id:string;name:string;channel:number;status:string};
const API="http://localhost:8787";

function App(){
 const [cameras,setCameras]=useState<Camera[]>([]);
 const [deviceState,setDeviceState]=useState("UNKNOWN");

 async function refresh(){
   const [c,d]=await Promise.all([fetch(API+"/cameras").then(r=>r.json()),fetch(API+"/devices").then(r=>r.json())]);
   setCameras(c); setDeviceState(d[0]?.status ?? "UNKNOWN");
 }
 useEffect(()=>{
   refresh();
   const ws=new WebSocket("ws://localhost:8787/ws");
   ws.onmessage=()=>refresh();
   return()=>ws.close();
 },[]);
 async function toggle(c:Camera){
   const action=c.status==="ONLINE"?"offline":"online";
   await fetch(`${API}/lab/fake/camera/${c.id}/${action}`,{method:"POST"});
 }
 return <main>
   <header><div><h1>Giba Segurança Pro</h1><p>0.0.1-LAB · LAB-GIBA-001</p></div><span className={"badge "+deviceState.toLowerCase()}>{deviceState}</span></header>
   <section className="panel"><h2>Fake DVR</h2><p>Simulador de 4 canais</p></section>
   <section><h2>Câmeras</h2><div className="grid">{cameras.map(c=><article className="camera" key={c.id}>
     <div className="screen"><span>{c.status==="ONLINE"?"LIVE":"OFFLINE"}</span></div>
     <div className="row"><div><strong>{c.name}</strong><small>Canal {c.channel}</small></div><span className={"dot "+c.status.toLowerCase()}></span></div>
     <button onClick={()=>toggle(c)}>{c.status==="ONLINE"?"SIMULAR OFFLINE":"RESTAURAR ONLINE"}</button>
   </article>)}</div></section>
   <button className="reset" onClick={()=>fetch(API+"/lab/fake/reset",{method:"POST"})}>RESET LAB</button>
 </main>
}
createRoot(document.getElementById("root")!).render(<App/>);
