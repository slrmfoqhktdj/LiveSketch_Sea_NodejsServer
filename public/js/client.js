import * as THREE from './build/three.module.js';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
import { OrbitControls } from '/jsm/controls/OrbitControls.js';

// import { Fish_body_Arr,Fish_fin_Arr,Shark_body_Arr,Shark_fin_Arr} from './model.js';



const scene = new THREE.Scene();                  //1. 장면만들고
//scene.add(); //여기에 그림을 그릴 수 있음.

let select_model_body;
let select_model_fin;

const Fish_body_Arr_M = Fish_body_Arr;
const Fish_fin_Arr_M = Fish_fin_Arr;
const Shark_body_Arr_M = Shark_body_Arr;
const Shark_fin_Arr_M = Shark_fin_Arr;

let fish_body_c = 0;
let fish_fin_c = 0;
let shark_body_c = 0;
let shark_fin_c = 0;

let Select_model = 0;

const renderer = new THREE.WebGLRenderer({
    antialias : true,
    canvas : document.querySelector("#canvas")
});

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setPixelRatio(window.devicePixelRatio);
//렌더할 곳의 사이즈 
renderer.setSize(window.innerWidth*0.7, window.innerHeight*0.7);

//거리
const fov = 5;
//비율
const aspect =  window.innerWidth / window.innerHeight;
//렌더링 범위
const near = 1;
const far = 1000;

let camera = new THREE.PerspectiveCamera(fov, aspect, near, far ); //PerspectiveCamera (원근법 O), OrthographicCamer (원근법 X)
camera.position.set(0,0,150);
const controls = new OrbitControls(camera,renderer.domElement);

controls.rotateSpeed = 1.0; // 마우스로 카메라를 회전시킬 속도입니다. 기본값(Float)은 1입니다.        
controls.zoomSpeed = 1.2;    // 마우스 휠로 카메라를 줌 시키는 속도 입니다. 기본값(Float)은 1입니다.

scene.background = new THREE.Color('white');
let light = new THREE.DirectionalLight(0xffffff,2); //조명 
light.position.set(1,5,1)
scene.add(light);



add_body(Fish_body_Arr_M[fish_body_c])
add_fin(Fish_fin_Arr_M[fish_fin_c])
  

function add_body(url){
    let loader_body = new GLTFLoader(); //gltf 파일은 GLTFLoader 로 가져와야됨

    loader_body.load(url, function(gltf){
        select_model_body = gltf.scene;
        scene.add(gltf.scene);
        function animate(){
            requestAnimationFrame(animate) //1초에 60번 실행됨.

            //회전
            // gltf.scene.rotation.y += 0.010;
            renderer.render(scene,camera);  
        }
        animate();
    });

}

function add_fin(url){
    let loader_fin = new GLTFLoader(); //gltf 파일은 GLTFLoader 로 가져와야됨

    loader_fin.load(url, function(gltf){
        select_model_fin = gltf.scene;
        scene.add(gltf.scene);
        // function animate(){
        //     requestAnimationFrame(animate) //1초에 60번 실행됨.

        //     //회전
        //     gltf.scene.rotation.y += 0.010;
            renderer.render(scene,camera);  
        // }
        // animate();
    });

}








//////////////////////////////////////////////////////////////////////////////////

const socket = io.connect('http://localhost:3000/C_page');


$(".sendC").click(function(){
    switch(Select_model){
        case 0:
            socket.emit('client',{select_model:Select_model,body:fish_body_c,fin:fish_fin_c})
            break;
        case 1:
            socket.emit('client',{select_model:Select_model,body:shark_body_c,fin:shark_fin_c})
            break;
    }
})


$(".head_left").click(function(){
    scene.remove(select_model_body)
    switch(Select_model){
        case 0:
            fish_body_c -=1
            if(fish_body_c < 0){
                fish_body_c= Fish_body_Arr_M.length-1
            }
            add_body(Fish_body_Arr_M[fish_body_c])
            break;
        case 1:
            shark_body_c -=1
            if(shark_body_c < 0){
                shark_body_c= Shark_body_Arr_M.length-1
            }
            add_body(Shark_body_Arr_M[shark_body_c])
            break;

    }

})

$(".head_right").click(function(){
    scene.remove(select_model_body)
    switch(Select_model){
        case 0:
            fish_body_c +=1
            if(fish_body_c > Fish_body_Arr_M.length-1){
                fish_body_c=0
            }
            add_body(Fish_body_Arr_M[fish_body_c])
            break;
        case 1:
            shark_body_c +=1
            if(shark_body_c > Shark_body_Arr_M.length-1){
                shark_body_c=0
            }
            add_body(Shark_body_Arr_M[shark_body_c])
            break;
    }
})

$(".upper_left").click(function(){
    scene.remove(select_model_fin)
    switch(Select_model){
        case 0:
            fish_fin_c -=1
            if(fish_fin_c < 0){
                fish_fin_c= Fish_fin_Arr_M.length-1
            }
            add_fin(Fish_fin_Arr_M[fish_fin_c])
        break;
        case 1:
            shark_fin_c -=1
            if(shark_fin_c < 0){
                shark_fin_c= Shark_fin_Arr_M.length-1
            }
            add_fin(Shark_fin_Arr_M[shark_fin_c])
            break;
    }
})

$(".upper_right").click(function(){
    scene.remove(select_model_fin)
    switch(Select_model){
        case 0:
            fish_fin_c +=1
            if(fish_fin_c > Fish_fin_Arr_M.length-1){
                fish_fin_c=0
            }
            add_fin(Fish_fin_Arr_M[fish_fin_c])
            break;
        case 1:
            shark_fin_c +=1
            if(shark_fin_c > Shark_fin_Arr_M.length-1){
                shark_fin_c=0
            }
            add_fin(Shark_fin_Arr_M[shark_fin_c])
            break;
    }
})


$("#fish_box").click(function(){
    if(Select_model!=0){
        Select_model = 0;
        scene.remove(select_model_body);
        scene.remove(select_model_fin);
        add_body(Fish_body_Arr_M[fish_body_c])
        add_fin(Fish_fin_Arr_M[fish_fin_c])
    }
})

$("#shark_box").click(function(){
    if(Select_model!=1){
        Select_model = 1;
        scene.remove(select_model_body);
        scene.remove(select_model_fin);
        add_body(Shark_body_Arr_M[shark_body_c])
        add_fin(Shark_fin_Arr_M[shark_fin_c])
    }
})






