import * as PIXI from "pixi.js";

export class WaveEffect {
  public mouseX: number;
  public mouseY: number;

  private _app: PIXI.Application;
  private _width: number;
  private _height: number;
  private _sprite: PIXI.Sprite;
  private _URLimageToDisplace: string = "./assets/img/1.jpg";
  private _URLDmap: string = "./assets/img/dmaps/512x512/water.png";
  private _URLDmap2: string = "./assets/img/dmaps/512x512/clouds.jpg";
  private _DOMContainer: HTMLElement = document.querySelector(
    ".pixi-container"
  );
  private _dMap: PIXI.Sprite;
  private _dMap2: PIXI.Sprite;
  private _displacementFilter2: PIXI.filters.DisplacementFilter;
  private _waveSpeed: number = 1;

  constructor() {
    this._width = window.innerWidth;
    this._height = window.innerHeight;
    this.setupPIXIApp();
  }

  private setupPIXIApp() {
    this._app = new PIXI.Application({
      resizeTo: window,
      width: this._width,
      height: this._height,
    });

    this._DOMContainer.appendChild(this._app.view);

    this.createSprite();
  }

  //TO DO: figure out how to create localised effect, ripple around mouse for example?
  public onMouseDown() {
    this._waveSpeed = 2;
    // this._displacementFilter2 = new PIXI.filters.DisplacementFilter(
    //   this._dMap2
    // );
    // this._app.stage.addChild(this._dMap2);
    // this._sprite.filters.push(this._displacementFilter2);
    // console.log(this._sprite.filters);
    // this._displacementFilter2.scale.x = 8;
    // this._displacementFilter2.scale.y = 8;
  }

  public onMouseUp() {
    this._waveSpeed = 1;
    // this._displacementFilter2.scale.x = 0;
    // this._displacementFilter2.scale.y = 0;
  }

  public onResize(width: number, height: number) {
    this._width = width;
    this._height = height;
    this._sprite.width = this._width;
    this._sprite.height = this._height;
    this._dMap.x = this._width / 2;
    this._dMap.y = this._height / 2;

    this._app.renderer.resize(this._width, this._height);
  }
  private createSprite() {
    this._sprite = PIXI.Sprite.from(this._URLimageToDisplace);
    this._sprite.width = this._app.screen.width;
    this._sprite.height = this._app.screen.height;
    this._app.stage.addChild(this._sprite);
    this._sprite.width = this._width;
    this._sprite.height = this._height;
    this.createDMapFilter();
  }

  private createDMapFilter() {
    this._dMap = PIXI.Sprite.from(this._URLDmap);
    this._dMap.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    this._dMap2 = PIXI.Sprite.from(this._URLDmap2);
    this._dMap2.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

    const displacementFilter = new PIXI.filters.DisplacementFilter(this._dMap);
    displacementFilter.padding = 20;
    this._dMap.position = this._sprite.position;
    this._dMap2.position = this._sprite.position;
    this._app.stage.addChild(this._dMap);
    this._sprite.filters = [displacementFilter];
    displacementFilter.scale.x = 12;
    displacementFilter.scale.y = 12;
  }

  public start() {
    this._app.ticker.add(() => {
      this.renderBaseDMap();
    });
  }

  private renderBaseDMap() {
    this._dMap.y = this._dMap.y + this._waveSpeed;
    if (this._dMap.y > this._dMap.height) {
      this._dMap.y = 0;
    }
  }

  public stop() {
    this._app.ticker.stop();
  }
}
