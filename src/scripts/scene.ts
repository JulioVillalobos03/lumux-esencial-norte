import * as THREE from 'three';
import {runScene,type SceneContext,type SceneState} from './scene-runtime';

export function mountScene(host:HTMLElement){return runScene(host,context=>buildPavilion(host,context));}

function buildPavilion(host:HTMLElement,{scene,camera,renderer,color}:SceneContext){
 const warmMaterialColor=color('--color-scene-primary');
 const paleColor=color('--color-paper');
 const stoneColor=warmMaterialColor.clone().lerp(paleColor,.4);
 const forestColor=color('--color-scene-secondary');
 const white=color('--color-white');
 scene.add(new THREE.HemisphereLight(white,forestColor,2.3));
 const sunlight=new THREE.DirectionalLight(white,4);sunlight.position.set(4,8,5);scene.add(sunlight);
 const fill=new THREE.DirectionalLight(paleColor,1.5);fill.position.set(-6,4,-4);scene.add(fill);
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
 sunlight.castShadow=true;sunlight.shadow.mapSize.set(1024,1024);sunlight.shadow.camera.left=-9;sunlight.shadow.camera.right=9;sunlight.shadow.camera.top=9;sunlight.shadow.camera.bottom=-9;sunlight.shadow.normalBias=.05;
 const pavilion=new THREE.Group();scene.add(pavilion);
 const masonry=new THREE.Group(),frame=new THREE.Group(),roof=new THREE.Group(),plan=new THREE.Group();pavilion.add(masonry,frame,roof,plan);
 const stone=new THREE.MeshStandardMaterial({color:stoneColor,roughness:.95});
 const lime=new THREE.MeshStandardMaterial({color:paleColor,roughness:.92});
 const timber=new THREE.MeshStandardMaterial({color:warmMaterialColor.clone().lerp(forestColor,.14),roughness:.82});
 const glass=new THREE.MeshPhysicalMaterial({color:paleColor,roughness:.05,metalness:.1,transparent:true,opacity:.23,clearcoat:1,side:THREE.DoubleSide});
 const leaf=new THREE.MeshStandardMaterial({color:forestColor,roughness:.88});
 const lineMaterial=new THREE.LineBasicMaterial({color:forestColor,transparent:true,opacity:.35});
 const box=(parent:THREE.Object3D,w:number,h:number,d:number,x:number,y:number,z:number,mat:THREE.Material=stone)=>{
  const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;
 };
 // A patio pavilion with four distinct layers: terrain, masonry, joinery and roof.
 box(pavilion,8.7,.14,6.8,0,-.2,0,lime);box(pavilion,7.4,.15,5.3,0,-.08,0,stone);
 box(pavilion,6.1,.1,4.1,0,.055,0,lime);
 box(masonry,6.1,2.5,.24,0,1.33,-1.95);
 box(masonry,.24,2.5,4.1,-2.95,1.33,0);
 box(masonry,.24,2.5,1.5,2.95,1.33,-1.25);
 box(masonry,.65,2.5,.24,2.73,1.33,1.94);
 // The open courtyard is legible through every scroll phase.
 box(masonry,1.8,.08,1.5,.35,.15,-.35,timber);
 box(masonry,1.8,.3,.12,.35,.27,-1.04,lime);box(masonry,.12,.3,1.4,1.20,.27,-.35,lime);
 for(const x of [-2.6,-1.35,0,1.35,2.6])box(frame,.085,2.42,.085,x,1.34,1.90,timber);
 for(const x of [-1.975,-.675,.675,1.975])box(frame,1.16,2.25,.025,x,1.34,1.90,glass);
 for(const z of [-.4,.8])box(frame,.025,2.25,1.16,2.98,1.34,z,glass);
 // Roof rails surround an actual aperture; the slats form moving shade.
 const roofY=2.67;
 box(roof,6.55,.20,1.18,0,roofY,1.55,lime);
 box(roof,6.55,.20,1.75,0,roofY,-1.30,lime);
 box(roof,2.88,.20,1.47,-1.83,roofY,.14,lime);
 box(roof,1.82,.20,1.47,2.36,roofY,.14,lime);
 for(let x=-2.85;x<=2.85;x+=.22)box(roof,.045,.10,1.18,x,roofY-.16,1.55,timber);
 box(frame,4.5,.1,.7,-.3,.45,-1.25,timber);
 box(frame,1.6,.42,.78,-.7,.42,.95,lime);box(frame,1.65,.40,.1,-.7,.70,1.28,lime);
 box(frame,.76,.04,.76,1.5,.51,.86,timber);
 // A single patio tree, triangulated foliage, and landscape outside the plinth.
 const tree=new THREE.Group();pavilion.add(tree);const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.06,.08,1.55,8),timber);trunk.position.set(.3,.93,-.37);tree.add(trunk);
 for(const [x,y,z,r] of [[.27,1.85,-.35,.49],[.56,1.92,-.12,.35],[-.04,1.77,-.44,.38],[.26,2.18,-.36,.3]]){const crown=new THREE.Mesh(new THREE.IcosahedronGeometry(r,1),leaf);crown.position.set(x,y,z);crown.castShadow=true;tree.add(crown);}
 const landscapeTree=new THREE.Mesh(new THREE.IcosahedronGeometry(.75,1),leaf);landscapeTree.position.set(-3.7,.70,-2.3);landscapeTree.scale.set(.65,1.05,.65);pavilion.add(landscapeTree);
 const grid=new THREE.GridHelper(10,30,forestColor,forestColor);const gridMaterial=grid.material as THREE.Material;gridMaterial.transparent=true;gridMaterial.opacity=.16;grid.position.y=-.30;pavilion.add(grid);
 const points=[new THREE.Vector3(-4.2,.006,-3),new THREE.Vector3(4.2,.006,-3),new THREE.Vector3(4.2,.006,3),new THREE.Vector3(-4.2,.006,3),new THREE.Vector3(-4.2,.006,-3)];
 const boundary=new THREE.Line(new THREE.BufferGeometry().setFromPoints(points),lineMaterial);plan.add(boundary);
 for(const z of [-2.5,2.5]){const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-3.5,.006,z),new THREE.Vector3(3.5,.006,z)]),lineMaterial);plan.add(line);}
 for(const x of [-3.5,3.5]){const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x,.006,-2.5),new THREE.Vector3(x,.006,2.5)]),lineMaterial);plan.add(line);}
 // Solar orbit in model space, rather than a decorative background sticker.
 const orbitPoints=Array.from({length:81},(_,i)=>{const a=i/80*Math.PI;return new THREE.Vector3(Math.cos(a)*5.5,Math.sin(a)*4.4+.1,-2.7);});
 const solarOrbit=new THREE.Line(new THREE.BufferGeometry().setFromPoints(orbitPoints),new THREE.LineBasicMaterial({color:forestColor,transparent:true,opacity:.28}));pavilion.add(solarOrbit);
 const sun=new THREE.Mesh(new THREE.SphereGeometry(.12,16,12),new THREE.MeshBasicMaterial({color:stoneColor}));pavilion.add(sun);
 const sunRing=new THREE.Mesh(new THREE.TorusGeometry(.24,.008,6,48),new THREE.MeshBasicMaterial({color:forestColor}));sun.add(sunRing);
 const origin=new THREE.Group();pavilion.add(origin);box(origin,.7,.018,.012,-3.85,.02,2.7,leaf);box(origin,.012,.018,.7,-3.85,.02,2.7,leaf);
 const abort=new AbortController();let material=host.dataset.material||'stone';let currentExplosion=0;
 const materialColors={stone:stoneColor,wood:warmMaterialColor.clone().lerp(forestColor,.14),lime:paleColor};
 window.addEventListener('norte:material',event=>{material=(event as CustomEvent<string>).detail;host.dataset.material=material;},{signal:abort.signal});
 camera.fov=38;camera.updateProjectionMatrix();
 const update=({progress:p,time,choice,pointer,aspect,paused}:SceneState)=>{
  const explosion=choice==='exploded'?1:choice==='solid'?0:Math.sin(p*Math.PI)*.85;
  currentExplosion=paused?explosion:THREE.MathUtils.lerp(currentExplosion,explosion,.08);
  masonry.position.y=currentExplosion*.52;frame.position.y=currentExplosion*1.12;roof.position.y=currentExplosion*2.4;
  roof.rotation.z=currentExplosion*.045;
  const orbit=-.78+p*1.6+pointer.x*.08;
  const baseRadius=13.3*Math.max(1,Math.pow(1/Math.max(.35,aspect),.52));
  const portrait=THREE.MathUtils.clamp((.9-aspect)/.45,0,1);
  // Fit the whole plinth at the current orbit, not just its central roof panel.
  // Projected width depends on both sides of the plan as the camera revolves.
  const projectedWidth=8.7*Math.abs(Math.cos(orbit))+6.8*Math.abs(Math.sin(orbit));
  const fitRadius=projectedWidth/(2*Math.tan(THREE.MathUtils.degToRad(camera.fov*.5))*Math.max(.3,aspect))*1.06;
  const radius=Math.max(baseRadius*(1+portrait*.3),fitRadius);
  host.dataset.framingRadius=radius.toFixed(2);
  const targetY=aspect<.8?2.8:1.8;
  camera.position.set(Math.sin(orbit)*radius,7.4+p*1.4+pointer.y*.2,Math.cos(orbit)*radius);
  camera.lookAt(0,targetY,0);
  const sunAngle=.15+p*(Math.PI-.3);sun.position.set(Math.cos(sunAngle)*5.5,Math.sin(sunAngle)*4.4+.1,-2.7);sunRing.lookAt(camera.position);
  sunlight.position.copy(sun.position).multiplyScalar(1.8);sunlight.intensity=3.5+Math.sin(p*Math.PI)*1.2;
  const finish=materialColors[material as keyof typeof materialColors]||stoneColor;
  stone.color.lerp(finish,.08);stone.roughness=material==='wood'?.77:.94;
  solarOrbit.material.opacity=.2+p*.25;
  plan.position.y=currentExplosion*.015;
  pavilion.rotation.y=Math.sin(time*.12)*.018;
 };
 return {update,dispose:()=>abort.abort()};
}
