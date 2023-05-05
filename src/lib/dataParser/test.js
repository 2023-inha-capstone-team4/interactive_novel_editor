        //text layer test code
        this.txtLayer=new TextLayer();
        this.txtLayer.setText("Hello World!");
        this.txtLayer.fontType="Arial";
        this.txtLayer.repeatType="forward";
        this.txtLayer.name="hello world";
        this.txtLayer.addKeyframe(new TextKeyframe(0,new Vector2D(400,300), new Vector2D(1,1), 0, 1, {red:255, green:255, blue:255}));
        this.txtLayer.addKeyframe(new TextKeyframe(0.75,new Vector2D(300,300), new Vector2D(3,3), 0, 0.5, {red:255, green:124, blue:0}));
        this.txtLayer.addKeyframe(new TextKeyframe(1.0,new Vector2D(300,300), new Vector2D(1,1), 360, 1.0, {red:255, green:0, blue:0}));
        this.txtLayer.addKeyframe(new TextKeyframe(1.75,new Vector2D(300,300), new Vector2D(2,2), 0, 0.8, {red:255, green:124, blue:0}));
        this.txtLayer.addKeyframe(new TextKeyframe(3,new Vector2D(300,300), new Vector2D(1,1), 720, 0.5, {red:255, green:124, blue:0}));
        this.txtLayer.addKeyframe(new TextKeyframe(4,new Vector2D(300,300), new Vector2D(2,2), 0, 0.4, {red:255, green:0, blue:0}));
        this.txtLayer.addKeyframe(new TextKeyframe(6,new Vector2D(300,300), new Vector2D(3,3), 0, 0.9, {red:255, green:124, blue:50}));
        this.txtLayer.addKeyframe(new TextKeyframe(9,new Vector2D(300,300), new Vector2D(2,2), 0,0.6, {red:128, green:0, blue:255}));
        this.txtLayer.addKeyframe(new TextKeyframe(14,new Vector2D(300,300), new Vector2D(1,1), 0,0, {red:128, green:0, blue:255}));

        this.sceneManager.getCurrentScene().addLayer(this.txtLayer);

        this.txtLayer=new TextLayer();
        this.txtLayer.setText("안녕");
        this.txtLayer.fontType="Sans Serif";
        this.txtLayer.repeatType="forward";
        this.txtLayer.name="안녕";
        this.txtLayer.addKeyframe(new TextKeyframe(0,new Vector2D(400,300), new Vector2D(1,1), 0, 1, {red:255, green:255, blue:255}));
        this.txtLayer.addKeyframe(new TextKeyframe(0.75,new Vector2D(800,300), new Vector2D(3,3), 0, 0, {red:255, green:124, blue:0}));
        this.sceneManager.getCurrentScene().addLayer(this.txtLayer);


        console.log(ProjectJsonParser.changeSceneListToJson(this.sceneManager.sceneList));

        //scene 2번째 test code
        // this.sceneManager.createNewScene();
        // this.sceneManager.selectScene(1);
        // this.imageLayer=new ImageLayer("https://item.kakaocdn.net/do/b0de2adb4008db8aec4d0616b9a04e0deffd194bae87d73dd00522794070855d");
        // this.imageLayer.addKeyframe(new Keyframe(0,new Vector2D(400,300), new Vector2D(1,1),0,1));
        // this.imageLayer.name="무지";
        // this.sceneManager.getCurrentScene().addLayer(this.imageLayer);
        
        

        //         //scene 3번째 test code
        //         this.sceneManager.selectScene(2);

        //         this.imageLayer=new ImageLayer("https://item.kakaocdn.net/do/d84248170c2c52303db27306a00fb8618f324a0b9c48f77dbce3a43bd11ce785");
        //         this.imageLayer.setRepeatType("forward");
        //         this.imageLayer.addKeyframe(new Keyframe(0,new Vector2D(500,300), new Vector2D(1,1),0,1));
        //         this.imageLayer.addKeyframe(new Keyframe(2,new Vector2D(100,100), new Vector2D(2,2),0,0.3));
        //         this.imageLayer.name="라이언1";
        //         this.sceneManager.getCurrentScene().addLayer(this.imageLayer);
        //         console.log(this.sceneManager.getCurrentScene().getLayers());


        //         this.imageLayer=new ImageLayer("https://item.kakaocdn.net/do/d84248170c2c52303db27306a00fb8618f324a0b9c48f77dbce3a43bd11ce785");
        //         this.imageLayer.setRepeatType("none");
        //         this.imageLayer.addKeyframe(new Keyframe(0,new Vector2D(500,300), new Vector2D(1,1),0,1));
        //         this.imageLayer.addKeyframe(new Keyframe(2,new Vector2D(300,300), new Vector2D(2,2),0,1));
        //         this.imageLayer.name="라이언2";
        //         this.sceneManager.getCurrentScene().addLayer(this.imageLayer);
        //         console.log(this.sceneManager.getCurrentScene().getLayers());

        //         this.imageLayer2=new ImageLayer("https://item.kakaocdn.net/do/d84248170c2c52303db27306a00fb8618f324a0b9c48f77dbce3a43bd11ce785");
        //         this.imageLayer2.repeatType=("none");
        //         this.imageLayer2.addKeyframe(new Keyframe(0,new Vector2D(500,300), new Vector2D(1,1),0,1));
        //         this.imageLayer2.addKeyframe(new Keyframe(2,new Vector2D(600,300), new Vector2D(2,2),0,1));
        //         this.imageLayer2.name="라이언3";
        //         this.sceneManager.getCurrentScene().addLayer(this.imageLayer2);
        //         console.log(this.sceneManager.getCurrentScene().getLayers());

        //         this.imageLayer3=new ImageLayer("https://item.kakaocdn.net/do/d84248170c2c52303db27306a00fb8618f324a0b9c48f77dbce3a43bd11ce785");
        //         this.imageLayer3.repeatType="forward";
        //         this.imageLayer3.addKeyframe(new Keyframe(0,new Vector2D(500,300), new Vector2D(1,1),0,1));
        //         this.imageLayer3.addKeyframe(new Keyframe(2,new Vector2D(600,500), new Vector2D(0.5,0.5),0,1));
        //         this.imageLayer3.name="라이언4";
        //         this.sceneManager.getCurrentScene().addLayer(this.imageLayer3);
        //         console.log(this.sceneManager.getCurrentScene().getLayers());

        //         this.imageLayer4=new ImageLayer("https://item.kakaocdn.net/do/d84248170c2c52303db27306a00fb8618f324a0b9c48f77dbce3a43bd11ce785");
        //         this.imageLayer4.setRepeatType("reverse");
        //         this.imageLayer4.addKeyframe(new Keyframe(0,new Vector2D(500,300), new Vector2D(1,1),0,1));
        //         this.imageLayer4.addKeyframe(new Keyframe(2,new Vector2D(100,100), new Vector2D(1.5,1.5),0,1));
        //         this.imageLayer4.name="라이언5";
        //         this.sceneManager.getCurrentScene().addLayer(this.imageLayer4);
        //         console.log(this.sceneManager.getCurrentScene().getLayers());