import { WaveEffect } from "./WaveEffect";

export default class ModuleWaveEffect {
  private _effect: WaveEffect;

  public build(): void {
    this._effect = new WaveEffect();
  }

  public awake(): void {
    this._effect.start();
    window.addEventListener("resize", this.onResize);
    document
      .querySelector(".Module-WaveEffect")
      .addEventListener("keydown", this.checkKey);
    document
      .querySelector(".Module-WaveEffect")
      .addEventListener("mousedown", this.setMouseCoords);
    document
      .querySelector(".Module-WaveEffect")
      .addEventListener("mouseup", this.resetMouse);
  }

  private resetMouse = () => {
    this._effect.onMouseUp();
  };

  private setMouseCoords = (event: MouseEvent) => {
    this._effect.mouseX = event.clientX;
    this._effect.mouseY = event.clientY;
    this._effect.onMouseDown();
  };

  private checkKey = (event: KeyboardEvent) => {
    if (event.key == "s") {
      this.stopEffect();
    }
  };

  private stopEffect() {
    this._effect.stop();
  }

  private onResize = () => {
    this._effect.onResize(window.innerWidth, window.innerHeight);
  };

  protected sleep(): void {
    document
      .querySelector(".Module-WaveEffect")
      .removeEventListener("click", this.stopEffect);
  }
}
