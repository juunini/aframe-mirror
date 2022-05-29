const{Color:Color,Matrix4:Matrix4,Mesh:Mesh,PerspectiveCamera:PerspectiveCamera,Plane:Plane,ShaderMaterial:ShaderMaterial,UniformsUtils:UniformsUtils,Vector3:Vector3,Vector4:Vector4,WebGLRenderTarget:WebGLRenderTarget}=AFRAME.THREE;class Reflector extends Mesh{constructor(e,t={}){super(e),this.isReflector=!0,this.type="Reflector",this.camera=new PerspectiveCamera;const r=this,o=void 0!==t.color?new Color(t.color):new Color(8355711),n=t.textureWidth||512,a=t.textureHeight||512,i=t.clipBias||0,l=t.shader||Reflector.ReflectorShader,s=void 0!==t.multisample?t.multisample:4,d=new Plane,c=new Vector3,u=new Vector3,m=new Vector3,p=new Matrix4,f=new Vector3(0,0,-1),x=new Vector4,v=new Vector3,h=new Vector3,b=new Vector4,g=new Matrix4,M=this.camera,R=new WebGLRenderTarget(n,a,{samples:s}),T=new ShaderMaterial({uniforms:UniformsUtils.clone(l.uniforms),fragmentShader:l.fragmentShader,vertexShader:l.vertexShader});T.uniforms.tDiffuse.value=R.texture,T.uniforms.color.value=o,T.uniforms.textureMatrix.value=g,this.material=T,this.onBeforeRender=function(e,t,o){if(u.setFromMatrixPosition(r.matrixWorld),m.setFromMatrixPosition(o.matrixWorld),p.extractRotation(r.matrixWorld),c.set(0,0,1),c.applyMatrix4(p),v.subVectors(u,m),v.dot(c)>0)return;v.reflect(c).negate(),v.add(u),p.extractRotation(o.matrixWorld),f.set(0,0,-1),f.applyMatrix4(p),f.add(m),h.subVectors(u,f),h.reflect(c).negate(),h.add(u),M.position.copy(v),M.up.set(0,1,0),M.up.applyMatrix4(p),M.up.reflect(c),M.lookAt(h),M.far=o.far,M.updateMatrixWorld(),M.projectionMatrix.copy(o.projectionMatrix),g.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),g.multiply(M.projectionMatrix),g.multiply(M.matrixWorldInverse),g.multiply(r.matrixWorld),d.setFromNormalAndCoplanarPoint(c,u),d.applyMatrix4(M.matrixWorldInverse),x.set(d.normal.x,d.normal.y,d.normal.z,d.constant);const{projectionMatrix:n}=M;b.x=(Math.sign(x.x)+n.elements[8])/n.elements[0],b.y=(Math.sign(x.y)+n.elements[9])/n.elements[5],b.z=-1,b.w=(1+n.elements[10])/n.elements[14],x.multiplyScalar(2/x.dot(b)),n.elements[2]=x.x,n.elements[6]=x.y,n.elements[10]=x.z+1-i,n.elements[14]=x.w,R.texture.encoding=e.outputEncoding,r.visible=!1;const a=e.getRenderTarget(),l=e.xr.enabled,s=e.shadowMap.autoUpdate;e.xr.enabled=!1,e.shadowMap.autoUpdate=!1,e.setRenderTarget(R),e.state.buffers.depth.setMask(!0),!1===e.autoClear&&e.clear(),e.render(t,M),e.xr.enabled=l,e.shadowMap.autoUpdate=s,e.setRenderTarget(a);const{viewport:T}=o;void 0!==T&&e.state.viewport(T),r.visible=!0},this.getRenderTarget=function(){return R},this.dispose=function(){R.dispose(),r.material.dispose()}}}Reflector.prototype.isReflector=!0,Reflector.ReflectorShader={uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:"\n    uniform mat4 textureMatrix;\n    varying vec4 vUv;\n    #include <common>\n    #include <logdepthbuf_pars_vertex>\n    void main() {\n      vUv = textureMatrix * vec4( position, 1.0 );\n      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n      #include <logdepthbuf_vertex>\n    }",fragmentShader:"\n    uniform vec3 color;\n    uniform sampler2D tDiffuse;\n    varying vec4 vUv;\n    #include <logdepthbuf_pars_fragment>\n    float blendOverlay( float base, float blend ) {\n      return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );\n    }\n    vec3 blendOverlay( vec3 base, vec3 blend ) {\n      return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );\n    }\n    void main() {\n      #include <logdepthbuf_fragment>\n      vec4 base = texture2DProj( tDiffuse, vUv );\n      gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );\n    }"};const DEFAULT_COLOR="#7f7f7f",DEFAULT_TEXTURE_WIDTH=window.innerWidth*window.devicePixelRatio,DEFAULT_TEXTURE_HEIGHT=window.innerHeight*window.devicePixelRatio;AFRAME.registerComponent("mirror",{schema:{color:{type:"color",default:DEFAULT_COLOR},textureWidth:{type:"number",default:DEFAULT_TEXTURE_WIDTH},textureHeight:{type:"number",default:DEFAULT_TEXTURE_HEIGHT}},init(){const e=this.data.color||DEFAULT_COLOR,t=this.data.textureWidth||DEFAULT_TEXTURE_WIDTH,r=this.data.textureHeight||DEFAULT_TEXTURE_HEIGHT,o=new Reflector(this.el.components.geometry.geometry,{color:new AFRAME.THREE.Color(e),textureWidth:t,textureHeight:r});this.el.setObject3D("mesh",o)}});