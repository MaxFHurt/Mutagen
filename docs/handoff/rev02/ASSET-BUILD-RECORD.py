from PIL import Image,ImageDraw,ImageFilter,ImageEnhance
import numpy as np
from scipy import ndimage as ndi
from pathlib import Path
import json,hashlib,shutil,ast
R=Path('/workspace/scratch/5e36193018f9'); O=R/'MUTAGEN-Revision-02';O.mkdir(exist_ok=True)
HOME=R/'generated_images/exec-565c717c-44f6-4413-bf2a-d9b0edd19038.png'
MODE=R/'generated_images/exec-bc34a22a-fbea-43a5-9d99-f70366e83850.png'
BG=R/'generated_images/exec-8e6e8f1b-a47d-418c-80b1-af610dfe8d3e.png'
S=(1672,941)
def save(im,p,scale=2):
 p.parent.mkdir(parents=True,exist_ok=True)
 if scale!=1: im=im.resize((im.width*scale,im.height*scale),Image.Resampling.LANCZOS)
 im.save(p)
def pm(points):
 m=Image.new('L',S);ImageDraw.Draw(m).polygon(points,fill=255);return m
# Reuse surveyed outlines only, no writes to previous source or repository.
src=(R/'isolate_piping.py').read_text();start=src.index('home=[]');end=src.index('controls=',start);env={};exec(src[start:end],env);base=env['home']
def button(x,y,w,h):
 return [(x+32,y),(x+w-32,y),(x+w-23,y+8),(x+w-10,y+12),(x+w,y+28),(x+w,y+h-28),(x+w-12,y+h-12),(x+w-25,y+h),(x+25,y+h),(x+12,y+h-12),(x,y+h-28),(x,y+28),(x+10,y+12),(x+23,y+8)]
def layers(rgba):
 a=np.array(rgba);v=a[:,:,:3].astype(float);valid=a[:,:,3]>0
 seed=(v[:,:,1]>v[:,:,0]*1.25)&(v[:,:,1]>v[:,:,2]*1.18)&(v[:,:,1]>40)&valid
 labs,n=ndi.label(seed);cnt=np.bincount(labs.ravel());m=np.isin(labs,np.flatnonzero(cnt>=10)[1:]) if n else seed
 m=ndi.binary_fill_holes(ndi.binary_closing(m,iterations=1))&valid
 # Protect neutral printed lettering and its connected dark/purple edges.
 neutral=(v.min(2)>70)&((v.max(2)-v.min(2))<70)&m
 lab,n=ndi.label(neutral);cnt=np.bincount(lab.ravel());protected=np.isin(lab,np.flatnonzero(cnt>=28)[1:]) if n else neutral
 # A reflection is reconstructed from the neutral-light component; cannot be uniquely separated from flattened pixels.
 ov=a.copy();ov[:,:,3][m]=0
 white=v.min(2)/255
 reflection=np.clip((white-.12)/.65,0,.7)*m
 reflection[protected]=0
 use=reflection>.015
 ov[:,:,:3][use]=255;ov[:,:,3][use]=(reflection[use]*255).astype('uint8')
 ov[protected]=a[protected];m &= ~protected
 depth=ndi.distance_transform_edt(m);depth=np.maximum(depth-1,0)
 lab,n=ndi.label(m)
 for k in range(1,n+1):
  q=lab==k;mx=depth[q].max();depth[q]=depth[q]/mx*255 if mx else 0
 mask=np.stack([m.astype('uint8')*255,depth.astype('uint8'),np.zeros(m.shape,dtype='uint8')],2)
 return Image.fromarray(ov),Image.fromarray(mask),m

def kit(name,source,mode=False):
 d=O/name;d.mkdir(exist_ok=True);im=Image.open(source).convert('RGBA');save(im,d/'SCREEN-MASTER-3344x1882.png');shutil.copyfile(source,d/'SOURCE-NATIVE-1672x941.png')
 bg=Image.open(BG).convert('RGBA');save(bg,d/'background-clean.png')
 pieces=[]
 for ident,pts,ports in base:
  pts=list(pts);ports=json.loads(json.dumps(ports))
  if mode and ident.startswith('branch-'):
   j=int(ident.split('-')[1]);dy={1:-20,2:-14,3:0}[j];pts=[(x,y+dy) for x,y in pts]
   for p in ports:p['center'][1]+=dy
  if mode and ('bottom-joint' in ident or 'bottom-left' in ident or 'bottom-right' in ident):continue
  pieces.append((ident,pts,ports,'pipes'))
 if mode:
  buttons=[('fully-guided',477,394,711,126),('freeplay',477,533,711,126),('table-tracker',477,674,711,126),('back',126,806,363,106),('profile',489,806,351,106),('settings',840,806,348,106),('help',1188,806,354,106)]
  pieces += [('bottom-left-elbow',[(40,822),(102,822),(106,832),(126,832),(126,887),(92,887),(71,879),(53,866),(44,850)],[{'center':[70,822]},{'center':[126,858]}],'pipes'),('bottom-right-elbow',[(1542,832),(1567,832),(1574,821),(1628,821),(1624,846),(1612,868),(1593,882),(1575,889),(1542,889)],[{'center':[1542,858]},{'center':[1600,821]}],'pipes')]
 else:buttons=[('new-game',477,439,711,116),('continue',477,562,711,113),('deck-mutator',477,680,711,115),('profile',145,798,451,113),('settings',640,798,389,113),('help',1071,798,455,113)]
 for ident,x,y,w,h in buttons:pieces.append((ident,button(x,y,w,h),[{'id':'inlet','center':[x,y+h//2]},{'id':'outlet','center':[x+w,y+h//2]}],'buttons'))
 rec=[];composite=bg.copy()
 for ident,pts,ports,typ in pieces:
  m=pm(pts);box=m.getbbox();crop=im.crop(box);crop.putalpha(m.crop(box));x,y,x1,y1=box
  files={};stem=d/typ/ident
  for state,img in [('assembled',crop)]:
   path=stem/f'{state}.png';save(img,path);files[state]=str(path.relative_to(d))
  ov,mask,liquid=layers(crop)
  save(ov,stem/'clear-glass-overlay.png');save(mask,stem/'liquid-mask.png');files.update(overlay=str((stem/'clear-glass-overlay.png').relative_to(d)),mask=str((stem/'liquid-mask.png').relative_to(d)))
  if typ=='buttons':
   for state,sat,bright in [('disabled',.15,.6),('pressed',.85,.72)]:
    st=ImageEnhance.Brightness(ImageEnhance.Color(crop).enhance(sat)).enhance(bright);st.putalpha(crop.getchannel('A'));save(st,stem/f'{state}.png');files[state]=str((stem/f'{state}.png').relative_to(d))
  composite.alpha_composite(crop,(x,y))
  rp=[]
  for p in ports:
   cx,cy=p['center'];rp.append({'id':p.get('id','port'),'canvas':[cx*2,cy*2],'local':[(cx-x)*2,(cy-y)*2],'diameter':p.get('width',54)*2})
  rec.append({'id':ident,'type':typ,'rect':[x*2,y*2,(x1-x)*2,(y1-y)*2],'files':files,'ports':rp})
 # Lettering/title extracted as artwork; alpha excludes nearby blue backdrop. Baseline source preserved in native reference.
 textboxes=[('tagline',(640,414,1030,446))] if not mode else [('tagline',(675,277,992,304)),('title',(447,306,1231,378)),('guided-subline',(630,503,1045,530)),('freeplay-subline',(693,644,978,671)),('tracker-subline',(619,780,1055,805))]
 for ident,box in textboxes:
  c=im.crop(box);a=np.array(c);v=a[:,:,:3].astype(float);m=(v.min(2)>95)&(v.max(2)-v.min(2)<130);m=ndi.binary_dilation(m,iterations=1);a[:,:,3]=m.astype('uint8')*255;c=Image.fromarray(a);save(c,d/'lettering'/f'{ident}.png');composite.alpha_composite(c,(box[0],box[1]));rec.append({'id':ident,'type':'lettering','rect':[box[0]*2,box[1]*2,c.width*2,c.height*2],'file':f'lettering/{ident}.png','ports':[]})
 logo=Image.open(R/'piping-separated/04-logo-v2/logo-mutagen-v2-source.png').convert('RGBA');rect=(650,72,370,347) if not mode else (699,75,269,206)
 # Logo must retain square canvas: use a square allocation at original aspect; do not duplicate preview's generated logo.
 side=350 if not mode else 210;px=(S[0]-side)//2;py=72 if not mode else 73;lc=logo.resize((side,side),Image.Resampling.LANCZOS);composite.alpha_composite(lc,(px,py));rec.append({'id':'logo-v2','type':'branding','rect':[px*2,py*2,side*2,side*2],'file':'../00-branding/logo-mutagen-v2.png','ports':[]})
 # Keep the approved visible backdrop. Only hidden pixels use the reconstructed plate.
 union=np.zeros((941,1672),bool)
 for _,pts,_,_ in pieces: union |= np.array(pm(pts))>0
 for _,box in textboxes: union[box[1]:box[3],box[0]:box[2]]=True
 if mode: union[70:279,690:970]=True
 else: union[70:420,645:1030]=True
 union=ndi.binary_dilation(union,iterations=3)
 ba=np.array(bg);sa=np.array(im);ba[~union]=sa[~union];bg=Image.fromarray(ba);save(bg,d/'background-clean.png')
 # Replay extracted artwork on the finished plate.
 rebuilt=bg.copy()
 for rr in rec:
  if rr['type']=='branding': rebuilt.alpha_composite(lc,(px,py));continue
  pp=d/(rr['files']['assembled'] if 'files' in rr else rr['file'])
  cc=Image.open(pp).convert('RGBA').resize((rr['rect'][2]//2,rr['rect'][3]//2),Image.Resampling.LANCZOS)
  rebuilt.alpha_composite(cc,(rr['rect'][0]//2,rr['rect'][1]//2))
 save(rebuilt,d/'ASSEMBLY-REVIEW.png')
 (d/'LAYOUT.json').write_text(json.dumps({'canvas':{'width':3344,'height':1882},'coordinate_units':'canvas pixels','source_native':[1672,941],'resolution_method':'2x Lanczos enlargement; NOT native 3344px detail','status':'integration candidate, not production-certified','pieces':rec,'flow':'down left column, left-to-right through branches/buttons, up right column, return across top','port_note':'Visible joint-center estimates. Hidden branch routes through steel are not derived from art; validate runtime trajectories. Bottom buttons in mode screen touch through integral coupling art.','background':'background-clean.png','differences':['Authorized reconstructed full background; visible texture differs from preview.','Original v2 logo inserted proportionally; differs from generated logo in preview.','Semi-transparent reflections reconstructed mathematically from neutral brightness.','Disabled and pressed states are derived color/brightness treatments, not newly approved artwork.','Outline and lettering masks are manually/computationally estimated; QA required.']},indent=2))
 return len(rec)
print('Home',kit('01-home',HOME));print('Mode',kit('02-choose-game-mode',MODE,True))
d=O/'00-branding';d.mkdir(exist_ok=True);logo=Image.open(R/'piping-separated/04-logo-v2/logo-mutagen-v2-source.png').convert('RGBA');save(logo,d/'logo-mutagen-v2.png');ov,mask,m=layers(logo);save(ov,d/'logo-mutagen-v2-overlay.png');save(mask,d/'logo-mutagen-v2-liquid-mask.png')
(d/'README.md').write_text('Original adopted v2 RGB artwork enlarged 2x by Lanczos to 2508x2508. This is not native new detail. Overlay reflections are reconstructed from neutral light component, not exact original optical layers. The mask is estimated; no zero-difference claim is made for this reconstruction. Original source retained in previous delivery.\n')
print('Built',len(list(O.rglob('*.png'))),'PNGs')
